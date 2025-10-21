import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/exames" element={<Exames />} />
          <Route path="/treinamentos" element={<Treinamentos />} />
          <Route path="/epis" element={<EPIs />} />
          <Route path="/cipaa" element={<CIPAA />} />
          <Route path="/agendamentos" element={<Agendamentos />} />
          <Route path="/procedimentos" element={<Procedimentos />} />
          <Route path="/telemedicina" element={<Telemedicina />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
