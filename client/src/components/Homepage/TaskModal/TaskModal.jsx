import { useState, useEffect, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import AddTaskForm from './TaskOperations/AddTaskForm';
import ViewTask from './TaskOperations/ViewTask';
import EditTaskForm from './TaskOperations/EditTaskForm';
import DeleteTask from './TaskOperations/DeleteTask';
import Button from 'react-bootstrap/Button';
import { deleteTask } from '../../../services/TaskApis';
import { TaskContext } from '../../../context/TaskContext';


const TaskModal = ({ show, handleClose, modalType, taskData }) => {
  const { tasks, setTasks } = useContext(TaskContext);
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  useEffect(() => {
    if (taskData) {
      setFormData({
        title: taskData.title || '',
        description: taskData.description || '',
        columnId: taskData.columnId || '',
      });
    }
  }, [taskData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (taskData) => {
    if (modalType === 'add-task') {
      console.log('Task added:', formData);
    } else if (modalType === 'edit-task') {
      console.log('Task edited:', formData);
    } else if (modalType === "delete-task") {
      try {
         await deleteTask(taskData._id);
        const updatedColumn = taskData.columnId;
        const id = taskData._id;
        const updatedTasks = {
          ...tasks,
          [updatedColumn]: tasks[updatedColumn].filter(task =>
            task._id !== id 
          )
        };
        setTasks(updatedTasks);
        handleClose();
      } catch (error) {
        console.error('Error updating task:', error);
      }
    
      console.log("delete task ....")
    }
    handleClose();
  };

  const renderModalBody = () => {
    switch (modalType) {
      case 'add-task':
        return <AddTaskForm handleClose={handleClose} formData={formData} handleChange={handleChange} />;
      case 'view-task':
        return <ViewTask taskData={taskData} />;
      case 'edit-task':
        return <EditTaskForm handleClose={handleClose} taskId={taskData._id} taskData={taskData} formData={formData} handleChange={handleChange} />;
      case 'delete-task':
        return <DeleteTask />;
      default:
        return <p>Default Modal Content</p>;
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{modalType === 'delete-task' ? 'Confirm Delete' : 'Task Modal'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{renderModalBody()}</Modal.Body>
      <Modal.Footer>
        {modalType !== 'view-task' && (
          <Button variant={modalType === 'delete-task' ? 'danger' : 'primary'} onClick={() => handleSave(taskData)}>
            {modalType === 'delete-task' ? 'Delete Task' : 'Save Changes'}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default TaskModal;

