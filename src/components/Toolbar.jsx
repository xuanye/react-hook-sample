import React from 'react';

import userAddressModel from './hooks/address';

const Toolbar = () => {
    const address = userAddressModel();

    const handlerChange = event => {
        address.filterChanged(event.target.value);
    };
    const handlerAdd = () => {
        address.addItem();
    };
    return (
        <div className='toolbar'>
            <button onClick={handlerAdd}>Add Address Items</button>
            <button onClick={address.setASCSortType}>A-Z</button>
            <button onClick={address.setDESCSortType}>Z-A</button>
            <input type='text' onChange={handlerChange} />
        </div>
    );
};

export default Toolbar;
