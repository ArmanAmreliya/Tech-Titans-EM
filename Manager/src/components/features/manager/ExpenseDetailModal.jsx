import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  X,
  Calendar,
  DollarSign,
  FileText,
  User,
  Tag,
  Clock,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const rejectionSchema = z.object({
  rejectionReason: z
    .string()
    .min(10, "Rejection reason must be at least 10 characters"),
});

const ExpenseDetailModal = ({
  isOpen,
  onClose,
  expense,
  actionType,
  onConfirm,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(rejectionSchema),
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
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

  const handleConfirmApproval = async () => {
    setIsSubmitting(true);
    await onConfirm();
    setIsSubmitting(false);
  };

  const handleConfirmRejection = async (data) => {
    setIsSubmitting(true);
    await onConfirm(data.rejectionReason);
    setIsSubmitting(false);
    reset();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!expense) return null;

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    onClick={handleClose}
                  >
                    <span className="sr-only">Close</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="sm:flex sm:items-start">
                  <div className="w-full">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-semibold leading-6 text-gray-900 mb-6"
                    >
                      Expense Details
                    </Dialog.Title>

                    {/* Expense Information */}
                    <div className="space-y-6">
                      {/* Employee Information */}
                      <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0 h-12 w-12">
                          <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                            <span className="text-lg font-medium text-primary-700">
                              {expense.employeeName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center">
                            <User className="h-4 w-4 text-gray-500 mr-2" />
                            <span className="text-lg font-medium text-gray-900">
                              {expense.employeeName}
                            </span>
                          </div>
                          <div className="text-sm text-gray-500">
                            {expense.employeeId}
                          </div>
                        </div>
                      </div>

                      {/* Expense Details Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center mb-2">
                              <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                              <span className="text-sm font-medium text-gray-900">
                                Date
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">
                              {formatDate(expense.date)}
                            </p>
                          </div>

                          <div>
                            <div className="flex items-center mb-2">
                              <Tag className="h-4 w-4 text-gray-500 mr-2" />
                              <span className="text-sm font-medium text-gray-900">
                                Category
                              </span>
                            </div>
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(
                                expense.category
                              )}`}
                            >
                              {expense.category}
                            </span>
                          </div>

                          <div>
                            <div className="flex items-center mb-2">
                              <Clock className="h-4 w-4 text-gray-500 mr-2" />
                              <span className="text-sm font-medium text-gray-900">
                                Submitted
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">
                              {formatDateTime(expense.submittedAt)}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center mb-2">
                              <DollarSign className="h-4 w-4 text-gray-500 mr-2" />
                              <span className="text-sm font-medium text-gray-900">
                                Amount
                              </span>
                            </div>
                            <div>
                              <p className="text-lg font-semibold text-gray-900">
                                {formatCurrency(expense.convertedAmount)}
                              </p>
                              {expense.currency !== "USD" && (
                                <p className="text-sm text-gray-500">
                                  Original: {formatCurrency(expense.amount)}{" "}
                                  {expense.currency}
                                </p>
                              )}
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center mb-2">
                              <FileText className="h-4 w-4 text-gray-500 mr-2" />
                              <span className="text-sm font-medium text-gray-900">
                                Receipts
                              </span>
                            </div>
                            <div className="space-y-1">
                              {expense.receipts?.map((receipt, index) => (
                                <button
                                  key={index}
                                  className="text-sm text-primary-600 hover:text-primary-500 block"
                                >
                                  {receipt}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <div>
                        <div className="flex items-center mb-2">
                          <FileText className="h-4 w-4 text-gray-500 mr-2" />
                          <span className="text-sm font-medium text-gray-900">
                            Description
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 p-3 bg-gray-50 rounded-lg">
                          {expense.description}
                        </p>
                      </div>

                      {/* Action Buttons */}
                      {actionType === "approve" && (
                        <div className="mt-6 p-4 bg-success-50 rounded-lg">
                          <h4 className="text-sm font-medium text-success-800 mb-2">
                            Approve Expense
                          </h4>
                          <p className="text-sm text-success-700 mb-4">
                            Are you sure you want to approve this expense? This
                            action cannot be undone.
                          </p>
                          <div className="flex space-x-3">
                            <button
                              type="button"
                              onClick={handleConfirmApproval}
                              disabled={isSubmitting}
                              className="btn-success disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {isSubmitting
                                ? "Approving..."
                                : "Confirm Approval"}
                            </button>
                            <button
                              type="button"
                              onClick={handleClose}
                              disabled={isSubmitting}
                              className="btn-secondary"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}

                      {actionType === "reject" && (
                        <form onSubmit={handleSubmit(handleConfirmRejection)}>
                          <div className="mt-6 p-4 bg-danger-50 rounded-lg">
                            <h4 className="text-sm font-medium text-danger-800 mb-2">
                              Reject Expense
                            </h4>
                            <p className="text-sm text-danger-700 mb-4">
                              Please provide a reason for rejecting this
                              expense. This will be sent to the employee.
                            </p>
                            <div className="mb-4">
                              <label
                                htmlFor="rejectionReason"
                                className="block text-sm font-medium text-gray-700 mb-2"
                              >
                                Rejection Reason *
                              </label>
                              <textarea
                                {...register("rejectionReason")}
                                id="rejectionReason"
                                rows={4}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-danger-500 focus:ring-danger-500 sm:text-sm"
                                placeholder="Please explain why this expense is being rejected..."
                              />
                              {errors.rejectionReason && (
                                <p className="mt-1 text-sm text-danger-600">
                                  {errors.rejectionReason.message}
                                </p>
                              )}
                            </div>
                            <div className="flex space-x-3">
                              <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn-danger disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {isSubmitting
                                  ? "Rejecting..."
                                  : "Confirm Rejection"}
                              </button>
                              <button
                                type="button"
                                onClick={handleClose}
                                disabled={isSubmitting}
                                className="btn-secondary"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </form>
                      )}

                      {actionType === "view" && (
                        <div className="mt-6 flex justify-end">
                          <button
                            type="button"
                            onClick={handleClose}
                            className="btn-secondary"
                          >
                            Close
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ExpenseDetailModal;
