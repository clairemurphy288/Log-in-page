const router = require('express').Router();
var ObjectId = require('mongodb').ObjectId; 
let Quiz = require("../models/quiz.models");
//For now quizzes can only work as .txt files
router.route('/admin').post( async (req,res) => {
    try {
        const title = req.body[1];
        console.log(title);
        let quiz = req.body[0].fileContent;
        quiz = quiz.replace(/\n/g, "").trim();
        quiz = quiz.split("\r");
        const questions = [];
        for (let i = 1; i < quiz.length; i++) {
            let line = quiz[i].trim().split("\t");
            //utilizing the question Schema
            let question = {
                question: line[0],
                answerChoices: [line[1],line[2],line[3],line[4]],
                indexOfAnswer: Number(line[5]) -1
            }
            questions.push(question);
        }
        //quizSchema
        const newQuiz = Quiz({
            name: title,
            questions: questions
        });
        //adds new quiz to database
        await newQuiz.save();
        console.log("New Quiz Added!");
        res.send("new quiz added!!!!");
        
    } catch (err) {
        res.json('Error' + err);
    }
});
//get request for live quiz feed
router.route('/admin/quiz').get(async (req,res) => {
    
    const quiz = await Quiz.find();
    const quizTitles = []
    for(let i = 0; i < quiz.length; i++) {
        quizTitles.push(quiz[i].name);
    }
    res.send([quizTitles,quiz]);
});

router.route('/admin/quiz/delete').post(async (req,res) => {
    console.log(req.body._id);
    await Quiz.deleteOne({_id: new ObjectId(req.body._id)});
    
 
});
module.exports = router;