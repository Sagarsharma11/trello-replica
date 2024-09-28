import React, { createContext, useState } from 'react';


export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState({
        todo: [],
        inProgress: [],
        done: []
    });    
    const [search, setSearch] = useState(""); 
    const [currentTask, setCurrentTask] = useState(null); 
    const updateTaskState = (newState) => {
        setTasks(newState);
    };
    
    return (
        <TaskContext.Provider value={{ tasks, setTasks, search, setSearch, currentTask, setCurrentTask, updateTaskState }}>
            {children}
        </TaskContext.Provider>
    );
};
