import { useEffect } from "react";
import { ClipboardCheck, TrendingUp, Clock, DollarSign } from "lucide-react";
import ApprovalQueueTable from "../../components/features/manager/ApprovalQueueTable";
import useManagerStore from "../../store/managerSlice";

const ApprovalQueuePage = () => {
  const { pendingApprovals, fetchPendingApprovals, getSummaryStats } =
    useManagerStore();

  useEffect(() => {
    fetchPendingApprovals();
  }, [fetchPendingApprovals]);

  const summaryStats = getSummaryStats();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Approval Queue
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Review and approve pending expense claims from your team
            </p>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Pending Approvals */}
          <div className="card p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ClipboardCheck className="h-8 w-8 text-yellow-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Pending Approvals
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {pendingApprovals.length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>

          {/* Total Pending Amount */}
          <div className="card p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DollarSign className="h-8 w-8 text-primary-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Pending
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {formatCurrency(summaryStats.totalPendingAmount)}
                  </dd>
                </dl>
              </div>
            </div>
          </div>

          {/* Approved This Month */}
          <div className="card p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-8 w-8 text-success-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Approved This Month
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {summaryStats.totalApproved}
                  </dd>
                </dl>
              </div>
            </div>
          </div>

          {/* Average Processing Time */}
          <div className="card p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className="h-8 w-8 text-gray-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Avg. Processing Time
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    2.3 days
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        {pendingApprovals.length > 0 && (
          <div className="mt-8">
            <div className="card p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Quick Actions
                  </h3>
                  <p className="text-sm text-gray-500">
                    Streamline your approval process
                  </p>
                </div>
                <div className="flex space-x-3">
                  <button className="btn-secondary">Bulk Approve</button>
                  <button className="btn-primary">Review All</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Approval Queue Table */}
        <div className="mt-8">
          <div className="sm:flex sm:items-center mb-6">
            <div className="sm:flex-auto">
              <h3 className="text-lg font-medium text-gray-900">
                Pending Expense Claims
              </h3>
              <p className="mt-2 text-sm text-gray-700">
                Review the following expenses that require your approval. Click
                on any expense to view details and take action.
              </p>
            </div>
          </div>

          <ApprovalQueueTable />
        </div>

        {/* Tips Section */}
        {pendingApprovals.length === 0 && (
          <div className="mt-8">
            <div className="card p-6">
              <div className="text-center">
                <ClipboardCheck className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  All caught up!
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  There are no pending approvals at the moment.
                </p>
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="bg-primary-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-primary-900">
                      💡 Tip
                    </h4>
                    <p className="mt-1 text-sm text-primary-700">
                      Set up email notifications to get alerts for new expense
                      submissions.
                    </p>
                  </div>
                  <div className="bg-success-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-success-900">
                      📊 Analytics
                    </h4>
                    <p className="mt-1 text-sm text-success-700">
                      Check the team expenses page for spending insights and
                      trends.
                    </p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-yellow-900">
                      ⚡ Quick Action
                    </h4>
                    <p className="mt-1 text-sm text-yellow-700">
                      Use bulk actions when multiple expenses need the same
                      decision.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApprovalQueuePage;
