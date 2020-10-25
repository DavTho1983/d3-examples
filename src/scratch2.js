import React, {useState, useEffect} from 'react';
import * as d3 from 'd3';
import './App.css';

function App() {
  const [maxYear, setMaxYear] = useState();
  const [data, setData] = useState(
   [{
      x: 2020,
      cx: 0,
      colour: "#69306D",
      y1: 0,
      y2: 50,
      rad: 10,
      amt: 5000
    },
    {
      x: 2020,
      cx: 0,
      colour: "#247BA0",
      y1: 0,
      y2: 50,
      rad: 10,
      amt: 5000
    },
    {
      x: 2020,
      cx: 0,
      colour: "#3F762C",
      y1: 0,
      y2: 50,
      rad: 10,
      amt: 5000
    },
    {
      x: 2020,
      cx: 0,
      colour: "#F25F5C",
      y1: 0,
      y2: 50,
      rad: 10,
      amt: 5000
    },
    {
      x: 2022,
      cx: 0,
      colour: "#0C3957",
      y1: 0,
      y2: 170,
      rad: 10,
      amt: 5000
    },
    {
      x: 2055,
      cx: 0,
      colour: "#BF802F",
      y1: 0,
      y2: 50,
      rad: 10,
      amt: 15000
    }
  ]
  );

  

  const initialiseData = () => {
    const svg = d3.select( "svg" );
    const pxX = svg.attr( "width" );
    const pxY = svg.attr( "height" );
    let tickLabelOffset = 170;

    
    
    let minDotX = Math.min.apply(Math, data.map(function(o) { return o.y1; }))
    if (minDotX < -20) {
      tickLabelOffset += minDotX + 20;
    }

    const makeScale = ( arr, accessor, range ) => {
      // console.log("RANGE", accessor, range)
      return d3.scaleLinear()
        .domain( d3.extent( arr, accessor ) )
        .range( range )
        .nice()
    }

    const scX = makeScale( data, d => d.x, [0, pxX - 200]);
    const scX1 = makeScale(data, d => d.x1, [0, pxX - 2020]);
    const scY = d3.scaleLinear().domain([0, 100]).range([0, 100]);

    const thisYear = new Date().getFullYear()
    
    let tickTens = [];
    for (let i=thisYear; i<maxYear; i++) {
      if (i % 10 === 0) {
        tickTens.push(i)
      }
    }
     
    const g = d3.axisBottom( scX ).tickValues(
      
      tickTens.map((tickVal) => {
        return tickVal
      })
    )
    
    const rad = d3.scaleLinear()
      .domain(d3.extent(data, d => d.rad))
      .range([3, 10]);
    
    const amt = d3.scaleLinear()
      .domain(d3.extent(data, d => d.amt))
      .range([20, 50]);
    
    for (let dotindex = 0; dotindex < data.length; dotindex++) {
      if (data[dotindex - 1]) {
        if (data[dotindex - 1].x1 === data[dotindex].x1) {
          data[dotindex].scY = data[dotindex - 1].scY - 20
        }
      }
    }
    
    const ticked = () => {
      circles
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
    }
    
    
    svg.append("g")
      .attr("transform", "translate(" + 50 + "," + (pxY - 200) + ")")
      .call(g)
      .selectAll(".tick text")
      .attr("fill", "#7A7A7A")
    
    const circles = svg.append("g")
      .attr("class", "circles")
      .attr( "transform", "translate(" + 600 + "," + 100 + ")")
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("fill", d => d.colour)
      .attr("stroke-width", "2px")
      .attr("cx", d => (d.x))
      .attr("cy", d => (d.y2))
      .attr("r", d => amt(d.amt));
    
    svg.selectAll(".domain")
      .attr("stroke", "#BDBDBD")
      .attr("stroke-width", "2px")
      .attr("transform", "translate(" + 50 + "," + 150 + ")")
    
    svg.selectAll(".tick line")
      .attr("stroke", "#BDBDBD")
      .attr("stroke-width", "4px")
      .attr("transform", "translate(" + 50 + "," + 150 + ")")
    
    svg.selectAll(".tick text")
      .attr("font-size", 20)
      .attr("transform", "translate(" + 50 + "," + tickLabelOffset + ")")
      .attr("font-weight", "bold")
      .attr("dy", "0.5em")
    
    d3.forceSimulation(data)
      .force("x", d3.forceX(d => 20*d.x))
      .force("y", d3.forceY(d => 2*(d.y2)))
      .force('collision', d3.forceCollide().radius(d => amt(d.amt)))
      .on("tick", ticked);
      
  }

  

  useEffect(() => {
    if (data) {
      setMaxYear(Math.max.apply(Math, data.map(function(o) { return o.x; })))
    }

    if (maxYear) {
      initialiseData();
    }

  }, [data,maxYear])

  return (
    <div className="App">
      <svg id="demo1" width="1200" height="700" style={{background: "white"}}/>
    </div>
  );
}

export default App;
