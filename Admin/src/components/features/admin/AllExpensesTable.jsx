import React from "react";
import {
  FaEye,
  FaCheck,
  FaTimes,
  FaClock,
  FaExclamationTriangle,
  FaFileInvoiceDollar,
} from "react-icons/fa";

const AllExpensesTable = ({ expenses, loading, onOverrideExpense }) => {
  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "approved":
        return <FaCheck className="h-4 w-4 text-green-500" />;
      case "rejected":
        return <FaTimes className="h-4 w-4 text-red-500" />;
      case "pending":
        return <FaClock className="h-4 w-4 text-yellow-500" />;
      default:
        return <FaExclamationTriangle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      Travel: "bg-blue-100 text-blue-800",
      Meals: "bg-orange-100 text-orange-800",
      Software: "bg-purple-100 text-purple-800",
      "Office Supplies": "bg-green-100 text-green-800",
      Training: "bg-indigo-100 text-indigo-800",
      Marketing: "bg-pink-100 text-pink-800",
      Equipment: "bg-gray-100 text-gray-800",
      Other: "bg-yellow-100 text-yellow-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const canOverride = (expense) => {
    return expense.status.toLowerCase() === "pending";
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (expenses.length === 0) {
    return (
      <div className="p-6 text-center">
        <FaFileInvoiceDollar className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          No expenses found
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          No expenses match your current filter criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Expense
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Submitted
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Approval Flow
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {expenses.map((expense) => (
              <tr key={expense.id} className="hover:bg-gray-50">
                {/* Employee */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                          {expense.employeeName.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {expense.employeeName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {expense.employeeEmail}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Expense */}
                <td className="px-6 py-4">
                  <div
                    className="text-sm text-gray-900 max-w-xs truncate"
                    title={expense.description}
                  >
                    {expense.description}
                  </div>
                  <div className="text-sm text-gray-500">
                    {formatDate(expense.date)}
                  </div>
                </td>

                {/* Amount */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    ${expense.amount.toLocaleString()} {expense.currency}
                  </div>
                </td>

                {/* Category */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(
                      expense.category
                    )}`}
                  >
                    {expense.category}
                  </span>
                </td>

                {/* Status */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {getStatusIcon(expense.status)}
                    <span
                      className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(
                        expense.status
                      )}`}
                    >
                      {expense.status}
                    </span>
                  </div>
                </td>

                {/* Submitted */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(expense.submittedAt)}
                </td>

                {/* Approval Flow */}
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {expense.approvers && expense.approvers.length > 0 ? (
                      <div className="space-y-1">
                        {expense.approvers
                          .slice(0, 2)
                          .map((approver, index) => (
                            <div
                              key={index}
                              className="flex items-center text-xs"
                            >
                              <span
                                className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                                  approver.status === "Approved"
                                    ? "bg-green-100 text-green-800"
                                    : approver.status === "Rejected"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {approver.name} - {approver.status}
                              </span>
                            </div>
                          ))}
                        {expense.approvers.length > 2 && (
                          <div className="text-xs text-gray-500">
                            +{expense.approvers.length - 2} more
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-400 italic">No approvers</span>
                    )}
                  </div>
                </td>

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-full transition-colors"
                      title="View details"
                    >
                      <FaEye className="h-4 w-4" />
                    </button>

                    {canOverride(expense) && (
                      <>
                        <button
                          onClick={() => onOverrideExpense(expense, "approve")}
                          className="text-green-600 hover:text-green-800 p-1 hover:bg-green-50 rounded-full transition-colors"
                          title="Override approve"
                        >
                          <FaCheck className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onOverrideExpense(expense, "reject")}
                          className="text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded-full transition-colors"
                          title="Override reject"
                        >
                          <FaTimes className="h-4 w-4" />
                        </button>
                      </>
                    )}

                    {expense.overrideReason && (
                      <div className="ml-2">
                        <span
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800"
                          title={`Admin Override: ${expense.overrideReason}`}
                        >
                          Override
                        </span>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination could be added here */}
      <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">{expenses.length}</span> of{" "}
            <span className="font-medium">{expenses.length}</span> results
          </div>
          {/* Pagination controls would go here in a real app */}
        </div>
      </div>
    </div>
  );
};

export default AllExpensesTable;
