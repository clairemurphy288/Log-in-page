import react from 'react';
import React from 'react';
import axios from 'axios';
import {useState, useEffect} from 'react';
import "./form.css";

export default function Form(props) {
    const input = React.useRef();
    const [data, setData] = useState([]);
    const [question, setQuestion] = useState(props.question)
    const [selectedAnswer, setAnswer] = useState(props.indexOfAnswer);
    //props I need _id, question
    async function onClick() {
        await axios.post('http://localhost:5000/admin/edit/question-delete', { quizId: props.quizId, id: props.id}).then(async res => {
            props.setQuiz(res.data);

           }).catch(err => console.log(err));
    }
    function onChange(e) {
        setQuestion(input.current.value);
    }
    async function onSubmit(e) {
        e.preventDefault();
        console.log(question)
        await axios.post('http://localhost:5000/admin/edit/quiz', {indexOfAnswer: selectedAnswer, quizId: props.quizId, question: question, data: data, id: props.id}).then(async res => {
            console.log(res.data);

           }).catch(err => console.log(err));
        
    }
    const answerItems = props.answerChoices.map((answer,index) => (<Answer selectedAnswer={selectedAnswer} setAnswer={setAnswer} setData={setData} data={data} onChange = {onChange} answerChoices={props.answerChoices} index={index} answer={answer}/>))
    return (
<div>
  <form onSubmit={onSubmit}>
  <textarea ref={input} onChange={onChange}  defaultValue = {props.question} cols="50" rows="10"></textarea>
  <i onClick={onClick}className="fa-solid fa-trash-can questionDeletion"></i>
        <h6>Select the correct answer: </h6>
    <div>{answerItems}</div>
    <button type="submit">Submit Changes</button>
    <hr></hr>
    </form>
</div>

    )




}

function Answer(props) {
    const [style, setStyle] = useState("")
    const textInput = React.useRef();
    const [clicked, setClick] = useState(false);
    
    function onChange(e) {
        let deepCopy = [];
        if ( props.data.length === 0 ) {
            for (let i = 0; i < props.answerChoices.length; i++) {
                deepCopy.push(props.answerChoices[i])
            }
        } else {
            for (let i = 0; i < props.data.length; i++) {
                deepCopy.push(props.data[i])
        }
    }
        deepCopy[props.index] = textInput.current.value
        props.setData(deepCopy);
        console.log(props.data)


    }
    //function allows the admin to change the correct answer 
    function onClick() {
        
        if (props.selectedAnswer === props.index) {
            setStyle("");
            setClick(true);
            props.setAnswer(-1);
            //remove class
            console.log("selected");
        } else if(props.selectedAnswer === -1) {
            setClick(true);
            props.setAnswer(props.index);
            setStyle("select");

        }
    }

    useEffect(() => {
        if (props.selectedAnswer === props.index  && !clicked) {
            setStyle(style + "select");
        } 

    },[props.selectedAnswer])

    return (

            <input className = {style} onClick={onClick} onChange={onChange} ref={textInput} type = "text" defaultValue={props.answer}></input>
      )
}






