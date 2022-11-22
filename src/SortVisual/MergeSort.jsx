import React, { useState } from "react";
import Slider from '@mui/material/Slider'; 
import Box from '@mui/material/Box';
import { getMergeSortAnimations } from "../SortAlgorithm/MergSortAlgo"; 
import "./MergeSort.css";


const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';
const FULL_SPEED = 90;
const THRESHOLD = 10;


export default class MergeSort extends React.Component {
  constructor(props) { 
    super(props);
    this.state = {
      array: [],
      speed: 50,
      speed_stat: "SPEED",
    };
  }
  
  componentDidMount() {
    this.resetArray()
  }


  resetArray() {
    const array = [];
    const arraySize = document.getElementsByClassName("arraySize")[0].value;
    for (let i = 0; i < arraySize; i++) {
      array.push(randomInt(5, 300));
    }
    this.setState({ array });
  }

  arrayFromInput() {
    const scale = 15;
    const array = [];
    var rawData = document.getElementById("arrayInput").value;
    const myArray = rawData.split(",");
    for (let m of myArray){
        array.push(parseInt(m)*scale);
    }
    this.setState({ array });
 }   
    stateTracker() {
      console.log(this.state.array);
      console.log(this.state.speed);
      console.log(this.state.speed_stat);
    }


    sort() {
        const animations = getMergeSortAnimations(this.state.array);
        var totalSpeed = 2000/(this.state.speed * 0.01 * FULL_SPEED + THRESHOLD);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('arrBar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
              const [barOneIdx, barTwoIdx] = animations[i];
              const barOneStyle = arrayBars[barOneIdx].style;
              const barTwoStyle = arrayBars[barTwoIdx].style;
              const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
              setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
              }, i * totalSpeed);
            } else {
              setTimeout(() => {
                const [barOneIdx, newHeight] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight}px`;
              }, i * totalSpeed);
            }
        }
    }

  render() {
    const { array } = this.state;  
    return (
      <>
        <div className="arrContainer">
          {array.map((value, idx) => (
            <div
              className="arrBar"
              key={idx}
              style={{ height: `${value}px`,
                       width: `${485/array.length}px` }}        
            ></div>
          ))}
        </div>
        <div className="bigContainer" style={{display: 'flex', flexDirection: 'column', alignItems:'center'}}>
            <div style={{display: 'flex', justifyContent:'center'}}>
                <input className="arraySize" type="number" defaultValue={20} style={{width: '45px'}} placeholder='SIZE'></input>
                <button onClick={() => this.resetArray()}>Randomize</button>
                <textarea rows="2" cols="40" id="arrayInput" name="message" placeholder="Your array here, separate with comma plz"></textarea>
                <input onClick={() => this.arrayFromInput()} type="submit" className="theArray"/>
                <button onClick={() => this.sort()}>SORT!</button>
            </div>
            <div style={{width:300}}>
                {this.state.speed_stat}
                <Slider
                  size="small"
                  aria-label="Small"
                  valueLabelDisplay="auto" 
                  onChange={(e, v) => 
                      {
                          this.setState({array: array})
                          this.setState({speed: v});
                          if (v < 20) this.setState({speed_stat: "SPD"});
                          else if (v < 40) this.setState({speed_stat: "SPEED"});
                          else if (v < 60) this.setState({speed_stat: "SPEED"});
                          else if (v < 80) this.setState({speed_stat: "SPEEED"});
                          else this.setState({speed_stat: "SPEEEED"});
                      }
                  }
                />
            </div>
        </div>
        
      </>
    );
  }

}

function randomInt(a, b) {
    return Math.floor(Math.random() * (b - a) + a);
}


