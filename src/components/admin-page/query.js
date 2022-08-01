import react from 'react';
import axios from 'axios';
import Questions from './edit-quizzes-admin';


export default function Query(props) {

    function onChange(e) {
        console.log(e.target.value);
        props.setSearch(e.target.value);
    }
    async function onSubmit(e) {
        await axios.post("http://localhost:5000/admin/quiz/query", {search: props.search, _id: props.quizId}).then( async (response) => {
                console.log(response.data);
                props.setQuestions(response.data)
            })
            .catch(function (error) {
      });
    }
    return(<div class="input-group">
    <div class="form-outline">
      <input onChange={onChange} type="search" id="form1" class="form-control" />
    </div>
    <button onClick={onSubmit} class="btn btn-primary">
      <i class="fas fa-search"></i>
    </button>
  </div>)
}