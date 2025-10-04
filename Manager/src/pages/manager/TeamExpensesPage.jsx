import { useEffect } from "react";
import { Users, TrendingUp, Calendar, BarChart3 } from "lucide-react";
import TeamExpensesView from "../../components/features/manager/TeamExpensesView";
import useManagerStore from "../../store/managerSlice";

const TeamExpensesPage = () => {
  const { teamMembers, fetchTeamMembers, getSummaryStats } = useManagerStore();

  useEffect(() => {
    fetchTeamMembers();
  }, [fetchTeamMembers]);

  const summaryStats = getSummaryStats();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const currentMonth = new Date().toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Team Expenses
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Monitor and analyze your team's expense history and spending
              patterns
            </p>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-1" />
                {currentMonth}
              </div>
              <button className="btn-secondary flex items-center">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </button>
            </div>
          </div>
        </div>

        {/* Team Overview Cards */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Team Size */}
          <div className="card p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-8 w-8 text-primary-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Team Members
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {teamMembers.length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>

          {/* Total Approved Amount */}
          <div className="card p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-8 w-8 text-success-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Approved
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {formatCurrency(summaryStats.totalApprovedAmount)}
                  </dd>
                </dl>
              </div>
            </div>
          </div>

          {/* Monthly Average */}
          <div className="card p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="h-8 w-8 text-blue-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Monthly Average
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {formatCurrency(
                      summaryStats.totalApprovedAmount /
                        Math.max(1, new Date().getMonth() + 1)
                    )}
                  </dd>
                </dl>
              </div>
            </div>
          </div>

          {/* Approval Rate */}
          <div className="card p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BarChart3 className="h-8 w-8 text-yellow-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Approval Rate
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {summaryStats.totalProcessed > 0
                      ? Math.round(
                          (summaryStats.totalApproved /
                            summaryStats.totalProcessed) *
                            100
                        )
                      : 0}
                    %
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Insights Section */}
        <div className="mt-8">
          <div className="card p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Team Insights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-blue-900 mb-2">
                  📈 Spending Trends
                </h4>
                <p className="text-sm text-blue-700">
                  Travel expenses have increased by 15% this quarter, likely due
                  to client meetings.
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-green-900 mb-2">
                  ✅ Compliance
                </h4>
                <p className="text-sm text-green-700">
                  95% of expenses include proper receipts and documentation.
                </p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-yellow-900 mb-2">
                  ⏱️ Processing Time
                </h4>
                <p className="text-sm text-yellow-700">
                  Average approval time has improved to 2.3 days from 3.1 days
                  last month.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Expenses View */}
        <div className="mt-8">
          <div className="sm:flex sm:items-center mb-6">
            <div className="sm:flex-auto">
              <h3 className="text-lg font-medium text-gray-900">
                Expense History
              </h3>
              <p className="mt-2 text-sm text-gray-700">
                Complete history of all expenses submitted by your team members.
                Use filters to narrow down your view.
              </p>
            </div>
          </div>

          <TeamExpensesView />
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <div className="card p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <button className="btn-secondary p-4 h-auto flex flex-col items-center space-y-2">
                <TrendingUp className="h-6 w-6" />
                <span className="text-sm">Generate Report</span>
              </button>
              <button className="btn-secondary p-4 h-auto flex flex-col items-center space-y-2">
                <Users className="h-6 w-6" />
                <span className="text-sm">Team Settings</span>
              </button>
              <button className="btn-secondary p-4 h-auto flex flex-col items-center space-y-2">
                <Calendar className="h-6 w-6" />
                <span className="text-sm">Schedule Review</span>
              </button>
              <button className="btn-secondary p-4 h-auto flex flex-col items-center space-y-2">
                <BarChart3 className="h-6 w-6" />
                <span className="text-sm">Budget Analysis</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamExpensesPage;
