// Mock API service for admin operations
// In a real application, replace these with actual API calls

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// Mock data for development
const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@company.com",
    role: "Employee",
    managerId: 2,
    managerName: "Jane Smith",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@company.com",
    role: "Manager",
    managerId: 3,
    managerName: "Bob Johnson",
    createdAt: "2024-01-10",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob.johnson@company.com",
    role: "Manager",
    managerId: null,
    managerName: null,
    createdAt: "2024-01-05",
  },
];

const mockApprovalRules = [
  {
    id: 1,
    name: "Standard Expense Approval",
    description: "Default approval rule for expenses under $1000",
    conditions: {
      maxAmount: 1000,
      categories: ["Travel", "Meals", "Office Supplies"],
    },
    approvers: [
      { type: "manager", required: true, order: 1 },
      { type: "finance", required: false, order: 2 },
    ],
    ruleType: "sequential",
    isActive: true,
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "High-Value Expense Approval",
    description: "Approval rule for expenses over $1000",
    conditions: {
      minAmount: 1000,
      categories: ["All"],
    },
    approvers: [
      { type: "manager", required: true, order: 1 },
      { type: "finance", required: true, order: 2 },
      { type: "director", required: true, order: 3 },
    ],
    ruleType: "sequential",
    isActive: true,
    createdAt: "2024-01-10",
  },
];

const mockExpenses = [
  {
    id: 1,
    employeeName: "John Doe",
    employeeEmail: "john.doe@company.com",
    amount: 450.0,
    currency: "USD",
    category: "Travel",
    description: "Flight to client meeting",
    date: "2024-01-20",
    status: "Pending",
    submittedAt: "2024-01-21",
    approvers: [{ name: "Jane Smith", status: "Pending", role: "Manager" }],
  },
  {
    id: 2,
    employeeName: "Jane Smith",
    employeeEmail: "jane.smith@company.com",
    amount: 1250.0,
    currency: "USD",
    category: "Software",
    description: "Annual software license",
    date: "2024-01-18",
    status: "Approved",
    submittedAt: "2024-01-19",
    approvers: [
      { name: "Bob Johnson", status: "Approved", role: "Manager" },
      { name: "Finance Team", status: "Approved", role: "Finance" },
    ],
  },
];

// Simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const adminService = {
  // User Management
  async getUsers() {
    await delay(500);
    return { data: mockUsers };
  },

  async createUser(userData) {
    await delay(300);
    const newUser = {
      id: Date.now(),
      ...userData,
      createdAt: new Date().toISOString().split("T")[0],
    };
    mockUsers.push(newUser);
    return { data: newUser };
  },

  async updateUser(id, userData) {
    await delay(300);
    const index = mockUsers.findIndex((user) => user.id === parseInt(id));
    if (index !== -1) {
      mockUsers[index] = { ...mockUsers[index], ...userData };
      return { data: mockUsers[index] };
    }
    throw new Error("User not found");
  },

  async deleteUser(id) {
    await delay(300);
    const index = mockUsers.findIndex((user) => user.id === parseInt(id));
    if (index !== -1) {
      mockUsers.splice(index, 1);
      return { success: true };
    }
    throw new Error("User not found");
  },

  // Approval Rules
  async getApprovalRules() {
    await delay(500);
    return { data: mockApprovalRules };
  },

  async createApprovalRule(ruleData) {
    await delay(300);
    const newRule = {
      id: Date.now(),
      ...ruleData,
      isActive: true,
      createdAt: new Date().toISOString().split("T")[0],
    };
    mockApprovalRules.push(newRule);
    return { data: newRule };
  },

  async updateApprovalRule(id, ruleData) {
    await delay(300);
    const index = mockApprovalRules.findIndex(
      (rule) => rule.id === parseInt(id)
    );
    if (index !== -1) {
      mockApprovalRules[index] = { ...mockApprovalRules[index], ...ruleData };
      return { data: mockApprovalRules[index] };
    }
    throw new Error("Approval rule not found");
  },

  async deleteApprovalRule(id) {
    await delay(300);
    const index = mockApprovalRules.findIndex(
      (rule) => rule.id === parseInt(id)
    );
    if (index !== -1) {
      mockApprovalRules.splice(index, 1);
      return { success: true };
    }
    throw new Error("Approval rule not found");
  },

  // Expense Management
  async getAllExpenses() {
    await delay(500);
    return { data: mockExpenses };
  },

  async overrideExpenseApproval(expenseId, action, reason) {
    await delay(300);
    const index = mockExpenses.findIndex(
      (expense) => expense.id === parseInt(expenseId)
    );
    if (index !== -1) {
      mockExpenses[index].status =
        action === "approve" ? "Approved" : "Rejected";
      mockExpenses[index].overrideReason = reason;
      mockExpenses[index].overriddenAt = new Date().toISOString();
      return { data: mockExpenses[index] };
    }
    throw new Error("Expense not found");
  },

  // Real API calls (commented out for now)
  /*
  async getUsers() {
    const response = await fetch(`${BASE_URL}/admin/users`);
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  },

  async createUser(userData) {
    const response = await fetch(`${BASE_URL}/admin/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error('Failed to create user');
    return response.json();
  },

  // ... other real API methods
  */
};
