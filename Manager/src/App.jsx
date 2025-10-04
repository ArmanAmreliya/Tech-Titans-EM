import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ManagerLayout from "./pages/manager/ManagerLayout";
import ApprovalQueuePage from "./pages/manager/ApprovalQueuePage";
import TeamExpensesPage from "./pages/manager/TeamExpensesPage";

function App() {
  return (
    <Router>
      <div className="h-full">
        <Routes>
          <Route path="/" element={<ManagerLayout />}>
            <Route index element={<Navigate to="/approval-queue" replace />} />
            <Route path="approval-queue" element={<ApprovalQueuePage />} />
            <Route path="team-expenses" element={<TeamExpensesPage />} />
          </Route>
        </Routes>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#363636",
              color: "#fff",
            },
            success: {
              duration: 3000,
              theme: {
                primary: "#10b981",
                secondary: "black",
              },
            },
            error: {
              duration: 4000,
              theme: {
                primary: "#ef4444",
                secondary: "black",
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
