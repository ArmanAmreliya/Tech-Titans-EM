import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FaTimes, FaPlus, FaTrash } from "react-icons/fa";
import {
  createApprovalRule,
  updateApprovalRule,
} from "../../../store/adminSlice";
import SequentialApprovers from "./SequentialApprovers";
import ConditionalLogic from "./ConditionalLogic";

const ruleSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  ruleType: z.enum(["sequential", "percentage", "specific"], {
    required_error: "Please select a rule type",
  }),
  conditions: z.object({
    minAmount: z.number().optional(),
    maxAmount: z.number().optional(),
    categories: z.array(z.string()).optional(),
  }),
  approvers: z
    .array(
      z.object({
        type: z.string(),
        required: z.boolean(),
        order: z.number(),
        userId: z.number().optional(),
        percentage: z.number().optional(),
      })
    )
    .min(1, "At least one approver is required"),
});

const RuleBuilder = ({ isOpen, onClose, onRuleSaved, rule }) => {
  const dispatch = useDispatch();
  const isEditing = !!rule;

  const [ruleType, setRuleType] = useState("sequential");
  const [approvers, setApprovers] = useState([]);
  const [conditions, setConditions] = useState({
    minAmount: "",
    maxAmount: "",
    categories: [],
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(ruleSchema),
    defaultValues: {
      name: "",
      description: "",
      ruleType: "sequential",
      conditions: {
        minAmount: undefined,
        maxAmount: undefined,
        categories: [],
      },
      approvers: [],
    },
  });

  const watchedRuleType = watch("ruleType");

  // Reset form when rule prop changes
  useEffect(() => {
    if (rule) {
      reset({
        name: rule.name,
        description: rule.description,
        ruleType: rule.ruleType,
        conditions: rule.conditions,
        approvers: rule.approvers,
      });
      setRuleType(rule.ruleType);
      setApprovers(rule.approvers);
      setConditions(rule.conditions);
    } else {
      reset({
        name: "",
        description: "",
        ruleType: "sequential",
        conditions: {
          minAmount: undefined,
          maxAmount: undefined,
          categories: [],
        },
        approvers: [],
      });
      setRuleType("sequential");
      setApprovers([]);
      setConditions({
        minAmount: "",
        maxAmount: "",
        categories: [],
      });
    }
  }, [rule, reset]);

  // Update form when rule type changes
  useEffect(() => {
    setRuleType(watchedRuleType);
    setValue("ruleType", watchedRuleType);
  }, [watchedRuleType, setValue]);

  const onSubmit = async (data) => {
    try {
      const ruleData = {
        ...data,
        conditions: {
          ...data.conditions,
          minAmount: data.conditions.minAmount || undefined,
          maxAmount: data.conditions.maxAmount || undefined,
        },
        approvers,
        isActive: true,
      };

      // Validate approvers based on rule type
      if (ruleType === "sequential" && approvers.length === 0) {
        toast.error("Please add at least one approver for sequential rules");
        return;
      }

      if (isEditing) {
        await dispatch(updateApprovalRule({ id: rule.id, ruleData })).unwrap();
      } else {
        await dispatch(createApprovalRule(ruleData)).unwrap();
      }

      onRuleSaved();
    } catch (error) {
      toast.error(error || "Failed to save rule");
    }
  };

  const handleConditionsChange = (newConditions) => {
    setConditions(newConditions);
    setValue("conditions", newConditions);
  };

  const handleApproversChange = (newApprovers) => {
    setApprovers(newApprovers);
    setValue("approvers", newApprovers);
  };

  const availableCategories = [
    "Travel",
    "Meals",
    "Software",
    "Office Supplies",
    "Marketing",
    "Training",
    "Equipment",
    "Other",
  ];

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex items-center justify-between mb-6">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {isEditing
                      ? "Edit Approval Rule"
                      : "Create New Approval Rule"}
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <FaTimes className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Rule Name
                      </label>
                      <input
                        type="text"
                        {...register("name")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="e.g., Standard Expense Approval"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Rule Type
                      </label>
                      <select
                        {...register("ruleType")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="sequential">Sequential Approval</option>
                        <option value="percentage">Percentage Based</option>
                        <option value="specific">Specific Approver</option>
                      </select>
                      {errors.ruleType && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.ruleType.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      {...register("description")}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Describe when this rule should be applied..."
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.description.message}
                      </p>
                    )}
                  </div>

                  {/* Conditions */}
                  <ConditionalLogic
                    conditions={conditions}
                    onChange={handleConditionsChange}
                    availableCategories={availableCategories}
                  />

                  {/* Approvers */}
                  <SequentialApprovers
                    ruleType={ruleType}
                    approvers={approvers}
                    onChange={handleApproversChange}
                  />

                  {/* Form Actions */}
                  <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting
                        ? isEditing
                          ? "Updating..."
                          : "Creating..."
                        : isEditing
                        ? "Update Rule"
                        : "Create Rule"}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default RuleBuilder;
