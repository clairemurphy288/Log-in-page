import react from 'react';
import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from 'axios';

function Questions (props) {
  const {page} = useParams();
  console.log(page);
  const list = props.quiz[0].questions;
     
const listItems = list.map((question, index) => <div>{index}</div> )
return (
  <div>{listItems}</div>
)


}

export default function Edit () {
    const [quiz, setQuiz] = useState([{
      name: "",
      questions: [{}, {}]

    }]);
    console.log(quiz);
    const {query} = useParams();
    useEffect(() => {
      if (quiz[0].name === "") {
        getResponse();
      }});
     const getResponse = async ()=> {
      await axios.post("http://localhost:5000/admin/edit", {query: query}).then( async (response) => {
          let ResData = await response.data;
          console.log(ResData);
          setQuiz(ResData)
          })
          .catch(function (error) {
    });
     } 
      
return(<div><h1>{quiz[0].name}</h1><Questions quiz = {quiz}/></div>)
}