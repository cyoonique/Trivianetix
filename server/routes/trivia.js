const express = require('express');
const trivia = express.Router();
const path = require('path');

const userModelController = require('../controller/userModelController');

trivia.get('/:username/:url', userModelController.findStats, userModelController.questions, (req, res) => {
    console.log('req.params: ', req.params);
    // console.log('res.locals.results: ', res.locals.results);
    res.status(200).json({
        username: req.params.username,
        results: res.locals.results,
        gamesPlayed: res.locals.stats.games_played,
        correctAnswers: res.locals.stats.correct_answers,
    });
});


trivia.get('/:username', userModelController.getGraphData, (req, res) => {
    res.status(200).json({
        currentuser: res.locals.currentuser,
        users: res.locals.users,
    });
})
module.exports = trivia;