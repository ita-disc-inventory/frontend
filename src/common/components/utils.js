export async function fetchWithRetries(url, options = {}, retries = 3, delay = 1000) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            else if (response.status === 204) {
                // retry
                if (attempt < retries) {
                    await new Promise(res => setTimeout(res, delay));
                    continue;
                }
                
            }
            return response;
        } catch (err) {
            if (attempt === retries) throw err;
            await new Promise(res => setTimeout(res, delay));
        }
    }
}