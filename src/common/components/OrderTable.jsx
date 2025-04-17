import React, { useEffect, useMemo, useState } from 'react';
import StatusChangeToast from './StatusChangeToast';

import { OpenInNewWindowIcon } from '@radix-ui/react-icons';
import {
  AllCommunityModule,
  ModuleRegistry,
  provideGlobalGridOptions,
} from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import styled from 'styled-components';

import ItemArrivedConfirm from 'common/components/admin_modals/ItemArrivedConfirm';
import ItemPendingConfirm from './admin_modals/ItemPendingConfirm';
import ItemReadyConfirm from 'common/components/admin_modals/ItemReadyConfirm';
import OrderApprovalConfirm from 'common/components/admin_modals/OrderApprovalConfirm';
import OrderDenyConfirm from 'common/components/admin_modals/OrderDenyConfirm';
import ReasonForDenial from 'common/components/admin_modals/ReasonForDenial';

import StatusDropdown from './StatusDropdown';
import FormPopup from './templates/FormPopup';

// Mark grids as legacy theme to fix AG Grid bug
provideGlobalGridOptions({ theme: 'legacy' });

ModuleRegistry.registerModules([AllCommunityModule]);

const StyledLink = styled.a`
  text-decoration: underline;
  &:link {
    color: blue;
  }

  &:visited {
    color: blue;
  }

  &:hover {
    color: darkblue;
  }

  &:active {
    color: purple;
  }
`;

const EditableCell = (props) => {
  const [value, setValue] = useState(props.value);

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onBlur = async () => {
    await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/admin/tracking/${props.data.orderId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tracking_number: value }),
      }
    );
    props.api.stopEditing();
    props.updateTrackingNumber(props.data.orderId, value);
    setValue(props.value);
  };

  return (
    <input
      type='text'
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      style={{ width: '100%' }}
    />
  );
};

// Responsible for formatting values under 'Order Name' column.
const orderNameRenderer = (params) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        overflowX: 'scroll',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        textOverflow: 'ellipsis',
      }}
    >
      {/* Bolded item/product name */}
      <span style={{ fontWeight: 'bold' }}>{params.data.orderName}</span>
      <span
        style={{
          fontSize: '0.8em',
          color: 'gray',
          position: 'absolute',
          top: '15px',
        }}
      >
        {/* PPU and Quantity acting as 'subheaders' beneath item name */}
        Price per unit: ${params.data.ppu} — Qty: {params.data.quantity}
      </span>
    </div>
  );
};

// Responsible for formatting & styling the 'Priority' column
const priorityRenderer = (params) => {
  const priority = params.value;
  const isUrgent = priority === 'regular' ? false : true;
  // if priority is regular, then do not apply additional styles
  return (
    <div style={{ display: 'flex' }}>
      <span
        style={{
          backgroundColor: isUrgent ? 'orange' : 'inherit',
          width: '100px',
          height: '35px',
          borderRadius: isUrgent ? '4px' : 'inherit',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {
          isUrgent
            ? priority
            : String(priority[0]).toUpperCase() +
              String(priority).slice(1) /* first letter == uppercase */
        }
      </span>
    </div>
  );
};

// Responsible for formatting the 'Description' column
// Regardless of text length, user is able to click on the description and
// open a pop-up that shows the full description
const descriptionRenderer = (params) => {
  const desc = params.value;
  if (desc.length < 9) {
    return desc;
  } else {
    return (
      <div style={{ position: 'relative', width: '120px', fontSize: '14px' }}>
        <FormPopup
          title={
            params.data['therapistName'] +
            "'s Reason for Buying " +
            params.data['orderName']
          }
          description=''
          defaultSubmit={false}
          buttonText={desc.slice(0, 10) + '...'}
          buttonColor='white'
          styles={{ fontSize: '14px' }}
        >
          <div
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              outline: 'none',
              whiteSpace: 'normal',
              overflowWrap: 'break-word',
            }}
          >
            {desc}
          </div>
        </FormPopup>
        <div
          style={{
            position: 'absolute',
            top: '4px',
            left: '100px',
            pointerEvents: 'none',
          }}
        >
          <OpenInNewWindowIcon style={{ width: '15px', height: '15px' }} />
        </div>
      </div>
    );
  }
};

// Responsible for formatting the 'Link' column
const linkRenderer = (params) => {
  return (
    <span>
      {/* Use basic StyledLink component (defined at top of doc) for styling.
      Link remains blue after visiting, subject to change in future. */}
      <StyledLink href={params.value} target='_blank' rel='noreferrer'>
        Link
      </StyledLink>
    </span>
  );
};

// Responsible for formatting the 'price' column
function currencyFormatter(params) {
  // if price value is not null, return formatted price to column
  return params.value == null ? '' : '$' + params.value.toLocaleString();
}

// Changes date format from YYYY-MM-DD to MM/DD/YYYY for easier readability
function requestDateFormatter(params) {
  const [year, month, day] = params.value.split('-');
  return `${month}/${day}/${year}`;
}

// Formats specialization
function specializationFormatter(params) {
  const specialization = params.value;
  return specialization
    ? specialization.charAt(0).toUpperCase() + specialization.slice(1)
    : ''; // prevents error when specialization is null
}

// Changes program name to its respective abbreviation
function programToAbbrev(params) {
  const program = params.value;
  if (program === 'private') return 'PT';
  if (program === 'community') return 'CP';
  if (program === 'creative') return 'CKC';
  if (program === 'school') return 'SP';
}

// Validates status change
const checkValidStatusChange = (currStatus, newStatus) => {
  const statusMap = {
    denied: ['pending'],
    approved: ['pending', 'arrived'],
    pending: ['denied', 'approved'],
    arrived: ['approved', 'ready'],
  };
  const isValid = statusMap[currStatus].includes(newStatus);
  return isValid;
};

export default function OrderTable() {
  const [rowData, setRowData] = useState([]);
  const [pendingRow, setPendingRow] = useState(null); // Store the pending row (row we are editing) with its previous status
  // Below states control popups and toasts
  const [showApprovalConfirm, setShowApprovalConfirm] = useState(false);
  const [showDenyConfirm, setShowDenyConfirm] = useState(false);
  const [showReasonForDenial, setShowReasonForDenial] = useState(false);
  const [showItemArrived, setShowItemArrived] = useState(false);
  const [showItemPickUp, setShowItemPickUp] = useState(false);
  const [showItemPending, setShowItemPending] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Renders the status cells (column)
  const statusCellRenderer = (params) => {
    const handleStatusChange = (newValue) => {
      // Check if this status change is 'allowed'
      const validChange = checkValidStatusChange(params.data.status, newValue);
      // If not, show toast to notify user that they cannot do it
      if (!validChange) {
        const currStatus =
          params.data.status.charAt(0).toUpperCase() +
          params.data.status.slice(1);
        const newStatus = newValue.charAt(0).toUpperCase() + newValue.slice(1);
        const msg = `Cannot change status from "${currStatus}" to "${newStatus}". Please select a valid status.`;
        setToastMsg(msg);
        setShowToast(true);
        return;
      }
      // If status change is allowed, show appropriate popup
      if (newValue === 'approved') {
        // Save reference to row along with the previous status in case
        // user wants to undo their action
        setPendingRow({ params, prev: params.value });
        setShowApprovalConfirm(true);
      } else if (newValue === 'denied') {
        setPendingRow({ params, prev: params.value });
        setShowDenyConfirm(true);
      } else if (newValue === 'arrived') {
        setPendingRow({ params, prev: params.value });
        setShowItemArrived(true);
      } else if (newValue === 'ready') {
        setPendingRow({ params, prev: params.value });
        setShowItemPickUp(true);
      } else if (newValue === 'pending') {
        setPendingRow({ params, prev: params.value });
        setShowItemPending(true);
      } else {
        params.node.setDataValue('status', newValue);
      }
    };
    return (
      <StatusDropdown
        value={params.value}
        onStatusChange={handleStatusChange}
      />
    );
  };

  // Tracks row data during tracking # change
  const updateTrackingNumber = (orderId, newTrackingNumber) => {
    setRowData((prevRowData) =>
      prevRowData.map((row) =>
        row.orderId === orderId
          ? { ...row, trackingNumber: newTrackingNumber }
          : row
      )
    );
  };

  // All column names and respective settings
  const [colDefs] = useState([
    {
      headerName: 'Order Name',
      field: 'orderName',
      cellRenderer: orderNameRenderer, // see comments before OrderTable() definition
      filter: true, // 'filter: true' activates the filter option at top of specified column (3 dashed horizontal lines)
      cellStyle: { justifyContent: 'flex-start', alignItems: 'flex-start' },
    },
    {
      headerName: 'Status',
      field: 'status',
      cellRenderer: statusCellRenderer,
      filter: true,
    },
    {
      headerName: 'Priority',
      field: 'priorityLevel',
      width: 150,
      cellRenderer: priorityRenderer,
    },
    {
      headerName: 'Description',
      field: 'description',
      cellRenderer: descriptionRenderer,
    },
    {
      headerName: 'Price',
      field: 'price',
      width: 140, // adjust width of price column
      valueFormatter: currencyFormatter,
      filter: true,
    },
    {
      headerName: 'Link',
      field: 'link',
      width: 65,
      cellRenderer: linkRenderer,
    },
    {
      headerName: 'Tracking Number',
      field: 'trackingNumber',
      editable: (params) => {
        // Status must be 'approved' to enter a tracking number
        return params.data.status === 'approved';
      },
      cellEditor: EditableCell,
      cellEditorParams: {
        updateTrackingNumber,
      },
    },
    {
      headerName: 'Request Date',
      field: 'requestDate',
      valueFormatter: requestDateFormatter,
      filter: true,
    },
    {
      headerName: 'Specialization',
      field: 'specialization',
      filter: true,
      valueFormatter: specializationFormatter,
    },
    {
      headerName: 'Program',
      field: 'program',
      valueFormatter: programToAbbrev,
      width: 110,
    },
    {
      headerName: 'Therapist Name',
      field: 'therapistName',
    },
    {
      headerName: 'Status Tracker',
      field: 'statusTracker',
      hide: true,
    },
  ]);

  // Default column definitions for table; columns cannot be resized, instead they fit to width
  const defaultColDef = useMemo(() => {
    return {
      resizable: false, // 'resizable: false' means user cannot resize columns, as cols are meant to fit to width
      suppressMovable: true, // 'suppressMovable: true' means the user cannot move columns around
      cellStyle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    };
  }, []);

  // On initial render, load all order data into the table
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/orders/`)
      .then((result) => result.json())
      .then((data) => {
        // Check if data is an array
        if (!Array.isArray(data)) {
          console.error('Expected array but received:', typeof data);
          setRowData([]);
          return;
        }
        // Transform each order of JSON into flat object for table
        const transformedData = data.map((order) => ({
          orderId: order.order_id,
          orderName: order.items.item_name,
          status: order.status,
          priorityLevel: order.priority_level,
          description: order.order_description,
          price: order.total_cost,
          link: order.items.order_link,
          trackingNumber: order.tracking_number,
          requestDate: order.request_date,
          specialization: order.users.specialization,
          program: order.programs.program_title,
          therapistName: `${order.users.firstname} ${order.users.lastname}`,
          ppu: order.items.price_per_unit,
          quantity: order.quantity,
          statusHistory: ['pending'],
        }));
        setRowData(transformedData);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
        setRowData([]);
      });
  }, []);

  // Make columns fit to width of the grid, no overflow/scrolling
  const autoSizeStrategy = useMemo(() => {
    return {
      type: 'fitGridWidth',
      defaultMinWidth: 65,
      columnLimits: [
        // can specify minimum widths for certain columns
        {
          colId: 'orderName',
          minWidth: 185,
        },
      ],
    };
  }, []);

  // The actual component (order table) we are actually returning
  return (
    <div style={{ padding: '20px' }}>
      {/* The actual order table */}
      <div className='ag-theme-quartz' style={{ height: '500px' }}>
        <AgGridReact
          rowData={rowData}
          defaultColDef={defaultColDef}
          columnDefs={colDefs}
          rowHeight={50}
          autoSizeStrategy={autoSizeStrategy}
        />
      </div>
      {/* Toast for when user does invalid status transition */}
      <StatusChangeToast
        open={showToast}
        setOpen={setShowToast}
        title='Invalid Status Change'
        description={toastMsg}
      />
      {/* Appears when user is changing the status from something else to 'Approved' */}
      {showApprovalConfirm && (
        <OrderApprovalConfirm
          open={true}
          // If user clicks 'Confirm' for switching status to 'Approved,' then the backend is updated
          onApprove={async () => {
            await fetch(
              `${process.env.REACT_APP_BACKEND_URL}/admin/approve/${pendingRow.params.data.orderId}`,
              {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            );
            // If row is currently being edited (always should), update row data
            if (pendingRow) {
              const updatedData = rowData.map((row) =>
                row.orderId === pendingRow.params.data.orderId
                  ? { ...row, status: 'approved' }
                  : row
              );
              setRowData(updatedData);
              // Refresh row to update in real time
              pendingRow.params.api.refreshCells({
                rowNodes: [pendingRow.params.node],
              });
            }
            setShowApprovalConfirm(false);
            setPendingRow(null);
          }}
          // User decides to cancel the process of switching status to 'Approved,' revert to previous state
          onCancel={() => {
            // Revert row we are editing to previous state before edit
            if (pendingRow) {
              const updatedData = rowData.map((row) =>
                row.orderId === pendingRow.params.data.orderId
                  ? { ...row, status: pendingRow.prev }
                  : row
              );
              setRowData(updatedData);
              // Refresh row to update in real time
              pendingRow.params.api.refreshCells({
                rowNodes: [pendingRow.params.node],
              });
            }
            setShowApprovalConfirm(false);
            setPendingRow(null);
          }}
        />
      )}
      {/* Appears when user is changing the status from something else to 'Denied' */}
      {showDenyConfirm && (
        <OrderDenyConfirm
          open={true}
          // If user clicks 'Deny' for switching status to 'Denied,' then the backend is updated
          onDeny={() => {
            // If row is currently being edited (always should), update row data
            if (pendingRow) {
              const updatedData = rowData.map((row) =>
                row.orderId === pendingRow.params.data.orderId
                  ? { ...row, status: 'denied' }
                  : row
              );
              setRowData(updatedData);
              // Refresh in real time
              pendingRow.params.api.refreshCells({
                rowNodes: [pendingRow.params.node],
              });
            }
            setShowDenyConfirm(false);
            setShowReasonForDenial(true);
          }}
          onCancel={() => {
            // Revert to previous row data if user decides to undo 'Deny'
            if (pendingRow) {
              const updatedData = rowData.map((row) =>
                row.orderId === pendingRow.params.data.orderId
                  ? { ...row, status: pendingRow.prev }
                  : row
              );
              setRowData(updatedData);
              // Refresh in real time
              pendingRow.params.api.refreshCells({
                rowNodes: [pendingRow.params.node],
              });
            }
            setShowDenyConfirm(false);
            setPendingRow(null);
          }}
        />
      )}
      {/* Reason for denial popup */}
      {showReasonForDenial && (
        <ReasonForDenial
          open={true}
          // When user submits reason for denial, the backend is updated to reflect new 'Denied' order
          onSubmit={async (reason) => {
            await fetch(
              `${process.env.REACT_APP_BACKEND_URL}/admin/deny/${pendingRow.params.data.orderId}`,
              {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                // pass the denial reason from the popup if available:
                body: JSON.stringify({
                  reason_for_denial: `${reason}`,
                }),
              }
            );
            // Update status to denied
            if (pendingRow) {
              const updatedData = rowData.map((row) =>
                row.orderId === pendingRow.params.data.orderId
                  ? { ...row, status: 'denied' }
                  : row
              );
              setRowData(updatedData);
              pendingRow.params.api.refreshCells({
                rowNodes: [pendingRow.params.node],
              });
            }
            setShowReasonForDenial(false);
            setPendingRow(null);
          }}
          // Backend not updated if user decides to cancel their denial process
          onCancel={() => {
            // Revert status to its previous value when user cancels
            if (pendingRow) {
              const updatedData = rowData.map((row) =>
                row.orderId === pendingRow.params.data.orderId
                  ? { ...row, status: pendingRow.prev }
                  : row
              );
              setRowData(updatedData);
              pendingRow.params.api.refreshCells({
                rowNodes: [pendingRow.params.node],
              });
            }
            setShowReasonForDenial(false);
            setPendingRow(null);
          }}
        />
      )}
      {/* Appears when user is switching status to 'Arrived' */}
      {showItemArrived && (
        <ItemArrivedConfirm
          open={true}
          // When user submits confirms that the order has arrived, update the backend
          onConfirm={async () => {
            await fetch(
              `${process.env.REACT_APP_BACKEND_URL}/admin/arrived/${pendingRow.params.data.orderId}`,
              {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            );
            // Update status to be arrived
            if (pendingRow) {
              const updatedData = rowData.map((row) =>
                row.orderId === pendingRow.params.data.orderId
                  ? { ...row, status: 'arrived' }
                  : row
              );
              setRowData(updatedData);
              pendingRow.params.api.refreshCells({
                rowNodes: [pendingRow.params.node],
              });
            }
            setShowItemArrived(false);
            setPendingRow(null);
          }}
          // If user decides to cancel process of 'Arrived' status, revert to previous data
          onCancel={() => {
            // Revert status to its previous value when user cancels
            if (pendingRow) {
              const updatedData = rowData.map((row) =>
                row.orderId === pendingRow.params.data.orderId
                  ? { ...row, status: pendingRow.prev }
                  : row
              );
              setRowData(updatedData);
              pendingRow.params.api.refreshCells({
                rowNodes: [pendingRow.params.node],
              });
            }
            setShowItemArrived(false);
            setPendingRow(null);
          }}
        />
      )}
      {/* Appears when user is switching status to 'Ready' */}
      {showItemPickUp && (
        <ItemReadyConfirm
          open={true}
          // When user submits confirms that the order has arrived, update the backend
          onConfirm={async () => {
            await fetch(
              `${process.env.REACT_APP_BACKEND_URL}/admin/ready/${pendingRow.params.data.orderId}`,
              {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            );
            if (pendingRow) {
              const updatedData = rowData.map((row) =>
                row.orderId === pendingRow.params.data.orderId
                  ? { ...row, status: 'ready' }
                  : row
              );
              setRowData(updatedData);
              pendingRow.params.api.refreshCells({
                rowNodes: [pendingRow.params.node],
              });
            }
            setShowItemPickUp(false);
            setPendingRow(null);
          }}
          // If user decides to cancel process of switching status to 'Ready,' revert
          onCancel={() => {
            // Revert status to its previous value when user cancels
            if (pendingRow) {
              const updatedData = rowData.map((row) =>
                row.orderId === pendingRow.params.data.orderId
                  ? { ...row, status: pendingRow.prev }
                  : row
              );
              setRowData(updatedData);
              pendingRow.params.api.refreshCells({
                rowNodes: [pendingRow.params.node],
              });
            }
            setShowItemPickUp(false);
            setPendingRow(null);
          }}
        />
      )}
      {/* Appears when user is switching status to 'Review' */}
      {showItemPending && (
        <ItemPendingConfirm
          open={true}
          // When user submits confirms that the order has arrived, update the backend
          onConfirm={async () => {
            await fetch(
              `${process.env.REACT_APP_BACKEND_URL}/admin/revert/${pendingRow.params.data.orderId}`,
              {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            );
            if (pendingRow) {
              const updatedData = rowData.map((row) =>
                row.orderId === pendingRow.params.data.orderId
                  ? { ...row, status: 'pending' }
                  : row
              );
              setRowData(updatedData);
              pendingRow.params.api.refreshCells({
                rowNodes: [pendingRow.params.node],
              });
            }
            setShowItemPending(false);
            setPendingRow(null);
          }}
          // If user decides to cancel process of switching status to 'Review,' then revert
          onCancel={() => {
            // Revert status to its previous value when user cancels
            if (pendingRow) {
              const updatedData = rowData.map((row) =>
                row.orderId === pendingRow.params.data.orderId
                  ? { ...row, status: pendingRow.prev }
                  : row
              );
              setRowData(updatedData);
              pendingRow.params.api.refreshCells({
                rowNodes: [pendingRow.params.node],
              });
            }
            setShowItemPending(false);
            setPendingRow(null);
          }}
        />
      )}
    </div>
  );
}
