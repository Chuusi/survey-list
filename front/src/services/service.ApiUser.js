const APIHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
};

export const APIuser = async (endpoint, options = {}) => {
    const url = `http://localhost:8080/${endpoint}`;
    try {
        const response = await fetch(url, {
            ...options,
            headers: APIHeaders,
            timeout: 6000,
        });

        if (!response.ok) {
            throw new Error(
                `Error de petición HTTP, status: ${response.status}`
            );
        }

        const data = await response.json();

        return {
            status: response.status,
            data,
        };
    } catch (error) {
        console.error("Error: ", error.message);
        return {
            status: error.status || 500,
            data: null,
            error: error.message,
        };
    }
};
