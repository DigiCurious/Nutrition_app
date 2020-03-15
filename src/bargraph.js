import React, { Component } from 'react'
import * as d3 from 'd3';
import $ from 'jquery';

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
      //this.props.highlight()
    }

    componentDidUpdate(){
      this.drawBarChart();
      //this.props.highlight()
    }

    handleFilter(){
      let newData = [... this.props.dataSet];
      let filteredData = newData.filter((d)=>(d.name.includes(this.state.filterText)))
      return filteredData;

    }

    drawBarChart(){
      let colors = this.props.theme.colors
      //console.log(colors);
      //console.log($( ".bargraph" ).width())
      //console.log(this.props.dataSet);
      //let data = this.handleFilter();
      let data = this.props.data;

      //console.log(data)
      let width = 640
      //console.log(width)

      let height = data.length * 18
      //console.log(width)
      d3.select(this.refs.bargraph).selectAll("svg").remove();

      const svg = d3.select(this.refs.bargraph)
        .append('svg')
        .attr('width', "100%")
        .attr('height', height)

      var dataAmounts = [];
      data.map(d => {dataAmounts.push(d.quantity)})
      //console.log(dataAmounts);
      var scale = d3.scaleLinear()
                  .domain([d3.min(dataAmounts), 200])
                  .range([1, width])
                  .clamp(true)

      //console.log(scale(data[1].amount));

      var barPadding = 5;
      var barHeight = (height/data.length - barPadding);
      //console.log(data);

        svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("y", function(d,i){return (i * (barHeight + barPadding))})
        .attr("x", width/3)
        .attr("height", barHeight)
        .attr("width", function(d){return (scale(d.quantity)*.66 + "px")})
        .attr("fill", function(d){let color = (d.quantity >= 100) ? colors.shapes : colors.lines; return color})

        svg.selectAll("line")
        .data(data)
        .enter()
        .append("line")
        .attr("y1", 0)
        .attr("y2", (barHeight + barPadding)*data.length)
        .attr("x1", ()=>(width/3 + scale(100)*.66 + "px"))
        .attr("x2", ()=>(width/3 + scale(100)*.66 + "px"))
        .attr("style", "stroke:" + colors.shapes + ";stroke-width:1")

        svg.selectAll('text')
          .data(data)
          .enter()
          .append('text')
          .attr('x', 0)
          .attr('y', (d, i) => (barHeight - 3  + (i * (barHeight + barPadding))))
          .attr('id', d=>d.name)
          .attr("style", "font-size: 12px")
          .style("fill:",colors.fonts)
          .text(d => {let quantity = d.quantity != "Nan" ? Math.round(d.quantity) : 0; return d.name + ' - ' + quantity + '%'})
      }



    render() {
        //this.props.highlight();
        //console.log(this.props.dataSet);
        return(
          <div className="bargraph" ref="bargraph">
            <h5>Micros</h5>
          </div>
        );
    }
}
export default Bargraph
