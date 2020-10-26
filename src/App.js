import React, {useState, useEffect} from 'react';
import * as d3 from 'd3';
import './App.css';

function App() {
  const [maxYear, setMaxYear] = useState();
  const [data, setData] = useState(
   [{
      x1: 2020,
      colour: "#69306D",
      y1: 0,
      y2: 50,
      rad: 10,
      amt: 2000
    },
    {
      x1: 2021,
      colour: "#247BA0",
      y1: 0,
      y2: 100,
      rad: 10,
      amt: 5000
    },
    {
      x1: 2020,
      colour: "#3F762C",
      y1: 0,
      y2: 150,
      rad: 10,
      amt: 7500
    },
    {
      x1: 2020,
      colour: "#F25F5C",
      y1: 0,
      y2: 200,
      rad: 10,
      amt: 5000
    },
    {
      x1: 2022,
      colour: "#0C3957",
      y1: 0,
      y2: 250,
      rad: 10,
      amt: 9000
    },
    {
      x1: 2055,
      colour: "#BF802F",
      y1: 0,
      y2: 300,
      rad: 10,
      amt: 25000
    }
  ]
  );

  const thisYear = new Date().getFullYear()

  const initialiseData = () => {
    const svg = d3.select( "svg" );
    const pxX = svg.attr( "width" );
    const pxY = svg.attr( "height" );
    let tickLabelOffset = 170;
    
    setData(data.sort(function(a, b) {
      return a.x1 - b.x1;
  }))
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

    //SCALES//
    //-------------------------------------------------------------------------------------------------//

    const scX = makeScale( data, d => d.x1, [0, pxX - 200]);
    const scX2 = d3.scaleLinear()
    .domain([2020, 2080])
    .range( [0, pxX - 200] );
    const scY = d3.scaleLinear()
      .domain([0, 100])
      .range( [0, 100] );

    const rad = d3.scaleLinear() //scale for radius of small dots on xaxis
      .domain(d3.extent(data, d => d.rad))
      .range([3, 10]);
    
    const amt = d3.scaleLinear() //scale for radius of large circle      .domain(d3.extent(data, d => d.amt))
      .domain(d3.extent(data, d => d.amt))
      .range([20, 150]);
    
    //-------------------------------------------------------------------------------------------------//
    //END OF SCALES//
    
    //stacks small dots on x axis
    let _newData = data;
    for (let dotindex=0; dotindex<data.length; dotindex++) {
      if (_newData[dotindex - 1]) {
        if (_newData[dotindex - 1].x1 === _newData[dotindex].x1) {
          _newData[dotindex].y1 = _newData[dotindex -1].y1 -20
        }
      }
    }

    setData(_newData)

    console.log("DATA: ", data)

    //creates array of multiples of ten for x axis labels
    let tickTens = [];
    for (let i=thisYear; i<maxYear; i++) {
      if (i % 10 === 0) {
        tickTens.push(i)
      }
    }
    
    //maps array of multiples of ten to values at ticks on x axis
    const g = d3.axisBottom( scX ).tickValues(
      tickTens.map((tickVal) => {
        return tickVal
      })
    )

      //Groups data into arrays by goal year
      const _data = data.reduce(
          (r, v, _, __, k = v["x"]) => ((r[k] || (r[k] = [])).push(v), r),
          []
        )

      //CREATE X AXIS//
      //---------------------------------------------------------------------------//

      svg.append( "g" )
      .attr( "transform", "translate(" + 50 + "," + (pxY - 200) + ")")
      .call( g )
      .selectAll(".tick text")
      .attr("fill", "#7A7A7A")

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

      svg.selectAll("circle")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "xDots")
        .append("circle")
        .attr( "transform", "translate(" + 100 + "," + 650 + ")")
        .attr("fill", "white")
        .attr("stroke", d => d.colour)
        .attr("stroke-width", "2px")
        .attr("cx", d => scX(d.x1))
        .attr("cy", d => scY(d.y1))
        .attr("r", d => rad(d.rad));

      //END OF CREATE X AXIS//
      //---------------------------------------------------------------------------//


      //CREATE LARGE CIRCLES//
      //---------------------------------------------------------------------------//
      const ticked = () => {
        goalAmounts
          .attr("cx", (d => d.x))
          .attr("cy", d => d.y);
      }

      let i = 0;

      const goalAmounts = svg.selectAll()
        .data(data.sort(function(a, b) {
          return a.amt - b.amt;
      }).reverse())
        .enter()
        .append("g")
        .attr("class", "goals")
        .append("circle")
        .attr( "transform", "translate(" + 200 + "," + 100 + ")")
        .attr("fill", d => {
          return d.colour}
        )
        .attr("cx", d => {
          // console.log("DX1, ", d.x1,  (d.x1)
          return d.x1
        })
        .attr("cy", (d, index) => {
          let _y = scY(d.y2)
      }
        )
        .attr("r", d => amt(d.amt));

      d3.forceSimulation(data)
      // .force('charge', d3.forceManyBody().strength(-20))
      .force('x', (d3.forceX().x(function(d) {
        return scX2(d.x1)
      })))
      .force("y", d3.forceY(d => (d.y2 * Math.random())))
      .force('collision', d3.forceCollide().radius(d => amt(d.amt) + 10))
      .on("tick", ticked);

    //END OF CREATE LARGE CIRCLES//
    //---------------------------------------------------------------------------//
      
  }

  

  useEffect(() => {
    if (data) {
      console.log("DATA: ", data)
      setMaxYear(Math.max.apply(Math, data.map(function(o) { return o.x1; })))
    }

    if (maxYear) {
      console.log("MAXYEAR", maxYear)
      initialiseData();
    }

  }, [data, maxYear])

  return (
    <div className="App">
      <svg id="demo1" width="1200" height="700" style={{background: "white"}}/>
    </div>
  );
}

export default App;