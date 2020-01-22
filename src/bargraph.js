import React, { Component } from 'react'
import * as d3 from 'd3';
import $ from 'jquery';
import SearchBar from './searchBar';

class Bargraph extends Component {
    constructor(props) {
        super(props)
        this.state = {
          filterText: '',
        }
        this.drawBarChart = this.drawBarChart.bind(this)
    }

    componentDidMount(){
      this.drawBarChart();
    }

    componentDidUpdate(){
      this.drawBarChart();
    }

    handleFilter(){
      //console.log(this.props.dataSet);
      let newData = [... this.props.dataSet];
      let filteredData = newData.filter((d)=>(d.name.includes(this.state.filterText)))
      return filteredData;

    }

    drawBarChart(){
      console.log($( ".bargraph" ).width())
      //console.log(this.props.dataSet);
      let data = this.handleFilter();
      let width = $( ".bargraph" ).width()*.75;
      console.log(width)
      let height = data.length * 50
      //console.log(width)
      d3.select(this.refs.bargraph).selectAll("svg").remove();

      const svg = d3.select(this.refs.bargraph)
        .append('svg')
        .attr('width', "100%")
        .attr('height', height)

      var dataAmounts = [];
      data.map(d => {dataAmounts.push(d.amount)})
      //console.log(dataAmounts);
      var scale = d3.scaleLinear()
                  .domain([d3.min(dataAmounts), d3.max(dataAmounts)])
                  .range([1, width])
                  .clamp(false)

      //console.log(scale(data[1].amount));

      var barPadding = 5;
      var barHeight = (height/data.length - 5);
      //console.log(data);

        svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("y", function(d,i){return (i * (barHeight + barPadding))})
        .attr("x", width/3)
        .attr("height", barHeight)
        .attr("width", function(d){return (scale(d.amount) + "px")})
        .attr("fill", "blue")

        svg.selectAll('text')
          .data(data)
          .enter()
          .append('text')
          .attr('x', 10)
          .attr('y', (d, i) => i * (barHeight + barPadding) + barHeight/2)
          .text(d => d.name)
      }

    render() {
        //console.log(this.props.dataSet);
        return(
          <div className="bargraph" ref="bargraph">
            <SearchBar
              filterText= {this.state.filterText}
              onChange = {(term) => {this.setState({filterText: term});}}
            />
          </div>
        );
    }
}
export default Bargraph
