import React from "react";
import { FaPlus, FaTrash, FaGripVertical } from "react-icons/fa";

const SequentialApprovers = ({ ruleType, approvers, onChange }) => {
  const addApprover = () => {
    const newApprover = {
      type: "manager",
      required: true,
      order: approvers.length + 1,
    };

    if (ruleType === "percentage") {
      newApprover.percentage = 50;
    }

    onChange([...approvers, newApprover]);
  };

  const removeApprover = (index) => {
    const newApprovers = approvers.filter((_, i) => i !== index);
    // Re-order the remaining approvers
    const reorderedApprovers = newApprovers.map((approver, i) => ({
      ...approver,
      order: i + 1,
    }));
    onChange(reorderedApprovers);
  };

  const updateApprover = (index, field, value) => {
    const newApprovers = [...approvers];
    newApprovers[index] = {
      ...newApprovers[index],
      [field]: value,
    };
    onChange(newApprovers);
  };

  const moveApprover = (index, direction) => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === approvers.length - 1)
    ) {
      return;
    }

    const newApprovers = [...approvers];
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    // Swap the approvers
    [newApprovers[index], newApprovers[targetIndex]] = [
      newApprovers[targetIndex],
      newApprovers[index],
    ];

    // Update their order
    newApprovers.forEach((approver, i) => {
      approver.order = i + 1;
    });

    onChange(newApprovers);
  };

  const approverTypes = [
    { value: "manager", label: "Direct Manager" },
    { value: "finance", label: "Finance Team" },
    { value: "director", label: "Director" },
    { value: "cfo", label: "CFO" },
    { value: "custom", label: "Custom Role" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-medium text-gray-900">
          {ruleType === "sequential" && "Sequential Approvers"}
          {ruleType === "percentage" && "Percentage-Based Approvers"}
          {ruleType === "specific" && "Specific Approvers"}
        </h4>
        <button
          type="button"
          onClick={addApprover}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <FaPlus className="mr-2 h-4 w-4" />
          Add Approver
        </button>
      </div>

      {ruleType === "sequential" && (
        <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-md">
          <strong>Sequential Approval:</strong> Expenses must be approved by
          each approver in order. The expense moves to the next approver only
          after the current one approves it.
        </div>
      )}

      {ruleType === "percentage" && (
        <div className="text-sm text-gray-600 bg-orange-50 p-3 rounded-md">
          <strong>Percentage-Based Approval:</strong> A certain percentage of
          approvers must approve the expense. You can set different weights for
          different approver types.
        </div>
      )}

      {ruleType === "specific" && (
        <div className="text-sm text-gray-600 bg-purple-50 p-3 rounded-md">
          <strong>Specific Approver:</strong> If any of the specified approvers
          approve the expense, it will be automatically approved, bypassing
          other approval steps.
        </div>
      )}

      <div className="space-y-3">
        {approvers.map((approver, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg bg-gray-50"
          >
            {/* Order/Move Controls */}
            {ruleType === "sequential" && (
              <div className="flex flex-col space-y-1">
                <button
                  type="button"
                  onClick={() => moveApprover(index, "up")}
                  disabled={index === 0}
                  className="text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ↑
                </button>
                <FaGripVertical className="text-gray-400" />
                <button
                  type="button"
                  onClick={() => moveApprover(index, "down")}
                  disabled={index === approvers.length - 1}
                  className="text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ↓
                </button>
              </div>
            )}

            {/* Order Number */}
            <div className="flex-shrink-0">
              <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium">
                {approver.order}
              </span>
            </div>

            {/* Approver Type */}
            <div className="flex-1">
              <select
                value={approver.type}
                onChange={(e) => updateApprover(index, "type", e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                {approverTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Required Toggle */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={approver.required}
                onChange={(e) =>
                  updateApprover(index, "required", e.target.checked)
                }
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label className="text-sm text-gray-700">Required</label>
            </div>

            {/* Percentage Input (for percentage-based rules) */}
            {ruleType === "percentage" && (
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={approver.percentage || 50}
                  onChange={(e) =>
                    updateApprover(
                      index,
                      "percentage",
                      parseInt(e.target.value)
                    )
                  }
                  className="w-16 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <span className="text-sm text-gray-700">%</span>
              </div>
            )}

            {/* Remove Button */}
            <button
              type="button"
              onClick={() => removeApprover(index)}
              className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-full transition-colors"
              title="Remove approver"
            >
              <FaTrash className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {approvers.length === 0 && (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500">No approvers added yet</p>
          <button
            type="button"
            onClick={addApprover}
            className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FaPlus className="mr-2 h-4 w-4" />
            Add First Approver
          </button>
        </div>
      )}

      {/* Rule Summary */}
      {approvers.length > 0 && (
        <div className="mt-4 p-3 bg-gray-100 rounded-md">
          <h5 className="text-sm font-medium text-gray-900 mb-2">
            Rule Summary:
          </h5>
          <div className="text-sm text-gray-600">
            {ruleType === "sequential" && (
              <p>
                Expenses will be approved sequentially by {approvers.length}{" "}
                approver(s). Required approvers:{" "}
                {approvers.filter((a) => a.required).length}
              </p>
            )}
            {ruleType === "percentage" && (
              <p>
                Total approval weight:{" "}
                {approvers.reduce((sum, a) => sum + (a.percentage || 0), 0)}%
              </p>
            )}
            {ruleType === "specific" && (
              <p>
                Any of the {approvers.length} specified approver(s) can approve
                expenses with this rule.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SequentialApprovers;
