import React, { useContext } from 'react';
import { editTask } from '../../../../services/TaskApis';
import { TaskContext } from '../../../../context/TaskContext';

const EditTaskForm = ({ formData, handleChange, taskId, handleClose }) => {
  const { tasks, setTasks } = useContext(TaskContext);

  const handleEdit = async () => {
    try {
      const updatedTask = await editTask(formData, taskId);
      const updatedColumn = updatedTask.columnId;
      const updatedTasks = {
        ...tasks,
        [updatedColumn]: tasks[updatedColumn].map(task =>
          task._id === updatedTask._id ? updatedTask : task
        )
      };
      setTasks(updatedTasks);
      handleClose();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };
  return (
    <div>
      <h4>Edit Task</h4>
      <input
        type="text"
        name="title"
        placeholder="Task Title"
        value={formData.title}
        onChange={handleChange}
        className="form-control mb-2"
      />
      <textarea
        name="description"
        placeholder="Task Description"
        value={formData.description}
        onChange={handleChange}
        className="form-control"
      />
      <button onClick={handleEdit} className='btn btn-info text-white px-4 mt-1'>Edit</button>
    </div>
  );
};

export default EditTaskForm;
