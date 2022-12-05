import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Modal from './Modal';

describe('modal rendering', () => {
  it('renders two buttons', () => {
    const onClose = jest.fn();
    const container = render(
      <Modal buttonEvent={[onClose]}>
        <h1>You</h1>
      </Modal>
    );
    // console.log(container);
    const buttonElement = container.getByRole('button', { name: 'Close' });
    fireEvent.click(buttonElement);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
