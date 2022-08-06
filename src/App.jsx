import * as d3 from "d3";
import React, { useState, useEffect } from "react";
import "bulma/css/bulma.css";

export default function App() {
  const [data, setData] = useState(null);
  const [drawing, setDrawing] = useState("205");

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);
  if (data === null) {
    return <p>loading.....</p>;
  }
  const arr = Object.entries(data[drawing]).map(([key, value]) => ({
    key: key,
    value: value,
  }));
  const axisX = arr.length;
  const axisY = 30;
  const width = 600,
    height = 300,
    marginX = 60,
    marginY = 60,
    contentWidth = width - marginX * 2,
    contentHeight = height - marginY * 2;
  const xScale = d3
    .scaleLinear()
    .domain([0, axisX])
    .range([marginX, contentWidth])
    .nice();
  const yScale = d3
    .scaleLinear()
    .domain([0, axisY])
    .range([marginY, contentHeight])
    .nice();
  return (
    <div style={{ backgroundColor: "white" }}>
      <Title titleName="プロジェクトセカイ譜面密度可視化" />
      <div class="field column">
        <label class="label">描画譜面</label>
        <div class="select is-fullwidth">
          <select
            name="draw now"
            defaultValue="205"
            onChange={(event) => {
              event.preventDefault();
              setDrawing(event.target.value);
            }}
          >
            <option value="205">ぼくらの16bit戦争</option>
            <option value="155">Don't Fight The Music</option>
            <option value="154">the EmpErroR</option>
            <option value="153">エンドマークに希望と涙を添えて</option>
            <option value="122">マシンガンポエムドール</option>
            <option value="107">六兆年と一夜物語</option>
            <option value="087">初音ミクの激唱</option>
            <option value="004">初音ミクの消失</option>
          </select>
        </div>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`}>
        <g transform={`translate(${marginX} ${contentHeight + marginY})`}>
          <g>
            <line x1={0} y1={0} x2={contentWidth} y2={0} stroke="gray" />
            <line x1={0} y1={0} x2={0} y2={10} stroke="gray" />
            <text
              dominantBaseline="hanging"
              textAnchor="middle"
              x={0}
              y={15}
              stroke="gray"
            >
              {0}
            </text>
            <line
              x1={contentWidth}
              y1={0}
              x2={contentWidth}
              y2={10}
              stroke="gray"
            />
            <text
              dominantBaseline="hanging"
              textAnchor="middle"
              x={contentWidth}
              y={15}
              stroke="gray"
            >
              {axisX}
            </text>
          </g>
          <g>
            <line x1={0} y1={0} x2={0} y2={-contentHeight} stroke="gray" />
            <line x1={0} y1={0} x2={-10} y2={0} stroke="gray" />
            <text
              dominantBaseline="middle"
              textAnchor="end"
              x={-15}
              y={0}
              stroke="gray"
            >
              {0}
            </text>
            <line
              x1={0}
              y1={-contentHeight}
              x2={-15}
              y2={-contentHeight}
              stroke="gray"
            />
            <text
              dominantBaseline="middle"
              textAnchor="end"
              x={-15}
              y={-contentHeight}
              stroke="gray"
            >
              {30}
            </text>
          </g>
          <g>
            {arr.map((item, index) => {
              if (index === 0) {
                return (
                  <line
                    x1={0}
                    y1={0}
                    x2={xScale(index + 1)}
                    y2={-yScale(arr[index].value)}
                    stroke="black"
                  />
                );
              } else {
                return (
                  <line
                    x1={xScale(index)}
                    y1={-yScale(arr[index - 1].value)}
                    x2={xScale(index + 1)}
                    y2={-yScale(arr[index].value)}
                    stroke="black"
                  />
                );
              }
            })}
          </g>
        </g>
      </svg>
    </div>
  );
}

function Title(props) {
  return (
    <section className="hero is-small is-info">
      <div className="hero-body">
        <h1 className="title">{props.titleName}</h1>
      </div>
    </section>
  );
}
