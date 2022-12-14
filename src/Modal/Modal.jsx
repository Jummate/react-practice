import {React} from "react";
import ReactDOM  from "react-dom";
import Button from "../Button/Button";
// import Input from "../Input/Input";
import './Modal.css';

let portalRoot = document.getElementById('modal-root');
if (!portalRoot) {
  portalRoot = document.createElement('div');
  portalRoot.setAttribute('id', 'modal-root');
  document.body.appendChild(portalRoot);
}

const Modal = ({buttonEvent:[onClose, action], title, dialog=false, children}) => {
   

    return ReactDOM.createPortal(
        <>
            <div className="modal-overlay"></div>
            <div className="modal" data-testid="modal-test">
                <div className="modal-header">
                    <h3>{title}</h3>
                    <h2 className="extra-close" onClick={onClose}>&times;</h2>
                </div>
                <hr />
                <div className="modal-body">
                   {children}
                </div>
                {!dialog && <div className="modal-footer">
                <Button type='button' onClick={onClose} buttonSize='btn--small' buttonStyle='btn--danger--solid'>Close</Button>
                <Button type='button' onClick={action} buttonSize='btn--small' buttonStyle='btn--success--solid'>Save</Button>
                </div>}
            </div>
            
        
        </>,
        portalRoot
    )
}
export default Modal;