import react from 'react';
import React from 'react';
export default function Form(props) {
    const input = React.useRef();
    //props I need _id, question

    function onChange(e) {
        console.log(input.current.value);
        // console.log(textInput);

    }
    console.log(props.answerChoices)
    const answerItems = props.answerChoices.map(answer => (<Answer answer={answer}/>))
    console.log(answerItems);
    return (
<div>
  <form>
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
        console.log(textInput.current.value);

    }
    return (
        <input onChange={onChange} ref={textInput} type = "text" defaultValue={props.answer}></input>
      )
}


