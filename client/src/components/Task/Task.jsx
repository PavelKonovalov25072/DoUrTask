import {React, useState, useEffect} from 'react';
import './styles/task.css';
import DoUrTaskText from 'components/UI/DoUrTaskText';
import DoUrTaskCheckbox from 'components/UI/DoUrTaskCheckbox'
import { getToken } from 'middleware/TaskPage';

const Task = ({onTitleClick, task, taskId}) => {
    const [isDone, setIsDone] = useState(task.isItDone);
    useEffect(() => {
        setIsDone(task.isItDone)
    }, [])
    /* useEffect(() => {
        UpdateTask();
        console.log(111)
    }, [isDone]) */

    const DoTask = (e) => {
        setIsDone(e)
        UpdateTask(e);
    }

    async function UpdateTask(checked) {
        const token = getToken();
        let body = {"done": checked};
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/tasks?`+ new URLSearchParams({
                id: task._id
            }), {
            method: "PUT",
            headers: { "Content-Type": "application/json", "Accept": "application/json", "Authorization": `Bearer ${ token }`, 'ngrok-skip-browser-warning':true},
            body: JSON.stringify(body)
        })
        let actualData = await response.json();
        if (response.ok) {
            console.log("Successfully updated")
        }
        else {
            console.error(response.status + " " + actualData.message);
        }
    }
    const click = () => {
        onTitleClick(taskId)
    }
    return (
        <div className='task'>
            <div className='task__title'  onClick={click}>
                <DoUrTaskText title={task.title} width="100%"/>
            </div>
            <div className='task__date'>
                <DoUrTaskText title={task.date === undefined ? '' : (new Date(task.date)).toLocaleString()} width="100%"/>
            </div>
            <DoUrTaskCheckbox value={isDone} getInput={DoTask}/>
        </div>
    );
};

export default Task;