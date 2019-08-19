const apiKey = "a483e3dbc3fd4ca5a460d940ec87a00a";
const apiUrl = "https://newsapi.org/v2";

async function request(url, options) {
  const response = await fetch(url, options).then(response => {
    if (!response.ok) {
      return Promise.reject(response);
    }
    return response.json();
  });

  return response;
}

export {request, apiKey, apiUrl};