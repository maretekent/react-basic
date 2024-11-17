import React, { useState } from 'react';
import api from '../utils/apiInstance'; // Import the Api instance

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const handleLogin = async (e) => {
		e.preventDefault();
		setError('');
		setSuccess('');

		try {
			// Call the backend to authenticate
			const response = await api.post('/auth/login', { email, password });

			// Extract the token from the response
			const { token } = response;

			if (token) {
				// Store the token in localStorage
				localStorage.setItem('jwt_token', token);
				setSuccess('Login successful! Token stored.');
			} else {
				setError('Token not received from the server.');
			}
		} catch (err) {
			setError(err.message || 'Failed to log in.');
		}
	};

	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={handleLogin}>
				<div>
					<label>Email:</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div>
					<label>Password:</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<button type="submit">Login</button>
			</form>
			{error && <p style={{ color: 'red' }}>{error}</p>}
			{success && <p style={{ color: 'green' }}>{success}</p>}
		</div>
	);
};

export default Login;
