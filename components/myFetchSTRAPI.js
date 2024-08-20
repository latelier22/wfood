"use server";

async function myFetch(endpoint, method, body, entity, additionalHeaders = {}) {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    console.log("baseUrl",baseUrl)
    const headers = {
        'Content-Type': 'application/json',
        ...additionalHeaders
    };

    if (body instanceof FormData) {
        delete headers['Content-Type'];
    } else {
        body = body ? JSON.stringify(body) : null;
    }

    try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
            method: method,
            headers,
            body,
            cache: "no-store"
        });

        
        

        const data = await response.json();

        console.log("endpoint",endpoint,"headers",additionalHeaders,"body",body,"data",data)

        // if (!response.ok) {
        //     const error = new Error(`Failed to fetch ${entity}: Status ${response.status}`);
        //     error.details = data.error?.message || 'Unknown error occurred';
        //     throw error;
        //   }

          
        return data;
    } catch (error) {
        console.error(`An error occurred while fetching ${entity}:`, error);
        throw error;
    }
}

export default myFetch;
