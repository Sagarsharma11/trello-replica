import React, { useState, useContext, useEffect } from 'react';
import './TaskBoard.css';
import TaskCard from '../TaskCard/TaskCard';
import { TaskContext } from '../../../context/TaskContext';
import { editTask, getAllTask } from '../../../services/TaskApis';

const TaskBoard = ({ handleShow, setModalType }) => {
    const {search, tasks, setTasks } = useContext(TaskContext);

    const [draggedTask, setDraggedTask] = useState(null);

    useEffect(() => {
        fetchApi();
    },[])

    const fetchApi = async () => {
        const taskResponseArray = await getAllTask();
        const todo = [];
        const inProgress = [];
        const done = [];
        taskResponseArray.forEach((ele) => {
            if (ele.columnId === "inProgress") {
                inProgress.push(ele)
            } else if (ele.columnId === "todo") {
                todo.push(ele)
            } else if (ele.columnId === "done") {
                done.push(ele)
            }
        })
        const obj = {
            "todo": todo,
            "inProgress": inProgress,
            "done": done
        }
        setTasks(obj);
    }

    const onDragStart = (e, id) => {
        console.log("on drag id ", id)
        setDraggedTask(id);
    };

    // Prevent default to allow drop
    const onDragOver = (e) => {
        e.preventDefault();
    };

    const onDrop = (e, column) => {
        e.preventDefault(); 
        const draggedTaskObj = findTaskById(draggedTask);
    
        if (draggedTaskObj) {
            const updatedValue = {
                columnId: column 
            };
    
            editTask(updatedValue, draggedTask);
            const updatedTasks = removeTask(draggedTask);
            const isTaskAlreadyInColumn = updatedTasks[column].some(task => task._id === draggedTaskObj._id);
            
            if (!isTaskAlreadyInColumn) {
                setTasks({
                    ...updatedTasks,
                    [column]: [...updatedTasks[column], draggedTaskObj] 
                });
            } else {
                console.warn(`Task "${draggedTaskObj.title}" is already in the "${column}" column.`);
            }
        }
    };
    

    const findTaskById = (id) => {
        for (let key in tasks) {
            const task = tasks[key].find(task => task._id === id);
            if (task) return task;
        }
        return null;
    };

    const removeTask = (id) => {
        const updated = {};
        for (let key in tasks) {
            updated[key] = tasks[key].filter(task => task._id !== id);
        }
        return updated;
    };

    return (
        <div className='TaskBoard--container w-100'>
            {/* TODO Column */}
            <div
                className='w-100 vh-100 border shadow-sm rounded todo--column'
                onDragOver={onDragOver}
                onDrop={(e) => onDrop(e, 'todo')}
            >
                <div className='w-100 bg-primary py-2 ps-1 text-white fw-bold position-sticky'>
                    TODO
                </div>
                <div className='card--bucket'>
                    {tasks.todo.length ? tasks.todo
                    .filter((ele)=>ele.title.includes(search) || ele.description.includes(search)|| ele.columnId.includes(search)).
                    map((task) => (
                        <TaskCard
                            key={task._id}
                            id={task._id}
                            task={task}
                            onDragStart={onDragStart}
                            setModalType={setModalType}
                            handleShow={handleShow}
                        />
                    )) : ""}
                </div>
            </div>

            {/* IN PROGRESS Column */}
            <div
                className='w-100 vh-100 text-center border shadow-sm rounded todo--column'
                onDragOver={onDragOver}
                onDrop={(e) => onDrop(e, 'inProgress')}
            >
                <div className='w-100 bg-primary py-2 ps-1 text-white fw-bold'>
                    IN PROGRESS
                </div>
                <div className='card--bucket'>
                    {tasks.inProgress.length ? tasks.inProgress
                      .filter((ele)=>ele.title.includes(search) || ele.description.includes(search)|| ele.columnId.includes(search)).
                    map((task) => (
                        <TaskCard
                            key={task._id}
                            id={task._id}
                            task={task}
                            onDragStart={onDragStart}
                            setModalType={setModalType}
                            handleShow={handleShow}
                        />
                    )) : ""}
                </div>
            </div>

            {/* DONE Column */}
            <div
                className='w-100 vh-100 text-center border shadow-sm rounded todo--column'
                onDragOver={onDragOver}
                onDrop={(e) => onDrop(e, 'done')}
            >
                <div className='w-100 bg-primary py-2 ps-1 text-white fw-bold'>
                    DONE
                </div>
                <div className='card--bucket'>
                    {tasks.done.length ? tasks?.done?.filter((ele)=>ele.title.includes(search) || ele.description.includes(search)||ele.columnId.includes(search)).map((task) => (
                        <TaskCard
                            key={task._id}
                            id={task._id}
                            task={task}
                            onDragStart={onDragStart}
                            setModalType={setModalType}
                            handleShow={handleShow}
                        />
                    )) : ""}
                </div>
            </div>
        </div>
    );
};

export default TaskBoard;
