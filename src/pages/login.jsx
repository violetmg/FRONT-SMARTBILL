import React, { useState } from 'react';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showRegister, setShowRegister] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;
    
    if (email && password) {
      // En un sistema real, aquí se verificarían las credenciales
      alert("Login exitoso! Redirigiendo al dashboard...");
      // window.location.href = "dashboard.html"; // En sistema real
    } else {
      alert("Por favor completa todos los campos");
    }
  };

  const handleShowRegister = (e) => {
    e.preventDefault();
    setShowRegister(true);
    alert("En un sistema real, aquí se mostraría el formulario de registro o redirigir a esa página");
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f9fbfd' }}>
      <div className="flex w-full max-w-4xl h-auto md:h-[550px] shadow-2xl rounded-3xl overflow-hidden">
        {/* Left Side - Image/Branding */}
        <div 
          className="flex-1 flex flex-col justify-center items-center text-white p-10 relative overflow-hidden"
          style={{ backgroundColor: '#1a73e8' }}
        >
          {/* Decorative circles */}
          <div 
            className="absolute w-72 h-72 rounded-full top-[-100px] left-[-100px] opacity-10"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
          ></div>
          <div 
            className="absolute w-48 h-48 rounded-full bottom-[-50px] right-[-50px] opacity-10"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
          ></div>
          
          {/* Floating icon with animation */}
          <div className="text-8xl mb-5 relative z-10 animate-bounce">
            <svg 
              width="100" 
              height="100" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5"
              className="w-20 h-20"
            >
              <path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
          </div>
          
          <h1 className="text-4xl font-bold mb-3 relative z-10">SmartBill</h1>
          <p className="text-center text-lg opacity-90 relative z-10">
            Sistema de facturación inteligente para simplificar tu negocio
          </p>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex-1 bg-white p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-semibold mb-8" style={{ color: '#202124' }}>
            Iniciar Sesión
          </h2>
          
          <div className="space-y-5">
            <div className="relative">
              <label 
                htmlFor="email" 
                className="block mb-2 text-sm"
                style={{ color: '#5f6368' }}
              >
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="tucorreo@ejemplo.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 focus:border-blue-500"
                style={{ borderColor: '#e0e0e0' }}
              />
            </div>
            
            <div className="relative">
              <label 
                htmlFor="password" 
                className="block mb-2 text-sm"
                style={{ color: '#5f6368' }}
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 focus:border-blue-500"
                style={{ borderColor: '#e0e0e0' }}
              />
            </div>
            
            <div className="text-right mb-6">
              <a 
                href="#" 
                className="text-sm hover:underline transition-colors duration-300"
                style={{ color: '#1a73e8' }}
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            
            <button
              type="submit"
              className="w-full py-3 px-5 rounded-lg text-base font-semibold cursor-pointer transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 hover:shadow-lg"
              style={{ 
                backgroundColor: '#1a73e8',
                color: 'white'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#0d47a1';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#1a73e8';
              }}
            >
              Iniciar Sesión
            </button>
            
            <div className="text-center mt-8 text-sm" style={{ color: '#5f6368' }}>
              ¿No tienes una cuenta?{' '}
              <a 
                href="#" 
                onClick={handleShowRegister}
                className="font-semibold hover:underline transition-colors duration-300"
                style={{ color: '#1a73e8' }}
              >
                Regístrate
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        
        .floating {
          animation: float 5s ease-in-out infinite;
        }
        
        @media (max-width: 768px) {
          .login-container {
            flex-direction: column;
            width: 95%;
            height: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;