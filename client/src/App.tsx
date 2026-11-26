//useState remembers the value between renders: useEffect runs code after the component appears
import {useEffect, useState} from 'react';
import type { City, WeatherResponse } from './types/weather';
import { fetchWeather } from './api/weather';
import { isAbortError } from './utils/errors';
import SearchBox from './components/SearchBox';
import WeatherCard from './components/WeatherCard';


// hardcoded city for now
//lives OUTSIDE the component
const DEFAULT_CITY: City = {
  name: "Berlin",
  latitude: 52.52,
  longitude: 13.42
  
}

function App() {
  //The selected city is now state, so changing it re-renders the app
  const [city, setCity] = useState<City>(DEFAULT_CITY);
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const contoller = new AbortController();
    setLoading(true);
    setError(null);
    //call our API function. A Promise has .then() for success and .catch() for failure
    //which is the same idea as try/catch with await
    fetchWeather(DEFAULT_CITY)
    .then(setWeather)   //shorthand for: (data) => setweather(data)
    .catch((err: unknown) => {
      if (!isAbortError(err)) return;
      //"unknown" means "could be anything" so we check before using it
      setError(err instanceof Error ? err.message : "Something went wrong")
    })
    .finally(() => {
      //.finalyy runs after success OR failure
      //Skip it if cancelled, because a newer request is now in charge of "loading"
      if(!contoller.signal.aborted) setLoading(false);
    });
    
    //If the user picks another city mid-request, cancel this one
    return () => contoller.abort();
  }, [city]); //[city] = re-reun this whole effect every time the city changes 

  return (
    <main>
      <h1>Weather Dashboard</h1>
      {/*setCity is passed as the onSelect function: SearchBox calls it with a City */}
      <SearchBox onSelect={setCity} />
      {/*&& means: if the left side is truthy , render the right side */}
      {error && <p className='error'>Error: {error}</p>}
      {!error && !weather && <p>Loading...</p>}
      {!error && !loading && weather && (
       <WeatherCard city={city} current={weather.current} />
       )}
    </main>
  );
}

export default App;