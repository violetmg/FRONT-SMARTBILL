import React, { useState, useEffect } from 'react';

const ConfigGlobal = () => {
  const [config, setConfig] = useState({
    companyName: '',
    taxId: '',
    address: '',
    phone: '',
    email: '',
    tax: '',
    invoiceFooter: ''
  });

  const [notification, setNotification] = useState({
    show: false,
    type: '',
    message: ''
  });

  const [errors, setErrors] = useState({});

  // Cargar configuración guardada al montar el componente
  useEffect(() => {
    loadSavedConfig();
  }, []);

  const loadSavedConfig = () => {
    // En React, no podemos usar localStorage directamente
    // En su lugar, simularemos datos guardados o usaremos estado persistente
    const savedConfig = {
      companyName: 'Mi Empresa S.A.S',
      taxId: '900123456-7',
      address: 'Calle 123 #45-67, Medellín',
      phone: '+57 4 123-4567',
      email: 'info@miempresa.com',
      tax: '19',
      invoiceFooter: 'Gracias por su compra. Términos y condiciones aplican.'
    };
    setConfig(savedConfig);
  };

  const handleInputChange = (field, value) => {
    setConfig(prev => ({
      ...prev,
      [field]: value
    }));

    // Limpiar errores cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: false
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validar campos requeridos
    const requiredFields = ['companyName', 'taxId', 'address', 'phone', 'email', 'tax'];
    
    requiredFields.forEach(field => {
      if (!config[field] || !config[field].trim()) {
        newErrors[field] = true;
        isValid = false;
      }
    });

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (config.email && !emailRegex.test(config.email)) {
      newErrors.email = true;
      isValid = false;
    }

    // Validar rango de impuesto
    if (config.tax && (config.tax < 0 || config.tax > 100)) {
      newErrors.tax = true;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      saveConfig();
      showNotification('success', 'Configuración guardada exitosamente');
    } else {
      showNotification('error', 'Error al guardar la configuración');
    }
  };

  const saveConfig = () => {
    // En un sistema real, aquí se enviaría la configuración al servidor
    console.log('Configuración guardada:', config);
    // localStorage.setItem('smartbill_config', JSON.stringify(config));
  };

  const handleReset = () => {
    setConfig({
      companyName: '',
      taxId: '',
      address: '',
      phone: '',
      email: '',
      tax: '',
      invoiceFooter: ''
    });
    setErrors({});
  };

  const showNotification = (type, message) => {
    setNotification({
      show: true,
      type,
      message
    });

    setTimeout(() => {
      setNotification({
        show: false,
        type: '',
        message: ''
      });
    }, 3000);
  };

  const getInputClassName = (field) => {
    const baseClass = "w-full px-4 py-3 border rounded transition-colors duration-300 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30";
    return errors[field] 
      ? `${baseClass} border-red-500 focus:border-red-500`
      : `${baseClass} border-gray-300 focus:border-blue-500`;
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
      {/* Header */}
      <header className="bg-blue-500 text-white py-5 mb-10 shadow-md">
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold">SmartBill</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-5">
        <div className="bg-white rounded-lg p-8 shadow-lg">
          <h1 className="text-blue-500 text-3xl font-bold mb-8 pb-4 border-b-2 border-blue-500">
            Configuración Global
          </h1>
          
          <div className="space-y-6">
            <div>
              <label className="block mb-2 font-semibold text-gray-800">
                Nombre de Empresa
              </label>
              <input
                type="text"
                value={config.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                placeholder="Ingrese el nombre de su empresa"
                className={getInputClassName('companyName')}
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-800">
                NIT / RUT
              </label>
              <input
                type="text"
                value={config.taxId}
                onChange={(e) => handleInputChange('taxId', e.target.value)}
                placeholder="Ingrese su NIT o RUT"
                className={getInputClassName('taxId')}
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-800">
                Dirección de Empresa
              </label>
              <input
                type="text"
                value={config.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Ingrese la dirección de su empresa"
                className={getInputClassName('address')}
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-800">
                Teléfono Empresa
              </label>
              <input
                type="tel"
                value={config.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Ingrese el teléfono de contacto"
                className={getInputClassName('phone')}
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-800">
                Correo Empresa
              </label>
              <input
                type="email"
                value={config.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Ingrese el correo electrónico"
                className={getInputClassName('email')}
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-800">
                IVA (Impuesto)
              </label>
              <div className="flex items-center">
                <input
                  type="number"
                  value={config.tax}
                  onChange={(e) => handleInputChange('tax', e.target.value)}
                  placeholder="19"
                  min="0"
                  max="100"
                  className={`${getInputClassName('tax')} w-32 mr-3`}
                />
                <span className="text-lg font-semibold">%</span>
              </div>
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-800">
                Pie de Página para Factura
              </label>
              <textarea
                value={config.invoiceFooter}
                onChange={(e) => handleInputChange('invoiceFooter', e.target.value)}
                placeholder="Ingrese el texto para el pie de página de sus facturas (términos y condiciones, notas, etc.)"
                className="w-full px-4 py-3 border border-gray-300 rounded transition-colors duration-300 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 focus:border-blue-500 resize-vertical min-h-24"
                rows="4"
              />
            </div>

            <div className="flex justify-end gap-4 pt-6">
              <button
                type="button"
                onClick={handleReset}
                className="bg-gray-500 text-white px-6 py-3 rounded transition-colors duration-300 text-base font-semibold hover:bg-gray-600"
              >
                Restablecer
              </button>
              <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-6 py-3 rounded transition-colors duration-300 text-base font-semibold hover:bg-blue-600"
              >
                Guardar Configuración
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-5 right-5 px-6 py-4 rounded font-semibold text-white z-50 shadow-lg ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`}>
          {notification.message}
        </div>
      )}

      {/* Responsive Styles for Mobile */}
      <style jsx>{`
        @media (max-width: 768px) {
          .max-w-6xl {
            padding: 0 15px;
          }
          
          .bg-white {
            padding: 20px;
          }
          
          .flex.justify-end {
            flex-direction: column;
          }
          
          .flex.justify-end button {
            width: 100%;
            margin-bottom: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default ConfigGlobal;