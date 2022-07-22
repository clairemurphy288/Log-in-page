import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';



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

    function editQuiz() {
    console.log("edit");
    }
    console.log("this is the quiz array being rendered to the page");
    console.log(quizzes);

    // const titles = props.quizTitle;
    const listItems = quizzes.map((quiz) =>    
    <div key={quiz._id}><h4>{quiz.name}</h4>
        <i onClick = {() => {handleRemove(quiz._id)}} className="fa-solid fa-trash-can"></i>
        <i onClick = {editQuiz}className="fa-solid fa-pen"></i>
    </div>  );  return (
      <div>{listItems}</div>  );
  }

        