import React, { useState } from 'react';
import { FileText, Globe, User, TrendingUp, DollarSign, Calendar, Download, Filter, Search } from 'lucide-react';

const ReporteFacturas = () => {
  const [activeTab, setActiveTab] = useState('facturas');

  // Datos de ejemplo
  const facturas = [
    { id: 'F001', cliente: 'Empresa A', monto: 1250000, fecha: '2024-08-10', estado: 'Pagada' },
    { id: 'F002', cliente: 'Empresa B', monto: 850000, fecha: '2024-08-09', estado: 'Pendiente' },
    { id: 'F003', cliente: 'Empresa C', monto: 2100000, fecha: '2024-08-08', estado: 'Vencida' },
    { id: 'F004', cliente: 'Empresa D', monto: 950000, fecha: '2024-08-07', estado: 'Pagada' },
  ];

  const facturasGlobales = [
    { mes: 'Agosto 2024', total: 5150000, cantidad: 12, promedio: 429167 },
    { mes: 'Julio 2024', total: 4850000, cantidad: 15, promedio: 323333 },
    { mes: 'Junio 2024', total: 6200000, cantidad: 18, promedio: 344444 },
    { mes: 'Mayo 2024', total: 3950000, cantidad: 10, promedio: 395000 },
  ];

  const perfilData = {
    nombre: 'Juan Pérez',
    empresa: 'Mi Empresa SAS',
    email: 'juan@miempresa.com',
    telefono: '+57 300 123 4567',
    totalFacturado: 15200000,
    facturasEmitidas: 45,
    clientesActivos: 12
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Pagada': return 'bg-green-100 text-green-800';
      case 'Pendiente': return 'bg-yellow-100 text-yellow-800';
      case 'Vencida': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const TabButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
        activeTab === id
          ? 'bg-blue-600 text-white shadow-md'
          : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
      }`}
    >
      <Icon size={20} />
      {label}
    </button>
  );

  const StatCard = ({ title, value, icon: Icon, subtitle }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && <p className="text-gray-400 text-sm mt-1">{subtitle}</p>}
        </div>
        <div className="bg-blue-50 p-3 rounded-lg">
          <Icon className="text-blue-600" size={24} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard de Facturas</h1>
          <p className="text-blue-100">Gestiona y monitorea todas tus facturas desde un solo lugar</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-6">
          <TabButton id="facturas" label="Facturas" icon={FileText} />
          <TabButton id="globales" label="Reportes Globales" icon={Globe} />
          <TabButton id="perfil" label="Mi Perfil" icon={User} />
        </div>

        {/* Content Container */}
        <div className="bg-blue-50 rounded-2xl p-6 min-h-[600px]">
          {/* Facturas Tab */}
          {activeTab === 'facturas' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Mis Facturas</h2>
                <div className="flex gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Buscar facturas..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                    />
                  </div>
                  <button className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50">
                    <Filter size={20} />
                    Filtrar
                  </button>
                  <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    <Download size={20} />
                    Exportar
                  </button>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <StatCard
                  title="Total Facturado"
                  value={formatCurrency(5150000)}
                  icon={DollarSign}
                  subtitle="Este mes"
                />
                <StatCard
                  title="Facturas Emitidas"
                  value="12"
                  icon={FileText}
                  subtitle="En agosto 2024"
                />
                <StatCard
                  title="Pendientes de Pago"
                  value="3"
                  icon={TrendingUp}
                  subtitle="Requieren seguimiento"
                />
              </div>

              {/* Facturas Table */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Factura</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Cliente</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Monto</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Fecha</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Estado</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {facturas.map((factura) => (
                        <tr key={factura.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{factura.id}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{factura.cliente}</td>
                          <td className="px-6 py-4 text-sm font-semibold text-gray-900">{formatCurrency(factura.monto)}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{factura.fecha}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEstadoColor(factura.estado)}`}>
                              {factura.estado}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                              Ver detalles
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Globales Tab */}
          {activeTab === 'globales' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Reportes Globales</h2>
                <div className="flex gap-3">
                  <select className="border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-600">
                    <option>Últimos 6 meses</option>
                    <option>Este año</option>
                    <option>Año anterior</option>
                  </select>
                  <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    <Download size={20} />
                    Generar Reporte
                  </button>
                </div>
              </div>

              {/* Global Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <StatCard
                  title="Ingresos Totales"
                  value={formatCurrency(20150000)}
                  icon={DollarSign}
                  subtitle="Últimos 4 meses"
                />
                <StatCard
                  title="Total Facturas"
                  value="55"
                  icon={FileText}
                  subtitle="Emitidas"
                />
                <StatCard
                  title="Promedio Mensual"
                  value={formatCurrency(5037500)}
                  icon={TrendingUp}
                  subtitle="Por mes"
                />
                <StatCard
                  title="Clientes Únicos"
                  value="18"
                  icon={User}
                  subtitle="Diferentes"
                />
              </div>

              {/* Monthly Report Table */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b bg-gray-50">
                  <h3 className="text-lg font-semibold text-gray-900">Resumen Mensual</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Período</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Total Facturado</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Cantidad</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Promedio</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Crecimiento</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {facturasGlobales.map((periodo, index) => (
                        <tr key={periodo.mes} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{periodo.mes}</td>
                          <td className="px-6 py-4 text-sm font-semibold text-gray-900">{formatCurrency(periodo.total)}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{periodo.cantidad} facturas</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{formatCurrency(periodo.promedio)}</td>
                          <td className="px-6 py-4">
                            <span className={`text-sm font-medium ${index === 0 ? 'text-green-600' : 'text-gray-600'}`}>
                              {index === 0 ? '+6.2%' : index === 1 ? '-21.8%' : '+57.0%'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Perfil Tab */}
          {activeTab === 'perfil' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Mi Perfil</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Editar Perfil
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Info */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Información Personal</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
                        <input
                          type="text"
                          value={perfilData.nombre}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                          readOnly
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Empresa</label>
                        <input
                          type="text"
                          value={perfilData.empresa}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                          readOnly
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          value={perfilData.email}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                          readOnly
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                        <input
                          type="tel"
                          value={perfilData.telefono}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Profile Stats */}
                <div className="space-y-6">
                  <StatCard
                    title="Total Facturado"
                    value={formatCurrency(perfilData.totalFacturado)}
                    icon={DollarSign}
                    subtitle="Histórico"
                  />
                  
                  <StatCard
                    title="Facturas Emitidas"
                    value={perfilData.facturasEmitidas.toString()}
                    icon={FileText}
                    subtitle="Total"
                  />
                  
                  <StatCard
                    title="Clientes Activos"
                    value={perfilData.clientesActivos.toString()}
                    icon={User}
                    subtitle="Actualmente"
                  />
                </div>
              </div>

              {/* Recent Activity */}
              <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Actividad Reciente</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <FileText className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Factura F004 creada</p>
                      <p className="text-sm text-gray-500">Hace 2 días</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <DollarSign className="text-green-600" size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Pago recibido - F001</p>
                      <p className="text-sm text-gray-500">Hace 3 días</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="bg-yellow-100 p-2 rounded-lg">
                      <Calendar className="text-yellow-600" size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Recordatorio: F002 vence mañana</p>
                      <p className="text-sm text-gray-500">Hace 1 día</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReporteFacturas;