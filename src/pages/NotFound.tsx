import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-bl from-primary/5 via-background to-primary/10 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8 animate-fade-in">
        <div className="space-y-4 animate-slide-up">
          <img
            src="/lovable-uploads/5e9d5601-ee98-4196-b7a2-7427c7d90e3e.png"
            alt="SMO Nicolini"
            className="h-16 mx-auto"
          />
          
          <div className="space-y-2">
            <h1 className="text-8xl font-bold text-primary">404</h1>
            <h2 className="text-2xl font-semibold text-foreground">
              Oops! Página não encontrada
            </h2>
            <p className="text-muted-foreground">
              A página que você está procurando não existe ou foi removida.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
          <Button
            onClick={() => navigate("/dashboard")}
            className="gap-2"
          >
            <Home className="h-4 w-4" />
            Ir para o Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
