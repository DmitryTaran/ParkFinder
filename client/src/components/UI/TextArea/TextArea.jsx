import React from 'react';
import classes from './textarea.module.css'

const TextArea = ({...props}) => {
    return (
        <div className={classes.textAreaBlock}>
            <textarea
                className={classes.textArea}
                {...props}
            />
        </div>

    );
};

export default TextArea;