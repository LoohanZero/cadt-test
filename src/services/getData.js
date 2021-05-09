const getDesignData = async () => {
	try{
		const response = await fetch('/designs');
		return await response.json();
	}
	catch (error) {
		return new Error(error);
	}
};

const getSetoutsData = async () => {
	try{
		const response = await fetch('/setouts');
		return await response.json();
	}
	catch (error) {
		return new Error(error);
	}
};

const getUsersData = async () => {
	try{
		const response = await fetch('/users');
		return await response.json();
	}
	catch (error) {
		return new Error(error);
	}
};

export { getDesignData, getSetoutsData, getUsersData };