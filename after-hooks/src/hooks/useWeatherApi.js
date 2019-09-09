// NOTE: We don't need to import React from 'react', only { ...hooks }
import { useState, useEffect } from 'react';

export default ({ coords }, refetch) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      setError(false);

      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_PROXY}https://api.darksky.net/forecast/${process.env.REACT_APP_API_KEY}/${coords}`
        );
        if (response.ok) {
          const data = await response.json();
          setData(data);
        } else {
          setError(true);
        }
      } catch (error) {
        setError(true);
      }

      setLoading(false);
    };
    fetchWeatherData();
  }, [coords, refetch]);

  return { data, loading, error };
};
