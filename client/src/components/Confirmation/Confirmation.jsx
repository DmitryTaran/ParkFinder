import React from 'react';
import cl from './confirmation.module.css'

const Confirmation = ({text, positiveAction, negativeAction}) => {
    return (
        <div className={cl.confirmation}>
            {text}
            <div className={cl.buttons}>
                <button onClick={positiveAction} className={cl.button}>
                    Удалить
                </button>
                <button onClick={negativeAction} className={cl.button}>
                    Отмена
                </button>
            </div>
        </div>
    );
};

export default Confirmation;