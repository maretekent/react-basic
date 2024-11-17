import React, { useEffect, useState } from 'react';
import api from '../utils/apiInstance';

const ExampleComponent = () => {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Uses JWT token from localStorage
				//api.get('/secure-data').then((data) => console.log(data));

				// Uses API Key for authentication
				// api.get('/public-data', null, true).then((data) => console.log(data));

				const result = await api.get('/data'); // Call GET /data
				setData(result);
			} catch (err) {
				setError(err.message);
			}
		};

		fetchData();
	}, []);

	const handleCreate = async () => {
		try {
			const newItem = { name: 'New Item', value: 100 };
			const result = await api.post('/data', newItem); // Call POST /data
			setData([...data, result]);
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<div>
			<h1>Data</h1>
			{error && <p style={{ color: 'red' }}>{error}</p>}
			<ul>
				{data && data.map((item) => <li key={item.id}>{item.name}</li>)}
			</ul>
			<button onClick={handleCreate}>Add Item</button>
		</div>
	);
};

export default ExampleComponent;
