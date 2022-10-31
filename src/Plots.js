import React, { useState } from "react";
import ReactDOM from "react-dom";

import "react-vis/dist/style.css";

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  LineMarkSeries,
  DiscreteColorLegend
} from "react-vis";

let mi=0
//<DiscreteColorLegend  orientation="horizontal" items = {series}    />
let series= [{
  title: "Apples",
  color : "#000000",
},
{title: "Orange",
disabled: false,
data: [{ x: 0, y: 12 }, { x: 1, y: 22 }],
color : "#FF6c0A",
},

]

function getRandomColor() {
var letters = '0123456789ABCDEF';
var color = '#';
for (var i = 0; i < 6; i++)
{
  color += letters[Math.floor(Math.random() * 16)];
}
return color;
}
export default function App(points, valuesPlots, colors) {
  if(valuesPlots > 0)
  {
    mi = valuesPlots
  }
  let x1_1,x2_1,x3_1,y1_1,y2_1,y3_1
  let x4_1 = 1
  let y4_1 = 0
  let x1_2,x2_2,x3_2,x4_2,y1_2,y2_2,y3_2,y4_2
  let x1_3,x2_3,x3_3,x4_3,y1_3,y2_3,y3_3,y4_3
  let x1_4,x2_4,x3_4,x4_4,y1_4,y2_4,y3_4,y4_4



  let x1_5,x2_5,x3_5,x4_5,y1_5,y2_5,y3_5,y4_5
  let x1_6,x2_6,x3_6,x4_6,y1_6,y2_6,y3_6,y4_6
  let x1_7,x2_7,x3_7,x4_7,y1_7,y2_7,y3_7,y4_7
  let x1_8,x2_8,x3_8,x4_8,y1_8,y2_8,y3_8,y4_8
  let x1_9,x2_9,x3_9,x4_9,y1_9,y2_9,y3_9,y4_9
  let x1_10,x2_10,x3_10,x4_10,y1_10,y2_10,y3_10,y4_10
  const lines = [{x:5,y:2},{x:6,y:2}]


  let color = []
  let items = {title: "hello", color : "#D1D0CE"}
/*
  //заполнить все переменные для всех графиков значениями координат
  for (let i = 0; i < mi; i++)
  {
    if(typeof points[i] == 'object' )
    {
      let b = points[i]
      eval("x1_"+(i+1) + "=" +b[0]) 
      eval("y1_"+(i+1) + "=" +b[1]) 
      eval("x2_"+(i+1) + "=" +b[2]) 
      eval("y2_"+(i+1) + "=" +b[3]) 
      eval("x3_"+(i+1) + "=" +b[4]) 
      eval("y3_"+(i+1) + "=" +b[5]) 
      eval("x4_"+(i+1) + "=" +b[6]) 
      eval("y4_"+(i+1) + "=" +b[7])  
      color[i] = getRandomColor();
    }
  }
*/
 let plots = []
for (let i = 0; i < mi; i++)
  {
    if(typeof points[i] == 'object' )
    {
      let dataTemp = [{}]
      for(let j = 0; j <Object.keys(points[i]).length/2; j++)
      {dataTemp[j]=({x: points[i]["x"+(j+1)],y: points[i]["y"+(j+1)] })

      }
 
  plots[i]=[<LineMarkSeries
  color =  {colors[i]}
  className="1-series"
  size='3.5'
  


  data={dataTemp}
  style={{
    strokeLinejoin: "round",
    strokeWidth: 2
  }}
/>
]
   } }
  return (    
    <XYPlot width={700} height={200} display = "inline-block">
      <HorizontalGridLines style={{ stroke: "#D1D0CE" }} />
      <VerticalGridLines style={{ stroke: "#D1D0CE" }} />
      <XAxis
        title="x"
        style={{
          line: { stroke: "#111111" },
          ticks: { stroke: "#6b6b76" },
          text: { stroke: "none", fill: "#6b6b76" }
        }}
      />
       <YAxis
        title="Коэфф. уверенности"
        style={{
          line: { stroke: "#6b6b76" },
          ticks: { stroke: "#6b6b76" },
          text: { stroke: "none", fill: "#6b6b76"}
        }}
      />
      
  {plots}

      

  
    </XYPlot>
  );
  
}
ReactDOM.render(<App />, document.querySelector("#root"));