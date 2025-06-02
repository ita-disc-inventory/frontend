export async function fetchWithRetries(url, options = {}, retries = 3, delay = 500) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response;
        } catch (err) {
            if (attempt === retries) throw err;
            await new Promise(res => setTimeout(res, delay));
        }
    }
}