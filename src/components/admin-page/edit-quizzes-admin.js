import react from 'react';
import React from 'react';
import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {Link }from 'react-router-dom';
import axios from 'axios';
import "./edit.css";
import Form from './form-edit.js'

function Questions (props) {
  const {query, page} = useParams();
  const [count, setCount] = useState(Number(page));
  const [range, setRange] = useState([Number(page),Number(page) + 10]);

      let list = props.quiz[0].questions; 
      const numberOfPages = Math.round(list.length/10);
      
      console.log("The total number of pages: " + numberOfPages);

  function incrementPage() {
    if (count < numberOfPages) {
      setCount(Number(page) + 1);
    }
  }
  function decrementPage() {
    if (count > 0) {
    setCount(Number(page) - 1);

    }
  }
  useEffect(() => {
    setRange([page*10, page*10 + 10]);
  }, [page]);

  list = list.slice(range[0], range[1]);
let listItems = list.map((question, index) =>  <Form id={question._id} key={question._id} question = {question.question} answerChoices = {question.answerChoices}/>)
return (
  <div>
    <div>{listItems}</div>
    <Link to={`/edit/${query}/${count}`}><i onClick={decrementPage} class="fa-solid fa-arrow-left-long"></i></Link>
    <Link to={`/edit/${query}/${count}`}><i onClick={incrementPage} class="fa-solid fa-arrow-right-long"></i></Link>
  </div>
)


}

export default function Edit () {
    const [quiz, setQuiz] = useState([{
      name: "",
      questions: [{answerChoices: ["", ""]}],
      _id: "",
      // answerChoices: ["", ""]

    }]);
    const {query} = useParams();
    useEffect(() => {
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
      
return(<div><h1>{quiz[0].name}</h1><Questions quiz = {quiz}/></div>)
}