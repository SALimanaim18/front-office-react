    "use client"

    import { useState } from "react"
    import { User, Lock, Mail, Eye, EyeOff, ArrowRight, UserPlus, Heart } from "lucide-react"

    const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true)
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
        confirmPassword: "",
    })
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
        ...formData,
        [name]: value,
        })

        // Clear error when user types
        if (errors[name]) {
        setErrors({
            ...errors,
            [name]: "",
        })
        }
    }

    const validateForm = () => {
        const newErrors = {}

        if (!formData.email) {
        newErrors.email = "L'email est requis"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Format d'email invalide"
        }

        if (!formData.password) {
        newErrors.password = "Le mot de passe est requis"
        } else if (formData.password.length < 6) {
        newErrors.password = "Le mot de passe doit contenir au moins 6 caractères"
        }

        if (!isLogin) {
        if (!formData.name) {
            newErrors.name = "Le nom est requis"
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Les mots de passe ne correspondent pas"
        }
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (validateForm()) {
        setIsLoading(true)

        // Simuler une requête API
        setTimeout(() => {
            setIsLoading(false)
            console.log("Formulaire soumis:", formData)
            alert(isLogin ? "Connexion réussie!" : "Inscription réussie!")
        }, 1500)
        }
    }

    const toggleMode = () => {
        setIsLogin(!isLogin)
        setErrors({})
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-[#b2d3e1]/20 px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#d93f31] to-[#5a0b06] px-6 py-8 text-white relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full"></div>

                <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center mr-4">
                    {isLogin ? (
                    <Lock className="h-6 w-6 text-[#d93f31]" />
                    ) : (
                    <UserPlus className="h-6 w-6 text-[#d93f31]" />
                    )}
                </div>
                <div>
                    <h2 className="text-2xl font-bold">{isLogin ? "Connexion" : "Inscription"}</h2>
                    <p className="text-white/80 text-sm">
                    {isLogin ? "Accédez à votre compte" : "Créez votre compte pour commencer"}
                    </p>
                </div>
                </div>

                <div className="flex items-center text-sm">
                <Heart size={14} className="mr-2 animate-pulse" />
                <span>Ensemble pour sauver des vies</span>
                </div>
            </div>

            {/* Form */}
            <div className="px-6 py-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                {/* Social Login Buttons */}
                <div className="grid grid-cols-2 gap-3">
                    <button
                    type="button"
                    className="flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
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
                    className="flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                    >
                    <svg className="h-5 w-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                        <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                        />
                    </svg>
                    Facebook
                    </button>
                </div>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">ou par email</span>
                    </div>
                </div>

                {/* Name field (only for signup) */}
                {!isLogin && (
                    <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Nom complet
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User size={18} className="text-gray-400" />
                        </div>
                        <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        className={`pl-10 w-full px-4 py-2.5 border ${
                            errors.name ? "border-[#d93f31]" : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-[#b2d3e1] focus:border-[#b2d3e1] transition-all`}
                        placeholder="Votre nom complet"
                        />
                    </div>
                    {errors.name && <p className="mt-1 text-sm text-[#d93f31]">{errors.name}</p>}
                    </div>
                )}

                {/* Email field */}
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
                        className={`pl-10 w-full px-4 py-2.5 border ${
                        errors.email ? "border-[#d93f31]" : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-[#b2d3e1] focus:border-[#b2d3e1] transition-all`}
                        placeholder="votre@email.com"
                    />
                    </div>
                    {errors.email && <p className="mt-1 text-sm text-[#d93f31]">{errors.email}</p>}
                </div>

                {/* Password field */}
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
                        className={`pl-10 w-full px-4 py-2.5 border ${
                        errors.password ? "border-[#d93f31]" : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-[#b2d3e1] focus:border-[#b2d3e1] transition-all`}
                        placeholder="••••••••"
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
                    {errors.password && <p className="mt-1 text-sm text-[#d93f31]">{errors.password}</p>}
                </div>

                {/* Confirm Password field (only for signup) */}
                {!isLogin && (
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
                        type={showPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`pl-10 w-full px-4 py-2.5 border ${
                            errors.confirmPassword ? "border-[#d93f31]" : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-[#b2d3e1] focus:border-[#b2d3e1] transition-all`}
                        placeholder="••••••••"
                        />
                    </div>
                    {errors.confirmPassword && <p className="mt-1 text-sm text-[#d93f31]">{errors.confirmPassword}</p>}
                    </div>
                )}

                {/* Remember me & Forgot password (only for login) */}
                {isLogin && (
                    <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-[#d93f31] focus:ring-[#b2d3e1] border-gray-300 rounded"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                        Se souvenir de moi
                        </label>
                    </div>
                    <a href="#" className="text-sm font-medium text-[#d93f31] hover:text-[#5a0b06] transition-colors">
                        Mot de passe oublié ?
                    </a>
                    </div>
                )}

                {/* Submit button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#d93f31] hover:bg-[#5a0b06] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#b2d3e1] transition-colors group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                    <>
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
                        {isLogin ? "Connexion en cours..." : "Inscription en cours..."}
                    </>
                    ) : (
                    <>
                        {isLogin ? "Se connecter" : "S'inscrire"}
                        <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                    )}
                </button>
                </form>

                {/* Toggle between login and signup */}
                <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                    {isLogin ? "Vous n'avez pas de compte ?" : "Vous avez déjà un compte ?"}{" "}
                    <button
                    type="button"
                    onClick={toggleMode}
                    className="font-medium text-[#d93f31] hover:text-[#5a0b06] transition-colors"
                    >
                    {isLogin ? "S'inscrire" : "Se connecter"}
                    </button>
                </p>
                </div>
            </div>
            </div>

            {/* Footer */}
            <div className="mt-4 flex justify-center items-center text-sm text-gray-500">
            <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
            </svg>
            Connexion sécurisée
            </div>
        </div>
        </div>
    )
    }

    export default AuthForm

