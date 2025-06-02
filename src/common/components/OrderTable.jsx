import React, { useEffect, useMemo, useState, useRef } from 'react';
import StatusChangeToast from './therapist_modals/StatusChangeToast';
import { useUser } from 'common/contexts/UserContext';
import { OpenInNewWindowIcon } from '@radix-ui/react-icons';
import CancelOrderButton from 'common/components/therapist_modals/CancelOrderButton';
import CancelOrder from 'common/components/table_pop_ups/CancelOrder';
import NewOrderForm from 'common/components/table_pop_ups/NewOrderForm';
import {
  AllCommunityModule,
  ModuleRegistry,
  provideGlobalGridOptions,
} from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import * as XLSX from 'xlsx';

import ItemArrivedConfirm from 'common/components/admin_modals/ItemArrivedConfirm';
import ItemPendingConfirm from './admin_modals/ItemPendingConfirm';
import ItemReadyConfirm from 'common/components/admin_modals/ItemReadyConfirm';
import OrderApprovalConfirm from 'common/components/admin_modals/OrderApprovalConfirm';
import OrderDenyConfirm from 'common/components/admin_modals/OrderDenyConfirm';
import ReasonForDenial from 'common/components/admin_modals/ReasonForDenial';

import StatusDropdown from './table_pop_ups/StatusDropdown';
import FormPopup from './templates/FormPopup/FormPopup';
import {
  ExportButton,
  ExportDropdown,
  DropdownContent,
  DropdownItem,
  StyledLink,
} from './OrderTableStyles';
import { fetchWithRetries } from './utils';

// Mark grids as legacy theme to fix AG Grid bug
provideGlobalGridOptions({ theme: 'legacy' });

ModuleRegistry.registerModules([AllCommunityModule]);

const EditableCell = (props) => {
  const [value, setValue] = useState(props.value);

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onBlur = async () => {
    await fetchWithRetries(
      `${process.env.REACT_APP_BACKEND_URL}/admin/tracking/${props.data.orderId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
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
  let url = params.value;
  // If the value does not start with http:// or https://, prepend https://
  if (url && !/^https?:\/\//i.test(url)) {
    url = 'https://' + url;
  }
  return (
    <span>
      {/* Use basic StyledLink component (defined at top of doc) for styling.
      Link remains blue after visiting, subject to change in future. */}
      <StyledLink href={url} target='_blank' rel='noreferrer'>
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
  if (params.value === 'super_admin') return 'Super Admin';
  if (params.value === 'standard_admin') return 'Standard Admin';
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
    ready: ['arrived', 'pending', 'approved'],
  };
  const isValid = statusMap[currStatus].includes(newStatus);
  return isValid;
};

export default function OrderTable() {
  const { user } = useUser();
  const [rowData, setRowData] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const [pendingRow, setPendingRow] = useState(null); // Store the pending row (row we are editing) with its previous status
  // Below states control popups and toasts
  const [showApprovalConfirm, setShowApprovalConfirm] = useState(false);
  const [showDenyConfirm, setShowDenyConfirm] = useState(false);
  const [showReasonForDenial, setShowReasonForDenial] = useState(false);
  const [showItemArrived, setShowItemArrived] = useState(false);
  const [showItemPickUp, setShowItemPickUp] = useState(false);
  const [showItemPending, setShowItemPending] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const exportDropdownRef = useRef(null);

  const CancelOrderRenderer = (params) => {
    // Only show cancel button if the order belongs to the current user
    if (params.data.requestor_id === user.id) {
      return (
        <CancelOrderButton
          onClick={() => {
            setPendingRow({
              params,
              prev: params.data.status,
            });
            setShowCancelConfirm(true);
          }}
        />
      );
    }
    // Return empty div if the order doesn't belong to the user
    return <div></div>;
  };

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
    {
      field: 'button',
      headerName: '',
      cellRenderer: CancelOrderRenderer,
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
    fetchWithRetries(`${process.env.REACT_APP_BACKEND_URL}/orders/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
      credentials: 'include',
    })
      .then((result) => result.json())
      .then((data) => {
        console.log(data);
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
          requestor_id: order.requestor_id,
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

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const handleExportCSV = () => {
    if (gridApi) {
      gridApi.exportDataAsCsv({
        fileName: `orders-${new Date().toISOString().slice(0, 10)}.csv`,
        processCellCallback: (params) => {
          // Handle special formatting for certain columns
          if (params.column.getColId() === 'price') {
            return params.value ? `$${params.value.toLocaleString()}` : '';
          }
          if (params.column.getColId() === 'requestDate') {
            const [year, month, day] = params.value.split('-');
            return `${month}/${day}/${year}`;
          }
          return params.value;
        },
      });
    }
    setShowExportDropdown(false);
  };

  const handleExportExcel = () => {
    if (gridApi) {
      // First get the CSV data using AG Grid's built-in CSV export
      const csvData = gridApi.getDataAsCsv({
        processCellCallback: (params) => {
          // Handle special formatting for certain columns
          if (params.column.getColId() === 'price') {
            return params.value ? `$${params.value.toLocaleString()}` : '';
          }
          if (params.column.getColId() === 'requestDate') {
            const [year, month, day] = params.value.split('-');
            return `${month}/${day}/${year}`;
          }
          return params.value;
        },
      });

      // Convert CSV to worksheet
      const worksheet = XLSX.read(csvData, { type: 'string' }).Sheets.Sheet1;

      // Get the range of the worksheet
      const range = XLSX.utils.decode_range(worksheet['!ref']);

      // Find the requestDate column index
      const headerRow = range.s.r;
      let dateColIndex = -1;
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cell = worksheet[XLSX.utils.encode_cell({ r: headerRow, c: C })];
        if (cell && cell.v === 'Request Date') {
          dateColIndex = C;
          break;
        }
      }

      // Format date cells if we found the date column
      if (dateColIndex !== -1) {
        for (let R = range.s.r + 1; R <= range.e.r; ++R) {
          const cell =
            worksheet[XLSX.utils.encode_cell({ r: R, c: dateColIndex })];
          if (cell && cell.v) {
            try {
              // Get the original date from the row data
              const rowData = gridApi.getRowNode(R - 1)?.data;
              if (rowData && rowData.requestDate) {
                const [year, month, day] = rowData.requestDate.split('-');
                // Keep it as a formatted string
                cell.t = 's';
                cell.v = `${month}/${day}/${year}`;
              }
            } catch (error) {
              console.error('Error formatting date:', error);
              // Keep the original value if there's an error
              cell.t = 's';
            }
          }
        }
      }

      // Create a new workbook and append the worksheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');

      // Generate XLSX file and trigger download
      const timestamp = new Date().toISOString().slice(0, 10);
      XLSX.writeFile(workbook, `orders-${timestamp}.xlsx`);
    }
    setShowExportDropdown(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        exportDropdownRef.current &&
        !exportDropdownRef.current.contains(event.target)
      ) {
        setShowExportDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // The actual component (order table) we are actually returning
  return (
    <div style={{ padding: '20px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          gap: '10px',
          marginBottom: '10px',
        }}
      >
        <NewOrderForm />
        <ExportDropdown ref={exportDropdownRef}>
          <ExportButton
            onClick={() => setShowExportDropdown(!showExportDropdown)}
          >
            Export Data
          </ExportButton>
          <DropdownContent isVisible={showExportDropdown}>
            <DropdownItem onClick={handleExportCSV}>Export as CSV</DropdownItem>
            <DropdownItem onClick={handleExportExcel}>
              Export as Excel
            </DropdownItem>
          </DropdownContent>
        </ExportDropdown>
      </div>

      <div
        className='ag-theme-quartz'
        style={{ height: 'calc(100vh - 300px)' }}
      >
        <AgGridReact
          rowData={rowData}
          defaultColDef={defaultColDef}
          columnDefs={colDefs}
          rowHeight={50}
          autoSizeStrategy={autoSizeStrategy}
          onGridReady={onGridReady}
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
            await fetchWithRetries(
              `${process.env.REACT_APP_BACKEND_URL}/admin/approve/${pendingRow.params.data.orderId}`,
              {
                method: 'PUT',
                headers: {
                  authorization: `Bearer ${localStorage.getItem('authToken')}`,
                  'Content-Type': 'application/json',
                },
                credentials: 'include',
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
            await fetchWithRetries(
              `${process.env.REACT_APP_BACKEND_URL}/admin/deny/${pendingRow.params.data.orderId}`,
              {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
                // pass the denial reason from the popup if available:
                body: JSON.stringify({
                  reason_for_denial: `${reason}`,
                }),
                credentials: 'include',
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
            await fetchWithRetries(
              `${process.env.REACT_APP_BACKEND_URL}/admin/arrived/${pendingRow.params.data.orderId}`,
              {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
                credentials: 'include',
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
            await fetchWithRetries(
              `${process.env.REACT_APP_BACKEND_URL}/admin/ready/${pendingRow.params.data.orderId}`,
              {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
                credentials: 'include',
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
            await fetchWithRetries(
              `${process.env.REACT_APP_BACKEND_URL}/admin/revert/${pendingRow.params.data.orderId}`,
              {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
                credentials: 'include',
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
      {showCancelConfirm && (
        <CancelOrder
          open={true}
          onConfirm={async () => {
            // Fix 2: Add API call to backend
            try {
              await fetchWithRetries(
                `${process.env.REACT_APP_BACKEND_URL}/therapist/order/${pendingRow.params.data.orderId}`,
                {
                  method: 'DELETE',
                  headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem(
                      'authToken'
                    )}`,
                  },
                  credentials: 'include',
                }
              );

              // Fix 3: Update row data with new 'cancel' status
              if (pendingRow) {
                const updatedData = rowData.map((row) =>
                  row.orderId === pendingRow.params.data.orderId
                    ? { ...row, status: 'cancel' }
                    : row
                );
                setRowData(updatedData);
                pendingRow.params.api.refreshCells({
                  rowNodes: [pendingRow.params.node],
                });
              }
            } catch (error) {
              console.error('Error cancelling order:', error);
            }
            setShowCancelConfirm(false);
            setPendingRow(null);
          }}
          onCancel={() => {
            // Revert the status to its previous value
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
            setShowCancelConfirm(false);
            setPendingRow(null);
          }}
        />
      )}
    </div>
  );
}
