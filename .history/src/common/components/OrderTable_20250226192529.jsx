import React, { useEffect, useState } from 'react';

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';

//import { ProductService } from './service/ProductService';

export default function TemplateDemo() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log('hi');
  }, []);

  const formatCurrency = (value) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  const imageBodyTemplate = (product) => {
    return (
      <img
        src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`}
        alt={product.image}
        className='w-6rem shadow-2 border-round'
      />
    );
  };

  const priceBodyTemplate = (product) => {
    return formatCurrency(product.price);
  };

  const ratingBodyTemplate = (product) => {
    return <Rating value={product.rating} readOnly cancel={false} />;
  };

  const statusBodyTemplate = (product) => {
    return (
      <Tag
        value={product.inventoryStatus}
        severity={getSeverity(product)}
      ></Tag>
    );
  };

  const getSeverity = (product) => {
    switch (product.inventoryStatus) {
      case 'INSTOCK':
        return 'success';

      case 'LOWSTOCK':
        return 'warning';

      case 'OUTOFSTOCK':
        return 'danger';

      default:
        return null;
    }
  };

  const header = (
    <div className='flex flex-wrap align-items-center justify-content-between gap-2'>
      <span className='text-xl text-900 font-bold'>Products</span>
      <Button icon='pi pi-refresh' rounded raised />
    </div>
  );
  const footer = `In total there are ${products ? products.length : 0} products.`;
  console.log(products);
  return (
    <div className='card'>
      <DataTable
        value={products}
        header={header}
        footer={footer}
        tableStyle={{ minWidth: '60rem' }}
      >
        <Column field='name' header='Name'></Column>
        <Column header='Image' body={imageBodyTemplate}></Column>
        <Column field='price' header='Price' body={priceBodyTemplate}></Column>
        <Column field='category' header='Category'></Column>
        <Column
          field='rating'
          header='Reviews'
          body={ratingBodyTemplate}
        ></Column>
        <Column header='Status' body={statusBodyTemplate}></Column>
      </DataTable>
    </div>
  );
}
