// import type { AuthContextType } from "../auth/auth.context";
import type { User } from "./user";

const api = import.meta.env.VITE_API_URL;
const API_URL = api + "/users";

class UserService {
  // private token: string | null = null;

  // // Allows injecting token from context
  // setAuth(auth: Pick<AuthContextType, "token">) {
  //   this.token = auth.token;
  // }

  private getToken(): string | null {
    return localStorage.getItem("accessToken");
  }

  private getHeaders(): HeadersInit {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    const token = this.getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
  }

  async getUsers() {
    const res = await fetch(API_URL, {
      headers: this.getHeaders(),
    });
    return res.json();
  }

  async getById(id: string) {
    const res = await fetch(`${API_URL}/${id}`, {
      headers: this.getHeaders(),
    });
    return res;
  }

  async create(userData: User) {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(userData),
    });
    return res;
  }

  async update(id: string, userData: User) {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: this.getHeaders(),
      body: JSON.stringify(userData),
    });
    return res;
  }

  async delete(id: string) {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    });
    return res.json();
  }
}

// ✅ Export a singleton instance
export const userService = new UserService();
