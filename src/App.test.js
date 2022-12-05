import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('when the page loads', () => {
  it('should render "add new student" button', () => {
    render(<App />);
    const buttonElement = screen.getByText(/add new student/i);
    expect(buttonElement).toBeInTheDocument();
  });

  it('should render a table showing students and their details', () => {
    render(<App />);
    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();
  });

  it('should render delete button', () => {
    render(<App />);
    const deleteBtn = screen.getAllByRole('button', { name: 'Del' });
    expect(deleteBtn).toHaveLength(4);
  });
});

// describe('when the delete button is clicked', () => {
//   it('should reveal a dialogue confirmation box', () => {
//     // console.log(render(<Modal title='Delete Item' />));
//     // const x = document.body.querySelector('#modal-root');
//     console.log(x);
//     // const deleteBtn = x.getAllByRole('button', { name: 'Del' });
//     // const deleteModal = screen.getByText(/delete item/i);
//     // console.log(deleteModal);
//     // fireEvent.click(deleteBtn);
//     expect(true).toBeTruthy();
//   });
// });
