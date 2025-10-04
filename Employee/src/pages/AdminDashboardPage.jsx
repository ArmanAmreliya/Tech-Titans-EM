import { useState, useEffect } from "react";
import ExpenseService from "../api/expenseService";
import ExpenseList from "../components/features/expense/ExpenseList";
import ExpenseForm from "../components/features/expense/ExpenseForm";
import Button from "../components/ui/Button";

const AdminDashboardPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const data = await ExpenseService.getExpenses();
      setExpenses(data);
    } catch (error) {
      console.error("Failed to fetch expenses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingExpense) {
        await ExpenseService.updateExpense(editingExpense.id, formData);
      } else {
        await ExpenseService.createExpense(formData);
      }

      setShowForm(false);
      setEditingExpense(null);
      fetchExpenses();
    } catch (error) {
      console.error("Failed to save expense:", error);
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      try {
        await ExpenseService.deleteExpense(id);
        fetchExpenses();
      } catch (error) {
        console.error("Failed to delete expense:", error);
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingExpense(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <Button onClick={() => setShowForm(true)} disabled={showForm}>
          Add New Expense
        </Button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold mb-4">
            {editingExpense ? "Edit Expense" : "Add New Expense"}
          </h2>
          <ExpenseForm
            onSubmit={handleSubmit}
            initialData={editingExpense}
            loading={false}
          />
          <div className="mt-4">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">All Expenses</h2>
        <ExpenseList
          expenses={expenses}
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
