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
    var svg = d3.select( "svg" );

    var pxX = svg.attr( "width" );
    var pxY = svg.attr( "height" );

    var makeScale = function( accessor, range ) {
      return d3.scaleLinear()
        .domain( d3.extent( data, accessor ) )
        .range( range ).nice()
    }

    var scX = makeScale( d => d["x"], [0, pxX] );
    var scY1 = makeScale( d => d["y1"], [pxY, 0] );
    var scY2 = makeScale( d => d["y2"], [pxY, 0] );

    var drawData = function( g, accessor, curve ) {
      g.selectAll( "circle" ).data(data).enter()
        .append("circle")
        .attr( "r", 5 )
        .attr( "cx", d => scX(d["x"]) )
        .attr( "cy", accessor );

      var lnMkr = d3.line().curve( curve )
        .x( d=>scX(d["x"]) ).y( accessor );

      g.append( "path" ).attr( "fill", "none" )
        .attr( "d", lnMkr( data ) );
    }

    var g1 = svg.append("g");
    var g2 = svg.append("g");

    drawData( g1, d => scY1(d["y1"]), d3.curveStep );
    drawData( g2, d => scY2(d["y2"]), d3.curveNatural );

    g1.selectAll( "circle" ).attr( "fill", "green" );
    g1.selectAll( "path" ).attr( "stroke", "cyan" );

    g2.selectAll( "circle" ).attr( "fill", "blue" );
    g2.selectAll( "path" ).attr( "stroke", "red" );

    var axMkr = d3.axisRight( scY1 );
    axMkr( svg.append("g") );

    axMkr = d3.axisLeft( scY2 );

    svg.append( "g" )
    .attr("transform", "translate(" + pxX + ",0)" )
    .call( axMkr );

  svg.append( "g" ).call( d3.axisTop( scX ) )
    .attr( "transform", "translate(0," + pxY + ")");


  }

  useEffect(() => {
    if (data) {
      initialiseData();
    }

  }, [data])

  return (
    <div className="App">
      <svg id="demo1" width="600" height="300" style={{background: "lightgrey"}}/>

    </div>
  );
}

export default App;
