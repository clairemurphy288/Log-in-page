import React, {Component} from 'react';
import {Link} from "react-router-dom";
import "./live-quizzes-admin.css";
import Items from "./Items";
import { useState, useEffect } from 'react';
import axios from 'axios';



export default class LiveQuiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quizObjectData: [[], []]
        }
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
    }
    componentDidUpdate(prevProps, prevState) {
        if( this.state.quizObjectData != this.props.createdQuizzes && this.props.createdQuizzes[1].length != 0) {
            this.setState({
                quizObjectData:  this.props.createdQuizzes
            })
        } 
     
      
    
    }
 
 
    async componentDidMount () {
        let resData;
        await axios.get("http://localhost:5000/admin/quiz").then(function (response) {
            resData = response.data;
            console.log(resData);
        
          })
          .catch(function (error) {
            console.log(error);
          })
            this.setState({
            quizObjectData: resData
        });
    }
    render () {
        return (
        <div>
            <h1>Live Quizzes</h1>
            <Items quizObject = {this.state.quizObjectData[1]} quizTitle = {this.state.quizObjectData[0]}/>
            
        </div>)
        
    }
}