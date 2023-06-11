import DoUrTaskButton from 'components/UI/DoUrTaskButton';
import DoUrTaskText from 'components/UI/DoUrTaskText';
import './styles/popup.css';
import {React, useState, useEffect} from 'react';
import { getToken } from 'middleware/TaskPage';
import DoUrTaskInput from 'components/UI/DoUrTaskInput';
import SvgEditIcon from 'components/svg/SvgEditIcon';

const Popup = ({closePopup, task, isEmpty, updateList, addToList, taskListId, deleteFromList}) => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [haveTitleError, setTitleError] = useState(false);
    const [isTaskEdit, setTaskEdit] = useState(false);

    const CreateTask = () => {
        if (title === '') {
            setTitleError(true);
        }
        else {
            PostTask();
        }    
    }
    const EditMode = () => {
        setTaskEdit(true);
    }
    const Close = () => {
        setTaskEdit(false);
        closePopup();
    }
    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }
    useEffect(() => {
        if (task !== undefined)
        {
            let taskDate = new Date(task.date);
            setTitle(task.title);
            if (task.body !== null && task.body !== undefined) setDescription(task.body);
            if (task.date !== null && task.date !== undefined && task.date !== '') setDate([
                taskDate.getFullYear(),
                padTo2Digits(taskDate.getMonth() + 1),
                padTo2Digits(taskDate.getDate()),
              ].join('-') +
              ' ' +
              [
                padTo2Digits(taskDate.getHours()),
                padTo2Digits(taskDate.getMinutes()),
                padTo2Digits(taskDate.getSeconds()),
              ].join(':'))
              else setDate('');
        }
    }, [])
    async function PostTask() {
        const token = getToken();
        let body = {};
        if (date === '' || date === undefined || date === null) {
            body = {
                "title": title,
                "body": description,
            }
        }
        else {
            body = {
                "title": title,
                "body": description,
                "date": date
            }
        }
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/tasks`, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Accept": "application/json", "Authorization": `Bearer ${ token }`, 'ngrok-skip-browser-warning':true},
            body: JSON.stringify(body)
        })
        let actualData = await response.json();
        if (response.ok) {
            addToList(actualData);
            Close();
        }
        else {
            console.error(response.status + " " + actualData.message);
        }
    }
    async function UpdateTask() {
        const token = getToken();
        let body = {};
        if (title === '') {
            setTitleError(true);
        }
        else{
            if (date === '' || date === undefined || date === null) {
                body = {
                    "title": title,
                    "body": description,
                }
            }
            else {
                body = {
                    "title": title,
                    "body": description,
                    "date": date
                }
            }
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
                task.title = title;
                task.body = description;
                if (date === '')
                    task.date = undefined;
                else 
                    task.date = date;
                updateList(taskListId, task);
                Close();
            }
            else {
                console.error(response.status + " " + actualData.message);
            }
        } 
    }

    async function DeleteTask() {
        const token = getToken();
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/tasks?`+ new URLSearchParams({
                id: task._id
            }), {
            method: "DELETE",
            headers: { "Content-Type": "application/json", "Accept": "application/json", "Authorization": `Bearer ${ token }`, 'ngrok-skip-browser-warning':true}
        })
        let actualData = await response.json();
        if (response.ok) {
            deleteFromList(taskListId);
            Close();
        }
        else {
            console.error(response.status + " " + actualData.message);
        }
    }

    useEffect(() => setTitleError(false), [title])
    if (task === undefined) {
        return (
            <div className='popup-wrapper' onClick={Close}>
                <div className='popup' onClick={(event) => event.stopPropagation()}>
                    <div className='popup__title popup__title-inp'>Создание задачи</div>
                    <div className='popup__info'>
                        <DoUrTaskInput className='popup__title' value={title} getInput={setTitle} placeholder="Название" isError={haveTitleError}/>
                        <div className='popup__date popup__date__input'><DoUrTaskInput width="auto" value={date} getInput={setDate} type='datetime-local'/></div>
                        <div className='popup__descr'><DoUrTaskInput width="auto" value={description} getInput={setDescription} placeholder="Описание"/></div>
                    </div>
                    <div className='popup__save'>
                        <DoUrTaskButton name='Добавить задание' onClick={CreateTask}></DoUrTaskButton>
                    </div>
                </div>
            </div>
        );
    }
    if (task !== undefined && isTaskEdit) {
        return (
            <div className='popup-wrapper' onClick={Close}>
                <div className='popup' onClick={(event) => event.stopPropagation()}>
                    <div className='popup__title popup__title-inp'>Изменить задачу</div>
                    <div className='popup__info'>
                        <DoUrTaskInput className='popup__title' value={title} getInput={setTitle} placeholder="Название" isError={haveTitleError}/>
                        <div className='popup__date popup__date__input'><DoUrTaskInput width="auto" value={date} getInput={setDate} type='datetime-local'/></div>
                        <div className='popup__descr'><DoUrTaskInput width="auto" value={description} getInput={setDescription} placeholder="Описание"/></div>
                    </div>
                    <div className='popup__save'>
                        <DoUrTaskButton name='Сохранить' onClick={UpdateTask}></DoUrTaskButton>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className='popup-wrapper' onClick={Close}>
            <div className='popup' onClick={(event) => event.stopPropagation()}>
                <div className='popup__title'>{task.title}</div>
                <div className='popup__info'>
                    <div className='popup__date'><DoUrTaskText title={task.date === undefined ? '' : (new Date(task.date)).toLocaleString()} width="auto"/></div>
                    <div className='popup__descr'><DoUrTaskText title={task.body} width="auto"/></div>
                </div>
                <div className='popup__save'>
                    <DoUrTaskButton name='Удалить задачу' bgColor="brown" onClick={DeleteTask}></DoUrTaskButton>
                </div>
                <button className='popup__edit' onClick={EditMode}>
                    <SvgEditIcon/>
                </button>
            </div>
        </div>
    );
};

export default Popup;