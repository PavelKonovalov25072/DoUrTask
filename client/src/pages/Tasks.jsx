import {React, useState, useEffect} from 'react';
import './styles/tasks.css'
import Header from 'components/Header/Header';
import Task from 'components/Task/Task';
import Popup from 'components/Popup/Popup';
import { getToken } from 'middleware/TaskPage';
import { unauthPage } from 'middleware/UnauthPage';
import SvgPlus from 'components/svg/SvgPlus';

const Tasks = () => {

    const [taskList, setTaskList] = useState([]);
    const [open, setOpen] = useState(false);
    const [openedTaskId, setOpenedTaskId] = useState(null);
    const addTask = (task) => {
        setTaskList(() => {
            taskList.push(task);
            return taskList
        })
    }
    const updateTasks = (id, task) => {
        setTaskList(() => {
            taskList.splice(id, 1, task)
            return taskList
        })
    }
    const deleteTask = (id) => {
        setTaskList(() => {
            taskList.splice(id, 1)
            return taskList
        })
    }

    async function getData() {
        const token = getToken();
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/tasks`, {
            method: "GET",
            headers: { "Content-Type": "application/json", "Accept": "application/json", "Authorization": `Bearer ${ token }`, 'ngrok-skip-browser-warning':true}
        })
        let actualData = await response.json();
        if (response.ok) {
            setTaskList(actualData);
            return actualData;
        }
        
        else {
            console.error(response.status + " " + actualData.message);
        }
    }
    useEffect(() => {
        getData();
    }, [])
    return (
        <div className='tasks'>
            <Header/>
            <div className='tasks__body'>
                <div className='tasks__body__list frame'>
                    {taskList.map((task, index) => {
                        return (
                        <Task key={index} task={task} taskId={index} onTitleClick={(id) => {
                            setOpenedTaskId(id);
                            setOpen(true);
                        }}/>
                        )
                    })}
                    <button className="frame__create" onClick={() => setOpen(true)}>
                        <SvgPlus />
                    </button>
                </div>
            </div>
            { unauthPage() }
            {open ? <Popup 
                closePopup={() => {
                    setOpenedTaskId(null);
                    setOpen(false)}} 
                task={taskList[openedTaskId]}
                addToList={addTask}
                updateList={updateTasks}
                taskListId={openedTaskId}
                deleteFromList={deleteTask}
            /> : null}
        </div>
    );
};


export default Tasks;