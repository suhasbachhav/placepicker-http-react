import { useEffect, useState } from "react";

export function useFetch(fetchFn, initialData) {
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState();
    const [fetchData, setFetchData] = useState(initialData);

    useEffect(() => {
        async function fetchData() {
            setIsFetching(true);
            try {
                const places = await fetchFn();
                setFetchData(places);
            } catch (error) {
                setError({ message: error.message || 'Failed to fetch user places.' });
            }

            setIsFetching(false);
        }

        fetchData();
    }, []);


    return { isFetching, error, setFetchData, fetchData };
}