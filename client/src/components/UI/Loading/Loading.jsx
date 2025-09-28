import React from 'react';
import cl from './loading.module.css'

const Loading = ({isLoading}) => {
    return (
        <div className={isLoading ? `${cl.loading} ${cl.active}` : cl.loading}>
            <div className={cl.loadingContent}>
                <div className={cl.loader}></div>
                <div>Загрузка...</div>
            </div>
        </div>
    );
};

export default Loading;