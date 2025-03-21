import { useEffect, useState } from 'react';
import Places from './Places.jsx';

export default function AvailablePlaces({ onSelectPlace }) {

  const [isFetching, setIsFetching] = useState(true);
  const [availablePlaces, setAvaialablePlaces] = useState([]);

  useEffect(() => {

    async function apiCall(){
      setIsFetching(true);
      const response = await fetch("http://localhost:3000/places");
      const result  = await response.json();
      setAvaialablePlaces(result.places);
      setIsFetching(false);
    }
    apiCall();
  }, []);


  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Loading places..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
