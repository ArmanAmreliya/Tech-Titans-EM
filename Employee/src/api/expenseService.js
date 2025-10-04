const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

class ExpenseService {
  static async getExpenses() {
    try {
      console.log("💰 ExpenseService: Fetching user expenses");
      const token = localStorage.getItem("token");
      console.log("🔑 Using token:", token ? "****" : "null");
      console.log("🌐 API URL:", `${API_BASE_URL}/expenses/my-expenses`);
      
      const response = await fetch(`${API_BASE_URL}/expenses/my-expenses`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("📡 Get expenses response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("❌ Failed to fetch expenses:", errorData);
        throw new Error(errorData.error || "Failed to fetch expenses");
      }

      const data = await response.json();
      console.log("✅ Expenses fetched successfully:", { count: data.length || 0 });
      return data;
    } catch (error) {
      console.error("🚨 ExpenseService getExpenses error:", error);
      throw new Error(error.message || "Failed to fetch expenses");
    }
  }

  static async createExpense(expenseData) {
    try {
      console.log("📝 ExpenseService: Creating new expense:", expenseData);
      const token = localStorage.getItem("token");
      console.log("🔑 Using token:", token ? "****" : "null");
      console.log("🌐 API URL:", `${API_BASE_URL}/expenses/submit`);
      
      const response = await fetch(`${API_BASE_URL}/expenses/submit`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expenseData),
      });

      console.log("📡 Create expense response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("❌ Failed to create expense:", errorData);
        throw new Error(errorData.error || "Failed to create expense");
      }

      const data = await response.json();
      console.log("✅ Expense created successfully:", { id: data.id || data._id });
      return data;
    } catch (error) {
      console.error("🚨 ExpenseService createExpense error:", error);
      throw new Error(error.message || "Failed to create expense");
    }
  }

  static async updateExpense(id, expenseData) {
    try {
      console.log("✏️ ExpenseService: Updating expense:", { id, data: expenseData });
      const token = localStorage.getItem("token");
      console.log("🌐 API URL:", `${API_BASE_URL}/expenses/${id}`);
      
      const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expenseData),
      });

      console.log("📡 Update expense response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("❌ Failed to update expense:", errorData);
        throw new Error(errorData.error || "Failed to update expense");
      }

      const data = await response.json();
      console.log("✅ Expense updated successfully:", { id });
      return data;
    } catch (error) {
      console.error("🚨 ExpenseService updateExpense error:", error);
      throw new Error(error.message || "Failed to update expense");
    }
  }

  static async deleteExpense(id) {
    try {
      console.log("🗑️ ExpenseService: Deleting expense:", { id });
      const token = localStorage.getItem("token");
      console.log("🌐 API URL:", `${API_BASE_URL}/expenses/${id}`);
      
      const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("📡 Delete expense response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("❌ Failed to delete expense:", errorData);
        throw new Error(errorData.error || "Failed to delete expense");
      }

      const data = await response.json();
      console.log("✅ Expense deleted successfully:", { id });
      return data;
    } catch (error) {
      console.error("🚨 ExpenseService deleteExpense error:", error);
      throw new Error(error.message || "Failed to delete expense");
    }
  }

  // Upload receipt with OCR
  static async uploadReceipt(file) {
    try {
      console.log("📄 ExpenseService: Uploading receipt:", { fileName: file.name, size: file.size });
      const token = localStorage.getItem("token");
      console.log("🌐 API URL:", `${API_BASE_URL}/expenses/upload-receipt`);
      
      const formData = new FormData();
      formData.append('receipt', file);

      const response = await fetch(`${API_BASE_URL}/expenses/upload-receipt`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      console.log("📡 Upload receipt response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("❌ Failed to upload receipt:", errorData);
        throw new Error(errorData.error || "Failed to upload receipt");
      }

      const data = await response.json();
      console.log("✅ Receipt uploaded successfully:", { extractedData: data });
      return data;
    } catch (error) {
      console.error("🚨 ExpenseService uploadReceipt error:", error);
      throw new Error(error.message || "Failed to upload receipt");
    }
  }

  // Get team expenses (for managers)
  static async getTeamExpenses() {
    try {
      console.log("👥 ExpenseService: Fetching team expenses");
      const token = localStorage.getItem("token");
      console.log("🌐 API URL:", `${API_BASE_URL}/expenses/team-expenses`);
      
      const response = await fetch(`${API_BASE_URL}/expenses/team-expenses`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("📡 Get team expenses response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("❌ Failed to fetch team expenses:", errorData);
        throw new Error(errorData.error || "Failed to fetch team expenses");
      }

      const data = await response.json();
      console.log("✅ Team expenses fetched successfully:", { count: data.length || 0 });
      return data;
    } catch (error) {
      console.error("🚨 ExpenseService getTeamExpenses error:", error);
      throw new Error(error.message || "Failed to fetch team expenses");
    }
  }
}

export default ExpenseService;
