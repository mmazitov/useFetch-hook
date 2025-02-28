<h1>useFetch Hook</h1>

<h2>Description</h2>

<code>useFetch</code> is a custom React hook for making GET requests to an API while managing loading, data, and error states.

<h2>Installation</h2>
The hook uses axios for HTTP requests. Make sure axios is installed in your project: <br/>
<code>npm install @your-scope/dropdown</code> <br />
Then, import the hook into your component: <br />
<code>import useFetch from './hooks/useFetch';</code>

<h2>Usage</h2>
A simple example without specifying a type:

```
const { data, loading, error } = useFetch('https://api.example.com/data');
```

Usage with a specified type:

```
interface Cat {
  id: string;
}

const { data, loading, error } = useFetch<Cat[]>('https://cataas.com/api/cats?limit=15');
```

<h2>API</h2>
The <code>useFetch</code> hook takes one argument: <br/>
- <code>url: string</code> — The API URL to fetch data from.<br/>
The hook returns an object with the following properties: <br/>
- <code>data: T | null</code> — The fetched data (the type can be specified when calling the hook).<br/>
- <code>loading: boolean</code> — The loading state (true while fetching data).<br/>
- <code>error: AxiosError | null</code> — The request error (if any).<br/>
- <code>refetch: () => void</code>> — A function to manually trigger a new request.

<h2>Example Usage with Refetching</h2>

```
import React from 'react';
import useFetch from './hooks/useFetch';

const CatsList: React.FC = () => {
  const { data, loading, error, refetch } = useFetch('https://cataas.com/api/cats?limit=10');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <div>
      <button onClick={refetch}>Reload Cats</button>
      <div>
        {data?.map(cat => (
          <img key={cat.id} src={`https://cataas.com/cat/${cat.id}`} alt="Cat" width={150} />
        ))}
      </div>
    </div>
  );
};

export default CatsList;

```

<h2>How It Works</h2>
- On the initial render, <code>fetchData</code> is called, making a request to the given <code>url</code>. <br/>
- The <code>loading</code> state is set to <code>true</code>. <br/>
- Once the response is received, the data is stored in <code>data</code>, and <code>loading</code> is set to <code>false</code>. <br/>
- If an error occurs, it is stored in <code>error</code>. <br/>
- When <code>url</code> changes, the hook automatically fetches new data. <br/>
- The <code>refetch</code> function allows manually re-fetching the data. <br/>

<h2>Contributing</h2>

Contributions are welcome! Please feel free to submit a pull request or open an issue if you encounter any bugs or have feature requests.
