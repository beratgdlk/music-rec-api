import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// SVG İkonlar
const LogoIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" fill="#18181B" stroke="white" strokeWidth="2"/>
    <path d="M15 12L10.5 15V9L15 12Z" fill="white"/>
  </svg>
);

const ArrowLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.8334 10H4.16675" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8.33341 5.83334L4.16675 10L8.33341 14.1667" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form doğrulama
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    try {
      setIsLoading(true);
      setError('');
      
      // API isteği burada yapılacak
      // const response = await authApi.register({ 
      //   username: formData.username, 
      //   email: formData.email, 
      //   password: formData.password 
      // });
      
      // Başarılı kayıt simülasyonu
      setTimeout(() => {
        setIsLoading(false);
        // localStorage.setItem('token', response.token);
        navigate('/');
      }, 1500);
      
    } catch (err) {
      setIsLoading(false);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Üst başlık ve geri butonu */}
      <header className="p-5 flex items-center">
        <div className="flex items-center justify-between w-full max-w-md mx-auto">
          <Link to="/auth/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full bg-[#1A1A1A] hover:bg-[#292929]"
            >
              <ArrowLeftIcon />
            </motion.button>
          </Link>
          <div className="flex items-center">
            <LogoIcon />
            <span className="ml-2 text-lg font-semibold">TuneIn</span>
          </div>
          <div className="w-10"></div> {/* Boşluk dengelemek için */}
        </div>
      </header>
      
      <main className="flex-1 flex items-center justify-center p-6">
        <motion.div 
          className="max-w-md w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold mb-6 text-center">Create an account</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div 
                className="bg-red-900/30 border border-red-800 text-red-200 px-4 py-3 rounded-md"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                {error}
              </motion.div>
            )}
            
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-2 text-gray-300">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                className="input"
                placeholder="Enter your username"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="input"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2 text-gray-300">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="input"
                placeholder="Enter your password"
              />
              <p className="mt-1 text-xs text-gray-500">
                Must be at least 6 characters
              </p>
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2 text-gray-300">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="input"
                placeholder="Confirm your password"
              />
            </div>
            
            <motion.button
              type="submit"
              className="btn-primary w-full py-3 rounded-md font-medium flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                'Create Account'
              )}
            </motion.button>
            
            <div className="pt-4 text-center">
              <p className="text-gray-400">
                Already have an account?{' '}
                <Link to="/auth/login-form" className="text-[#D97706] hover:text-[#F59E0B]">
                  Log in
                </Link>
              </p>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  );
};

export default RegisterForm; 