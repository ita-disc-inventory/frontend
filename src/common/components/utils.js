export async function fetchWithRetries(url, options = {}, retries = 10, delay = 500) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const response = await fetch(url, options);
            if (!response.ok || response.status === 204) {
                console.warn(`Attempt ${attempt}: Unexpected status ${response.status}`);
                if (attempt < retries) {
                    await new Promise(res => setTimeout(res, delay));
                    continue;
                } else {
                    throw new Error(`Failed after ${retries} retries. Status: ${response.status}`);
                }
              }
            return response;
        } catch (err) {
            if (attempt === retries) throw err;
            await new Promise(res => setTimeout(res, delay));
        }
    }
}