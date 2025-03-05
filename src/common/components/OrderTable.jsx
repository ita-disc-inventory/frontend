import React, { useEffect, useMemo, useState } from 'react';

import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import {
  AllCommunityModule,
  ModuleRegistry,
  provideGlobalGridOptions,
} from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import styled from 'styled-components';

import FilterDropdown from './FilterDropdown';

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
    color: purple;
  }

  &:hover {
    color: darkblue;
  }

  &:actve {
    color: red;
  }
`;

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
      <span style={{ fontWeight: 'bold' }}>{params.value}</span>
      <span
        style={{
          fontSize: '0.8em',
          color: 'gray',
          position: 'absolute',
          top: '15px',
        }}
      >
        Price per unit: ${params.data.ppu} — Qty: {params.data.quantity}
      </span>
    </div>
  );
};

const linkRenderer = (params) => {
  return (
    <span>
      <StyledLink href={params.value} target='_blank' rel='noreferrer'>
        Link
      </StyledLink>
    </span>
  );
};

function currencyFormatter(params) {
  return params.value == null ? '' : '$' + params.value.toLocaleString();
}

function requestDateFormatter(params) {
  const [year, month, day] = params.value.split('-');
  return `${month}/${day}/${year}`;
}

// Use a cellRenderer when we want to:
//    • Render a clickable button or icon that performs an action
//    • Display formatted HTML (such as embedding an image or hyperlink)
//    • Introduce custom interactive components (like dropdowns or custom tooltips)
export default function OrderTable() {
  const [rowData, setRowData] = useState([]);
  // all column names and respective settings
  const [colDefs] = useState([
    {
      headerName: 'Order Name',
      field: 'orderName',
      cellRenderer: orderNameRenderer,
      suppressMovable: true, // 'suppressMovable: true' means the user cannot move columns around
    },
    {
      headerName: 'Status',
      field: 'status',
      suppressMovable: true,
    },
    {
      headerName: 'Priority Level',
      field: 'priorityLevel',
      filter: true,
      suppressMovable: true,
    },
    {
      headerName: 'Description',
      field: 'description',
      suppressMovable: true,
    },
    {
      headerName: 'Price',
      field: 'price',
      valueFormatter: currencyFormatter,
      suppressMovable: true,
    },
    {
      headerName: 'Link',
      field: 'link',
      suppressMovable: true,
      cellRenderer: linkRenderer,
    },
    {
      headerName: 'Tracking Number',
      field: 'trackingNumber',
      suppressMovable: true,
    },
    {
      headerName: 'Request Date',
      field: 'requestDate',
      suppressMovable: true,
      valueFormatter: requestDateFormatter,
    },
    {
      headerName: 'Specialization',
      field: 'specialization',
      suppressMovable: true,
    },
    {
      headerName: 'Program',
      field: 'program',
      suppressMovable: true,
    },
    {
      headerName: 'Therapist Name',
      field: 'therapistName',
      suppressMovable: true,
    },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      resizable: false,
    };
  }, []);
  useEffect(() => {
    fetch('http://localhost:5050/orders/')
      .then((result) => result.json())
      .then((data) => {
        // tranform each order of JSON into flat object for table
        const transformedData = data.map((order) => ({
          orderName: 'testName', // adjust according to your desired field
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
        setRowData(transformedData);
      });
  }, []);
  // makes columns fit to width of the grid, no overflow/scrolling
  const autoSizeStrategy = useMemo(() => {
    return {
      type: 'fitGridWidth',
      defaultMinWidth: 100,
      columnLimits: [
        // can specify minimum widths for certain columns
        {
          colId: 'orderName',
          minWidth: 180,
        },
        {
          colId: 'link',
          minWidth: 50,
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
      {/* Upcoming table */}
      <div className='ag-theme-quartz' style={{ height: '500px' }}>
        <AgGridReact
          rowData={rowData}
          defaultColDef={defaultColDef}
          columnDefs={colDefs}
          rowHeight={50}
          autoSizeStrategy={autoSizeStrategy}
        />
      </div>
    </div>
  );
}
