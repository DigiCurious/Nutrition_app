import React, { Component } from 'react'
import * as d3 from 'd3';
class Bargraph extends Component {
    constructor(props) {
        super(props)
        this.drawMacros = this.drawMacros.bind(this)
    }

    componentDidMount(){
      this.drawMacros()
    }

    componentDidUpdate(){
      this.drawMacros()
    }

    drawMacros(){

    	// set the dimensions and margins of the graph
    var width = 450;
    var height = 450;
    var margin = 40;

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    var radius = Math.min(width, height) / 2 - margin

    // append the svg object to the div called 'my_dataviz'

    d3.select(this.refs.piegraph).selectAll("svg").remove();

    var svg = d3.select(this.refs.piegraph)
      .append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // Create dummy data
    var dataset = this.props.dataSet;
    //console.log(dataset);
    var theSum = 0;
    dataset.forEach((dPoint) =>{
      theSum += dPoint.amount
    });
    //console.log(theSum)
    var newData = [];
    dataset.forEach((d)=>{
      newData.push((d.amount/theSum)*100)
    })
    //console.log(newData);



    // set the color scale
    var color = d3.scaleOrdinal()
      .domain(newData)
      .range(["#98abc5", "#8a89a6", "#7b6888"])

    // Compute the position of each group on the pie:
    var pie = d3.pie()
      .value(function(d) {return d.value; })
    var data_ready = pie(d3.entries(newData))

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
      .selectAll('sector')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', d3.arc()
        .innerRadius(100)
        .outerRadius(radius)
      )
      .attr('fill', function(d){ return(color(d.data.key)) })

    }


    render() { return(<div className="piegraph" ref="piegraph"></div>); }
}
export default Bargraph
