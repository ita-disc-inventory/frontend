import React, { useEffect, useState } from 'react';

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Tag } from 'primereact/tag';

export default function InventoryTable() {
  const [items, setItems] = useState([]);

  // Mock data – in real usage, you might fetch from an API
  useEffect(() => {
    // Example data closely matching your screenshot
    const mockData = [
      {
        orderName: 'Drum Pads',
        reasonForBuying: 'Description',
        price: 50,
        itemLink: 'https://example.com/drum-pads',
        status: 'Approved',
        priorityLevel: '< 2 weeks',
        trackingNumber: 'xxx-xxx-xxx-xxxx',
        requestDate: '10/20/2025',
        specialization: 'Music',
        program: 'Private Therapy',
        therapistName: 'John Doe',
      },
      {
        orderName: 'Crayola Markers variety pack (24 pack)',
        reasonForBuying: 'Description',
        price: 10,
        itemLink: 'https://example.com/crayola-markers',
        status: 'Denied',
        priorityLevel: '< 2 weeks',
        trackingNumber: 'xxx-xxx-xxx-xxxx',
        requestDate: '10/20/2025',
        specialization: 'Art',
        program: 'CXC',
        therapistName: 'Jeffrey Lee',
      },
      {
        orderName: 'Guitar',
        reasonForBuying: 'Description',
        price: 90,
        itemLink: 'https://example.com/guitar',
        status: 'Denied',
        priorityLevel: 'Regular',
        trackingNumber: 'xxx-xxx-xxx-xxxx',
        requestDate: '01/10/2025',
        specialization: 'Music',
        program: 'Community Partner',
        therapistName: 'Jane Doe',
      },
      {
        orderName: 'Piano',
        reasonForBuying: 'Hat', // Not sure if "Hat" was a placeholder in your screenshot
        price: 140,
        itemLink: 'https://example.com/piano',
        status: 'Purchased',
        priorityLevel: '< 2 weeks',
        trackingNumber: 'xxx-xxx-xxx-xxxx',
        requestDate: '02/15/2025',
        specialization: 'Art',
        program: 'CXC',
        therapistName: 'Carl X CK',
      },
      {
        orderName: 'Diapers',
        reasonForBuying: 'Description',
        price: 15,
        itemLink: 'https://example.com/diapers',
        status: 'Purchased',
        priorityLevel: 'Regular',
        trackingNumber: 'xxx-xxx-xxx-xxxx',
        requestDate: '03/01/2025',
        specialization: 'Music',
        program: 'Private Therapy',
        therapistName: 'Branden Grena',
      },
      {
        orderName: 'Pencils',
        reasonForBuying: 'Description',
        price: 15,
        itemLink: 'https://example.com/pencils',
        status: 'Denied',
        priorityLevel: 'Regular',
        trackingNumber: 'xxx-xxx-xxx-xxxx',
        requestDate: '01/01/2025',
        specialization: 'Art',
        program: 'CXC',
        therapistName: 'Billie Eilish',
      },
      {
        orderName: 'Foam Slime',
        reasonForBuying: 'Description',
        price: 45,
        itemLink: 'https://example.com/foam-slime',
        status: 'Denied',
        priorityLevel: 'Regular',
        trackingNumber: 'xxx-xxx-xxx-xxxx',
        requestDate: '01/02/2025',
        specialization: 'Music',
        program: 'Community Partner',
        therapistName: 'John Doe',
      },
      {
        orderName: 'Clown-themed Ballet Shoes',
        reasonForBuying: 'Description',
        price: 1000,
        itemLink: 'https://example.com/clown-ballet-shoes',
        status: 'Purchased',
        priorityLevel: '< 2 weeks',
        trackingNumber: 'xxx-xxx-xxx-xxxx',
        requestDate: '09/12/2025',
        specialization: 'Art',
        program: 'CXC',
        therapistName: 'Jeffrey Lee',
      },
      {
        orderName: 'Macbook Pro',
        reasonForBuying: 'Description',
        price: 1500,
        itemLink: 'https://example.com/macbook-pro',
        status: 'Approved',
        priorityLevel: 'Ready to Go',
        trackingNumber: 'xxx-xxx-xxx-xxxx',
        requestDate: '01/02/2025',
        specialization: 'Music',
        program: 'Private Therapy',
        therapistName: 'Billie Eilish',
      },
    ];
    setItems(mockData);
  }, []);

  // Format currency for Price column
  const formatCurrency = (value) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  // Body templates
  const priceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.price);
  };

  const linkBodyTemplate = (rowData) => {
    return (
      <a href={rowData.itemLink} target='_blank' rel='noreferrer'>
        Link
      </a>
    );
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.status}
        severity={getStatusSeverity(rowData.status)}
      />
    );
  };

  // Customize tag colors based on status
  const getStatusSeverity = (status) => {
    switch (status) {
      case 'Approved':
      case 'Ready to Go':
        return 'success';
      case 'Denied':
        return 'danger';
      case 'Purchased':
        return 'info';
      default:
        return null;
    }
  };

  // Priority tag (like "< 2 weeks" or "Ready to Go")
  const priorityBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.priorityLevel}
        severity={getPrioritySeverity(rowData.priorityLevel)}
      />
    );
  };

  // Customize tag colors based on priority
  const getPrioritySeverity = (priority) => {
    if (priority === '< 2 weeks') return 'warning';
    if (priority === 'Ready to Go') return 'success';
    // default or 'Regular'
    return null;
  };

  const header = (
    <div className='flex flex-wrap align-items-center justify-content-between gap-2'>
      <span className='text-xl text-900 font-bold'>Inventory Items</span>
      <Button icon='pi pi-refresh' rounded raised />
    </div>
  );

  const footer = `In total there are ${items ? items.length : 0} items.`;

  return (
    <div className='card'>
      <DataTable
        value={items}
        header={header}
        footer={footer}
        tableStyle={{ minWidth: '60rem' }}
        responsiveLayout='scroll'
      >
        <Column
          field='orderName'
          header='Order Name'
          style={{ width: '15rem' }}
        ></Column>
        <Column
          field='reasonForBuying'
          header='Reason for Buying'
          style={{ width: '10rem' }}
        ></Column>
        <Column
          field='price'
          header='Price'
          body={priceBodyTemplate}
          style={{ width: '8rem' }}
        ></Column>
        <Column
          header='Item Link'
          body={linkBodyTemplate}
          style={{ width: '8rem' }}
        ></Column>
        <Column
          header='Status'
          body={statusBodyTemplate}
          style={{ width: '8rem' }}
        ></Column>
        <Column
          header='Priority Level'
          body={priorityBodyTemplate}
          style={{ width: '10rem' }}
        ></Column>
        <Column
          field='trackingNumber'
          header='Tracking Number'
          style={{ width: '12rem' }}
        ></Column>
        <Column
          field='requestDate'
          header='Request Date'
          style={{ width: '10rem' }}
        ></Column>
        <Column
          field='specialization'
          header='Specialization'
          style={{ width: '10rem' }}
        ></Column>
        <Column
          field='program'
          header='Program'
          style={{ width: '10rem' }}
        ></Column>
        <Column
          field='therapistName'
          header='Therapist Name'
          style={{ width: '12rem' }}
        ></Column>
      </DataTable>
    </div>
  );
}
