const API_BASE_URL = "http://localhost:5000";

// Mock data for development
const mockPendingApprovals = [
  {
    id: "1",
    employeeName: "John Doe",
    employeeId: "emp001",
    date: "2024-10-01",
    category: "Travel",
    amount: 1250.0,
    currency: "USD",
    convertedAmount: 1250.0,
    description: "Flight tickets for client meeting",
    status: "pending",
    receipts: ["receipt1.pdf"],
    submittedAt: "2024-10-01T10:30:00Z",
  },
  {
    id: "2",
    employeeName: "Jane Smith",
    employeeId: "emp002",
    date: "2024-10-02",
    category: "Meals",
    amount: 85.5,
    currency: "USD",
    convertedAmount: 85.5,
    description: "Business lunch with client",
    status: "pending",
    receipts: ["receipt2.pdf"],
    submittedAt: "2024-10-02T14:15:00Z",
  },
  {
    id: "3",
    employeeName: "Mike Johnson",
    employeeId: "emp003",
    date: "2024-10-03",
    category: "Office Supplies",
    amount: 150.75,
    currency: "USD",
    convertedAmount: 150.75,
    description: "Printer paper and office materials",
    status: "pending",
    receipts: ["receipt3.pdf"],
    submittedAt: "2024-10-03T09:45:00Z",
  },
];

const mockTeamExpenses = [
  ...mockPendingApprovals,
  {
    id: "4",
    employeeName: "Sarah Wilson",
    employeeId: "emp004",
    date: "2024-09-28",
    category: "Travel",
    amount: 2100.0,
    currency: "USD",
    convertedAmount: 2100.0,
    description: "Hotel accommodation for conference",
    status: "approved",
    receipts: ["receipt4.pdf"],
    submittedAt: "2024-09-28T16:20:00Z",
    approvedAt: "2024-09-29T08:30:00Z",
    approvedBy: "manager001",
  },
  {
    id: "5",
    employeeName: "David Brown",
    employeeId: "emp005",
    date: "2024-09-25",
    category: "Software",
    amount: 299.99,
    currency: "USD",
    convertedAmount: 299.99,
    description: "Annual software license",
    status: "rejected",
    receipts: ["receipt5.pdf"],
    submittedAt: "2024-09-25T11:10:00Z",
    rejectedAt: "2024-09-26T10:15:00Z",
    rejectedBy: "manager001",
    rejectionReason: "License already covered by company subscription",
  },
];

// Currency conversion rates (mock data)
const exchangeRates = {
  USD: 1.0,
  EUR: 1.1,
  GBP: 1.25,
  CAD: 0.75,
  INR: 0.012,
};

const managerService = {
  // Get pending approvals for the manager
  async getPendingApprovals(managerId) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/manager/pending-approvals`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch pending approvals");
      }

      return await response.json();
    } catch (error) {
      console.warn("API call failed, using mock data:", error.message);
      // Return mock data with currency conversion
      return mockPendingApprovals.map((expense) => ({
        ...expense,
        convertedAmount: this.convertCurrency(
          expense.amount,
          expense.currency,
          "USD"
        ),
      }));
    }
  },

  // Get all team expenses
  async getTeamExpenses(managerId, filters = {}) {
    try {
      const queryParams = new URLSearchParams();
      if (filters.status) queryParams.append("status", filters.status);
      if (filters.category) queryParams.append("category", filters.category);
      if (filters.employeeId)
        queryParams.append("employeeId", filters.employeeId);
      if (filters.startDate) queryParams.append("startDate", filters.startDate);
      if (filters.endDate) queryParams.append("endDate", filters.endDate);

      const response = await fetch(
        `${API_BASE_URL}/api/manager/team-expenses?${queryParams}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch team expenses");
      }

      return await response.json();
    } catch (error) {
      console.warn("API call failed, using mock data:", error.message);
      let filteredExpenses = [...mockTeamExpenses];

      // Apply filters to mock data
      if (filters.status) {
        filteredExpenses = filteredExpenses.filter(
          (exp) => exp.status === filters.status
        );
      }
      if (filters.category) {
        filteredExpenses = filteredExpenses.filter(
          (exp) => exp.category === filters.category
        );
      }
      if (filters.employeeId) {
        filteredExpenses = filteredExpenses.filter(
          (exp) => exp.employeeId === filters.employeeId
        );
      }

      return filteredExpenses.map((expense) => ({
        ...expense,
        convertedAmount: this.convertCurrency(
          expense.amount,
          expense.currency,
          "USD"
        ),
      }));
    }
  },

  // Approve an expense
  async approveExpense(expenseId) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/manager/approve/${expenseId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to approve expense");
      }

      return await response.json();
    } catch (error) {
      console.warn("API call failed, simulating approval:", error.message);
      // Simulate successful approval
      return {
        success: true,
        message: "Expense approved successfully",
        expenseId,
        status: "approved",
      };
    }
  },

  // Reject an expense with comment
  async rejectExpense(expenseId, rejectionReason) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/manager/reject/${expenseId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ rejectionReason }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to reject expense");
      }

      return await response.json();
    } catch (error) {
      console.warn("API call failed, simulating rejection:", error.message);
      // Simulate successful rejection
      return {
        success: true,
        message: "Expense rejected successfully",
        expenseId,
        status: "rejected",
        rejectionReason,
      };
    }
  },

  // Get expense details
  async getExpenseDetails(expenseId) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/expenses/${expenseId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch expense details");
      }

      return await response.json();
    } catch (error) {
      console.warn("API call failed, using mock data:", error.message);
      // Return mock expense details
      const expense = [...mockPendingApprovals, ...mockTeamExpenses].find(
        (exp) => exp.id === expenseId
      );
      if (expense) {
        return {
          ...expense,
          convertedAmount: this.convertCurrency(
            expense.amount,
            expense.currency,
            "USD"
          ),
        };
      }
      throw new Error("Expense not found");
    }
  },

  // Currency conversion utility
  convertCurrency(amount, fromCurrency, toCurrency) {
    if (fromCurrency === toCurrency) return amount;

    const fromRate = exchangeRates[fromCurrency] || 1;
    const toRate = exchangeRates[toCurrency] || 1;

    return (amount / fromRate) * toRate;
  },

  // Get team members for filtering
  async getTeamMembers(managerId) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/manager/team-members`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch team members");
      }

      return await response.json();
    } catch (error) {
      console.warn("API call failed, using mock data:", error.message);
      // Return mock team members
      return [
        { id: "emp001", name: "John Doe" },
        { id: "emp002", name: "Jane Smith" },
        { id: "emp003", name: "Mike Johnson" },
        { id: "emp004", name: "Sarah Wilson" },
        { id: "emp005", name: "David Brown" },
      ];
    }
  },
};

export default managerService;
