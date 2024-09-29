import React from 'react'
import "./AddTask.css"

const AddTask = ({ handleShow, setModalType}) => {

  return (
    <div className='AddTask--container w-100'>
        <button onClick={()=>{
          handleShow();
          setModalType("add-task");
        }} className='btn btn-primary px-4 btn-sm'>
            Add Task
        </button>   
    </div>
  )
}

export default AddTask