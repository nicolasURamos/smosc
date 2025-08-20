import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Splash = () => {
  const navigate = useNavigate();
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    // Animação do logo
    const logoTimer = setTimeout(() => setShowLogo(true), 300);
    
    // Redirecionar para login após 3 segundos
    const redirectTimer = setTimeout(() => {
      navigate("/login");
    }, 3000);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen smo-gradient flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-white/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/15 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 text-center px-6">
        {/* Logo Container */}
        <div className={`mb-8 transform transition-all duration-1000 ${showLogo ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}>
          <div className="w-48 h-48 mx-auto mb-6 bg-white rounded-3xl shadow-2xl flex items-center justify-center p-8">
            <img 
              src="/lovable-uploads/5e9d5601-ee98-4196-b7a2-7427c7d90e3e.png" 
              alt="SMO Logo" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Text Animation */}
        <div className={`text-white transform transition-all duration-1000 delay-500 ${showLogo ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            SMO
          </h1>
          <p className="text-lg md:text-xl font-medium opacity-90 mb-2">
            Segurança e Medicina
          </p>
          <p className="text-lg md:text-xl font-medium opacity-90">
            Ocupacional
          </p>
        </div>

        {/* Loading indicator */}
        <div className={`mt-12 transform transition-all duration-1000 delay-1000 ${showLogo ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <div className="flex justify-center">
            <div className="w-16 h-1 bg-white/30 rounded-full overflow-hidden">
              <div className="w-full h-full bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
          <p className="text-white/70 text-sm mt-4 font-medium">
            Carregando...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Splash;