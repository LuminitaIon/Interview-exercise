import React from 'react';
import './App.css';

import { useQuery, gql } from '@apollo/client';

import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { scaleLinear, scaleBand } from '@visx/scale';
import { AxisBottom } from '@visx/axis';

const GET_POSTS = gql`{
  allPosts(count:10000) {
    createdAt,
    title
  }
}`;

function App() {
  const { data } = useQuery(GET_POSTS);

  if(data) {
    console.log(data.allPosts)
    let months = {
      "january": [],
      "february": [],
      "march": [],
      "april": [],
      "may": [],
      "june": [],
      "july": [],
      "august": [],
      "september": [],
      "octomber": [],
      "november": [],
      "december": [],
    }

    const monthsArr = ["january", "february", "march", "april",
        "may", "june", "july", "august", "september", "octomber", "november", "december"]

    data.allPosts.map(item => {
      let date = new Date(Number(item['createdAt']))
      let month = date.getMonth() + 1
      switch (month) {
        case 1:
          months["january"].push(date)
          break;
        case 2: 
          months["february"].push(date)
          break;
        case 3: 
          months["march"].push(date)
          break;
        case 4: 
          months["april"].push(date)
          break;
        case 5: 
          months["may"].push(date)
          break;
        case 6: 
          months["june"].push(date)
          break;
        case 7: 
          months["july"].push(date)
          break;
        case 8: 
          months["august"].push(date)
          break;
        case 9: 
          months["september"].push(date)
          break;
        case 10: 
          months["octomber"].push(date)
          break;
        case 11: 
          months["november"].push(date)
          break;
        default:
          months["december"].push(date)
          break;
      }
    })

      const freqDates = [
        {id: 1, frequency: months["january"].length},
        {id: 2, frequency: months["february"].length},
        {id: 3, frequency: months["march"].length},
        {id: 4, frequency: months["april"].length},
        {id: 5, frequency: months["may"].length},
        {id: 6, frequency: months["june"].length},
        {id: 7, frequency: months["july"].length},
        {id: 8, frequency: months["august"].length},
        {id: 9, frequency: months["september"].length},
        {id: 10, frequency: months["octomber"].length},
        {id: 11, frequency: months["november"].length},
        {id: 12, frequency: months["december"].length},
      ]
      console.log(freqDates)

      const width = 500;
      const height = 500;
      const margin = { top: 24, bottom: 24, left: 24, right: 24 };
      const purple = '#a44afe';

      const xMax = width - margin.left - margin.right;
      const yMax = height - margin.top - margin.bottom;

      const x = dates => dates.id;
      const y = dates => +dates.frequency * 100;

      const xScale = scaleBand({
        range: [0, xMax],
        round: true,
        domain: freqDates.map(x),
        padding: 0.4,
      });
      const yScale = scaleLinear({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...freqDates.map(y))],
      });

      const compose = (scale, accessor) => data => scale(accessor(data));
      const xPoint = compose(xScale, x);
      const yPoint = compose(yScale, y);

      const dateScale = scaleLinear({
        range: [0, width],
        domain: monthsArr,
        nice: true
      })

      return (
        <div className="App">
          <h1> Posts Statistics </h1>
          <svg width={width} height={height}>
            {freqDates.map((d, i) => {
              const barHeight = yMax - yPoint(d);
              return (
                <Group key={`bar-${i}`}>
                  <Bar
                    x={xPoint(d)}
                    y={yMax - barHeight}
                    height={barHeight}
                    width={xScale.bandwidth()}
                    fill="purple"
                  />
                </Group>
              );
            })}
            <AxisBottom 
              scale={dateScale}
              stroke={'#EDF2F7'}
              tickStroke={'#EDF2F7'}
              tickTextFill={'#EDF2F7'}
              top={height}
              tickLabelProps={() => ({
                  fill: '#EDF2F7',
                  fontSize: 11,
                  textAnchor: 'middle',
              })} 
            />
          </svg>
        </div>
      );
  } else {
    return( 
      <div className='App'>
        <h1> Posts Statistics </h1>
        <p>Wait for data...</p>
      </div>
    )
  }

}

export default App;
