import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
export default function UserFeed() {
    const [users, setUsers] = useState([{__v: 0,
        _id: "",
        maintenancePlan: false,
        password: "",
        quizDash: true,
        timer: false,
        typeOfUser: "standard",
        username: ""}]);
    useEffect(()=> {
        if(users[0]._id === "") {
            getUsers();
        }
    } )

    async function getUsers() {
        await axios.get('http://localhost:5000/feed').then(async (res) => {
            const data = await res.data
            setUsers(data);} ).catch(err => console.log(err));

    }
    console.log(users);
    let listItems = users.map((user) => <User user={user}/>)
    return (<div>
                <h1>Users</h1>
                <div>{listItems}</div>
            </div>)
}

export function User(props) {
    const input = React.useRef();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [quizView, setQuizView] = useState(props.user.quizDash);
    const [timer, setTimerView] = useState(props.user.timer);
    const [maintenance, setMaintenance] = useState(props.user.maintenancePlan)
    function usernameChange(e) {
        console.log(props.user)
        setUsername(e.target.value);
    }
    function passwordChange(e) {
        setPassword(e.target.value)
    }
    function onSubmit(e) {
        e.preventDefault();
    }
    function setQuiz(e) {
        setQuizView(!quizView);

    }
    function setTimer(e) {
        setTimerView(!timer);

    }
    function setMaintenancePlan(e) {
        setMaintenance(!maintenance);
        
    }
    return (
    <div>
        <form onSubmit={onSubmit}>
            <label>username</label>
            <input onChange={usernameChange} defaultValue={props.user.username}></input>
            <label>password</label>
            <input onChange={passwordChange} defaultValue={props.user.password}></input>
            <div class="form-check">
                <input onChange={setQuiz} checked={quizView}class="form-check-input" type="checkbox" value="" id="quizDash"></input>
                <label class="form-check-label" for="quizDash">quiz dashboard</label>
            </div>
            <div class="form-check">
                <input onChange={setTimer} checked={timer} class="form-check-input" type="checkbox" value="" id="timeStudy"></input>
                <label class="form-check-label" for="timeStudy">time study</label>
            </div>
            <div class="form-check">
                <input onChange={setMaintenancePlan} checked={maintenance} class="form-check-input" type="checkbox" value="" id="maintenancePlan"></input>
                <label class="form-check-label" for="maintenancePlan">maintenance plan</label>
            </div>
            
            <button>Submit Changes</button>
            <hr></hr>
        </form>
    </div>)
}