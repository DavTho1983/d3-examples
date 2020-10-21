import React, {useState, useEffect} from 'react';
import * as d3 from 'd3';
import './App.css';

function App() {
  const [currentYear, setCurrentYear] = useState(2020);
  const [maxYear, setMaxYear] = useState(30);
  const [data, setData] = useState(
    [
      {x: 2020, colour: "purple", y1: 0.001, y2: 0.63},
      {x: 2027, colour: "red", y1: 0.003, y2: 0.84},
      {x: 2031, colour: "yellow", y1: 0.024, y2: 0.56},
      {x: 2031, colour: "green", y1: 0.054, y2: 0.22},
      {x: 2040, colour: "blue", y1: 0.062, y2: 0.15},
      {x: 2050, colour: "orange", y1: 0.062, y2: 0.15}
    ]
  );

  const initialiseData = () => {
    let _data = data.reduce(
      (r, v, _, __, k = v.x) => ((r[k] || (r[k] = [])).push(v), r),
      {}
    );
    console.log("GROUPED DATA", _data)
    const svg = d3.select( "svg" );
    const pxX = svg.attr( "width" );
    const pxY = svg.attr( "height" );

    const makeScale = ( accessor, range ) => {
      console.log("RANGE", accessor, range)
      return d3.scaleLinear()
        .domain( d3.extent( data, accessor ) )
        .range( range )
        .nice()
    }

    const scX = makeScale( d => d["x"], [0, pxX - 50]);

    const g = d3.axisBottom( scX ).tickValues(
      data.map(d => {
        return d.x 
      })
    )


    svg.append( "g" )
    .attr( "transform", "translate(" + 25 + "," + pxY/2 + ")")
    .call( g );

    svg.selectAll(".domain").attr( "visibility", "hidden" );

    svg.selectAll( ".tick" )
      .data(data)
      .append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 5)
      .attr("fill", "white")
      .attr("stroke", (data) => { return data.colour})
      .attr("stroke-width", "4px")

    svg.selectAll(".tick line")
      .attr("visibility", "hidden")
      
    svg.selectAll( ".tick text")
      .attr("font-size", 20)
      .attr("dy", "1.5em")

    svg.selectAll(".tick", "circle")
    .each(d => {
      var dot = d3.select(d, "circle")
      console.log("DOT", dot)
      return 
    })

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
