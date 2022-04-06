import './App.css';
import { useCallback, memo, useEffect, useState } from 'react';
import axios from 'axios';
import {apiUrl} from './config.js';
import CountDownTimer from './CountDownTimer.js';
import Header from './Header.js';
import SpotFake from './SpotFake.js';


function App() {
  let [timer, setTimer] = useState(15);
  let [data, setData] = useState([]);
  let [current, setCurrent] = useState(0);
  let [correct, setCorrect] = useState(0);
  let [stopped, setStopped] = useState(false);
  let [currentStatus, setCurrentStatus] = useState(0);

  useEffect(() => {
    axios.get(apiUrl + "/getdata").then((response) => {
      console.log(response);
      let data = response.data;
      data.forEach(v => {
        v.fake = apiUrl + v.fake;
        v.correct = apiUrl + v.correct;
        v.order = Math.random() < 0.5 ? 1 : 0;
      });
      setData(response.data);
    });
    
    let intervalHandler = setInterval(() => {
        setTimer((timer) => {
          if(timer >= 1)
            return timer - 1;
          if(timer < 0)
            return timer;
          return 0;
        });
    }, 1000);

    setTimer(15);
    setStopped(false);

    return () => clearInterval(intervalHandler);
  }, []);

  useEffect(() => {
    if(timer == 0) {
      setStopped(true);
      setCurrentStatus(3);
    }
  }, [timer]);

  const onTick = useCallback(function (result) {
    if(result == true) {
      setCorrect(++correct);
      setCurrentStatus(1);
    }
    else {
      setCurrentStatus(2);
    }
    setTimer(-1);
    setStopped(true);
  }, [current]);

  function next() {
    setCurrent(++current);
    setCurrentStatus(0);
    setStopped(false);
    setTimer(15);
  }

  function retry() {
    const suffleData = data.sort((a, b) => 0.5 - Math.random());
    suffleData.forEach(v => {
      v.order = Math.random() < 0.5 ? 1 : 0;
    });
    setData(suffleData);
    setCurrent(0);
    setTimer(15);
    setCorrect(0);
    setStopped(false);
    setCurrentStatus(0);
  }

  return (
    <div className="App">
      {
        current != data.length ? (
          <div>
            <Header title={data[current]?.title} index={current} total={data.length}/>
            <SpotFake correct={data[current]?.correct} fake={data[current]?.fake} onTick={onTick} status={currentStatus} order={data[current]?.order}/>
            <div>
              {
                stopped ? (
                  <button className='btn btn-primary' onClick={next}>Next</button>
                ) : (
                  <CountDownTimer timer={timer}/>
                )
              }              
            </div>
          </div>
        ) : (
          <div>
            <h1>{correct}/{data.length}</h1>
            <button className='btn btn-primary' onClick={retry}>Retry</button>
          </div>
        )
      }
      
    </div>
  );
}

export default App;
