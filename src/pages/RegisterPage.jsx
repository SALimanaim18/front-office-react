"use client"

import { useState, useEffect } from "react"
import {
  UserPlus,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Heart,
  ArrowLeft,
  User,
  Calendar,
  MapPin,
  Phone,
  CheckCircle,
  AlertCircle,
  Droplet,
  Shield,
} from "lucide-react"
import Button from "../components/common/Button2"

import { register as registerApi } from "../services/api/authApi"
import { useNavigate } from "react-router-dom"


const RegisterPage = () => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
    phone: "",
    city: "",
    bloodType: "",
    isDonor: false,
    acceptTerms: false,
    registerMethod: "email", // 'email', 'google', 'facebook'
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [registerSuccess, setRegisterSuccess] = useState(false)
  const [animateBloodDrop, setAnimateBloodDrop] = useState(false)
  
  const navigate = useNavigate()

  // Blood drop animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimateBloodDrop(true)
      setTimeout(() => setAnimateBloodDrop(false), 2000)
    }, 7000)

    return () => clearInterval(interval)
  }, [])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
  
    if (step < 2) {
      setStep(step + 1)
      return
    }
  
    setIsLoading(true)
  
    try {
      const response = await registerApi(formData)
      console.log("Succès:", response.data)
      setRegisterSuccess(true)
  
      setTimeout(() => {
        navigate("/login") // redirection vers la page de connexion
      }, 2000)
    } catch (error) {
      console.error("Erreur d'inscription:", error.response?.data || error.message)
      alert("Erreur lors de l'inscription. Vérifiez vos données ou réessayez plus tard.")
    } finally {
      setIsLoading(false)
    }
  }
  

  const handleSocialRegister = (provider) => {
    setFormData({
      ...formData,
      registerMethod: provider,
    })

    // For social registration, we'll skip to step 2 since email/password are handled by the provider
    setStep(2)
  }

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

  // Function to determine blood type styling
  const getBloodTypeStyle = (bloodType, selected) => {
    const baseClasses = "flex items-center justify-center h-12 w-12 rounded-full border-2 transition-all"

    if (!selected) {
      return `${baseClasses} border-gray-300 text-gray-500 hover:border-[#b2d3e1] hover:text-[#460904]`
    }

    if (bloodType.includes("O")) {
      return `${baseClasses} bg-[#460904] text-white border-[#460904]`
    } else if (bloodType.includes("A")) {
      return `${baseClasses} bg-[#b2d3e1] text-[#460904] border-[#b2d3e1]`
    } else if (bloodType.includes("B")) {
      return `${baseClasses} bg-[#8fb9cc] text-white border-[#8fb9cc]`
    } else {
      return `${baseClasses} bg-[#6c9fb8] text-white border-[#6c9fb8]`
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-[#b2d3e1]/20 relative overflow-hidden">
      {/* Animated blood cells in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute h-20 w-20 rounded-full bg-[#460904]/5 -top-10 left-1/4 animate-float"></div>
        <div className="absolute h-16 w-16 rounded-full bg-[#b2d3e1]/20 top-1/3 right-1/5 animate-float-slow"></div>
        <div className="absolute h-12 w-12 rounded-full bg-[#460904]/10 bottom-1/4 left-1/5 animate-float-slower"></div>
        <div className="absolute h-24 w-24 rounded-full bg-[#b2d3e1]/10 -bottom-12 right-1/3 animate-float"></div>

        {/* Blood drop animation */}
        {animateBloodDrop && (
          <div className="absolute top-1/4 right-1/4 transform -translate-x-1/2 animate-blood-drop">
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
        <div className="w-full max-w-2xl">
          {/* Back to home link */}
          <a
            href="/"
            className="inline-flex items-center text-[#460904] hover:text-[#5a0b06] mb-6 transition-colors group"
          >
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Retour à l'accueil
          </a>

          {/* Register card */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-[1.01] transition-transform">
            {/* Success overlay */}
            {registerSuccess && (
              <div className="absolute inset-0 bg-white/95 z-50 flex flex-col items-center justify-center animate-fadeIn">
                <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <CheckCircle size={40} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Inscription réussie!</h3>
                <p className="text-gray-600 mb-4">Votre compte a été créé avec succès.</p>
                <div className="flex items-center text-sm text-[#460904]">
                  <Heart size={14} className="mr-2 animate-heartbeat" />
                  <span>Merci de rejoindre la communauté SangConnect</span>
                </div>
              </div>
            )}

            {/* Header */}
            <div className="bg-gradient-to-r from-[#460904] to-[#5a0b06] px-6 py-8 text-white relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full"></div>

              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center mr-4 shadow-lg animate-pulse-border">
                  <UserPlus className="h-6 w-6 text-[#460904]" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Inscription</h1>
                  <p className="text-white/80 text-sm">Rejoignez la communauté SangConnect</p>
                </div>
              </div>

              <div className="flex items-center text-sm">
                <Heart size={14} className="mr-2 animate-heartbeat" />
                <span>Ensemble pour sauver des vies</span>
              </div>

              {/* Progress steps */}
              <div className="mt-6 flex items-center">
                <div className="flex-1">
                  <div className="flex items-center">
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center ${
                        step >= 1 ? "bg-white text-[#460904]" : "bg-white/30 text-white"
                      }`}
                    >
                      1
                    </div>
                    <div className="ml-2">
                      <p className={`text-sm ${step >= 1 ? "text-white" : "text-white/70"}`}>Compte</p>
                    </div>
                  </div>
                </div>
                <div className={`h-1 w-12 ${step >= 2 ? "bg-white" : "bg-white/30"}`}></div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center ${
                        step >= 2 ? "bg-white text-[#460904]" : "bg-white/30 text-white"
                      }`}
                    >
                      2
                    </div>
                    <div className="ml-2">
                      <p className={`text-sm ${step >= 2 ? "text-white" : "text-white/70"}`}>Profil</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="p-6">
              {step === 1 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Créer un compte</h2>

                  {/* Social registration options */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <button
                      type="button"
                      onClick={() => handleSocialRegister("google")}
                      disabled={isLoading}
                      className="w-full flex justify-center items-center py-2.5 px-4 border rounded-lg shadow-sm text-sm font-medium bg-white border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
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
                      S'inscrire avec Google
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSocialRegister("facebook")}
                      disabled={isLoading}
                      className="w-full flex justify-center items-center py-2.5 px-4 border rounded-lg shadow-sm text-sm font-medium bg-white border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
                    >
                      <svg className="h-5 w-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                        <path
                          fillRule="evenodd"
                          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                          clipRule="evenodd"
                        />
                      </svg>
                      S'inscrire avec Facebook
                    </button>
                  </div>

                  <div className="relative flex items-center justify-center mb-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">ou par email</span>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Step 1: Account Information */}
                {step === 1 && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* First Name */}
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                          Prénom
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User size={18} className="text-gray-400" />
                          </div>
                          <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d3e1] focus:border-[#b2d3e1] transition-all"
                            placeholder="Prénom"
                            required
                          />
                        </div>
                      </div>

                      {/* Last Name */}
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                          Nom
                        </label>
                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d3e1] focus:border-[#b2d3e1] transition-all"
                          placeholder="Nom"
                          required
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Adresse email
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail size={18} className="text-gray-400" />
                        </div>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d3e1] focus:border-[#b2d3e1] transition-all"
                          placeholder="votre@email.com"
                          required
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Mot de passe
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock size={18} className="text-gray-400" />
                        </div>
                        <input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={handleChange}
                          className="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d3e1] focus:border-[#b2d3e1] transition-all"
                          placeholder="••••••••"
                          required
                          minLength={8}
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
                      <p className="mt-1 text-xs text-gray-500">Le mot de passe doit contenir au moins 8 caractères</p>
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirmer le mot de passe
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock size={18} className="text-gray-400" />
                        </div>
                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d3e1] focus:border-[#b2d3e1] transition-all"
                          placeholder="••••••••"
                          required
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          aria-label={showConfirmPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={18} className="text-gray-400 hover:text-gray-600" />
                          ) : (
                            <Eye size={18} className="text-gray-400 hover:text-gray-600" />
                          )}
                        </button>
                      </div>
                      {formData.password &&
                        formData.confirmPassword &&
                        formData.password !== formData.confirmPassword && (
                          <p className="mt-1 text-xs text-red-500">Les mots de passe ne correspondent pas</p>
                        )}
                    </div>
                  </div>
                )}

                {/* Step 2: Profile Information */}
                {step === 2 && (
                  <div className="space-y-4 animate-fadeIn">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Informations personnelles</h2>

                    {/* Birth Date */}
                    <div>
                      <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Date de naissance
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Calendar size={18} className="text-gray-400" />
                        </div>
                        <input
                          id="birthDate"
                          name="birthDate"
                          type="date"
                          value={formData.birthDate}
                          onChange={handleChange}
                          className="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d3e1] focus:border-[#b2d3e1] transition-all"
                          required
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Téléphone
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone size={18} className="text-gray-400" />
                        </div>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          className="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d3e1] focus:border-[#b2d3e1] transition-all"
                          placeholder="+212 6XX-XXXXXX"
                        />
                      </div>
                    </div>

                    {/* City */}
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                        Ville
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MapPin size={18} className="text-gray-400" />
                        </div>
                        <select
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d3e1] focus:border-[#b2d3e1] transition-all"
                          required
                        >
                          <option value="">Sélectionnez votre ville</option>
                          <option value="casablanca">Casablanca</option>
                          <option value="rabat">Rabat</option>
                          <option value="marrakech">Marrakech</option>
                          <option value="tanger">Tanger</option>
                          <option value="fes">Fès</option>
                          <option value="agadir">Agadir</option>
                          <option value="meknes">Meknès</option>
                          <option value="oujda">Oujda</option>
                        </select>
                      </div>
                    </div>

              

                    {/* Terms and Conditions */}
                    <div className="mt-6">
                      <div className="flex items-start">
                        <input
                          id="acceptTerms"
                          name="acceptTerms"
                          type="checkbox"
                          checked={formData.acceptTerms}
                          onChange={handleChange}
                          className="h-5 w-5 text-[#460904] focus:ring-[#b2d3e1] border-gray-300 rounded mt-1"
                          required
                        />
                        <label htmlFor="acceptTerms" className="ml-2 block text-sm text-gray-700">
                          J'accepte les{" "}
                          <a href="/terms" className="text-[#460904] hover:underline">
                            conditions d'utilisation
                          </a>{" "}
                          et la{" "}
                          <a href="/privacy" className="text-[#460904] hover:underline">
                            politique de confidentialité
                          </a>
                        </label>
                      </div>
                    </div>

                    {/* Security notice */}
                    <div className="flex items-start p-4 border border-[#b2d3e1]/50 rounded-lg bg-[#b2d3e1]/10">
                      <Shield className="h-5 w-5 text-[#460904] mr-3 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-600">
                        Vos informations personnelles sont protégées et ne seront utilisées que pour faciliter le
                        processus de don de sang. Nous ne partagerons jamais vos données avec des tiers sans votre
                        consentement.
                      </p>
                    </div>
                  </div>
                )}

                {/* Form buttons */}
                <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="w-full sm:w-auto flex items-center justify-center py-2.5 px-6 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#b2d3e1] transition-all"
                    >
                      <ArrowLeft size={16} className="mr-2" />
                      Retour
                    </button>
                  )}
                  <Button
                    type="submit"
                    disabled={isLoading || (step === 2 && !formData.acceptTerms)}
                    loading={isLoading}
                    className="w-full sm:w-auto"
                    color="primary"
                  >
                    {step < 2 ? "Continuer" : "Créer mon compte"}
                  </Button>
                </div>
              </form>

              {/* Login link */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Vous avez déjà un compte ?{" "}
                  <a href="/login" className="font-medium text-[#460904] hover:text-[#5a0b06] transition-colors">
                    Connectez-vous
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-4 text-center text-sm text-gray-500 relative z-10">
        <p>© 2025 SangConnect – Tous droits réservés.</p>
      </div>
    </div>
  )
}

export default RegisterPage