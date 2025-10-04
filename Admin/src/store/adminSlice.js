import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { adminService } from "../api/adminService";

// Async thunks
export const fetchUsers = createAsyncThunk(
  "admin/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminService.getUsers();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch users"
      );
    }
  }
);

export const createUser = createAsyncThunk(
  "admin/createUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await adminService.createUser(userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create user"
      );
    }
  }
);

export const updateUser = createAsyncThunk(
  "admin/updateUser",
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      const response = await adminService.updateUser(id, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update user"
      );
    }
  }
);

export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      await adminService.deleteUser(userId);
      return userId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete user"
      );
    }
  }
);

export const fetchApprovalRules = createAsyncThunk(
  "admin/fetchApprovalRules",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminService.getApprovalRules();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch approval rules"
      );
    }
  }
);

export const createApprovalRule = createAsyncThunk(
  "admin/createApprovalRule",
  async (ruleData, { rejectWithValue }) => {
    try {
      const response = await adminService.createApprovalRule(ruleData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create approval rule"
      );
    }
  }
);

export const fetchAllExpenses = createAsyncThunk(
  "admin/fetchAllExpenses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminService.getAllExpenses();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch expenses"
      );
    }
  }
);

export const overrideExpenseApproval = createAsyncThunk(
  "admin/overrideExpenseApproval",
  async ({ expenseId, action, reason }, { rejectWithValue }) => {
    try {
      const response = await adminService.overrideExpenseApproval(
        expenseId,
        action,
        reason
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to override expense approval"
      );
    }
  }
);

const initialState = {
  users: [],
  approvalRules: [],
  expenses: [],
  loading: {
    users: false,
    rules: false,
    expenses: false,
  },
  error: {
    users: null,
    rules: null,
    expenses: null,
  },
  filters: {
    userSearch: "",
    expenseStatus: "all",
    expenseDateRange: { start: null, end: null },
  },
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = { users: null, rules: null, expenses: null };
    },
    setUserSearch: (state, action) => {
      state.filters.userSearch = action.payload;
    },
    setExpenseStatusFilter: (state, action) => {
      state.filters.expenseStatus = action.payload;
    },
    setExpenseDateRangeFilter: (state, action) => {
      state.filters.expenseDateRange = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Users
      .addCase(fetchUsers.pending, (state) => {
        state.loading.users = true;
        state.error.users = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading.users = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading.users = false;
        state.error.users = action.payload;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      })

      // Approval Rules
      .addCase(fetchApprovalRules.pending, (state) => {
        state.loading.rules = true;
        state.error.rules = null;
      })
      .addCase(fetchApprovalRules.fulfilled, (state, action) => {
        state.loading.rules = false;
        state.approvalRules = action.payload;
      })
      .addCase(fetchApprovalRules.rejected, (state, action) => {
        state.loading.rules = false;
        state.error.rules = action.payload;
      })
      .addCase(createApprovalRule.fulfilled, (state, action) => {
        state.approvalRules.push(action.payload);
      })

      // Expenses
      .addCase(fetchAllExpenses.pending, (state) => {
        state.loading.expenses = true;
        state.error.expenses = null;
      })
      .addCase(fetchAllExpenses.fulfilled, (state, action) => {
        state.loading.expenses = false;
        state.expenses = action.payload;
      })
      .addCase(fetchAllExpenses.rejected, (state, action) => {
        state.loading.expenses = false;
        state.error.expenses = action.payload;
      })
      .addCase(overrideExpenseApproval.fulfilled, (state, action) => {
        const index = state.expenses.findIndex(
          (expense) => expense.id === action.payload.id
        );
        if (index !== -1) {
          state.expenses[index] = action.payload;
        }
      });
  },
});

export const {
  clearErrors,
  setUserSearch,
  setExpenseStatusFilter,
  setExpenseDateRangeFilter,
} = adminSlice.actions;

export default adminSlice.reducer;
