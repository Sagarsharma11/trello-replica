import React, { useContext, useState } from 'react';
import { createTask } from '../../../../services/TaskApis'; 
import { TaskContext } from '../../../../context/TaskContext';

const AddTaskForm = ({handleClose}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    columnId: 'todo', 
  });
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const { tasks, setTasks } = useContext(TaskContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    setError(null); 
    
    try {
      const task = await createTask(formData);
      alert(`Task Created Successfully!`);
      setFormData({ title: '', description: '', columnId: 'todo' }); 
      const updatedColumn = "todo";
      const updatedTasks = {
        ...tasks,
        [updatedColumn]: [...tasks[updatedColumn], task] 
      };
      setTasks(updatedTasks);
      handleClose();
    } catch (error) {
      setError('Error creating task, please try again later.');
    } finally {
      setLoading(false); 
    }
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={formData.title}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />
        <textarea
          name="description"
          placeholder="Task Description"
          value={formData.description}
          onChange={handleChange}
          className="form-control mb-2"
        />
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Creating Task...' : 'Add Task'}
        </button>
      </form>

      {error && <div className="text-danger mt-2">{error}</div>}
    </div>
  );
};

export default AddTaskForm;
