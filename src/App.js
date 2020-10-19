import React, {useState, useEffect} from 'react';
import * as d3 from 'd3';
import './App.css';

function App() {
  const [data, setData] = useState(
    [
      {x: 1.0, y1: 0.001, y2: 0.63},
      {x: 2.0, y1: 0.003, y2: 0.84},
      {x: 3.0, y1: 0.024, y2: 0.56},
      {x: 4.0, y1: 0.054, y2: 0.22},
      {x: 5.0, y1: 0.062, y2: 0.15},
      {x: 6.0, y1: 0.100, y2: 0.08},
      {x: 7.0, y1: 0.176, y2: 0.20},
      {x: 8.0, y1: 0.198, y2: 0.71},
      {x: 9.0, y1: 0.199, y2: 0.65},
    ]
  );

  const initialiseData = () => {
    var pxX = 600, pxY = 300;

    var scX = d3.scaleLinear()
      .domain( d3.extent(data, d => d["x"] ) )
      .range( [0, pxX] );

    var scY1 = d3.scaleLinear()
      .domain(d3.extent(data, d => d["y1"] ) )
      .range( [pxY, 0] );

    var scY2 = d3.scaleLinear()
      .domain(d3.extent(data, d => d["y2"] ) )
      .range( [pxY, 0] );

    d3.select( "svg" )
      .append( "g" ).attr( "id", "ds1")
      .selectAll( "circle" )
      .data(data).enter().append("circle")
      .attr( "r", 5 ).attr( "fill", "green" )
      .attr( "cx", d => scX(d["x"]) )
      .attr( "cy", d => scY1(d["y1"]) );

    d3.select( "svg" )
      .append( "g" ).attr( "id", "ds2")
      .selectAll( "circle" )
      .data(data).enter().append("circle")
      .attr( "r", 5 ).attr( "fill", "blue" )
      .attr( "cx", d => scX(d["x"]) )
      .attr( "cy", d => scY2(d["y2"]) );

    var lineMaker = d3.line()
      .x( d => scX( d["x"] ) )
      .y( d => scY1( d["y1"] ) );

    d3.select( "#ds1" )
      .append( "path" )
      .attr( "fill", "none").attr( "stroke", "red" )
      .attr( "d", lineMaker(data) );

    lineMaker.y( d => scY2( d["y2"] ) );

    d3.select( "#ds2" )
      .append( "path" )
      .attr( "fill", "none").attr( "stroke", "cyan" )
      .attr( "d", lineMaker(data) );

  }

  useEffect(() => {
    if (data) {
      initialiseData()
    }

  }, [data])

  return (
    <div className="App">
      <svg id="demo1" width="600" height="300" style={{background: "lightgrey"}}/>

    </div>
  );
}

export default App;
