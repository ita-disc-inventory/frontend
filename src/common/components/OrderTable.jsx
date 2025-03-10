import React, { useEffect, useMemo, useState } from 'react';



import { MagnifyingGlassIcon, OpenInNewWindowIcon } from '@radix-ui/react-icons';
import { AllCommunityModule, ModuleRegistry, provideGlobalGridOptions } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import styled from 'styled-components';



import ItemArrivedConfirm from 'common/components/admin_modals/ItemArrivedConfirm';
import ItemReadyConfirm from 'common/components/admin_modals/ItemReadyConfirm';
import NewAdminConfirm from 'common/components/admin_modals/NewAdminConfirm';
import NewMonthlyBudget from 'common/components/admin_modals/NewMonthlyBudget';
import OrderApprovalConfirm from 'common/components/admin_modals/OrderApprovalConfirm';
import OrderTrackingNumber from 'common/components/admin_modals/OrderTrackingNumber';
import ReasonForDenial from 'common/components/admin_modals/ReasonForDenial';



import FilterDropdown from './FilterDropdown';
import StatusDropdown from './StatusDropdown';
import FormPopup from './templates/FormPopup';





// Mark all grids as using legacy themes
provideGlobalGridOptions({ theme: 'legacy' });

ModuleRegistry.registerModules([AllCommunityModule]);

const SearchContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 24rem;
  height: 40px;
`;

const SearchIcon = styled.div`
  font-family: inherit;
  border-radius: 100%;
  height: 40px;
  width: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  color: white;
  background-color: inherit;
  transition: all 0.3s ease;

  svg {
    height: 20px; // Set the height of the SVG
    width: 20px; // Set the width of the SVG
  }

  svg > path {
    fill: gray;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  padding: 10px 10px 10px 40px; /* extra left padding for the icon */
  border: 1px solid #ccc;
  border-radius: 4px;
`;

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
    console.log(props.data);
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
      <span style={{ fontWeight: 'bold' }}>{params.value}</span>
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
const statusRenderer = (params) => {
  // need to implement logic for if status is being changed to 'Deny' or 'Pick up' or 'Arrived', as
  // these should trigger a pop-up
  return (
    <StatusDropdown
      value={params.value}
      onStatusChange={(newValue) => {
        params.node.setDataValue('status', newValue);
      }}
    />
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
      <div style={{ position: 'relative' }}>
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
            left: '110px',
            pointerEvents: 'none',
          }}
        >
          <OpenInNewWindowIcon style={{ width: '13px', height: '13px' }} />
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
  const updateTrackingNumber = (orderId, newTrackingNumber) => {
    setRowData((prevRowData) =>
      prevRowData.map((row) =>
        row.orderId === orderId
          ? { ...row, trackingNumber: newTrackingNumber }
          : row
      )
    );
  };

  // all column names and respective settings
  const [colDefs] = useState([
    {
      headerName: 'Order Name',
      field: 'orderName',
      cellRenderer: orderNameRenderer, // see comments before OrderTable() definition
      filter: true, // 'filter: true' activates the filter option at top of specified column (3 dashed horizontal lines)
      cellStyle: { justifyContent: 'flex-start' },
    },
    {
      headerName: 'Status',
      field: 'status',
      cellRenderer: statusRenderer,
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
      width: 110,
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
        // Specify your conditions here
        return params.data.status == 'approved';
      },
      cellEditor: EditableCell,
      cellEditorParams: {
        updateTrackingNumber,
      }
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
    fetch('http://localhost:5050/orders/')
      .then((result) => result.json())
      .then((data) => {
        // tranform each order of JSON into flat object for table

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
          specialization: 'specialization',
          program: order.programs.program_title,
          therapistName: `${order.users.firstname} ${order.users.lastname}`,
          ppu: order.items.price_per_unit,
          quantity: order.quantity,
        }));
        console.log(transformedData);
        setRowData(transformedData);
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          marginBottom: '32px',
          marginTop: '24px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '20px',
          }}
        >
          {/* Search Input for searching an order by name */}
          <SearchContainer>
            <SearchIcon>
              <MagnifyingGlassIcon />
            </SearchIcon>
            <Input type='search' placeholder='Search an order...' />
          </SearchContainer>
          {/* Dropdown for selecting Filters */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <FilterDropdown />
          </div>
        </div>
      </div>
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
      <ItemArrivedConfirm />
      <ItemReadyConfirm />
      <NewAdminConfirm />
      <NewMonthlyBudget />
      <OrderApprovalConfirm />
      <OrderTrackingNumber />
      <ReasonForDenial />
    </div>
  );
}