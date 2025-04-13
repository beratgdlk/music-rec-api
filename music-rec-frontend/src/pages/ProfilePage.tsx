import { useState } from 'react';
import { useUserStore } from '../stores/userStore';
import { User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { user, logout } = useUserStore();
  const navigate = useNavigate();
  
  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form doğrulama
    if (newPassword && newPassword !== confirmPassword) {
      setError('Yeni şifreler eşleşmiyor');
      return;
    }
    
    // API çağrısı simule edildi
    setTimeout(() => {
      setSuccess('Profil bilgileriniz güncellendi');
      setEditMode(false);
      setError('');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      // Gerçek projede burada API çağrısı yapılacak
    }, 500);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="pl-64 pb-24 bg-gradient-to-b from-gray-900 to-black min-h-screen text-white">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Profil</h1>
        
        <div className="bg-gray-800 rounded-xl p-6 mb-8">
          <div className="flex items-center mb-6">
            <div className="bg-gray-700 w-20 h-20 rounded-full flex items-center justify-center mr-4">
              <User className="w-10 h-10 text-gray-300" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{user?.username || 'Kullanıcı'}</h2>
              <p className="text-gray-400">{user?.email || 'kullanici@example.com'}</p>
            </div>
          </div>
          
          {!editMode ? (
            <div className="flex space-x-4">
              <button 
                className="bg-green-500 text-black font-medium py-2 px-4 rounded-md hover:bg-green-400 transition-colors"
                onClick={() => setEditMode(true)}
              >
                Profili Düzenle
              </button>
              <button 
                className="bg-gray-700 text-white font-medium py-2 px-4 rounded-md hover:bg-gray-600 transition-colors flex items-center gap-2"
                onClick={handleLogout}
              >
                <LogOut size={18} />
                <span>Çıkış Yap</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              {error && (
                <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-500 px-4 py-3 rounded">
                  {error}
                </div>
              )}
              
              {success && (
                <div className="bg-green-500 bg-opacity-20 border border-green-500 text-green-500 px-4 py-3 rounded">
                  {success}
                </div>
              )}
              
              <div>
                <label htmlFor="username" className="block text-sm font-medium mb-2">
                  Kullanıcı Adı
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              
              <div className="border-t border-gray-700 pt-4">
                <h3 className="text-lg font-medium mb-4">Şifre Değiştir (isteğe bağlı)</h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="current-password" className="block text-sm font-medium mb-2">
                      Mevcut Şifre
                    </label>
                    <input
                      id="current-password"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="new-password" className="block text-sm font-medium mb-2">
                      Yeni Şifre
                    </label>
                    <input
                      id="new-password"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium mb-2">
                      Yeni Şifre (Tekrar)
                    </label>
                    <input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-green-500 text-black font-medium py-2 px-4 rounded-md hover:bg-green-400 transition-colors"
                >
                  Değişiklikleri Kaydet
                </button>
                <button
                  type="button"
                  className="bg-gray-700 text-white font-medium py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
                  onClick={() => {
                    setEditMode(false);
                    setError('');
                    setSuccess('');
                  }}
                >
                  İptal
                </button>
              </div>
            </form>
          )}
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Hesap Ayarları</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Karanlık Mod</h3>
                <p className="text-sm text-gray-400">Uygulama teması</p>
              </div>
              <div className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  id="darkmode-toggle"
                  className="opacity-0 w-0 h-0"
                  defaultChecked
                />
                <label
                  htmlFor="darkmode-toggle"
                  className="block overflow-hidden h-6 rounded-full bg-gray-600 cursor-pointer before:content-[''] before:absolute before:top-[2px] before:left-[2px] before:bottom-[2px] before:bg-white before:transition-all before:rounded-full before:w-5 before:h-5 before:translate-x-6"
                ></label>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Email Bildirimleri</h3>
                <p className="text-sm text-gray-400">Müzik önerileri ve güncellemeler</p>
              </div>
              <div className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  id="email-toggle"
                  className="opacity-0 w-0 h-0"
                />
                <label
                  htmlFor="email-toggle"
                  className="block overflow-hidden h-6 rounded-full bg-gray-600 cursor-pointer before:content-[''] before:absolute before:top-[2px] before:left-[2px] before:bottom-[2px] before:bg-white before:transition-all before:rounded-full before:w-5 before:h-5"
                ></label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 