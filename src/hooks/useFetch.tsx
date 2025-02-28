import axios, { AxiosError } from 'axios';
import { useCallback, useEffect, useState } from 'react';

/**
 * useFetch hook for fetching data from an API.
 * @param url - The URL for the API request.
 * @returns An object containing the data, loading state, error, and a refetch function.
 *
 * Example without specifying the type:
 * const { data, loading, error } = useFetch('https://api.example.com/data');
 *
 * Example with a specified type:
 * interface Cat { id: string }
 * const { data, loading, error } = useFetch<Cat[]>('https://api.example.com/cats');
 */
function useFetch<T = any>(url: string) {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<AxiosError | null>(null);

	const fetchData = useCallback(async () => {
		setLoading(true);
		setError(null);

		try {
			const response = await axios.get<T>(url);
			setData(response.data);
		} catch (err) {
			setError(err as AxiosError);
		} finally {
			setLoading(false);
		}
	}, [url]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return { data, loading, error, refetch: fetchData };
}

export default useFetch;
