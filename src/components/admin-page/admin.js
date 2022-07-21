import React, {Component} from 'react';
import LiveQuiz from "./live-quizzes-admin";
import axios from 'axios';
import "./admin.css"

export default class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileContent: "",
            titleOfQuiz: "",
            propsForLiveQuiz: []
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.titleChange = this.titleChange.bind(this);

    }
    async onSubmit(e) {
        let resData;
        e.preventDefault();
        const title = this.state.titleOfQuiz;
        const csv = this.state.fileContent;
           await axios.post('http://localhost:5000/admin', [csv, title]).then(res => {
            console.log(res.data);

           }).catch(err => console.log(err));
           await axios.get("http://localhost:5000/admin/quiz").then(function (response) {
            console.log("fetched quiz array")
            resData = response.data;
        
          })
          .catch(function (error) {
            console.log(error);
          })
          this.setState({
            propsForLiveQuiz: resData

          }, () => console.log("Call back for state:" + this.state.propsForLiveQuiz));
        
    }
   
    onChange(e) {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
            // The file's text will be printed here
            const csv = {
                fileContent: e.target.result
            }
            this.setState({
                fileContent: csv
            })
          }.bind(this);
        reader.readAsText(file)
    }
    titleChange(e) {
        this.setState({
            titleOfQuiz: e.target.value
        });
    }
    render () {
        return (
        <div>
            <LiveQuiz quizzes = {this.state.propsForLiveQuiz}/>
            <hr></hr>
        
            <form onSubmit = {this.onSubmit}>
            <div className="">
                <h1>Create a new quiz</h1>
                <label htmlFor="quizTitle">Title</label>
                <input onChange = {this.titleChange} id="quizTitle" type="text" ></input>
                <br></br>
                <input onChange= {this.onChange}type="file"></input>
                <button type="submit">Submit</button>
            </div>
            </form>
        </div>
        )
    }
}