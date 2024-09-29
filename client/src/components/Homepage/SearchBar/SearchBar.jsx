import React,{useContext} from 'react'
import "./SearchBar.css"
import { TaskContext } from '../../../context/TaskContext'

const SearchBar = () => {
    const { setSearch, tasks, setTasks} = useContext(TaskContext);

    const reverseTheArray = ()=>{
        const updatedTasks = {
            todo: [...tasks.todo].reverse(),           
            inProgress: [...tasks.inProgress].reverse(), 
            done: [...tasks.done].reverse()             
        };
        setTasks(updatedTasks);
    }

    return (
        <div className='SearchBar--container w-100 border shadow rounded'>
            <div className='search-portion'>
                <small>Search:</small>
                <input onChange={(e)=>setSearch(e.target.value)} className='form-control form-control-sm' type="text" placeholder='Search...' />
            </div>
            <div className='sort-portion'>
                <small >Sort By:</small>
                <select onChange={reverseTheArray} class="form-select form-select-sm">
                    <option selected>Recent</option>
                    <option value="1">Descending</option>
                </select>
            </div>
        </div>
    )
}

export default SearchBar