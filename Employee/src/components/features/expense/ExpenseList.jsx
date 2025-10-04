import PropTypes from "prop-types";
import Button from "../../ui/Button";
import { formatCurrency } from "../../../utils/currency";
import { formatDate } from "../../../utils/formatDate";

const ExpenseList = ({ expenses = [], onEdit, onDelete, loading = false }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (expenses.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No expenses found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {expenses.map((expense) => (
        <div key={expense.id} className="bg-white p-4 rounded-lg shadow border">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">
                {expense.title}
              </h3>
              <p className="text-sm text-gray-600 capitalize">
                {expense.category}
              </p>
              {expense.description && (
                <p className="text-sm text-gray-700 mt-1">
                  {expense.description}
                </p>
              )}
              <p className="text-sm text-gray-500 mt-2">
                {formatDate(expense.date)}
              </p>
            </div>
            <div className="text-right ml-4">
              <p className="text-xl font-bold text-green-600">
                {formatCurrency(expense.amount)}
              </p>
              <div className="flex space-x-2 mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(expense)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onDelete(expense.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

ExpenseList.propTypes = {
  expenses: PropTypes.array,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default ExpenseList;
