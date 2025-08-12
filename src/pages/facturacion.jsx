import React, { useState, useEffect } from 'react';

const NuevaFactura = () => {
  const [cliente, setCliente] = useState('');
  const [facturaNum] = useState('FAC-2025-0001');
  const [items, setItems] = useState([
    { id: 1, codigo: 'PROD-001', descripcion: 'Monitor LED 24 pulgadas', cantidad: 2, precio: 150.00 },
    { id: 2, codigo: 'PROD-002', descripcion: 'Teclado Mecánico RGB', cantidad: 1, precio: 80.00 }
  ]);
  
  const [newItem, setNewItem] = useState({ codigo: '', descripcion: '', cantidad: '', precio: '' });
  const [totales, setTotales] = useState({ subtotal: 0, iva: 0, total: 0 });

  const clientes = [
    { value: '', text: 'Seleccionar cliente' },
    { value: '1', text: 'Juan Pérez' },
    { value: '2', text: 'María González' },
    { value: '3', text: 'Carlos Rodríguez' }
  ];


  useEffect(() => {
    const subtotal = items.reduce((sum, item) => sum + (item.cantidad * item.precio), 0);
    const iva = subtotal * 0.16;
    const total = subtotal + iva;
    setTotales({ subtotal, iva, total });
  }, [items]);

  const handleInputChange = (field, value) => {
    setNewItem(prev => ({ ...prev, [field]: value }));
  };

  const agregarItem = () => {
    const { codigo, descripcion, cantidad, precio } = newItem;
    if (codigo && descripcion && cantidad && precio) {
      const nuevoItem = {
        id: Date.now(),
        codigo,
        descripcion,
        cantidad: parseFloat(cantidad),
        precio: parseFloat(precio)
      };
      setItems(prev => [...prev, nuevoItem]);
      setNewItem({ codigo: '', descripcion: '', cantidad: '', precio: '' });
    }
  };

  const eliminarItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const editarItem = (id) => {
    const item = items.find(item => item.id === id);
    if (item) {
      setNewItem({
        codigo: item.codigo,
        descripcion: item.descripcion,
        cantidad: item.cantidad.toString(),
        precio: item.precio.toString()
      });
      eliminarItem(id);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      

      {/* Content */}
      <div className="flex-1 p-5">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl font-bold">Nueva Factura</h1>
          <span>Fecha: {new Date().toLocaleDateString()}</span>
        </div>

        <div className="bg-white rounded-lg p-5 shadow-md">
          <div className="flex justify-between mb-5 gap-4">
            <div className="flex-1">
              <label className="block mb-2 font-medium">Cliente:</label>
              <select value={cliente} onChange={(e) => setCliente(e.target.value)} className="w-full p-2 border border-gray-300 rounded">
                {clientes.map(cliente => (
                  <option key={cliente.value} value={cliente.value}>{cliente.text}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block mb-2 font-medium">Número de Factura:</label>
              <input type="text" value={facturaNum} readOnly className="w-full p-2 border border-gray-300 rounded bg-gray-100" />
            </div>
          </div>

          <h3 className="text-lg font-semibold mb-4">Artículos</h3>
          <div className="flex gap-3 mb-4">
            <input type="text" placeholder="Código" value={newItem.codigo} onChange={(e) => handleInputChange('codigo', e.target.value)} className="w-32 p-2 border border-gray-300 rounded" />
            <input type="text" placeholder="Descripción" value={newItem.descripcion} onChange={(e) => handleInputChange('descripcion', e.target.value)} className="flex-1 p-2 border border-gray-300 rounded" />
            <input type="number" placeholder="Cantidad" value={newItem.cantidad} onChange={(e) => handleInputChange('cantidad', e.target.value)} className="w-24 p-2 border border-gray-300 rounded" />
            <input type="number" step="0.01" placeholder="Precio" value={newItem.precio} onChange={(e) => handleInputChange('precio', e.target.value)} className="w-28 p-2 border border-gray-300 rounded" />
            <button onClick={agregarItem} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors flex items-center">
              <i className="fas fa-plus mr-2"></i>Agregar
            </button>
          </div>

          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="text-left p-3">Código</th>
                <th className="text-left p-3">Descripción</th>
                <th className="text-left p-3">Cantidad</th>
                <th className="text-left p-3">Precio Unit.</th>
                <th className="text-left p-3">Subtotal</th>
                <th className="text-left p-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id} className="border-b border-gray-200">
                  <td className="p-3">{item.codigo}</td>
                  <td className="p-3">{item.descripcion}</td>
                  <td className="p-3">{item.cantidad}</td>
                  <td className="p-3">${item.precio.toFixed(2)}</td>
                  <td className="p-3">${(item.cantidad * item.precio).toFixed(2)}</td>
                  <td className="p-3">
                    <button onClick={() => editarItem(item.id)} className="bg-orange-500 text-white px-2 py-1 rounded text-xs mr-2 hover:bg-orange-600 transition-colors">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button onClick={() => eliminarItem(item.id)} className="bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700 transition-colors">
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-5 text-right">
            <div className="mb-2">Subtotal: ${totales.subtotal.toFixed(2)}</div>
            <div className="mb-2">IVA (16%): ${totales.iva.toFixed(2)}</div>
            <div className="text-lg font-bold">Total: ${totales.total.toFixed(2)}</div>
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors flex items-center">
              <i className="fas fa-save mr-2"></i>Guardar
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors flex items-center">
              <i className="fas fa-print mr-2"></i>Imprimir
            </button>
            <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors flex items-center">
              <i className="fas fa-times mr-2"></i>Cancelar
            </button>
          </div>
        </div>
      </div>

      {/* FontAwesome CDN */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
    </div>
  );
};

export default NuevaFactura;
