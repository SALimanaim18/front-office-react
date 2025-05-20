import { useEffect, useState } from 'react';

import { getUserProfile, updateUserProfile, changePassword, uploadUserPhoto } from '../../services/api/userApi';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Label } from '../../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/Tabs';
import { AlertCircle, Check, User, Lock, Camera, Edit } from 'lucide-react';
import defaultAvatar from '../../assets/images/default-avatar.png';

const colors = {
  primary: '#b2d3e1',
  accent: '#e74c3c',
};

export default function ProfilManager() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '' });
  const [passwordData, setPasswordData] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [activeTab, setActiveTab] = useState('profile');
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await getUserProfile();
        setUser(userData);
        setFormData(userData);
      } catch (err) {
        setError("Erreur de chargement du profil utilisateur.");
      }
    }
    fetchData();
  }, []);

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handlePasswordChange = (e) => setPasswordData({ ...passwordData, [e.target.name]: e.target.value });

  const handleProfileUpdate = async () => {
    try {
      await updateUserProfile(formData);
      setEditMode(false);
      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 3000);
    } catch {
      setError("Erreur lors de la mise à jour du profil.");
    }
  };

  const handlePasswordUpdate = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("Les mots de passe ne correspondent pas");
      return;
    }
    try {
      await changePassword({ oldPassword: passwordData.oldPassword, newPassword: passwordData.newPassword });
      setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
      setPasswordError('');
      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 3000);
    } catch {
      setPasswordError("Erreur lors du changement de mot de passe");
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        await uploadUserPhoto(file);
        const updatedUser = await getUserProfile();
        setUser(updatedUser);
        setUpdateSuccess(true);
        setTimeout(() => setUpdateSuccess(false), 3000);
      } catch (error) {
        setError("Erreur lors de l'upload de la photo de profil.");
      }
    }
  };

  return (
    <>
      <div className="max-w-5xl mx-auto p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Mon Profil</h1>

        {error && <div className="bg-red-100 text-red-800 p-2 rounded flex items-center"><AlertCircle className="mr-2" /> {error}</div>}
        {updateSuccess && <div className="bg-green-100 text-green-800 p-2 rounded flex items-center"><Check className="mr-2" /> Mise à jour réussie.</div>}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="mb-4">
            <TabsTrigger value="profile">Profil</TabsTrigger>
            <TabsTrigger value="security">Sécurité</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="p-6">
              <div className="flex gap-8">
                <div className="flex flex-col items-center">
                  <img src={user?.photoUrl ? `http://localhost:8080${user.photoUrl}` : defaultAvatar} alt="avatar" className="w-32 h-32 rounded-full object-cover border-2 border-[#b2d3e1]" />
                  <label htmlFor="photo-upload" className="mt-2 cursor-pointer text-sm text-[#b2d3e1]">Changer photo
                    <input id="photo-upload" type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                  </label>
                </div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Prénom</Label>
                    <Input name="firstName" value={formData.firstName} onChange={handleInputChange} disabled={!editMode} />
                  </div>
                  <div>
                    <Label>Nom</Label>
                    <Input name="lastName" value={formData.lastName} onChange={handleInputChange} disabled={!editMode} />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input name="email" value={formData.email} onChange={handleInputChange} disabled={!editMode} />
                  </div>
                  <div>
                    <Label>Téléphone</Label>
                    <Input name="phone" value={formData.phone} onChange={handleInputChange} disabled={!editMode} />
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                {editMode ? (
                  <Button onClick={handleProfileUpdate} className="bg-[#e74c3c] text-white">Sauvegarder</Button>
                ) : (
                  <Button variant="outline" onClick={() => setEditMode(true)}>Modifier</Button>
                )}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="p-6">
              <h2 className="text-lg font-medium mb-4">Modifier mot de passe</h2>
              {passwordError && <div className="text-red-600 text-sm mb-2">{passwordError}</div>}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Ancien mot de passe</Label>
                  <Input type="password" name="oldPassword" value={passwordData.oldPassword} onChange={handlePasswordChange} />
                </div>
                <div>
                  <Label>Nouveau mot de passe</Label>
                  <Input type="password" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} />
                </div>
                <div>
                  <Label>Confirmer mot de passe</Label>
                  <Input type="password" name="confirmPassword" value={passwordData.confirmPassword} onChange={handlePasswordChange} />
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button onClick={handlePasswordUpdate} className="bg-[#e74c3c] text-white">Changer</Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
