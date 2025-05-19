import { fetchWithAuth } from "../../core/interceptors/auth.interceptor";
import type { User } from "./user";

const API = import.meta.env.VITE_API_URL + "/users";

class UserService {
  async getUsers() {
    const res = await fetchWithAuth(API);
    return res.json();
  }

  async getById(id: string) {
    const res = await fetchWithAuth(`${API}/${id}`);
    return res;
  }

  async create(userData: User) {
    const res = await fetchWithAuth(API, {
      method: "POST",
      body: JSON.stringify(userData),
    });
    return res;
  }

  async update(id: string, userData: User) {
    const res = await fetchWithAuth(`${API}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(userData),
    });
    return res;
  }

  async delete(id: string) {
    const res = await fetchWithAuth(`${API}/${id}`, {
      method: "DELETE",
    });
    return res;
  }
}

// ✅ Export a singleton instance
export const userService = new UserService();
