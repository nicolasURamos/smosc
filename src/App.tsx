import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { PrivateRoute } from "@/components/PrivateRoute";
import Splash from "./pages/Splash";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import Exames from "./pages/Exames";
import Treinamentos from "./pages/Treinamentos";
import EPIs from "./pages/EPIs";
import CIPAA from "./pages/CIPAA";
import Agendamentos from "./pages/Agendamentos";
import Procedimentos from "./pages/Procedimentos";
import Telemedicina from "./pages/Telemedicina";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/history" element={<PrivateRoute><History /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/notifications" element={<PrivateRoute><Notifications /></PrivateRoute>} />
            <Route path="/exames" element={<PrivateRoute><Exames /></PrivateRoute>} />
            <Route path="/treinamentos" element={<PrivateRoute><Treinamentos /></PrivateRoute>} />
            <Route path="/epis" element={<PrivateRoute><EPIs /></PrivateRoute>} />
            <Route path="/cipaa" element={<PrivateRoute><CIPAA /></PrivateRoute>} />
            <Route path="/agendamentos" element={<PrivateRoute><Agendamentos /></PrivateRoute>} />
            <Route path="/procedimentos" element={<PrivateRoute><Procedimentos /></PrivateRoute>} />
            <Route path="/telemedicina" element={<PrivateRoute><Telemedicina /></PrivateRoute>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
