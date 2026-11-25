import {useEffect, useState} from 'react';

interface CurrentWeather {
  time: string;
  temperature_2m: number;
  wind_speed_10m: number;
}

interface WeatherResponse {
  latitude: number;
  longitude: number;
  current: CurrentWeather;
}

function App() {
  const [data, setData] = useState<WeatherResponse | null>(null);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadWeather() {
      try {
        const url = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m";

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

          const json: WeatherResponse = await response.json();

          setData(json);
        } catch (err) {
          
          setError((err instanceof Error) ? err.message : "Something went wrong");
        }
  }

  loadWeather();
}, []);

if (error) return <p>Error: {error}</p>;
if (!data) return <p>Loading...</p>;

return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

export default App;