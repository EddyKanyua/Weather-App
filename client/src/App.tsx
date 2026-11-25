//useState remembers the value between renders: useEffect runs code after the component appears
import {useEffect, useState} from 'react';
import type { City, WeatherResponse } from './types/weather';
import { fetchWeather } from './api/weather';
import WeatherCard from './components/WeatherCard';


// hardcoded city for now
//lives OUTSIDE the component
const DEFAULT_CITY: City = {
  name: "Berlin",
  latitude: 52.52,
  longitude: 13.42
}

function App() {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    //call our API function. A Promise has .then() for success and .catch() for failure
    //which is the same idea as try/catch with await
    fetchWeather(DEFAULT_CITY)
    .then(setWeather)   //shorthand for: (data) => setweather(data)
    .catch((err: unknown) => {
      //"unknown" means "could be anything" so we check before using it
      setError(err instanceof Error ? err.message : "Something went wrong")
    });
  }, []);

  return (
    <main>
      <h1>Weather Dashboard</h1>
      {/*&& means: if the left side is truthy , render the right side */}
      {error && <p className='error'>Error: {error}</p>}
      {!error && !weather && <p>Loading...</p>}
      {weather && <WeatherCard city={DEFAULT_CITY} current={weather.current} />}
    </main>
  );
}

export default App;