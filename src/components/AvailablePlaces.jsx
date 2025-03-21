import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import {fetchAvailablePlaces} from '../http.js';

export default function AvailablePlaces({ onSelectPlace }) {

  const [error, setIsError] = useState();
  const [isFetching, setIsFetching] = useState(true);
  const [availablePlaces, setAvaialablePlaces] = useState([]);

  useEffect(() => {

    async function apiCall() {
      setIsFetching(true);
      try {
        const result = await fetchAvailablePlaces();

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(result, position.coords.latitude, position.coords.longitude);
          setAvaialablePlaces(sortedPlaces);
          setIsFetching(false);
        });
      }
      catch (error) {
        setIsError({message: error.message || 'Could not fetch the places. Please try again later.'});
        setIsFetching(false);
      }
    }
    apiCall();
  }, []);


  if(error){
    return (<Error
      title="Failed to fetch places"
      message={error.message}
      onConfirm={() => setIsError(null)}
    />);
  }


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
