// import type { AuthContextType } from "../../core/contexts/auth.context";
import type { User } from "./user";

const API = import.meta.env.VITE_API_URL + "/users";

class UserService {
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
    const res = await fetch(API, {
      headers: this.getHeaders(),
    });
    return res.json();
  }

  async getById(id: string) {
    const res = await fetch(`${API}/${id}`, {
      headers: this.getHeaders(),
    });
    return res;
  }

  async create(userData: User) {
    const res = await fetch(API, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(userData),
    });
    return res;
  }

  async update(id: string, userData: User) {
    const res = await fetch(`${API}/${id}`, {
      method: "PATCH",
      headers: this.getHeaders(),
      body: JSON.stringify(userData),
    });
    return res;
  }

  async delete(id: string) {
    const res = await fetch(`${API}/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    });
    return res.json();
  }
}

// ✅ Export a singleton instance
export const userService = new UserService();
