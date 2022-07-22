import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'



export default function Items (props) {
    const [quizzes, setQuiz] = useState([]);
    useEffect(() => {
        const quizzes = props.quizObject;
        setQuiz(quizzes);
    }, [props.quizObject]);


    function handleRemove(id) {
        const newList = quizzes.filter((quiz) => quiz._id != id);
        axios.post("http://localhost:5000/admin/quiz/delete", {_id: id}).then(function (response) {
            console.log(response.data);
          
          })
          .catch(function (error) {
    })
        setQuiz(newList);
    }
    const listItems = quizzes.map((quiz) =>    
    <div key={quiz._id}><h4>{quiz.name}</h4>
        <i onClick = {() => {handleRemove(quiz._id)}} className="fa-solid fa-trash-can"></i>
        <Link to={{
            pathname: "/edit" + "/" + quiz._id
        }}><i className="fa-solid fa-pen"></i></Link>
    </div>  );  return (
      <div>{listItems}</div>  );
  }

        