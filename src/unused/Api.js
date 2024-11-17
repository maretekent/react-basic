class Api {
	constructor(baseURL) {
		this.baseURL = baseURL; // Base URL of the API
	}

	// Helper to get the JWT token from local storage or another source
	getToken() {
		return localStorage.getItem('jwt_token'); // Replace with your token storage method
	}

	// Helper to create headers
	createHeaders(isJSON = true) {
		const token = this.getToken();
		const headers = new Headers();
		if (isJSON) headers.append('Content-Type', 'application/json');
		if (token) headers.append('Authorization', `Bearer ${token}`);
		return headers;
	}

	// Generic fetch wrapper
	async request(endpoint, method = 'GET', body = null, isJSON = true) {
		const options = {
			method,
			headers: this.createHeaders(isJSON),
		};

		if (body) {
			options.body = isJSON ? JSON.stringify(body) : body;
		}

		try {
			const response = await fetch(`${this.baseURL}${endpoint}`, options);

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || 'Something went wrong');
			}

			return response.json();
		} catch (error) {
			console.error('API Error:', error);
			throw error; // Pass the error to the caller
		}
	}

	// CRUD Operations
	get(endpoint, params = null) {
		const url = params
			? `${endpoint}?${new URLSearchParams(params).toString()}`
			: endpoint;
		return this.request(url, 'GET');
	}

	post(endpoint, body) {
		return this.request(endpoint, 'POST', body);
	}

	put(endpoint, body) {
		return this.request(endpoint, 'PUT', body);
	}

	delete(endpoint) {
		return this.request(endpoint, 'DELETE');
	}
}

export default Api;
