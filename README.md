<h1>useFetch Hook</h1>

<h2>Description</h2>

<code>useFetch</code> is a custom React hook for making GET requests to an API while managing loading, data, and error states.

<h2>Installation</h2>
The hook uses axios for HTTP requests. Make sure axios is installed in your project: <br/>
<code>npm install axios</code> <br />
Then, import the hook into your component: <br />
<code>import useFetch from './hooks/useFetch';</code>

<h2>Usage</h2>
A simple example without specifying a type and saving:

```
const { data, loading, error } = useFetch('https://api.example.com/data');
```

Usage with a specified type and localStorage saving:

```
interface Cat {
  id: string;
}

const { data, loading, error } = useFetch<Cat[]>('https://cataas.com/api/cats', { save: true, savingMethod: 'local' });
```

<h2>API</h2>

The <code>useFetch</code> hook takes one argument: <br/>

- <code>url: string</code> — The API URL to fetch data from.<br/>
- <code>options: UseFetchOptions</code> (optional) — Configuration options for caching.

The hook returns an object with the following properties:

- <code>data: T | null</code> — The fetched data (the type can be specified when calling the hook).<br/>
- <code>loading: boolean</code> — The loading state (true while fetching data).<br/>
- <code>error: AxiosError | null</code> — The request error (if any).<br/>
- <code>refetch: () => void</code>> — A function to manually trigger a new request.

<h2>Saving Options</h2>
<code>useFetch</code> supports saving across three storage mechanisms:

- **sessionStorage** (<code>savingMethod: 'session'</code>) — Stores data in session storage.
- **localStorage** (<code>savingMethod: 'local'</code>) — Stores data persistently in local storage.
- **Cache Storage** (<code>savingMethod: 'cache'</code>) — Uses the Cache API to store responses.

<h2>Example usage with Refetching and Saving</h2>

```
import './App.css';
import React from 'react';
import useFetch from './hooks/useFetch';

const App: React.FC = () => {
  const { data, loading, error, refetch } = useFetch('https://cataas.com/api/cats?limit=10', { save: true, savingMethod: 'cache' });

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

export default App;


```

<h2>How It Works</h2>

- On the initial render, <code>fetchData</code> is called, making a request to the given <code>url</code>.
- The <code>loading</code> state is set to <code>true</code>.
- Once the response is received, the data is stored in <code>data</code>, and <code>loading</code> is set to <code>false</code>.
- If an error occurs, it is stored in <code>error</code>.
- When <code>url</code> changes, the hook automatically fetches new data.
- The <code>refetch</code> function allows manually re-fetching the data.
- If saving is enabled, the data is stored in the selected storage method.

<h2>Contributing</h2>

Contributions are welcome! Please feel free to submit a pull request or open an issue if you encounter any bugs or have feature requests.
