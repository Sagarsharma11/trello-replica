import React,{useState, useContext} from 'react'
import "../styles/Home.css"
import AddTask from '../components/Homepage/AddTask/AddTask'
import SearchBar from '../components/Homepage/SearchBar/SearchBar'
import TaskBoard from '../components/Homepage/TaskBoard/TaskBoard'
import TaskModal from '../components/Homepage/TaskModal/TaskModal'
import { TaskContext } from '../context/TaskContext'

const Home = () => {
  const [show, setShow] = useState(false);
  const [modalType, setModalType] = useState("")
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const {currentTask, setCurrentTask} = useContext(TaskContext)
  return (
    <div className='Home--container'>
      <TaskModal show={show} handleClose={handleClose} handleShow={handleShow} modalType={modalType} taskData={currentTask} />
      <AddTask handleClose={handleClose} handleShow={handleShow} setModalType={setModalType}/>
      <SearchBar/>
      <TaskBoard handleClose={handleClose} handleShow={handleShow} setModalType={setModalType}/>
    </div>
  )
}

export default Home