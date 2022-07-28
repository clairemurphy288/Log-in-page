import react from 'react';
import React from 'react';
import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from 'axios';
import "./edit.css";
import Form from './form-edit.js'
import Query from './query.js'

export function Questions (props) {
  const [count, setCount] = useState(0);
  const [range, setRange] = useState(count,count + 10);
      
  let list = props.quiz[0].questions; 
      const numberOfPages = Math.round(list.length/10);
      
      // console.log("The total number of pages: " + numberOfPages);

  function incrementPage() {
    if (count < numberOfPages -1) {
      setCount(count + 1);
    }
  }
  function decrementPage() {
    if (count > 0) {
    setCount(count - 1);

    }
  }
  useEffect(() => {
    setRange([count*10, count*10 + 10]);
  }, [count]);
console.log(range);
list = list.slice(range[0], range[1]);
let listItems = list.map((question, index) =>  <Form indexOfAnswer={question.indexOfAnswer} setQuiz={props.setQuiz} quizId = {props.quiz[0]._id} id={question._id} key={question._id} question = {question.question} answerChoices = {question.answerChoices}/>)
return (
  <div>
    <div>{listItems}</div>
    <i onClick={decrementPage} class="fa-solid fa-arrow-left-long"></i>
  <i onClick={incrementPage} class="fa-solid fa-arrow-right-long"></i>
  </div>
)


}

export default function Edit (props) {
    const [quiz, setQuiz] = useState([{
      name: "",
      questions: [{question: "", answerChoices: ["", ""], indexOfAnswer: -1}],
      _id: ""
    }]);
    const [search, setSearch] = useState("");
    const {query} = useParams();
    useEffect(() => {
      console.log("name")
      if (quiz[0].name === "") {
        getResponse();
      }});
     const getResponse = async ()=> {
      await axios.post("http://localhost:5000/admin/edit", {query: query}).then( async (response) => {
          let ResData = await response.data;
          setQuiz(ResData)
          })
          .catch(function (error) {
    });
     } 
     if (search === "") {
      return(<div><h1>{quiz[0].name}</h1>
<Query quizId ={quiz[0]._id}setSearch = {setSearch} search={search}/>
<Questions setQuiz={setQuiz} quiz = {quiz}/></div>)

     } else {
      return (<div>
        <h1>{quiz[0].name}</h1>
          <Query setQuiz={setQuiz} quiz={quiz} quizId ={quiz[0]._id}setSearch = {setSearch} search={search}/>
      </div>)
     }
      

}