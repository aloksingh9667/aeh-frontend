export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // If the request is for /api/*, proxy it to the backend
    if (url.pathname.startsWith("/api/")) {
      const backendUrl = env.VITE_API_URL; // your stored backend URL
      const targetUrl = backendUrl + url.pathname + url.search;

      return fetch(targetUrl, {
        method: request.method,
        headers: request.headers,
        body: request.body,
      });
    }

    // Everything else → serve static assets
    return env.ASSETS.fetch(request);
  }
};
