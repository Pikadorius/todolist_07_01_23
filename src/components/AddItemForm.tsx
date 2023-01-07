import React, {useState, KeyboardEvent} from 'react';

type AddItemFormType = {
    addItem: (title: string) => void
}

const AddItemForm = (props: AddItemFormType) => {
    const [value, setValue] = useState('')
    const [error, setError] = useState('')

    const onClickHandler = () => {
        if (value.trim()) {
            props.addItem(value)
            setError('')
            setValue('')
        } else setError('Error! Enter something')
    }

    const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') onClickHandler()
    }


    return (
        <div>
            <input onKeyDown={onEnter} value={value} placeholder={error ? error : "Enter something"}
                   onChange={(e) => setValue(e.currentTarget.value)}/>
            <button onClick={onClickHandler}>Add item</button>
        </div>
    );
};

export default AddItemForm;