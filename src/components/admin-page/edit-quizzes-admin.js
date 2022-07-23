import react from 'react';
import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {Link }from 'react-router-dom';
import axios from 'axios';

function Questions (props) {
  const {query, page} = useParams();
  const [count, setCount] = useState(page);
  console.log(page);
  // const list = props.quiz[0].questions;
  function incrementPage() {
    setCount(count + 1);

  }
  function decrementPage() {
    console.log("subtract");
    setCount(count - 1);
  }
     
// const listItems = list.map((question, index) => <div>{index}</div> )
return (
  <div>
    <Link to={`/edit/${query}/${count}`}><i onClick={decrementPage} class="fa-solid fa-arrow-left-long"></i></Link>
    <Link to={`/edit/${query}/${count}`}><i onClick={incrementPage} class="fa-solid fa-arrow-right-long"></i></Link>
  </div>
  // <div>{listItems}</div>
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