import React from 'react';

import userAddressModel from './hooks/address';
import AddressItem from './AddressItem';

const AddressGrid = () => {
    const address = userAddressModel();

    const handleEdit = index => {
        address.editAddressItem(index);
    };
    const handleRemove = index => {
        address.removeAddressItem(index);
    };
    const handleSave = (index, data) => {
        address.saveAddressItem(index, data);
    };
    const handleCancel = (_index, data) => {
        address.cancelSaveItem(data);
    };

    const itemList = address.addressList.map((item, i) => {
        let show = true;
        if (address.filterText) {
            show =
                item.name.indexOf(address.filterText) >= 0 ||
                item.email.indexOf(address.filterText) >= 0 ||
                item.address.indexOf(address.filterText) >= 0;
        }

        if (show) {
            return (
                <AddressItem
                    key={item.name}
                    data={item}
                    highLightText={address.filterText}
                    onEdit={handleEdit.bind(this, i)}
                    onRemove={handleRemove.bind(this, i)}
                    onSave={handleSave.bind(this, i)}
                    onCancel={handleCancel.bind(this, i)}></AddressItem>
            );
        } else {
            return null;
        }
    });

    return <ul>{itemList}</ul>;
};

export default AddressGrid;
