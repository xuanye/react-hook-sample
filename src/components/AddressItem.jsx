import React, { useState } from 'react';

const AddressItem = ({ data, highLightText, onEdit, onRemove, onSave, onCancel }) => {
    let [currentAddress, setCurrentAddress] = useState(data);

    const handleRemove = () => {
        onRemove();
    };

    const handleEdit = () => {
        setCurrentAddress({ ...currentAddress, status: 2 });
        onEdit();
    };
    const handleSave = () => {
        onSave(currentAddress);
        currentAddress.status = 0;
    };
    const handleCancel = () => {
        onCancel(currentAddress);
        currentAddress.status = 0;
    };

    const handleChange = (propName, event) => {
        var newState = {};
        newState[propName] = event.target.value;

        setCurrentAddress({ ...currentAddress, ...newState });
    };
    const procHighLightText = (text, ht) => {
        const index = text.indexOf(ht);
        if (index < 0) {
            return text;
        }
        //const re = new RegExp(ht, 'ig');
        //return text.replace(re, "<span class='highLight'>" + ht + '</span>');

        const length = ht.length;
        if (index == 0) {
            return (
                "<span class='highLight'>" +
                text.substr(0, length) +
                '</span>' +
                text.substr(length)
            );
        }

        return (
            text.substr(0, index - 0) +
            "<span class='highLight'>" +
            text.substr(index, length) +
            '</span>' +
            text.substr(index + length)
        );
    };

    let { name, address, email, status } = currentAddress;

    if (status == 0) {
        const firstLetter = name[0].toUpperCase();
        const ht = highLightText;
        if (ht) {
            name = procHighLightText(name, ht);
            address = procHighLightText(address, ht);
            email = procHighLightText(email, ht);
        }
        return (
            <li className='addressItem'>
                <div className='firstLetter'>{firstLetter}</div>
                <div className='infoContainer'>
                    <div dangerouslySetInnerHTML={{ __html: name }}></div>
                    <div dangerouslySetInnerHTML={{ __html: address }}></div>
                    <div dangerouslySetInnerHTML={{ __html: email }}></div>
                    <div>
                        <button onClick={handleEdit}>edit</button>
                        <button onClick={handleRemove}>remove</button>
                    </div>
                </div>
            </li>
        );
    } else {
        return (
            <li className='addressItem editMode'>
                <div className='editContainer'>
                    <div>
                        name:
                        <input
                            type='text'
                            value={name}
                            onChange={handleChange.bind(this, 'name')}
                        />
                    </div>
                    <div>
                        email:
                        <input
                            type='text'
                            value={email}
                            onChange={handleChange.bind(this, 'email')}
                        />
                    </div>
                    <div>
                        address:
                        <input
                            type='text'
                            value={address}
                            onChange={handleChange.bind(this, 'address')}
                        />
                    </div>
                    <div>
                        <button onClick={handleSave.bind(this)}>save</button>
                        <button onClick={handleCancel.bind(this)}>cancel</button>
                    </div>
                </div>
            </li>
        );
    }
};

export default AddressItem;
