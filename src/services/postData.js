const postData = async (path, body) => {
	const request = { 
		method: 'POST', 
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body)
	};

	try{
		const response = await fetch(`/${path}`, request);
		return await response.json();
	}
	catch (error) {
		return error;
	}
};


export { postData };