const getDesignData = async () => {
	try{
		const response = await fetch('/designs');
		return await response.json();
	}
	catch (error) {
		return new Error(error);
	}
};

export { getDesignData };