import React from "react";
import {
  FaEdit,
  FaToggleOn,
  FaToggleOff,
  FaUsers,
  FaPercentage,
  FaCrown,
} from "react-icons/fa";

const RuleCard = ({ rule, onEdit }) => {
  const getRuleTypeIcon = (ruleType) => {
    switch (ruleType) {
      case "sequential":
        return FaUsers;
      case "percentage":
        return FaPercentage;
      case "specific":
        return FaCrown;
      default:
        return FaUsers;
    }
  };

  const getRuleTypeColor = (ruleType) => {
    switch (ruleType) {
      case "sequential":
        return "bg-blue-100 text-blue-800";
      case "percentage":
        return "bg-orange-100 text-orange-800";
      case "specific":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatRuleType = (ruleType) => {
    switch (ruleType) {
      case "sequential":
        return "Sequential Approval";
      case "percentage":
        return "Percentage Based";
      case "specific":
        return "Specific Approver";
      default:
        return "Unknown";
    }
  };

  const formatConditions = (conditions) => {
    const parts = [];

    if (conditions.maxAmount) {
      parts.push(`≤ $${conditions.maxAmount.toLocaleString()}`);
    }
    if (conditions.minAmount) {
      parts.push(`≥ $${conditions.minAmount.toLocaleString()}`);
    }
    if (conditions.categories && conditions.categories.length > 0) {
      if (conditions.categories.includes("All")) {
        parts.push("All categories");
      } else {
        parts.push(`${conditions.categories.join(", ")}`);
      }
    }

    return parts.join(" • ");
  };

  const RuleTypeIcon = getRuleTypeIcon(rule.ruleType);

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                <RuleTypeIcon className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">{rule.name}</h3>
              <p className="text-sm text-gray-500">{rule.description}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {rule.isActive ? (
              <FaToggleOn className="h-6 w-6 text-green-500" title="Active" />
            ) : (
              <FaToggleOff className="h-6 w-6 text-gray-400" title="Inactive" />
            )}
            <button
              onClick={() => onEdit(rule)}
              className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded transition-colors"
              title="Edit rule"
            >
              <FaEdit className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Rule Type Badge */}
        <div className="mb-4">
          <span
            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRuleTypeColor(
              rule.ruleType
            )}`}
          >
            {formatRuleType(rule.ruleType)}
          </span>
        </div>

        {/* Conditions */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Conditions</h4>
          <p className="text-sm text-gray-600">
            {formatConditions(rule.conditions)}
          </p>
        </div>

        {/* Approvers */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">
            Approval Flow ({rule.approvers.length} steps)
          </h4>
          <div className="space-y-2">
            {rule.approvers.slice(0, 3).map((approver, index) => (
              <div key={index} className="flex items-center text-sm">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-700">
                  {approver.order || index + 1}
                </span>
                <span className="ml-2 text-gray-600 capitalize">
                  {approver.type}
                  {approver.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </span>
              </div>
            ))}
            {rule.approvers.length > 3 && (
              <div className="text-sm text-gray-500">
                +{rule.approvers.length - 3} more steps
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-200">
          <span>Created {new Date(rule.createdAt).toLocaleDateString()}</span>
          <span className={rule.isActive ? "text-green-600" : "text-gray-400"}>
            {rule.isActive ? "Active" : "Inactive"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RuleCard;
