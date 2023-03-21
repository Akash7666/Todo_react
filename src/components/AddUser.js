import React from 'react'

const AddUser = ({ onAdd }) => {

    // SUBMIT FUNCTION
    const handleOnSubmit = (e) => {
        e.preventDefault();
        onAdd(e.target.name.value);
        e.target.name.value = "";


    }

    return (
        <div className='list center'>
            <form onSubmit={handleOnSubmit}>
                <h1>TODO LIST USING REACT</h1>
                <input placeholder='Enter Todo' name='name' required />
                <button onSubmit={handleOnSubmit}>Add</button>
            </form>
        </div>
    )
}

export default AddUser