let axiosConfig = {
    headers: {
        "Content-Type": "application/json;char=UTF-8",
        "Access-Control-Allow-Origin": `${process.env.REACT_APP_BACKEND_URL}`,
        "withCredentials": "true",
    },
};

export default axiosConfig;