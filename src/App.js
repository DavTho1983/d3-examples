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
      amt: 2000
    },
    {
      x: 2020,
      cx: 0,
      colour: "#247BA0",
      y1: 0,
      y2: 100,
      rad: 10,
      amt: 5000
    },
    {
      x: 2020,
      cx: 0,
      colour: "#3F762C",
      y1: 0,
      y2: 150,
      rad: 10,
      amt: 7500
    },
    {
      x: 2020,
      cx: 0,
      colour: "#F25F5C",
      y1: 0,
      y2: 200,
      rad: 10,
      amt: 5000
    },
    {
      x: 2022,
      cx: 0,
      colour: "#0C3957",
      y1: 0,
      y2: 250,
      rad: 10,
      amt: 9000
    },
    {
      x: 2055,
      cx: 0,
      colour: "#BF802F",
      y1: 0,
      y2: 300,
      rad: 10,
      amt: 25000
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


  const x = d3.scaleLinear()
  .domain( d3.extent( data, d => d["x"] ) )
  .range( [0, pxX - 200] )
  .nice()

  const x1 = d3.scaleLinear()
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
  .range([20, 150]);





    for (let dotindex=0; dotindex<data.length; dotindex++) {
      if (data[dotindex - 1]) {
        if (data[dotindex - 1].x === data[dotindex].x) {
          data[dotindex].y1 = data[dotindex -1].y1 -20
        }
      }
    }


    const _data = data.reduce(
        (r, v, _, __, k = v["x"]) => ((r[k] || (r[k] = [])).push(v), r),
        []
      )

    svg.append( "g" )
    .attr( "transform", "translate(" + 50 + "," + (pxY - 200) + ")")
    .call( g )
    .selectAll(".tick text")
    .attr("fill", "#7A7A7A")

    svg.selectAll("circle")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "circles")
      .append("circle")
      .attr( "transform", "translate(" + 100 + "," + 650 + ")")
      .attr("fill", "white")
      .attr("stroke", d => d.colour)
      .attr("stroke-width", "2px")
      .attr("cx", d => x(d.x1))
      .attr("cy", d => y1(d.y1))
      .attr("r", d => rad(d.rad));

      const ticked = () => {
        goalAmounts
          .attr("cx", (d => (2 * d.x)))
          .attr("cy", d => d.y2);
      }

      let i = 0;
    const goalAmounts = svg.selectAll("circle .circles")
      .append( "g" )
      .attr("class", "goalAmounts")
      .data(data)
      .enter()
      .append("circle")
      .attr( "transform", "translate(" + 650 + "," + 200 + ")")
      .attr("fill", d => {
        return d.colour}
      )
      .attr("cx", d => (d.x))
      .attr("cy", (d, index) => {

        let _y = y2(d.y2)
        
        if (_data[d.x].length > 1 && _data[i-1]) {
          i++
          // console.log("GROUP", _data[d.x][i -1].y2, i)
          _y =  _data[d.x][i -1].y2
        } else {
          i = 0
        }
        return _y
      })
      .attr("r", d => amt(d.amt));

    svg.selectAll(".domain")
      .attr("stroke", "#BDBDBD")
      .attr("stroke-width", "2px")
      .attr( "transform", "translate(" + 50 + "," + 150 + ")")

    svg.selectAll(".tick line")
    .attr("stroke", "#BDBDBD")
    .attr("stroke-width", "4px")
    .attr( "transform", "translate(" + 50 + "," + 150 + ")")
      
    svg.selectAll( ".tick text")
      .attr("font-size", 20)
      .attr( "transform", "translate(" + 50 + "," + tickLabelOffset + ")")
      .attr("font-weight", "bold")
      .attr("dy", "0.5em")

      d3.forceSimulation(data)
      // .force('charge', d3.forceManyBody().strength(-200))
      .force('x', scX(d3.forceX().x(function(d) {
        if (d.x > maxYear) {
          return maxYear
        } else {
          return (d.x + 5 *Math.random());
        }
      })))
      .force("y", d3.forceY(d => (d.y2 * Math.random())))
      .force('collision', d3.forceCollide().radius(d => amt(d.amt/2)+ 40))
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
