import react from 'react';
import axios from 'axios';
import {useState, useEffect} from 'react';


export default function Query(props) {
    const [search,setSearch] = useState("");

    function onChange(e) {
        console.log(e.target.value);
        setSearch(e.target.value);
        if (search === "") {
            props.getUsers();
        }
    }
    async function onSubmit(e) {
        await axios.post("http://localhost:5000/query", {search: search}).then( async (response) => {
                console.log(response.data);
                // props.setQuestions(response.data)
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