import React, {useState, useEffect} from 'react';
import * as d3 from 'd3';
import './App.css';

function App() {
  const [currentYear, setCurrentYear] = useState(2020);
  const [maxYear, setMaxYear] = useState(30);
  const [data, setData] = useState(
    [
      {x: 2020, y1: 0.001, y2: 0.63},
      {x: 2027, y1: 0.003, y2: 0.84},
      {x: 2031, y1: 0.024, y2: 0.56},
      {x: 2035, y1: 0.054, y2: 0.22},
      {x: 2040, y1: 0.062, y2: 0.15},
      {x: 2050, y1: 0.062, y2: 0.15}
    ]
  );

  const initialiseData = () => {
    var svg = d3.select( "svg" );

    var pxX = svg.attr( "width" );
    var pxY = svg.attr( "height" );

    var makeScale = function( accessor, range ) {
      console.log("RANGE", accessor, range)
      return d3.scaleLinear()
        .domain( d3.extent( data, accessor ) )
        .range( range )
        .nice()
    }

    var scX = makeScale( d => d["x"], [0, pxX - 50]);


    var g = d3.axisBottom( scX ).tickValues(
      data.map(d => {
        console.log("d x", d.x)
        return d.x 
      })
    )


    svg.append( "g" )
    .attr( "transform", "translate(" + 25 + "," + pxY/2 + ")")
    .call( g );

    svg.selectAll(".domain").attr( "visibility", "hidden" );
    svg.selectAll( ".tick" ).select("line").attr( "stroke", "red" ).attr( "stroke-width", 2)

    // g.select( ".domain" ).attr( "visibility", "hidden" )
    // g.selectAll( ".tick" ).select("line").attr( "stroke", "red" ).attr( "stroke-width", 2)

    

}

  useEffect(() => {
    if (data) {
      initialiseData();
    }

  }, [data])

  return (
    <div className="App">
      <svg id="demo1" width="1200" height="400" style={{background: "lightgrey"}}/>
    </div>
  );
}

export default App;
