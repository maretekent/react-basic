class Api {
	constructor(baseURL, apiKey = null) {
		this.baseURL = baseURL; // Base URL of the API
		this.apiKey = apiKey; // Optional API key for non-authenticated requests
	}

	// Helper to get the JWT token from local storage or another source
	getToken() {
		return localStorage.getItem('jwt_token'); // Replace with your token storage method
	}

	// Helper to create headers
	createHeaders(isJSON = true, useApiKey = false) {
		const headers = new Headers();

		// Add Content-Type header for JSON if needed
		if (isJSON) headers.append('Content-Type', 'application/json');

		// Add Authorization header (JWT or API Key)
		if (useApiKey && this.apiKey) {
			headers.append('x-api-key', this.apiKey); // Use API Key
		} else {
			const token = this.getToken();
			if (token) {
				headers.append('Authorization', `Bearer ${token}`); // Use JWT token
			}
		}

		return headers;
	}

	// Generic fetch wrapper
	async request(endpoint, method = 'GET', body = null, isJSON = true, useApiKey = false) {
		const options = {
			method,
			headers: this.createHeaders(isJSON, useApiKey),
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
	get(endpoint, params = null, useApiKey = false) {
		const url = params
			? `${endpoint}?${new URLSearchParams(params).toString()}`
			: endpoint;
		return this.request(url, 'GET', null, true, useApiKey);
	}

	post(endpoint, body, useApiKey = false) {
		return this.request(endpoint, 'POST', body, true, useApiKey);
	}

	put(endpoint, body, useApiKey = false) {
		return this.request(endpoint, 'PUT', body, true, useApiKey);
	}

	delete(endpoint, useApiKey = false) {
		return this.request(endpoint, 'DELETE', null, true, useApiKey);
	}
}

export default Api;
