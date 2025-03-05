export const Filters = [
  {
    label: 'Order Priority',
    items: [
      { label: 'Normal', value: 'priority-normal' },
      { label: '< 2 weeks', value: 'priority-2-weeks' },
    ],
  },
  { separator: true }, // separator for UI visibility
  {
    label: 'Price',
    items: [
      { label: 'Low to High', value: 'price-low' },
      { label: 'High to Low', value: 'price-high' },
    ],
  },
  { separator: true },
  {
    label: 'Date',
    items: [
      { label: 'Most Recent', value: 'date-recent' },
      { label: 'Oldest', value: 'date-oldest' },
    ],
  },
];
