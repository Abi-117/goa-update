const API_BASE = "http://localhost:5000/api";

const api = {
  get: async (url: string) => {
    const res = await fetch(API_BASE + url);
    return res.json();
  },

  post: async (url: string, data: any) => {
    const res = await fetch(API_BASE + url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    return res.json();
  },
};

export default api;
