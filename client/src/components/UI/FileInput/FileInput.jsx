import React, {useRef} from 'react';
import classes from './FileInput.module.css'

const FileInput = ({file, setFile, title, ...props}) => {

    const fileUploadRef = useRef()

    const onFileUpload = (e) => {
        if (e.target.files[0]){
            setFile(e.target.files[0])
        }
    }
    return (
        <div className={classes.fileInput}>
            <div className={classes.title}>{title}</div>
            <input
                ref={fileUploadRef}
                className={classes.fileUpload}
                type="file"
                onChange={onFileUpload}
                {...props}
            />
            <button
                onClick={() => fileUploadRef.current.click()}
            >
                Выбрать файл
            </button>
            <span>{file.name}</span>

        </div>
    );
};

export default FileInput;