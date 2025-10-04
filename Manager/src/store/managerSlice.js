import { create } from "zustand";
import managerService from "../api/managerService";
import toast from "react-hot-toast";

const useManagerStore = create((set, get) => ({
  // State
  pendingApprovals: [],
  teamExpenses: [],
  teamMembers: [],
  loading: false,
  error: null,
  filters: {
    status: "",
    category: "",
    employeeId: "",
    startDate: "",
    endDate: "",
  },

  // Actions
  setPendingApprovals: (approvals) => set({ pendingApprovals: approvals }),
  setTeamExpenses: (expenses) => set({ teamExpenses: expenses }),
  setTeamMembers: (members) => set({ teamMembers: members }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setFilters: (filters) => set({ filters: { ...get().filters, ...filters } }),
  clearFilters: () =>
    set({
      filters: {
        status: "",
        category: "",
        employeeId: "",
        startDate: "",
        endDate: "",
      },
    }),

  // Fetch pending approvals
  fetchPendingApprovals: async () => {
    set({ loading: true, error: null });
    try {
      const approvals = await managerService.getPendingApprovals();
      set({ pendingApprovals: approvals, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error("Failed to fetch pending approvals");
    }
  },

  // Fetch team expenses
  fetchTeamExpenses: async (filters = {}) => {
    set({ loading: true, error: null });
    try {
      const expenses = await managerService.getTeamExpenses(null, filters);
      set({ teamExpenses: expenses, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error("Failed to fetch team expenses");
    }
  },

  // Fetch team members
  fetchTeamMembers: async () => {
    try {
      const members = await managerService.getTeamMembers();
      set({ teamMembers: members });
    } catch (error) {
      console.error("Failed to fetch team members:", error);
    }
  },

  // Approve expense
  approveExpense: async (expenseId) => {
    set({ loading: true });
    try {
      await managerService.approveExpense(expenseId);

      // Remove from pending approvals
      const currentApprovals = get().pendingApprovals;
      const updatedApprovals = currentApprovals.filter(
        (approval) => approval.id !== expenseId
      );
      set({ pendingApprovals: updatedApprovals });

      // Update team expenses if the expense exists there
      const currentTeamExpenses = get().teamExpenses;
      const updatedTeamExpenses = currentTeamExpenses.map((expense) =>
        expense.id === expenseId
          ? {
              ...expense,
              status: "approved",
              approvedAt: new Date().toISOString(),
            }
          : expense
      );
      set({ teamExpenses: updatedTeamExpenses, loading: false });

      toast.success("Expense approved successfully");
    } catch (error) {
      set({ loading: false });
      toast.error("Failed to approve expense");
    }
  },

  // Reject expense
  rejectExpense: async (expenseId, rejectionReason) => {
    set({ loading: true });
    try {
      await managerService.rejectExpense(expenseId, rejectionReason);

      // Remove from pending approvals
      const currentApprovals = get().pendingApprovals;
      const updatedApprovals = currentApprovals.filter(
        (approval) => approval.id !== expenseId
      );
      set({ pendingApprovals: updatedApprovals });

      // Update team expenses if the expense exists there
      const currentTeamExpenses = get().teamExpenses;
      const updatedTeamExpenses = currentTeamExpenses.map((expense) =>
        expense.id === expenseId
          ? {
              ...expense,
              status: "rejected",
              rejectedAt: new Date().toISOString(),
              rejectionReason,
            }
          : expense
      );
      set({ teamExpenses: updatedTeamExpenses, loading: false });

      toast.success("Expense rejected successfully");
    } catch (error) {
      set({ loading: false });
      toast.error("Failed to reject expense");
    }
  },

  // Get expense by ID
  getExpenseById: (expenseId) => {
    const { pendingApprovals, teamExpenses } = get();
    return [...pendingApprovals, ...teamExpenses].find(
      (expense) => expense.id === expenseId
    );
  },

  // Get filtered expenses
  getFilteredExpenses: () => {
    const { teamExpenses, filters } = get();
    let filtered = [...teamExpenses];

    if (filters.status) {
      filtered = filtered.filter(
        (expense) => expense.status === filters.status
      );
    }

    if (filters.category) {
      filtered = filtered.filter(
        (expense) => expense.category === filters.category
      );
    }

    if (filters.employeeId) {
      filtered = filtered.filter(
        (expense) => expense.employeeId === filters.employeeId
      );
    }

    if (filters.startDate) {
      filtered = filtered.filter(
        (expense) => expense.date >= filters.startDate
      );
    }

    if (filters.endDate) {
      filtered = filtered.filter((expense) => expense.date <= filters.endDate);
    }

    return filtered;
  },

  // Get summary statistics
  getSummaryStats: () => {
    const { pendingApprovals, teamExpenses } = get();

    const totalPending = pendingApprovals.length;
    const totalPendingAmount = pendingApprovals.reduce(
      (sum, approval) => sum + approval.convertedAmount,
      0
    );

    const approvedExpenses = teamExpenses.filter(
      (expense) => expense.status === "approved"
    );
    const rejectedExpenses = teamExpenses.filter(
      (expense) => expense.status === "rejected"
    );

    const totalApproved = approvedExpenses.length;
    const totalRejected = rejectedExpenses.length;
    const totalApprovedAmount = approvedExpenses.reduce(
      (sum, expense) => sum + expense.convertedAmount,
      0
    );

    return {
      totalPending,
      totalPendingAmount,
      totalApproved,
      totalRejected,
      totalApprovedAmount,
      totalProcessed: totalApproved + totalRejected,
    };
  },
}));

export default useManagerStore;
