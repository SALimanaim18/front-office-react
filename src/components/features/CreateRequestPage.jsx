"use client"

import { useState } from "react"
import Button from "../components/common/Button2"; // ✅ Correct pour un export default
import { Card, CardContent, CardFooter } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Textarea } from "../components/common/Textarea"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"
import { toast } from "../components/ui/use-toast"
import { AlertCircle, Droplet, Clock, MapPin, Phone } from "lucide-react"
import { Alert, AlertDescription } from "../components/common/Alert"
import { submitBloodRequest } from '../api';

export default function CreateRequestPage() {
  const [formData, setFormData] = useState({
    patientName: "",
    bloodType: "",
    city: "",
    transfusionCenter: "",
    contactPhone: "",
    urgencyLevel: "",
    additionalMessage: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false); // Ajouté pour gérer le statut de chargement

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value && key !== "additionalMessage") {
        newErrors[key] = "Ce champ est obligatoire";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Formulaire soumis")
    if (validateForm()) {
      setIsLoading(true); // Active le statut de chargement
      try {
        // Appeler l'API pour soumettre la demande
        await submitBloodRequest(formData); // Cette fonction envoie les données au backend
        toast({
          title: "Demande publiée",
          description: "Votre demande de don de sang a été publiée avec succès.",
        });

        // Réinitialiser le formulaire après la soumission réussie
        setFormData({
          patientName: "",
          bloodType: "",
          city: "",
          transfusionCenter: "",
          contactPhone: "",
          urgencyLevel: "",
          additionalMessage: "",
        });
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de la soumission de la demande.",
        });
      } finally {
        setIsLoading(false); // Désactive le statut de chargement
      }
    }
  };

  const transfusionCenters = [
    "Centre de Transfusion Sanguine de Paris",
    "Établissement Français du Sang - Lyon",
    "Centre Régional de Transfusion Sanguine - Marseille",
    "EFS Lille",
    "Centre de Don du Sang - Bordeaux",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f8f9fa] py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Modern creative header */}
        <div className="relative overflow-hidden rounded-t-xl">
          {/* Background with gradient and pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#5a0b06] to-[#7a1b16] opacity-95 z-0"></div>

          {/* Abstract shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#b2d3e1] opacity-10 rounded-full translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#b2d3e1] opacity-10 rounded-full -translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white opacity-5 rounded-full"></div>

          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoLTZ2LTZoNnptLTYtMTJ2NmgtNnYtNmg2em0tNiAwdjZoLTZ2LTZoNnptMTIgMHY2aDZWMjhoLTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30 z-0"></div>

          {/* Content */}
          <div className="relative z-10 p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              {/* Icon in circle */}
              <div className="bg-white bg-opacity-10 backdrop-blur-sm p-4 rounded-full w-16 h-16 flex items-center justify-center border border-white border-opacity-20 shadow-lg">
                <Droplet className="h-8 w-8 text-white" />
              </div>

              {/* Text content */}
              <div>
                <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Créer une demande de don</h1>
                <p className="text-white text-opacity-90 max-w-2xl leading-relaxed">
                  Remplissez ce formulaire pour publier une demande de don de sang pour un patient. Votre demande sera
                  visible par les donneurs potentiels dans votre région.
                </p>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="flex gap-2 mt-8">
              <div className="h-1 w-20 bg-[#b2d3e1] bg-opacity-40 rounded-full"></div>
              <div className="h-1 w-10 bg-[#b2d3e1] bg-opacity-60 rounded-full"></div>
              <div className="h-1 w-5 bg-[#b2d3e1] bg-opacity-80 rounded-full"></div>
            </div>
          </div>
        </div>

     

        <Card className="border-0 shadow-lg rounded-b-xl">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="patientName" className="text-[#5a0b06] font-medium">
                      Nom du patient <span className="text-red-500">*</span>
                    </Label>
                  </div>
                  <Input
                    id="patientName"
                    value={formData.patientName}
                    onChange={(e) => handleChange("patientName", e.target.value)}
                    className={`border-2 ${errors.patientName ? "border-red-500" : "border-gray-200 focus:border-[#b2d3e1]"} h-11`}
                    placeholder="Entrez le nom du patient"
                  />
                  {errors.patientName && <p className="text-red-500 text-sm mt-1">{errors.patientName}</p>}
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
                  />
                  {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#5a0b06]" />
                    <Label htmlFor="transfusionCenter" className="text-[#5a0b06] font-medium">
                      Centre de transfusion <span className="text-red-500">*</span>
                    </Label>
                  </div>
                  <Select
                    value={formData.transfusionCenter}
                    onValueChange={(value) => handleChange("transfusionCenter", value)}
                  >
                    <SelectTrigger
                      id="transfusionCenter"
                      className={`border-2 ${errors.transfusionCenter ? "border-red-500" : "border-gray-200 focus:border-[#b2d3e1]"} h-11`}
                    >
                      <SelectValue placeholder="Sélectionnez un centre" />
                    </SelectTrigger>
                    <SelectContent>
                      {transfusionCenters.map((center) => (
                        <SelectItem key={center} value={center}>
                          {center}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-[#5a0b06]" />
                    <Label htmlFor="contactPhone" className="text-[#5a0b06] font-medium">
                      Téléphone de contact <span className="text-red-500">*</span>
                    </Label>
                  </div>
                  <Input
                    id="contactPhone"
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) => handleChange("contactPhone", e.target.value)}
                    className={`border-2 ${errors.contactPhone ? "border-red-500" : "border-gray-200 focus:border-[#b2d3e1]"} h-11`}
                    placeholder="Entrez votre numéro de téléphone"
                  />
                  {errors.contactPhone && <p className="text-red-500 text-sm mt-1">{errors.contactPhone}</p>}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#5a0b06]" />
                    <Label htmlFor="urgencyLevel" className="text-[#5a0b06] font-medium">
                      Niveau d'urgence <span className="text-red-500">*</span>
                    </Label>
                  </div>
                  <RadioGroup
                    value={formData.urgencyLevel}
                    onValueChange={(value) => handleChange("urgencyLevel", value)}
                    className="flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-4 pt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="basse" id="urgency-low" className="text-[#5a0b06]" />
                      <Label htmlFor="urgency-low" className="font-normal">
                        Basse
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="moyenne" id="urgency-medium" className="text-[#5a0b06]" />
                      <Label htmlFor="urgency-medium" className="font-normal">
                        Moyenne
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="urgente" id="urgency-high" className="text-[#5a0b06]" />
                      <Label htmlFor="urgency-high" className="font-normal">
                        Urgente
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalMessage" className="text-[#5a0b06] font-medium">
                  Message complémentaire
                </Label>
                <Textarea
                  id="additionalMessage"
                  value={formData.additionalMessage}
                  onChange={(e) => handleChange("additionalMessage", e.target.value)}
                  placeholder="Informations supplémentaires sur la demande..."
                  className="min-h-[120px] border-2 border-gray-200 focus:border-[#b2d3e1]"
                />
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#5a0b06] to-[#7a1b16] hover:from-[#4a0905] hover:to-[#6a0b06] text-white py-6 text-lg font-medium rounded-lg transition-all shadow-md hover:shadow-lg"
                >
                  Publier la demande
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="bg-[#b2d3e1] bg-opacity-20 p-6 border-t border-[#b2d3e1] rounded-b-xl">
            <p className="text-sm text-gray-600 italic">
              Les informations fournies seront traitées avec confidentialité et ne seront visibles que par les donneurs
              potentiels et les centres de transfusion.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
