const api = import.meta.env.VITE_API_URL;
const auth = api + "/auth";

class AuthService {
  private accessToken: string | null = localStorage.getItem("accessToken");

  setToken(token: string) {
    this.accessToken = token;
    localStorage.setItem("accessToken", token);
  }

  clearToken() {
    this.accessToken = null;
    localStorage.removeItem("accessToken");
  }

  private get headers() {
    return {
      "Content-Type": "application/json",
      ...(this.accessToken && { Authorization: `Bearer ${this.accessToken}` }),
    };
  }

  async logIn(email: string, password: string) {
    const res = await fetch(`${auth}/login`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ email, password }),
    });
    return res;
  }

  async forgotPassword(email: string) {
    const res = await fetch(`${auth}/forgot-password`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ email }),
    });
    return res;
  }

  // async getProfile() {
  //   const res = await fetch(`${auth}/profile`, {
  //     method: "GET",
  //     headers: this.headers,
  //   });
  //   return res;
  // }
}

// Export an instance of the class
export default new AuthService();
