import React, { Component } from "react";
import * as d3 from "d3";
import Table from 'react-bootstrap/Table';

class Stats extends Component {
  componentDidMount() {
    this.drawChart();
  }
  drawChart() {
    const data = [12, 5, 6, 20, 50, 10];
    const h = 500; const x= 400
    
    const svg = d3.select("body")
    .append("svg")
    .attr("width", 500)
    .attr("height", 500)
    .style("margin-left", 100);
                  
    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 70)
      .attr("y", (d, i) => h - 10 * d)
      .attr("width", 65)
      .attr("height", (d, i) => d * 10)
      .attr("fill", "green")
    }
  render() {
    const questionsPosed = this.props.stats.gamesPlayed * 10;
    const questionsRight = this.props.stats.correctAnswers;
    const PercentageRightForThisGame = this.props.correctResponses.length * 10;
    const percentageRight = questionsPosed ? Math.floor((questionsRight / questionsPosed) * 100) : 0;
    let gameMode = this.props.gameMode;
    let scoreBoard = <p>Your All-Time Score: {percentageRight}%<br/>Your Score For This Game: {PercentageRightForThisGame}%</p>;
    console.log(`questionsPosed: ${questionsPosed}, questionsRight: ${questionsRight}, percentageRight: ${percentageRight}, PercentageRightForThisGame: ${PercentageRightForThisGame}`);
    
    // TODO: pull leaderBoard data from MongoDB
    const leaderBoard = [];
    for (let i = 1; i <= 10; i += 1) {
      let eachLeader = (
        <tr>
          <td>{i}</td>
          <td>Cat</td>
          <td>{i * 10}</td>
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
