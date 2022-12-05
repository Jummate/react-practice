import './App.css';
import React, { useEffect, useReducer } from 'react';
import Button from './Button/Button';
import Table from './Table/Table';
import Modal from './Modal/Modal';
import Input from './Input/Input';
import Select from './Select/Select';
import { data, columns } from './data';
// import Select from 'react-select';

// let portalRoot = document.getElementById('modal-root');
// if (!portalRoot) {
//   portalRoot = document.createElement('div');
//   portalRoot.setAttribute('id', 'modal-root');
//   document.body.appendChild(portalRoot);
// }
const defaulState = {
  isOpen: false,
  isOpenEdit: false,
  isOpenDelete: false,
  info: { name: '', age: '', active: '' },
  allData: data,
  myVal: {},
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FORM_CONTENT':
      const newUpdate = {
        ...state.info,
        [action.payload.key]: [action.payload.value],
      };
      return { ...state, info: newUpdate };
    case 'UPDATE_FORM_CONTENT_EDIT':
      const newUpdate2 = {
        ...state.myVal,
        [action.payload.key]: [action.payload.value],
      };
      return { ...state, myVal: newUpdate2 };

    case 'ADD_NEW_ITEM':
      const newUpdate3 = [...state.allData, action.payload];
      return {
        ...state,
        allData: newUpdate3,
        isOpen: false,
        info: { name: '', age: '', active: '' },
      };

    case 'OPEN_MODAL':
      return { ...state, isOpen: true };

    case 'CLOSE_MODAL':
      return { ...state, isOpen: false };

    case 'OPEN_MODAL_EDIT':
      return { ...state, isOpenEdit: true };

    case 'CLOSE_MODAL_EDIT':
      return { ...state, isOpenEdit: false };

    case 'OPEN_MODAL_DELETE':
      return { ...state, isOpenDelete: true };

    case 'CLOSE_MODAL_DELETE':
      return { ...state, isOpenDelete: false };

    case 'SAVE_DATA_TO_EDIT':
      return {
        ...state,
        myVal: action.payload,
        isOpenEdit: true,
      };

    case 'SAVE_DATA_TO_DELETE':
      return {
        ...state,
        myVal: action.payload,
        isOpenDelete: true,
      };

    case 'ON_DELETE':
      const newData = state.allData.filter(
        (item) => item.id !== action.payload
      );

      return {
        ...state,
        allData: newData,
        isOpenDelete: false,
      };

    case 'ON_EDIT':
      const itemToEdit = state.allData.find(
        (item) => item.id === action.payload
      );
      const newItem = {
        ...itemToEdit,
        name: state.myVal.name,
        age: state.myVal.age,
        active: state.myVal.active,
      };

      const newData2 = [
        ...state.allData.filter((item) => item.id !== action.payload),
        newItem,
      ];

      return {
        ...state,
        allData: newData2,
        isOpenEdit: false,
      };

    case 'RESET_FIELD':
      return { ...state, myVal: { name: '', age: '', status: '' } };
    default:
      throw new Error('No matching action type');
  }
};
function App() {
  // const [isOpen, setIsOpen] = useState(false);
  // const [isOpenEdit, setIsOpenEdit] = useState(false);
  // const [isOpenDelete, setIsOpenDelete] = useState(false);
  // const [info, setInfo] = useState({ name: '', age: '', active: '' });

  const [state, dispatch] = useReducer(reducer, defaulState);

  // const [allData, setAllData] = useState(data);

  // const [myVal, setMyVal] = useState({});

  useEffect(() => {
    console.log('You');
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'UPDATE_FORM_CONTENT', payload: { key: name, value } });
    // setInfo({ ...info, [name]: value });
  };

  const handleChangeEdit = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: 'UPDATE_FORM_CONTENT_EDIT',
      payload: { key: name, value },
    });
    // setMyVal({ ...myVal, [name]: value });
  };

  const addNewItem = () => {
    // setIsOpen(false);
    let newLength = state.allData.length;
    const newItem = { ...state.info, id: ++newLength };
    console.log(state.allData);
    console.log('Helloooooo');
    // setAllData((prev) => [...prev, newItem]);
    // dispatch({
    //   type: 'CLOSE_MODAL',
    //   payload: false,
    // });
    dispatch({
      type: 'ADD_NEW_ITEM',
      payload: newItem,
    });
    // dispatch({
    //   type: 'RESET_FIELD',
    // });
    // setInfo({ name: '', age: '', active: '' });
  };

  const onEditField = (idOfItemToEdit) => {
    // setIsOpenEdit(false);
    // setAllData((prev) => {
    //   const itemToEdit = prev.find((item) => item.id === idOfItemToEdit);
    //   const newItem = {
    //     ...itemToEdit,
    //     name: state.myVal.name,
    //     age: state.myVal.age,
    //     active: state.myVal.active,
    //   };
    //   return [...prev.filter((item) => item.id !== idOfItemToEdit), newItem];
    // });

    dispatch({
      type: 'ON_EDIT',
      payload: idOfItemToEdit,
    });
  };

  const onDeleteField = (idOfItemToDelete) => {
    // setIsOpenDelete(false);
    // setAllData((prev) => {
    //   return [...prev.filter((item) => item.id !== idOfItemToDelete)];
    // });
    dispatch({
      type: 'ON_DELETE',
      payload: idOfItemToDelete,
    });
  };

  const handleDelete = (e) => {
    // setIsOpenDelete(true);
    // setMyVal(JSON.parse(e.target.closest('tr').dataset.data));
    dispatch({
      type: 'SAVE_DATA_TO_DELETE',
      payload: JSON.parse(e.target.closest('tr').dataset.data),
    });
  };

  const handleEdit = (e) => {
    // setIsOpenEdit(true);
    dispatch({
      type: 'SAVE_DATA_TO_EDIT',
      payload: JSON.parse(e.target.closest('tr').dataset.data),
    });
  };

  return (
    <div className='main-container'>
      <h1>Student's Record</h1>
      <p>This is the record of all our students</p>
      <Button
        type='button'
        buttonSize='btn--medium'
        buttonStyle='btn--primary--solid'
        onClick={() => dispatch({ type: 'OPEN_MODAL' })}
      >
        Add New Student
      </Button>
      {state.isOpen && (
        <Modal
          title='Add Item'
          buttonEvent={[() => dispatch({ type: 'CLOSE_MODAL' }), addNewItem]}
        >
          <form action=''>
            <Input
              placeholder='Enter full name'
              label='Full Name'
              name='name'
              value={state.info.name}
              onChange={handleChange}
            />
            <Input
              type='number'
              placeholder='Enter Age'
              name='age'
              label='Age'
              value={state.info.age}
              onChange={handleChange}
            />
            <Select
              name='active'
              id='active'
              label='Active Status'
              value={state.info.active}
              optionItem={['Active', 'Inactive']}
              placeholder='Select an option'
              onChange={handleChange}
            />
          </form>
        </Modal>
      )}

      {state.isOpenEdit && (
        <Modal
          title='Edit Item'
          buttonEvent={[
            () => dispatch({ type: 'CLOSE_MODAL_EDIT' }),
            () => onEditField(state.myVal.id),
          ]}
        >
          <form action=''>
            <Input
              placeholder=''
              name='name'
              label='Full Name'
              value={state.myVal.name}
              onChange={handleChangeEdit}
            />
            <Input
              type='number'
              placeholder=''
              name='age'
              label='Age'
              value={state.myVal.age}
              onChange={handleChangeEdit}
            />
            <Select
              name='active'
              id='active'
              label='Active Status'
              value={state.myVal.active}
              optionItem={['Active', 'Inactive']}
              placeholder='Select an option'
              onChange={handleChangeEdit}
            />
          </form>
        </Modal>
      )}

      {state.isOpenDelete && (
        <Modal
          title='Delete Item'
          buttonEvent={[() => dispatch({ type: 'CLOSE_MODAL_DELETE' })]}
          dialog={true}
        >
          <div className='dialog-box'>
            <h3>Are you sure you want to delete this item?</h3>
            <div>
              <Button
                type='button'
                buttonSize='btn--medium'
                buttonStyle='btn--primary--solid'
                onClick={() => onDeleteField(state.myVal.id)}
              >
                OK
              </Button>

              <Button
                type='button'
                buttonSize='btn--medium'
                buttonStyle='btn--danger--outline'
                onClick={() => dispatch({ type: 'CLOSE_MODAL_DELETE' })}
              >
                CANCEL
              </Button>
            </div>
          </div>
        </Modal>
      )}

      <Table
        data={state.allData}
        columns={columns}
        buttonEvent={[handleEdit, handleDelete]}
      />
    </div>
  );
}

export default App;
