import { useState, useEffect } from "react";
export default function AddUser(props) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [quizView, setQuizView] = useState(true);
    const [timer, setTimerView] = useState(false);
    const [maintenance, setMaintenance] = useState(false);
    const [selected, setOption] = useState("standard");

    function onClick(e) {
        console.log("delete");
    }
    function onSubmit(e) {
        e.preventDefault();
        console.log("submit");
    }
    return(
    <div>
        <h1>Add a User!</h1>
        <form onSubmit= {onSubmit}>
        <i onClick={onClick}className="fa-solid fa-trash-can questionDeletion"></i>
            <label>username</label>
            <input onChange={usernameChange} ></input>
            <label>email</label>
            <input onChange={emailChange}></input>
            <label>password</label>
            <input onChange={passwordChange}></input>
            <div className="form-check">
                <input onChange={setQuiz} checked={quizView}className="form-check-input" type="checkbox" value="" id="quizDash"></input>
                <label className="form-check-label" htmlFor="quizDash">quiz dashboard</label>
            </div>
            <div className="form-check">
                <input onChange={setTimer} checked={timer} className="form-check-input" type="checkbox" value="" id="timeStudy"></input>
                <label className="form-check-label" htmlFor="timeStudy">time study</label>
            </div>
            <div className="form-check">
                <input onChange={setMaintenancePlan} checked={maintenance} className="form-check-input" type="checkbox" value="" id="maintenancePlan"></input>
                <label className="form-check-label" htmlFor="maintenancePlan">maintenance plan</label>
            </div>
            <select value={selected} onChange={setPrivilege}>
                <option value="admin">Admin</option>
                <option value="standard" >Standard</option>
            </select>
            <button type="submit">Submit Changes</button>
        </form>
    </div>)

     // Helper Functions
     function usernameChange(e) {
        console.log(props.user)
        setUsername(e.target.value);
    }
    function passwordChange(e) {
        setPassword(e.target.value)
    }
    function emailChange(e) {
        setEmail(e.target.value);
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
    function setPrivilege(e) {
        setOption(e.target.value);
    }
}