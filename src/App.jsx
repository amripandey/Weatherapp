import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css'

function App() {
  const [data, setData] = useState({});
  const [text, setText] = useState("");
  const [update, setUpdate] = useState("");

  function userInput(e) {
    setText(e.target.value);
  }

  function usercity(e) {
    if (e.key === 'Enter') {
      setUpdate(text);
      weatherData(update);
      setText('');
    }
  }


  async function weatherData(option = 'london') {
    const url = `http://api.weatherapi.com/v1/current.json?key=16a837376f814d79b59121118232408&q=${option}`;

    fetch(`${url}`)
      .then(res => res.json())
      .then(data =>
        setData({
          city: data.location.name,
          temp: data.current.temp_c,
          condition: data.current.condition.text,
          image: data.current.condition.icon,
          feelslike: data.current.feelslike_c,
          winds: data.current.wind_kph,
          humidity: data.current.humidity
        })
      )
      .catch(() => console.log(`error on fetching data`))
  }

  useEffect(() => {
    weatherData()
  }, [])

  return (
    <main className='app'>
      {/* top container */}
      <div className="Top">
        <input type='text' placeholder='search' value={text} onChange={(e) => { userInput(e) }} onKeyDown={(e) => { usercity(e) }} />

        <div className="box1">

          <div className="info">
            <h2>{data.city}</h2>
            <h2 className='h22'>{data.temp}°c</h2>
          </div>

          <div className="condition">
            <h2>{data.condition}</h2>
          </div>

        </div>

      </div>
      {/* bottom container */}

      <div className="bottom">
        <div className="box2">
          <div className='bottomtext'>
            <h2>{data.feelslike}°c</h2>
            <h2>Feels Like</h2>
          </div>
          <div className='bottomtext'>
            <h2>{data.humidity}%</h2>
            <h2>Humidity</h2>
          </div>
          <div className='bottomtext'>
            <h2>{data.winds}kph</h2>
            <h2>Winds</h2>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
