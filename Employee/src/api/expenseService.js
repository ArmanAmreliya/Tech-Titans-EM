const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

class ExpenseService {
  static async getExpenses() {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/expenses`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch expenses");
      }

      return await response.json();
    } catch (error) {
      throw new Error(error.message || "Failed to fetch expenses");
    }
  }

  static async createExpense(expenseData) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/expenses`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expenseData),
      });

      if (!response.ok) {
        throw new Error("Failed to create expense");
      }

      return await response.json();
    } catch (error) {
      throw new Error(error.message || "Failed to create expense");
    }
  }

  static async updateExpense(id, expenseData) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expenseData),
      });

      if (!response.ok) {
        throw new Error("Failed to update expense");
      }

      return await response.json();
    } catch (error) {
      throw new Error(error.message || "Failed to update expense");
    }
  }

  static async deleteExpense(id) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete expense");
      }

      return await response.json();
    } catch (error) {
      throw new Error(error.message || "Failed to delete expense");
    }
  }
}

export default ExpenseService;
