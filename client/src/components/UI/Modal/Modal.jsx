import React from 'react';
import classes from './modal.module.css'

const Modal = ({active, setActive, children}) => {

    return (
        <div
            className={active ? `${classes.modal} ${classes.modalActive}` : classes.modal}
            onClick={() => setActive(false)}
        >
            <div className={classes.modalContent} onClick={event => event.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;