import { useState, useEffect } from "react"
import { LogIn, Mail, Lock, Eye, EyeOff, Heart, ArrowLeft, Droplet, CheckCircle } from "lucide-react"
import Button from "../components/common/Button"
import { login } from "../services/api/authApi"
import Navbar from "../components/layout/Navbar"


const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [animateBloodDrop, setAnimateBloodDrop] = useState(false)
  const [loginMethod, setLoginMethod] = useState("") // Ajout de la variable manquante

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimateBloodDrop(true)
      setTimeout(() => setAnimateBloodDrop(false), 2000)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await login({ email, password })
      const token = response.data.token
      localStorage.setItem("token", token)
      setLoginSuccess(true)

      setTimeout(() => {
        window.location.href = "/" // ou n'importe quelle page protégée
      }, 1500)
    } catch (error) {
      console.error("Erreur de connexion :", error)
      alert("Email ou mot de passe invalide")
      setIsLoading(false)
    }
  }

  // Ajout de la fonction handleSocialLogin manquante
  const handleSocialLogin = (provider) => {
    setLoginMethod(provider)
    // Implémenter la logique de connexion sociale ici
    console.log(`Connexion avec ${provider}`)
    // Vous pourriez ajouter un appel à une API pour la connexion sociale
  }

  return (
    <>
    <Navbar></Navbar>
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-[#b2d3e1]/20 relative overflow-hidden">
      {/* Animated blood cells in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute h-20 w-20 rounded-full bg-[#460904]/5 -top-10 left-1/4 animate-float"></div>
        <div className="absolute h-16 w-16 rounded-full bg-[#b2d3e1]/20 top-1/3 right-1/5 animate-float-slow"></div>
        <div className="absolute h-12 w-12 rounded-full bg-[#460904]/10 bottom-1/4 left-1/5 animate-float-slower"></div>
        <div className="absolute h-24 w-24 rounded-full bg-[#b2d3e1]/10 -bottom-12 right-1/3 animate-float"></div>

        {/* Blood drop animation */}
        {animateBloodDrop && (
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 animate-blood-drop">
            <div className="relative">
              <Droplet size={30} className="text-[#460904]" />
              <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-white"></div>
            </div>
          </div>
        )}

        {/* Abstract wave shapes */}
        <div className="absolute top-0 left-0 right-0 h-64 opacity-10">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="h-full w-full">
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              fill="#460904"
            ></path>
          </svg>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-64 opacity-10 transform rotate-180">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="h-full w-full">
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              fill="#b2d3e1"
            ></path>
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 flex-grow flex items-center justify-center relative z-10">
        <div className="w-full max-w-md">
          {/* Back to home link */}
          <a
            href="/"
            className="inline-flex items-center text-[#460904] hover:text-[#5a0b06] mb-6 transition-colors group"
          >
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Retour à l'accueil
          </a>

          {/* Login card */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-[1.01] transition-transform">
            {/* Success overlay */}
            {loginSuccess && (
              <div className="absolute inset-0 bg-white/95 z-50 flex flex-col items-center justify-center animate-fadeIn">
                <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <CheckCircle size={40} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Connexion réussie!</h3>
                <p className="text-gray-600">Vous allez être redirigé...</p>
              </div>
            )}

            {/* Header */}
            <div className="bg-gradient-to-r from-[#460904] to-[#5a0b06] px-6 py-8 text-white relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full"></div>

              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center mr-4 shadow-lg animate-pulse-border">
                  <LogIn className="h-6 w-6 text-[#460904]" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Connexion</h1>
                  <p className="text-white/80 text-sm">Accédez à votre compte SangConnect</p>
                </div>
              </div>

              <div className="flex items-center text-sm">
                <Heart size={14} className="mr-2 animate-heartbeat" />
                <span>Ensemble pour sauver des vies</span>
              </div>
            </div>

            {/* Form */}
            <div className="p-6">
              {/* Social login options */}
              <div className="mb-6">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleSocialLogin("google")}
                    disabled={isLoading}
                    className={`w-full flex justify-center items-center py-2.5 px-4 border rounded-lg shadow-sm text-sm font-medium transition-all ${
                      loginMethod === "google"
                        ? "bg-red-50 border-red-200 text-red-700"
                        : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Google
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSocialLogin("facebook")}
                    disabled={isLoading}
                    className={`w-full flex justify-center items-center py-2.5 px-4 border rounded-lg shadow-sm text-sm font-medium transition-all ${
                      loginMethod === "facebook"
                        ? "bg-blue-50 border-blue-200 text-blue-700"
                        : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                        fill="#1877F2"
                      />
                    </svg>
                    Facebook
                  </button>
                </div>

                <div className="relative flex items-center justify-center mt-6 mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">ou par email</span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  {/* Email field */}
                  <div className="group">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-[#460904] transition-colors"
                    >
                      Adresse email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail size={18} className="text-gray-400 group-hover:text-[#460904] transition-colors" />
                      </div>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d3e1] focus:border-[#b2d3e1] transition-all"
                        placeholder="votre@email.com"
                        required
                      />
                    </div>
                  </div>

                  {/* Password field */}
                  <div className="group">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-[#460904] transition-colors"
                    >
                      Mot de passe
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock size={18} className="text-gray-400 group-hover:text-[#460904] transition-colors" />
                      </div>
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d3e1] focus:border-[#b2d3e1] transition-all"
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                      >
                        {showPassword ? (
                          <EyeOff size={18} className="text-gray-400 hover:text-gray-600" />
                        ) : (
                          <Eye size={18} className="text-gray-400 hover:text-gray-600" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Remember me & Forgot password */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        type="checkbox"
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                        className="h-4 w-4 text-[#460904] focus:ring-[#b2d3e1] border-gray-300 rounded"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                        Se souvenir de moi
                      </label>
                    </div>
                    <a href="#" className="text-sm font-medium text-[#460904] hover:text-[#5a0b06] transition-colors">
                      Mot de passe oublié ?
                    </a>
                  </div>

                  {/* Submit button */}
                  <Button
                    type="submit"
                    className="w-full py-2.5 px-4 flex justify-center items-center group"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      <LogIn size={18} className="mr-2 group-hover:translate-x-1 transition-transform" />
                    )}
                    {isLoading ? "Connexion en cours..." : "Se connecter"}
                  </Button>
                </div>
              </form>

              {/* Sign up link */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Vous n'avez pas de compte ?{" "}
                  <a href="/register" className="font-medium text-[#460904] hover:text-[#5a0b06] transition-colors">
                    Inscrivez-vous
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Blood donation reminder */}
          <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-md border-l-4 border-[#460904] animate-fadeIn animation-delay-500">
            <div className="flex items-start">
              <div className="mr-3 flex-shrink-0 mt-0.5 relative">
                <Droplet className="h-5 w-5 text-[#460904]" />
                <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[#460904] animate-ping"></div>
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-medium text-[#460904]">Saviez-vous que</span> chaque don de sang peut sauver
                jusqu'à 3 vies ? Connectez-vous pour trouver les demandes qui correspondent à votre groupe sanguin.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-4 text-center text-sm text-gray-500 relative z-10">
        <p>© 2025 SangConnect – Tous droits réservés.</p>
      </div>
    </div>
    </>
  )
}

export default LoginPage