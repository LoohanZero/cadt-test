const getDesignData = async () => {
	try{
		const response = await fetch('/designs');
		return await response.json();
	}
	catch (error) {
		return new error;
	}
};

const getSetoutsData = async () => {
	try{
		const response = await fetch('/setouts');
		return await response.json();
	}
	catch (error) {
		return new error;
	}
};

const getUsersData = async () => {
	try{
		const response = await fetch('/users');
		return await response.json();
	}
	catch (error) {
		return new error;
	}
};

export { getDesignData, getSetoutsData, getUsersData };