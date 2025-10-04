import { useState } from "react";
import { Check, X, Eye, Calendar, DollarSign, User } from "lucide-react";
import ExpenseDetailModal from "./ExpenseDetailModal";
import useManagerStore from "../../../store/managerSlice";

const ApprovalQueueTable = () => {
  const { pendingApprovals, loading, approveExpense, rejectExpense } =
    useManagerStore();

  const [selectedExpense, setSelectedExpense] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState(null); // 'approve' or 'reject'

  const handleViewDetails = (expense) => {
    setSelectedExpense(expense);
    setActionType("view");
    setIsModalOpen(true);
  };

  const handleApprove = (expense) => {
    setSelectedExpense(expense);
    setActionType("approve");
    setIsModalOpen(true);
  };

  const handleReject = (expense) => {
    setSelectedExpense(expense);
    setActionType("reject");
    setIsModalOpen(true);
  };

  const confirmAction = async (rejectionReason = null) => {
    if (!selectedExpense) return;

    if (actionType === "approve") {
      await approveExpense(selectedExpense.id);
    } else if (actionType === "reject" && rejectionReason) {
      await rejectExpense(selectedExpense.id, rejectionReason);
    }

    setIsModalOpen(false);
    setSelectedExpense(null);
    setActionType(null);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      Travel: "bg-blue-100 text-blue-800",
      Meals: "bg-green-100 text-green-800",
      "Office Supplies": "bg-yellow-100 text-yellow-800",
      Software: "bg-purple-100 text-purple-800",
      Transportation: "bg-indigo-100 text-indigo-800",
      Entertainment: "bg-pink-100 text-pink-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (pendingApprovals.length === 0) {
    return (
      <div className="text-center py-12">
        <ClipboardCheck className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          No pending approvals
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          All expenses have been processed. Great job!
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="table-header">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Employee
                  </div>
                </th>
                <th className="table-header">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Date
                  </div>
                </th>
                <th className="table-header">Category</th>
                <th className="table-header">
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Amount
                  </div>
                </th>
                <th className="table-header">Description</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pendingApprovals.map((expense) => (
                <tr key={expense.id} className="hover:bg-gray-50">
                  <td className="table-cell">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-primary-700">
                            {expense.employeeName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {expense.employeeName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {expense.employeeId}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="text-sm text-gray-900">
                      {formatDate(expense.date)}
                    </div>
                    <div className="text-sm text-gray-500">
                      Submitted {formatDate(expense.submittedAt)}
                    </div>
                  </td>
                  <td className="table-cell">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(
                        expense.category
                      )}`}
                    >
                      {expense.category}
                    </span>
                  </td>
                  <td className="table-cell">
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(expense.convertedAmount)}
                    </div>
                    {expense.currency !== "USD" && (
                      <div className="text-sm text-gray-500">
                        {formatCurrency(expense.amount)} {expense.currency}
                      </div>
                    )}
                  </td>
                  <td className="table-cell">
                    <div className="text-sm text-gray-900 max-w-xs truncate">
                      {expense.description}
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewDetails(expense)}
                        className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </button>
                      <button
                        onClick={() => handleApprove(expense)}
                        className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-success-600 hover:bg-success-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-success-500"
                      >
                        <Check className="h-3 w-3 mr-1" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(expense)}
                        className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-danger-600 hover:bg-danger-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-danger-500"
                      >
                        <X className="h-3 w-3 mr-1" />
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Expense Detail Modal */}
      <ExpenseDetailModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedExpense(null);
          setActionType(null);
        }}
        expense={selectedExpense}
        actionType={actionType}
        onConfirm={confirmAction}
      />
    </>
  );
};

export default ApprovalQueueTable;
