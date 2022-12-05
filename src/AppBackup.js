import './App.css';
import React, { useState, useEffect, useReducer } from 'react';
import Button from './Button/Button';
import Table from './Table/Table';
import Modal from './Modal/Modal';
import Input from './Input/Input';
import Select from './Select/Select';
import { data, columns } from './data';
// import Select from 'react-select';

const defaulState = {
  isOpen: false,
  isOpenEdit: false,
  isOpenDelete: false,
  info: { name: '', age: '', active: '' },
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FORM_CONTENT':
      return { ...state, [action.payload.key]: [action.payload.value] };
  }
};
function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [info, setInfo] = useState({ name: '', age: '', active: '' });

  const [state, dispatch] = useReducer(reducer, data);

  const [allData, setAllData] = useState(data);

  const [myVal, setMyVal] = useState({});

  useEffect(() => {
    console.log('You');
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  const handleChangeEdit = (e) => {
    const { name, value } = e.target;
    setMyVal({ ...myVal, [name]: value });
  };

  const addNewItem = () => {
    setIsOpen(false);
    let newLength = allData.length;
    const newItem = { ...info, id: ++newLength };
    setAllData((prev) => [...prev, newItem]);
    setInfo({ name: '', age: '', active: '' });
  };

  const onEditField = (idOfItemToEdit) => {
    setIsOpenEdit(false);
    setAllData((prev) => {
      const itemToEdit = prev.find((item) => item.id === idOfItemToEdit);
      const newItem = {
        ...itemToEdit,
        name: myVal.name,
        age: myVal.age,
        active: myVal.active,
      };
      return [...prev.filter((item) => item.id !== idOfItemToEdit), newItem];
    });
  };

  const onDeleteField = (idOfItemToDelete) => {
    console.log('delete');
    setIsOpenDelete(false);
    setAllData((prev) => {
      return [...prev.filter((item) => item.id !== idOfItemToDelete)];
    });
  };

  const handleDelete = (e) => {
    setIsOpenDelete(true);
    setMyVal(JSON.parse(e.target.closest('tr').dataset.data));
  };

  const handleEdit = (e) => {
    setIsOpenEdit(true);
    setMyVal(JSON.parse(e.target.closest('tr').dataset.data));
  };

  return (
    <div className='main-container'>
      <h1>Student's Record</h1>
      <p>This is the record of all our students</p>
      <Button
        type='button'
        buttonSize='btn--medium'
        buttonStyle='btn--primary--solid'
        onClick={() => setIsOpen(true)}
      >
        Add New Student
      </Button>
      {isOpen && (
        <Modal
          title='Add Item'
          buttonEvent={[() => setIsOpen(false), addNewItem]}
        >
          <form action=''>
            <Input
              placeholder='Enter full name'
              label='Full Name'
              name='name'
              value={info.name}
              onChange={handleChange}
            />
            <Input
              type='number'
              placeholder='Enter Age'
              name='age'
              label='Age'
              value={info.age}
              onChange={handleChange}
            />
            <Select
              name='active'
              id='active'
              label='Active Status'
              value={info.active}
              optionItem={['Active', 'Inactive']}
              placeholder='Select an option'
              onChange={handleChange}
            />
          </form>
        </Modal>
      )}

      {isOpenEdit && (
        <Modal
          title='Edit Item'
          buttonEvent={[
            () => setIsOpenEdit(false),
            () => onEditField(myVal.id),
          ]}
        >
          <form action=''>
            <Input
              placeholder=''
              name='name'
              label='Full Name'
              value={myVal.name}
              onChange={handleChangeEdit}
            />
            <Input
              type='number'
              placeholder=''
              name='age'
              label='Age'
              value={myVal.age}
              onChange={handleChangeEdit}
            />
            <Select
              name='active'
              id='active'
              label='Active Status'
              value={myVal.active}
              optionItem={['Active', 'Inactive']}
              placeholder='Select an option'
              onChange={handleChangeEdit}
            />
          </form>
        </Modal>
      )}

      {isOpenDelete && (
        <Modal
          title='Delete Item'
          buttonEvent={[() => setIsOpenDelete(false)]}
          dialog={true}
        >
          <div className='dialog-box'>
            <h3>Are you sure you want to delete this item?</h3>
            <div>
              <Button
                type='button'
                buttonSize='btn--medium'
                buttonStyle='btn--primary--solid'
                onClick={() => onDeleteField(myVal.id)}
              >
                OK
              </Button>

              <Button
                type='button'
                buttonSize='btn--medium'
                buttonStyle='btn--danger--outline'
                onClick={() => setIsOpenDelete(false)}
              >
                CANCEL
              </Button>
            </div>
          </div>
        </Modal>
      )}

      <Table
        data={allData}
        columns={columns}
        buttonEvent={[handleEdit, handleDelete]}
      />
    </div>
  );
}

export default App;
