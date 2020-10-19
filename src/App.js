import React, {useState, useEffect} from 'react';
import * as d3 from 'd3';
import * as exampleData from './examples-simple.tsv';
import './App.css';

function App() {
  const [data, setData] = useState(
    [
      {x: 100, y: 50, fill: "red", radius: 20},
      {x: 200, y: 100, fill: "blue", radius: 50},
      {x: 300, y: 150, fill: "green", radius: 30},
      {x: 400, y: 200, fill: "yellow", radius: 25},
      {x: 500, y: 250, fill: "purple", radius: 10},
    ]
  );

  const initialiseData = () => {
      d3.select( "svg" )
        .selectAll( "circle" )
        .data( data )
        .enter()
        .append( "circle" )
        .attr( "r", function(d) { return d["radius"] } )
        .attr( "fill", function(d) { return d["fill"] } )
        .attr( "cx", function(d) { return d["x"] } )
        .attr( "cy", function(d) { return d["y"] } );
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
