import { useState, useEffect } from "react";
import {
  LogIn,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Droplet,
  CheckCircle,
  ArrowLeft,
  Heart,
} from "lucide-react";
import Button from "../components/common/Button";
import { login } from "../services/api/authApi";
import Navbar from "../components/layout/Navbar";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [animateBloodDrop, setAnimateBloodDrop] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Animation for blood drop effect
    const interval = setInterval(() => {
      setAnimateBloodDrop(true);
      setTimeout(() => setAnimateBloodDrop(false), 2000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await login({ email, password });
      console.log("Réponse de l'authentification :", response.data);

      const userData = response.data;
      const token = userData.token;
      const role = userData.role;
      const userId = userData.userId || userData.id;

      // Validate required fields
      if (!token || !role || !userId) {
        throw new Error("Données d'authentification incomplètes fournies par le serveur.");
      }

      // Store authentication data in localStorage
      localStorage.setItem("authToken", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("userRole", role);

      // Handle CENTER_MANAGER-specific data
      if (role === "CENTER_MANAGER") {
        const centerId = userData.centerId;
        if (!centerId) {
          console.warn("centerId manquant pour CENTER_MANAGER");
          setError("Erreur : ID du centre non fourni par le serveur.");
          setIsLoading(false);
          // Clear stored data on error
          localStorage.removeItem("authToken");
          localStorage.removeItem("userId");
          localStorage.removeItem("userRole");
          return;
        }
        localStorage.setItem("centerId", centerId);
        console.log("centerId stocké :", centerId);
      } else {
        // Ensure normal users don't have centerId
        localStorage.removeItem("centerId");
        console.log("centerId supprimé pour utilisateur non-admin");
      }

      setLoginSuccess(true);

      // Redirect based on role
      setTimeout(() => {
        if (role === "CENTER_MANAGER") {
          console.log("Redirection vers /admin/Index");
          navigate("/admin/Index", { replace: true });
        } else {
          console.log("Redirection vers /");
          navigate("/", { replace: true });
        }
      }, 1500);
    } catch (error) {
      console.error("Erreur de connexion :", error);
      const errorMessage =
        error.response?.data?.message ||
        "Email ou mot de passe invalide. Veuillez réessayer.";
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-[#b2d3e1]/20 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute h-20 w-20 rounded-full bg-[#d93f31]/5 -top-10 left-1/4 animate-float" />
          <div className="absolute h-16 w-16 rounded-full bg-[#b2d3e1]/20 top-1/3 right-1/5 animate-float-slow" />
          <div className="absolute h-12 w-12 rounded-full bg-[#d93f31]/10 bottom-1/4 left-1/5 animate-float-slower" />
          <div className="absolute h-24 w-24 rounded-full bg-[#b2d3e1]/10 -bottom-12 right-1/3 animate-float" />

          {animateBloodDrop && (
            <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 animate-blood-drop">
              <div className="relative">
                <Droplet size={30} className="text-[#d93f31]" />
                <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-white" />
              </div>
            </div>
          )}
        </div>

        <div className="container mx-auto px-4 py-8 flex-grow flex items-center justify-center relative z-10">
          <div className="w-full max-w-md">
            <a
              href="/"
              className="inline-flex items-center text-[#d93f31] hover:text-[#5a0b06] mb-6 transition-colors group"
            >
              <ArrowLeft
                size={16}
                className="mr-2 group-hover:-translate-x-1 transition-transform"
              />
              Retour à l'accueil
            </a>

            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden relative">
              {/* Success overlay */}
              {loginSuccess && (
                <div className="absolute inset-0 bg-white/95 z-50 flex flex-col items-center justify-center animate-fadeIn">
                  <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <CheckCircle size={40} className="text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Connexion réussie !
                  </h3>
                  <p className="text-gray-600">Vous allez être redirigé...</p>
                </div>
              )}

              <div className="bg-gradient-to-r from-[#d93f31] to-[#5a0b06] px-6 py-8 text-white">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center mr-4 shadow-lg animate-pulse-border">
                    <LogIn className="h-6 w-6 text-[#d93f31]" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">Connexion</h1>
                    <p className="text-white/80 text-sm">
                      Accédez à votre compte SangConnect
                    </p>
                  </div>
                </div>
                <div className="flex items-center text-sm">
                  <Heart size={14} className="mr-2 animate-heartbeat" />
                  <span>Ensemble pour sauver des vies</span>
                </div>
              </div>

              <div className="p-6">
                {error && (
                  <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                    {error}
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Adresse email
                      </label>
                      <div className="relative">
                        <Mail
                          className="absolute left-3 top-3 text-gray-400"
                          size={18}
                        />
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          placeholder="votre@email.com"
                          className="pl-10 w-full py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d3e1] focus:border-[#b2d3e1]"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Mot de passe
                      </label>
                      <div className="relative">
                        <Lock
                          className="absolute left-3 top-3 text-gray-400"
                          size={18}
                        />
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          placeholder="••••••••"
                          className="pl-10 pr-10 w-full py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d3e1] focus:border-[#b2d3e1]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3"
                        >
                          {showPassword ? (
                            <EyeOff className="text-gray-400" size={18} />
                          ) : (
                            <Eye className="text-gray-400" size={18} />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <label className="flex items-center text-sm">
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={rememberMe}
                          onChange={() => setRememberMe(!rememberMe)}
                        />
                        Se souvenir de moi
                      </label>
                      <a
                        href="#"
                        className="text-sm text-[#d93f31] hover:underline"
                      >
                        Mot de passe oublié ?
                      </a>
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? "Connexion..." : "Se connecter"}
                    </Button>
                  </div>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                  Vous n'avez pas de compte ?{" "}
                  <a
                    href="/register"
                    className="text-[#d93f31] font-medium hover:underline"
                  >
                    Inscrivez-vous
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-md border-l-4 border-[#d93f31] animate-fadeIn">
              <div className="flex items-start">
                <Droplet
                  className="h-5 w-5 text-[#d93f31] mr-3 mt-1 animate-ping"
                />
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-[#d93f31]">
                    Saviez-vous ?
                  </span>{" "}
                  Un don de sang peut sauver jusqu'à 3 vies.
                </p>
              </div>
            </div>
          </div>
        </div>

        <footer className="text-center text-sm text-gray-500 py-4 z-10 relative">
          © 2025 SangConnect – Tous droits réservés.
        </footer>
      </div>
    </>
  );
};

export default LoginPage;