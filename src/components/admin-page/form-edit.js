import react from 'react';
import React from 'react';
import axios from 'axios';
import {useState, useEffect} from 'react';

export default function Form(props) {
    const input = React.useRef();
    const [data, setData] = useState([]);
    const [question, setQuestion] = useState(props.question)
    //props I need _id, question

    function onChange(e) {
        setQuestion(input.current.value);
        console.log(question);
        console.log(data);

    }
    async function onSubmit(e) {
        e.preventDefault();
        console.log(question)
        await axios.post('http://localhost:5000/admin/edit/quiz', {quizId: props.quizId, question: question, data: data, id: props.id}).then(async res => {
            console.log(res.data);
            props.setQuiz(res.data)

           }).catch(err => console.log(err));
        
          
        //props.id for question id
    }
    const answerItems = props.answerChoices.map((answer,index) => (<Answer setData={setData} data={data} onChange = {onChange} answerChoices={props.answerChoices} id={index} answer={answer}/>))
    return (
<div>
  <form onSubmit={onSubmit}>
  <textarea ref={input} onChange={onChange}  defaultValue = {props.question} cols="50" rows="10"></textarea>
    <div>{answerItems}</div>
    <button type="submit">Submit Changes</button>
    <hr></hr>
    </form>
</div>

    )




}

function Answer(props) {
    const textInput = React.useRef();
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
        deepCopy[props.id] = textInput.current.value
        props.setData(deepCopy);
        console.log(props.data)


    }


    return (
        <input onChange={onChange} ref={textInput} type = "text" defaultValue={props.answer}></input>
      )
}






