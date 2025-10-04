import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { FaPlus, FaCog, FaUsers, FaPercentage } from "react-icons/fa";
import { fetchApprovalRules } from "../../store/adminSlice";
import RuleCard from "../../components/features/admin/RuleCard";
import RuleBuilder from "../../components/features/admin/RuleBuilder";

const ApprovalRulesPage = () => {
  const dispatch = useDispatch();
  const { approvalRules, loading, error } = useSelector((state) => state.admin);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [editingRule, setEditingRule] = useState(null);

  useEffect(() => {
    dispatch(fetchApprovalRules());
  }, [dispatch]);

  useEffect(() => {
    if (error.rules) {
      toast.error(error.rules);
    }
  }, [error.rules]);

  const handleCreateRule = () => {
    setEditingRule(null);
    setIsBuilderOpen(true);
  };

  const handleEditRule = (rule) => {
    setEditingRule(rule);
    setIsBuilderOpen(true);
  };

  const handleCloseBuilder = () => {
    setIsBuilderOpen(false);
    setEditingRule(null);
  };

  const handleRuleSaved = () => {
    setIsBuilderOpen(false);
    setEditingRule(null);
    toast.success(
      editingRule ? "Rule updated successfully!" : "Rule created successfully!"
    );
  };

  const ruleStats = {
    total: approvalRules.length,
    active: approvalRules.filter((r) => r.isActive).length,
    sequential: approvalRules.filter((r) => r.ruleType === "sequential").length,
    percentage: approvalRules.filter((r) => r.ruleType === "percentage").length,
  };

  if (loading.rules && approvalRules.length === 0) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Approval Rules</h2>
          <p className="mt-1 text-sm text-gray-500">
            Configure how expenses are approved throughout your organization
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={handleCreateRule}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FaPlus className="mr-2 h-4 w-4" />
            Create New Rule
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FaCog className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Rules
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {ruleStats.total}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Active Rules
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {ruleStats.active}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FaUsers className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Sequential
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {ruleStats.sequential}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FaPercentage className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Percentage
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {ruleStats.percentage}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rules List */}
      <div className="space-y-6">
        {approvalRules.length === 0 ? (
          <div className="text-center py-12">
            <FaCog className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No approval rules
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating your first approval rule.
            </p>
            <div className="mt-6">
              <button
                onClick={handleCreateRule}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FaPlus className="mr-2 h-4 w-4" />
                Create New Rule
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {approvalRules.map((rule) => (
              <RuleCard key={rule.id} rule={rule} onEdit={handleEditRule} />
            ))}
          </div>
        )}
      </div>

      {/* Rule Builder Modal */}
      <RuleBuilder
        isOpen={isBuilderOpen}
        onClose={handleCloseBuilder}
        onRuleSaved={handleRuleSaved}
        rule={editingRule}
      />
    </div>
  );
};

export default ApprovalRulesPage;
