const data = [
  { id: 1, name: 'Bayo', age: 13, active: 'Active' },
  { id: 2, name: 'Tunde', age: 12, active: 'Inactive' },
  { id: 3, name: 'Tolu', age: 11, active: 'Inactive' },
  { id: 4, name: 'Lolu', age: 12, active: 'Active' },
];

const selectData = [
  { value: 'Active', label: 'Active' },
  { value: 'Inactive', label: 'Inactive' },
];

const columns = [
  {
    field: 'id',
    header: 'Student ID',
  },
  {
    field: 'name',
    header: 'Student Name',
  },
  {
    field: 'age',
    header: 'Student Age',
  },
  {
    field: 'active',
    header: 'Status',
  },
];

module.exports = { data, columns, selectData };
