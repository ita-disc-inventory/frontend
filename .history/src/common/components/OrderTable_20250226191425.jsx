import React from 'react';

import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

export default function OrderTable() {
  const products = [
    {
      id: 1,
      name: 'Apple Watch',
      price: '$350',
      category: 'Accessories',
      quantity: 7,
    },
    {
      id: 2,
      name: 'Fitness Watch',
      price: '$100',
      category: 'Fitness',
      quantity: 23,
    },
    // Add more products as needed
  ];
  return (
    <div className='card'>
      <DataTable value={products} responsiveLayout='scroll'>
        <Column field='name' header='Name' />
        <Column field='price' header='Price' />
        <Column field='category' header='Category' />
        <Column field='quantity' header='Quantity' />
      </DataTable>
    </div>
  );
}
