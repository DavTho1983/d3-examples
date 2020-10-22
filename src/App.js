import React, {useState, useEffect} from 'react';
import * as d3 from 'd3';
import './App.css';

function App() {
  const [currentYear, setCurrentYear] = useState(2020);
  const [maxYear, setMaxYear] = useState(30);
  const [data, setData] = useState(
   [{
      x: 2020,
      colour: "purple",
      y1: 0,
      y2: 50,
      rad: 10,
      amt: 300
    },
    {
      x: 2029,
      colour: "red",
      y1: 0,
      y2: 50,
      rad: 10,
      amt: 500
    },
    {
      x: 2031,
      colour: "yellow",
      y1: 0,
      y2: 50,
      rad: 10,
      amt: 100
    },
    {
      x: 2031,
      colour: "green",
      y1: 15,
      y2: 50,
      rad: 10,
      amt: 20
    },
    {
      x: 2031,
      colour: "pink",
      y1: 30,
      y2: 50,
      rad: 10,
      amt: 1000
    },
    {
      x: 2049,
      colour: "blue",
      y1: 0,
      y2: 50,
      rad: 10,
      amt: 200
    },
    {
      x: 2050,
      colour: "orange",
      y1: 0,
      y2: 50,
      rad: 10,
      amt: 500
    }
  ]
  );

  const initialiseData = () => {
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

    const scX = makeScale( d => d["x"], [0, pxX - 200]);
    
  
    const g = d3.axisBottom( scX ).tickValues(
      data.map((d, index) => {
        if (index > 0 && index !== data.length - 1) {
          if (data[index].x !== data[index + 1].x && (data[index + 1].x && (!(data[index].x < data[index - 1].x - 1)) || !(data[index].x < data[index + 1].x - 1))) {
            console.log("THIS D", data[index].x !== data[index - 1].x, d.x)
            return ""
          }
        }
        return d.x 
      })
    )

  const x = d3.scaleLinear()
  .domain( d3.extent( data, d => d["x"] ) )
  .range( [0, pxX - 200] )
  .nice()

const y1 = d3.scaleLinear()
  .domain([0, 100])
  .range( [0, 100] );

const y2 = d3.scaleLinear()
  .domain([0, 100])
  .range( [0, 100] );

const rad = d3.scaleLinear()
  .domain(d3.extent(data, d => d.rad))
  .range([3, 10]);

  const amt = d3.scaleLinear()
  .domain(d3.extent(data, d => d.amt))
  .range([20, 100]);

    svg.append( "g" )
    .attr( "transform", "translate(" + 50 + "," + pxY/2 + ")")
    .call( g )
    .selectAll(".tick text")
    .attr("fill", "#7A7A7A")

    svg.selectAll("circle")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "circles")
      .append("circle")
      .attr( "transform", "translate(" + 100 + "," + 350 + ")")
      .attr("fill", "white")
      .attr("stroke", d => d.colour)
      .attr("stroke-width", "2px")
      .attr("cx", d => x(d.x))
      .attr("cy", d => y1(d.y1))
      .attr("r", d => rad(d.rad));

    svg.selectAll("circle .circles")
      .data(data)
      .enter()
      .append("circle")
      .attr( "transform", "translate(" + 100 + "," + 100 + ")")
      .attr("fill", d => d.colour)
      .attr("cx", d => x(d.x))
      .attr("cy", d => y2(d.y2))
      .attr("r", d => amt(d.amt));

    svg.selectAll(".domain")
      .attr("stroke", "#BDBDBD")
      .attr("stroke-width", "4px")
      .attr( "transform", "translate(" + 50 + "," + 120 + ")")

    svg.selectAll(".tick line")
      .attr("visibility", "hidden")
      
    svg.selectAll( ".tick text")
      .attr("font-size", 20)
      .attr( "transform", "translate(" + 0 + "," + 70 + ")")
      .attr("font-weight", "bold")
      .attr("dy", "0.5em")
      
  }

  

  useEffect(() => {
    if (data) {
      initialiseData();
    }

  }, [data])

  return (
    <div className="App">
      <svg id="demo1" width="1200" height="400" style={{background: "white"}}/>
    </div>
  );
}

export default App;
