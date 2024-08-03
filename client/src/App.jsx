import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import Organizations from "./pages/Organizations";
import Organization from "./Features/Organization/Organization";
import { SocketProvider } from "./context/SocketProvider";
import Donations from "./pages/Donations";
import AuthProvider from "./context/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProtectedRoute from "./ui/ProtectedRoute";
import Profile from "./pages/Profile";
import { Toaster } from "react-hot-toast";
import Messages from "./pages/Messages";
import ChatBox from "./Features/Chats/ChatBox";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
    },
  },
});
function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <QueryClientProvider client={client}>
          <ReactQueryDevtools initialOpen={false} />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="home" />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="messages" element={<Messages />}>
                  <Route path="with/:id" element={<ChatBox />} />
                </Route>

                <Route path="profile" element={<Profile />} />

                <Route path="home" element={<Home />} />
                <Route path="organizations" element={<Organizations />} />
                <Route path="donations" element={<Donations />} />
                <Route
                  path="organizations/:organizationId"
                  element={<Organization />}
                />
              </Route>
            </Routes>
          </BrowserRouter>
          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            reverseOrder={false}
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
              },
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                backgroundColor: "white",
                color: "var(--color-grey-700)",
              },
            }}
          />
        </QueryClientProvider>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;
