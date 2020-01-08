import React, { Component } from "react";
import * as d3 from "d3";
import Table from 'react-bootstrap/Table';

class Stats extends Component {
  componentDidMount() {
    // fetch(`/getGraphData/${chosentopic}/College`)
    // .then(res => res.json)
    // .catch(err => console.log(err))

    // fetch(`/getGraphData/${chosentopic}/HighSchool`)
    // .then(res => res.json)
    // .catch(err => console.log(err))

    // fetch(`/getGraphData/${chosentopic}/$PHD`)
    // .then(res => res.json)
    // .catch(err => console.log(err))




    this.drawChart();

  }
  drawChart() {
    const data = [12, 5, 6, 20, 50, 10];
    var models = [{
      "model_name":"Middle School",
      "field1":19,
      "field2":83,
      "field3":50, 
    },
    {
      "model_name":"High School",
      "field1":67,
      "field2":93,
      "field3": 20,
    },
    {
      "model_name":"College",
      "field1":40,
      "field2":56,
      "field3":100,
    },
    {
      "model_name":"You",
      "field1":60,
      "field2":80,
      "field3":10,
    }];
    var container = d3.select('#graph'),
      width = 720,
      height = 420,
      margin = {top: 130, right: 120, bottom: 130, left: 150},
      barPadding = .2,
      axisTicks = {qty: 5, outerSize: 0, dateFormat: '%m-%d'};
    var svg = container
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    var xScale0 = d3.scaleBand().range([0, width - margin.left - margin.right]).padding(barPadding);
    var xScale1 = d3.scaleBand();
    var yScale = d3.scaleLinear().range([height - margin.top - margin.bottom, 0]);
    var xAxis = d3.axisBottom(xScale0).tickSizeOuter(axisTicks.outerSize);
    var yAxis = d3.axisLeft(yScale).ticks(axisTicks.qty).tickSizeOuter(axisTicks.outerSize);
    xScale0.domain(models.map(d => d.model_name));
    xScale1.domain(['field1', 'field2', 'field3']).range([0, xScale0.bandwidth()]);
    yScale.domain([0, d3.max(models, d => {
      if (d.field1 > d.field2) {
        return d.field1 > d.field3 ? d.field1 : d.field3
      }
      else {
        return d.field2 > d.field3 ? d.field2 : d.field3
      }
    })]);
    var model_name = svg.selectAll(".model_name")
      .data(models)
      .enter().append("g")
      .attr("class", "model_name")
      .attr("transform", d => `translate(${xScale0(d.model_name)},0)`);
    model_name.selectAll(".bar.field1")
      .data(d => [d])
      .enter()
      .append("rect")
      .attr("class", "bar field1")
      .style("fill","blue")
      .attr("x", d => xScale1('field1'))
      .attr("y", d => yScale(d.field1))
      .attr("width", xScale1.bandwidth())
      .attr("height", d => height - margin.top - margin.bottom - yScale(d.field1));
    model_name.selectAll(".bar.field2")
      .data(d => [d])
      .enter()
      .append("rect")
      .attr("class", "bar field2")
      .style("fill","red")
      .attr("x", d => xScale1('field2'))
      .attr("y", d => yScale(d.field2))
      .attr("width", xScale1.bandwidth())
      .attr("height", d =>  height - margin.top - margin.bottom - yScale(d.field2));
    model_name.selectAll(".bar.field3")
      .data(d => [d])
      .enter()
      .append("rect")
      .attr("class", "bar field3")
      .style("fill","green")
      .attr("x", d => xScale1('field3'))
      .attr("y", d => yScale(d.field3))
      .attr("width", xScale1.bandwidth())
      .attr("height", d => height - margin.top - margin.bottom - yScale(d.field3));
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
      .call(xAxis);
    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);
    svg.append("circle").attr("cx", -10).attr("cy", -70).attr("r", 6).style("fill", "blue");
    svg.append("circle").attr("cx", -10).attr("cy", -50).attr("r", 6).style("fill", "red");
    svg.append("circle").attr("cx", -10).attr("cy", -30).attr("r", 6).style("fill", "green");
    svg.append("text").attr("x", 0).attr("y", -70).text("Gametype: Film").style("font-size", "15px").style("fill", "blue").attr("alignment-baseline","middle");
    svg.append("text").attr("x", 0).attr("y", -50).text("Gametype: Music").style("font-size", "15px").style("fill", "red").attr("alignment-baseline","middle");
    svg.append("text").attr("x", 0).attr("y", -30).text("Gametype: Politics").style("font-size", "15px").style("fill", "green").attr("alignment-baseline","middle");    
  }

  render() {
    const questionsPosed = this.props.stats.gamesPlayed * 10;
    const questionsRight = this.props.stats.correctAnswers;
    const PercentageRightForThisGame = this.props.correctResponses.length * 10;
    const percentageRight = questionsPosed ? Math.floor((questionsRight / questionsPosed) * 100) : 0;
    let gameMode = this.props.gameMode;
    let graph = <div id='graph'></div>;
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
          {graph}
        </div>
        <div className='leaderboard'>
          <Table striped bordered hover className='center'>
            <thead>
              <tr>
                <th>Ranking</th>
                <th>Username     </th>
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
