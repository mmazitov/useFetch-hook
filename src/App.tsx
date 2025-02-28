import './App.css';

import React from 'react';
import useFetch from './hooks/useFetch';

const App: React.FC = () => {
	const { data, loading, error } = useFetch(
		'https://cataas.com/api/cats?limit=15',
	);

	if (loading) return <p>Loading...</p>;

	if (error) return <p>Error...</p>;

	console.log(data);
	return (
		<div className="flex flex-col items-center App">
			<h1>Random Cats</h1>
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(3, 1fr)',
					gap: '10px',
				}}
			>
				{data?.map((cat: { id: string }) => (
					<img
						key={cat.id}
						src={`https://cataas.com/cat/${cat.id}`}
						alt="Random Cat"
						width="200"
					/>
				))}
			</div>
		</div>
	);
};

export default App;
