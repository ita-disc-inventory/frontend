import React, { useEffect, useMemo, useState } from 'react';

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

import CancelOrderDropdown from './CancelOrderDropdown';
import FormPopup from './templates/FormPopup';
import CancelOrder from './therapist_modals/CancelOrder';

// Mark all grids as using legacy themes
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

// Responsible for formatting the 'Status' column
// See StatusDropdown.jsx to see how status to color relationships work
// const statusRenderer = (params) => {
//   // need to implement logic for if status is being changed to 'Deny' or 'Pick up' or 'Arrived', as
//   // these should trigger a pop-up
//   return (
//     <StatusDropdown
//       value={params.value}
//       onStatusChange={(newValue) => {
//         params.node.setDataValue('status', newValue);
//       }}
//     />
//   );
// };

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

// Responsible for formatting the 'Tracking Number' column
// Tracking number should only show up if the status of respective row is NOT 'pending', or 'denied'

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
// params.value is type JSON with multiple specialties, so just returning first one
// in JSON for now --> figure out solution later? display multiple?
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

// Use a cellRenderer when we want to:
//    • Render a clickable button or icon that performs an action
//    • Display formatted HTML (such as embedding an image or hyperlink)
//    • Introduce custom interactive components (like dropdowns or custom tooltips)
export default function OrderTable() {
  const [rowData, setRowData] = useState([]);
  // Store the pending row with its previous status
  const [pendingRow, setPendingRow] = useState(null);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  // const [showItemArrived, setShowItemArrived] = useState(false); // if true, then 'Item Arrived?' Popup
  // const [showItemPickUp, setShowItemPickUp] = useState(false); // if true, then 'Item Ready for Pickup?' Popup
  // const [showNewBudget, setShowNewBudget] = useState(false); // if true, then 'Enter new budget' Popup
  // New separate status cell renderer function:
  const statusCellRenderer = (params) => {
    const handleStatusChange = (newValue) => {
      if (newValue === 'cancel') {
        // Save reference to row along with the previous status.
        setPendingRow({ params, prev: params.value });
        setShowCancelConfirm(true);
      } else {
        params.node.setDataValue('status', newValue);
      }
    };
    return (
      <CancelOrderDropdown
        value={params.value}
        onStatusChange={handleStatusChange}
      />
    );
  };

  // all column names and respective settings
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
      editable: false,
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

        // transform each order of JSON into flat object for table
        const transformedData = data.map((order) => ({
          orderId: order.order_id,
          orderName: order.item_name,
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
        }));
        setRowData(transformedData);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
        setRowData([]);
      });
  }, []);
  // makes columns fit to width of the grid, no overflow/scrolling
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
  // the component we are actually returning
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
      {showCancelConfirm && (
        <CancelOrder
          open={true}
          onConfirm={() => {
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
