import React, { Component } from "react";
import * as d3 from "d3";

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
    const percentageRight = questionsPosed ? Math.floor((questionsRight / questionsPosed) * 100) : 0;
    let gameMode = this.props.gameMode;
    let scoreBoard = <p>Your All-Time Score: {percentageRight}%</p>;

    return (
      <div className='scoreboard'>{scoreBoard}</div>
    );
  }
}

export default Stats;
