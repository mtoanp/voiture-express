const API = import.meta.env.VITE_API_URL + "/auth";

class AuthService {
  private get headers() {
    return {
      "Content-Type": "application/json",
    };
  }

  async logIn(email: string, password: string) {
    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ email, password }),
    });
    return res;
  }

  async forgotPassword(email: string) {
    const res = await fetch(`${API}/forgot-password`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ email }),
    });
    return res;
  }

  async getCurrentUser(token: string) {
    const res = await fetch(`${API}/getCurrentUser`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Invalid token");

    return res.json(); // should return user object
  }
}

// Export an instance of the class
export default new AuthService();
