"use client"

import { useState } from "react"
import { Button } from "../common/Button2"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "../../components/common/Card"
import { Input } from "../../components/common/Input"
import { Label } from "../../components/common/Label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/common/Select"
import { Checkbox } from "../../components/common/Checkbox"
import { Heart, Droplet, Calendar, Users, Mail, Phone, MapPin, User, Shield } from "lucide-react"
import { motion } from "framer-motion"

export default function BecomeDonorPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    bloodType: "",
    availableWeekdays: false,
    availableWeekends: false,
    availableEmergency: false,
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when field is edited
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Check required fields
    if (!formData.fullName) newErrors.fullName = "Ce champ est obligatoire"
    if (!formData.email) {
      newErrors.email = "Ce champ est obligatoire"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Adresse email invalide"
    }
    if (!formData.phone) newErrors.phone = "Ce champ est obligatoire"
    if (!formData.city) newErrors.city = "Ce champ est obligatoire"
    if (!formData.bloodType) newErrors.bloodType = "Ce champ est obligatoire"

    // Check if at least one availability option is selected
    if (!formData.availableWeekdays && !formData.availableWeekends && !formData.availableEmergency) {
      newErrors.availability = "Veuillez sélectionner au moins une disponibilité"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)

      // Simulate form submission
      setTimeout(() => {
        console.log("Form submitted:", formData)
        // Toast notification would go here
        alert("Inscription réussie! Merci de vous être inscrit comme donneur de sang.")

        // Reset form
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          city: "",
          bloodType: "",
          availableWeekdays: false,
          availableWeekends: false,
          availableEmergency: false,
        })
        setIsSubmitting(false)
      }, 1500)
    }
  }

  return (
    <div className="w-full">
      {/* Modern creative header */}
      <div className="relative overflow-hidden rounded-t-xl mb-6">
        {/* Background with gradient and pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#5a0b06] via-[#7a1b16] to-[#5a0b06] opacity-95 z-0"></div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <svg
            className="absolute top-0 left-0 w-full h-full opacity-10"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path d="M0,0 L100,0 L100,5 C60,20 40,20 0,5 Z" fill="#b2d3e1"></path>
            <path d="M0,20 L100,20 L100,25 C60,40 40,40 0,25 Z" fill="#b2d3e1"></path>
            <path d="M0,40 L100,40 L100,45 C60,60 40,60 0,45 Z" fill="#b2d3e1"></path>
            <path d="M0,60 L100,60 L100,65 C60,80 40,80 0,65 Z" fill="#b2d3e1"></path>
            <path d="M0,80 L100,80 L100,85 C60,100 40,100 0,85 Z" fill="#b2d3e1"></path>
          </svg>
        </div>

        {/* Circular elements */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-[#b2d3e1] opacity-10 rounded-full"></div>
        <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-[#b2d3e1] opacity-10 rounded-full"></div>
        <div className="absolute top-3/4 right-1/2 w-16 h-16 bg-white opacity-5 rounded-full"></div>

        {/* Content */}
        <div className="relative z-10 p-8 md:p-10">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {/* Stylized heart icon */}
            <motion.div
              className="relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 bg-[#b2d3e1] opacity-20 rounded-full blur-xl transform scale-150"></div>
              <div className="relative bg-white bg-opacity-10 backdrop-blur-sm p-4 rounded-full w-16 h-16 flex items-center justify-center border border-white border-opacity-20 shadow-lg">
                <Heart className="h-8 w-8 text-white" />
              </div>
            </motion.div>

            {/* Text content */}
            <div>
              <motion.h1
                className="text-3xl font-bold text-white mb-2 tracking-tight"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Devenir donneur de sang
              </motion.h1>
              <motion.p
                className="text-white text-opacity-90 max-w-2xl leading-relaxed"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Rejoignez notre communauté de donneurs et aidez à sauver des vies. Votre engagement peut faire toute la
                différence pour des patients en attente d'une transfusion.
              </motion.p>
            </div>
          </div>

          {/* Animated pulse effect */}
          <div className="mt-8 flex items-center gap-4">
            <div className="relative w-3 h-3">
              <div className="absolute inset-0 bg-[#b2d3e1] rounded-full animate-ping opacity-75"></div>
              <div className="relative bg-[#b2d3e1] w-3 h-3 rounded-full"></div>
            </div>
            <div className="h-0.5 flex-grow bg-gradient-to-r from-[#b2d3e1] to-transparent rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
        {[
          {
            icon: <Heart className="h-6 w-6 text-white" />,
            title: "Sauvez des vies",
            description:
              "Un don de sang peut sauver jusqu'à 3 vies. Chaque jour, des milliers de patients ont besoin de transfusions.",
          },
          {
            icon: <Droplet className="h-6 w-6 text-white" />,
            title: "Tous les groupes comptent",
            description:
              "Quel que soit votre groupe sanguin, votre don est précieux et peut aider des patients en situation d'urgence.",
          },
          {
            icon: <Calendar className="h-6 w-6 text-white" />,
            title: "Seulement 45 minutes",
            description:
              "Le processus de don ne prend que 45 minutes de votre temps, mais peut offrir toute une vie à quelqu'un d'autre.",
          },
          {
            icon: <Users className="h-6 w-6 text-white" />,
            title: "Rejoignez la communauté",
            description:
              "Faites partie d'un réseau de personnes engagées qui contribuent régulièrement à sauver des vies.",
          },
        ].map((card, index) => (
          <motion.div
            key={index}
            className="border-2 border-[#b2d3e1] shadow-md hover:shadow-lg transition-all group hover:-translate-y-1 duration-300 bg-white rounded-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <CardHeader className="pb-2 pt-6">
              <div className="bg-gradient-to-br from-[#5a0b06] to-[#7a1b16] p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300 shadow-md">
                {card.icon}
              </div>
              <CardTitle className="text-[#5a0b06] text-lg">{card.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">{card.description}</p>
            </CardContent>
          </motion.div>
        ))}
      </div>

      <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
        <CardHeader className="bg-[#b2d3e1] bg-opacity-30 border-b border-[#b2d3e1]">
          <CardTitle className="text-[#5a0b06] text-xl">Formulaire d'inscription</CardTitle>
          <CardDescription>
            Inscrivez-vous pour devenir donneur de sang et être notifié des besoins dans votre région.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-[#5a0b06]" />
                  <Label htmlFor="fullName" className="text-[#5a0b06] font-medium">
                    Nom & prénom <span className="text-red-500">*</span>
                  </Label>
                </div>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  className={`border-2 ${errors.fullName ? "border-red-500" : "border-gray-200 focus:border-[#b2d3e1]"} h-11`}
                  placeholder="Entrez votre nom complet"
                  icon={<User className="h-4 w-4" />}
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[#5a0b06]" />
                  <Label htmlFor="email" className="text-[#5a0b06] font-medium">
                    Email <span className="text-red-500">*</span>
                  </Label>
                </div>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className={`border-2 ${errors.email ? "border-red-500" : "border-gray-200 focus:border-[#b2d3e1]"} h-11`}
                  placeholder="Entrez votre adresse email"
                  icon={<Mail className="h-4 w-4" />}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-[#5a0b06]" />
                  <Label htmlFor="phone" className="text-[#5a0b06] font-medium">
                    Téléphone <span className="text-red-500">*</span>
                  </Label>
                </div>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className={`border-2 ${errors.phone ? "border-red-500" : "border-gray-200 focus:border-[#b2d3e1]"} h-11`}
                  placeholder="Entrez votre numéro de téléphone"
                  icon={<Phone className="h-4 w-4" />}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#5a0b06]" />
                  <Label htmlFor="city" className="text-[#5a0b06] font-medium">
                    Ville <span className="text-red-500">*</span>
                  </Label>
                </div>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  className={`border-2 ${errors.city ? "border-red-500" : "border-gray-200 focus:border-[#b2d3e1]"} h-11`}
                  placeholder="Entrez votre ville"
                  icon={<MapPin className="h-4 w-4" />}
                />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Droplet className="h-4 w-4 text-[#5a0b06]" />
                  <Label htmlFor="bloodType" className="text-[#5a0b06] font-medium">
                    Groupe sanguin <span className="text-red-500">*</span>
                  </Label>
                </div>
                <Select value={formData.bloodType} onValueChange={(value) => handleChange("bloodType", value)}>
                  <SelectTrigger
                    id="bloodType"
                    className={`border-2 ${errors.bloodType ? "border-red-500" : "border-gray-200 focus:border-[#b2d3e1]"} h-11`}
                  >
                    <SelectValue placeholder="Sélectionnez un groupe sanguin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
                {errors.bloodType && <p className="text-red-500 text-sm mt-1">{errors.bloodType}</p>}
              </div>

              <div className="space-y-2 md:col-span-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-[#5a0b06]" />
                  <Label className="text-[#5a0b06] font-medium">
                    Disponibilité <span className="text-red-500">*</span>
                  </Label>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="flex items-center space-x-2 bg-gradient-to-r from-[#b2d3e1] to-[#d8e9f0] bg-opacity-10 p-3 rounded-lg border border-[#b2d3e1] hover:shadow-md transition-all">
                    <Checkbox
                      id="availableWeekdays"
                      checked={formData.availableWeekdays}
                      onCheckedChange={(checked) => handleChange("availableWeekdays", checked)}
                      className="text-[#5a0b06] border-[#5a0b06]"
                    />
                    <Label htmlFor="availableWeekdays" className="font-normal">
                      Disponible en semaine
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 bg-gradient-to-r from-[#b2d3e1] to-[#d8e9f0] bg-opacity-10 p-3 rounded-lg border border-[#b2d3e1] hover:shadow-md transition-all">
                    <Checkbox
                      id="availableWeekends"
                      checked={formData.availableWeekends}
                      onCheckedChange={(checked) => handleChange("availableWeekends", checked)}
                      className="text-[#5a0b06] border-[#5a0b06]"
                    />
                    <Label htmlFor="availableWeekends" className="font-normal">
                      Disponible le weekend
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 bg-gradient-to-r from-[#b2d3e1] to-[#d8e9f0] bg-opacity-10 p-3 rounded-lg border border-[#b2d3e1] hover:shadow-md transition-all">
                    <Checkbox
                      id="availableEmergency"
                      checked={formData.availableEmergency}
                      onCheckedChange={(checked) => handleChange("availableEmergency", checked)}
                      className="text-[#5a0b06] border-[#5a0b06]"
                    />
                    <Label htmlFor="availableEmergency" className="font-normal">
                      Disponible en cas d'urgence
                    </Label>
                  </div>
                </div>
                {errors.availability && <p className="text-red-500 text-sm mt-1">{errors.availability}</p>}
              </div>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#5a0b06] to-[#7a1b16] hover:from-[#4a0905] hover:to-[#6a0b06] text-white py-6 text-lg font-medium rounded-lg transition-all shadow-md hover:shadow-lg"
                isLoading={isSubmitting}
              >
                Je deviens donneur
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="bg-[#b2d3e1] bg-opacity-20 p-6 border-t border-[#b2d3e1]">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-[#5a0b06] mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-600 italic">
              En vous inscrivant, vous acceptez d'être contacté par SangConnect ou les centres de transfusion
              partenaires lorsque votre profil correspond à un besoin. Vos données personnelles sont protégées
              conformément à notre politique de confidentialité.
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
