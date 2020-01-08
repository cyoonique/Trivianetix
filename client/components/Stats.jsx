import React, { Component } from "react";
import Table from 'react-bootstrap/Table';

class Stats extends Component {
  render() {
    const questionsPosed = this.props.stats.gamesPlayed * 10;
    const questionsRight = this.props.stats.correctAnswers;
    const PercentageRightForThisGame = this.props.correctResponses.length * 10;
    const percentageRight = questionsPosed ? Math.floor((questionsRight / questionsPosed) * 100) : 0;
    let gameMode = this.props.gameMode;
    let scoreBoard = <p>Your All-Time Score: {percentageRight}%<br/>Your Score For This Game: {PercentageRightForThisGame}%</p>;
    console.log(`questionsPosed: ${questionsPosed}, questionsRight: ${questionsRight}, percentageRight: ${percentageRight}, PercentageRightForThisGame: ${PercentageRightForThisGame}`);
    const category = ['General Knowledge', 'Books', 'Film', 'Music', 'Musicals and Theater', 'Television', 'Video Games', 'Board Games', 'Science and Nature', 'Computers', 'Mathematics', 'Mythology', 'Sports', 'Geography', 'History', 'Politics', 'Art', 'Celebrities', 'Animals'];

    fetch(`/trivia/${this.state.username}/${this.state.url}`)
    .then(res => res.json())
    .then(data => {
      const { username, results, gamesPlayed, correctAnswers } = data;
      this.setState({
        username,
        results,
        stats: { gamesPlayed, correctAnswers },
      });
    })
    .catch((err) => { console.log(err); });
    
    // TODO: pull leaderBoard data from MongoDB
    const leaderBoard = [];
    for (let i = 1; i <= 10; i += 1) {
      let eachLeader = (
        <tr>
          <td>{i}</td>
          <td>{username_fk}</td>
          <td>{category[categor_fk - 9]}</td>
          <td>{score}</td>
        </tr>
      );
      leaderBoard.push(eachLeader);
    }

    return (
      <div>
        <div className='scoreboard'>
          {scoreBoard}
        </div>
        <div className='leaderboard'>
          <Table striped bordered hover className='center'>
            <thead>
              <tr>
                <th>Ranking</th>
                <th>Userame     </th>
                <th>Category                </th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderBoard}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default Stats;
