import React, { useState } from 'react';
import { Search, Users, CreditCard, DollarSign, ShoppingCart, Edit, Trash2, ChevronLeft, ChevronRight, Plus, X, Save, Shield, User } from 'lucide-react';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('usuarios');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editingRole, setEditingRole] = useState(null);

  // Estados para formularios
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    role: 'Usuario',
    status: 'active'
  });

  const [roleForm, setRoleForm] = useState({
    name: '',
    permissions: {
      read: false,
      write: false,
      delete: false,
      admin: false
    }
  });

  // Datos simulados - usuarios
  const [users, setUsers] = useState([
    { id: 1, name: 'Juan Pérez', email: 'juan@email.com', role: 'Admin', status: 'active', avatar: 'JP' },
    { id: 2, name: 'María González', email: 'maria@email.com', role: 'Usuario', status: 'active', avatar: 'MG' },
    { id: 3, name: 'Carlos Rodríguez', email: 'carlos@email.com', role: 'Editor', status: 'inactive', avatar: 'CR' },
    { id: 4, name: 'Ana López', email: 'ana@email.com', role: 'Usuario', status: 'active', avatar: 'AL' },
    { id: 5, name: 'Pedro Martín', email: 'pedro@email.com', role: 'Usuario', status: 'pending', avatar: 'PM' },
  ]);

  // Datos simulados - roles y privilegios
  const [roles, setRoles] = useState([
    { id: 1, name: 'Admin', permissions: { read: true, write: true, delete: true, admin: true } },
    { id: 2, name: 'Editor', permissions: { read: true, write: true, delete: false, admin: false } },
    { id: 3, name: 'Usuario', permissions: { read: true, write: false, delete: false, admin: false } },
    { id: 4, name: 'Moderador', permissions: { read: true, write: true, delete: true, admin: false } }
  ]);

  const invoices = [
    { id: 1, number: 'FAC-001', client: 'Empresa ABC', amount: '$1,250.00', status: 'paid', date: '2025-01-10' },
    { id: 2, number: 'FAC-002', client: 'Company XYZ', amount: '$890.00', status: 'pending', date: '2025-01-09' },
    { id: 3, number: 'FAC-003', client: 'Corp 123', amount: '$2,100.00', status: 'paid', date: '2025-01-08' },
    { id: 4, number: 'FAC-004', client: 'Tech Solutions', amount: '$750.00', status: 'pending', date: '2025-01-07' },
  ];

  const stats = [
    { icon: Users, value: users.length.toString(), label: 'Usuarios Registrados' },
    { icon: CreditCard, value: '348', label: 'Facturas Totales' },
    { icon: DollarSign, value: '$45,289', label: 'Ingresos Mensuales' },
    { icon: ShoppingCart, value: '75', label: 'Facturas Pendientes' },
  ];

  const getStatusBadge = (status) => {
    const statusClasses = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-red-100 text-red-800',
      pending: 'bg-yellow-100 text-yellow-800',
      paid: 'bg-blue-100 text-blue-800'
    };
    
    const statusLabels = {
      active: 'Activo',
      inactive: 'Inactivo',
      pending: 'Pendiente',
      paid: 'Pagado'
    };

    return (
      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusClasses[status]}`}>
        {statusLabels[status]}
      </span>
    );
  };

  // Funciones para manejo de usuarios
  const handleCreateUser = () => {
    setEditingUser(null);
    setUserForm({ name: '', email: '', role: 'Usuario', status: 'active' });
    setShowUserModal(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setUserForm({ name: user.name, email: user.email, role: user.role, status: user.status });
    setShowUserModal(true);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleSaveUser = () => {
    if (!userForm.name || !userForm.email) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    if (editingUser) {
      setUsers(users.map(user => 
        user.id === editingUser.id 
          ? { ...user, ...userForm, avatar: generateAvatar(userForm.name) }
          : user
      ));
    } else {
      const newUser = {
        id: Math.max(...users.map(u => u.id)) + 1,
        ...userForm,
        avatar: generateAvatar(userForm.name)
      };
      setUsers([...users, newUser]);
    }
    setShowUserModal(false);
  };

  // Funciones para manejo de roles
  const handleEditRole = (role) => {
    setEditingRole(role);
    setRoleForm({ name: role.name, permissions: { ...role.permissions } });
    setShowRoleModal(true);
  };

  const handleSaveRole = () => {
    if (!roleForm.name) {
      alert('Por favor ingresa un nombre para el rol');
      return;
    }

    if (editingRole) {
      setRoles(roles.map(role => 
        role.id === editingRole.id 
          ? { ...role, name: roleForm.name, permissions: roleForm.permissions }
          : role
      ));
    } else {
      const newRole = {
        id: Math.max(...roles.map(r => r.id)) + 1,
        name: roleForm.name,
        permissions: roleForm.permissions
      };
      setRoles([...roles, newRole]);
    }
    setShowRoleModal(false);
  };

  const generateAvatar = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().substring(0, 2);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredInvoices = invoices.filter(invoice =>
    invoice.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
      <main className="p-6 lg:p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">Panel de Administración</h1>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
              A
            </div>
            <div className="text-gray-700">Admin</div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="flex justify-between items-center mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <IconComponent size={20} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2">{stat.value}</h3>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="border-b-2 border-gray-200 mb-6">
          <div className="flex space-x-8">
            {['usuarios', 'roles', 'facturas'].map((tab) => (
              <button
                key={tab}
                className={`py-3 px-1 font-medium text-sm transition-colors duration-300 relative ${
                  activeTab === tab
                    ? 'text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 -mb-0.5"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center p-6 border-b border-gray-200 gap-4">
            <h2 className="text-lg font-semibold">
              {activeTab === 'usuarios' && 'Listado de Usuarios'}
              {activeTab === 'roles' && 'Gestión de Roles'}
              {activeTab === 'facturas' && 'Listado de Facturas'}
            </h2>
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 w-full lg:w-auto">
              {(activeTab === 'usuarios' || activeTab === 'roles') && (
                <button
                  onClick={activeTab === 'usuarios' ? handleCreateUser : () => {
                    setEditingRole(null);
                    setRoleForm({ name: '', permissions: { read: false, write: false, delete: false, admin: false } });
                    setShowRoleModal(true);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
                >
                  <Plus size={16} />
                  {activeTab === 'usuarios' ? 'Nuevo Usuario' : 'Nuevo Rol'}
                </button>
              )}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder={`Buscar ${activeTab}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-300 w-64"
                />
              </div>
              {activeTab === 'facturas' && (
                <div className="flex items-center gap-3">
                  <label className="text-sm text-gray-600">Desde:</label>
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                  <label className="text-sm text-gray-600">Hasta:</label>
                  <input
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">
            {activeTab === 'usuarios' && (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Usuario</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Rol</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Estado</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-blue-50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                            {user.avatar}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.role}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(user.status)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditUser(user)}
                            className="w-8 h-8 bg-gray-100 hover:bg-green-500 hover:text-white rounded-lg flex items-center justify-center transition-colors duration-200"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="w-8 h-8 bg-gray-100 hover:bg-red-500 hover:text-white rounded-lg flex items-center justify-center transition-colors duration-200"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'roles' && (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Rol</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Permisos</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {roles.filter(role => role.name.toLowerCase().includes(searchTerm.toLowerCase())).map((role) => (
                    <tr key={role.id} className="hover:bg-blue-50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                            <Shield size={16} />
                          </div>
                          <div className="text-sm font-medium text-gray-900">{role.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-2 flex-wrap">
                          {role.permissions.read && (
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Lectura</span>
                          )}
                          {role.permissions.write && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Escritura</span>
                          )}
                          {role.permissions.delete && (
                            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Eliminar</span>
                          )}
                          {role.permissions.admin && (
                            <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Admin</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleEditRole(role)}
                          className="w-8 h-8 bg-gray-100 hover:bg-green-500 hover:text-white rounded-lg flex items-center justify-center transition-colors duration-200"
                        >
                          <Edit size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'facturas' && (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Número</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Cliente</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Monto</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Estado</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Fecha</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredInvoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-blue-50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{invoice.number}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{invoice.client}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{invoice.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(invoice.status)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center px-6 py-4 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              Mostrando 1-{
                activeTab === 'usuarios' ? filteredUsers.length : 
                activeTab === 'roles' ? roles.length : 
                filteredInvoices.length
              } de{' '}
              {
                activeTab === 'usuarios' ? filteredUsers.length : 
                activeTab === 'roles' ? roles.length : 
                filteredInvoices.length
              }{' '}
              {activeTab}
            </div>
            <div className="flex items-center gap-2">
              <button
                disabled
                className="w-9 h-9 rounded-lg border border-gray-300 bg-white text-gray-400 flex items-center justify-center cursor-not-allowed opacity-50"
              >
                <ChevronLeft size={16} />
              </button>
              <button className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-medium">
                1
              </button>
              <button className="w-9 h-9 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 flex items-center justify-center transition-colors duration-200">
                2
              </button>
              <button className="w-9 h-9 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 flex items-center justify-center transition-colors duration-200">
                3
              </button>
              <button className="w-9 h-9 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 flex items-center justify-center transition-colors duration-200">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Modal para Usuario */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">
                {editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}
              </h3>
              <button
                onClick={() => setShowUserModal(false)}
                className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors duration-200"
              >
                <X size={16} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                <input
                  type="text"
                  value={userForm.name}
                  onChange={(e) => setUserForm({...userForm, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Ingrese el nombre completo"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={userForm.email}
                  onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="usuario@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rol</label>
                <select
                  value={userForm.role}
                  onChange={(e) => setUserForm({...userForm, role: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  {roles.map(role => (
                    <option key={role.id} value={role.name}>{role.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                <select
                  value={userForm.status}
                  onChange={(e) => setUserForm({...userForm, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="active">Activo</option>
                  <option value="inactive">Inactivo</option>
                  <option value="pending">Pendiente</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowUserModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveUser}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 transition-colors duration-200"
              >
                <Save size={16} />
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para Rol */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">
                {editingRole ? 'Editar Rol' : 'Nuevo Rol'}
              </h3>
              <button
                onClick={() => setShowRoleModal(false)}
                className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors duration-200"
              >
                <X size={16} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Rol</label>
                <input
                  type="text"
                  value={roleForm.name}
                  onChange={(e) => setRoleForm({...roleForm, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Ej: Supervisor, Auditor, etc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Permisos</label>
                <div className="space-y-3">
                  {[
                    { key: 'read', label: 'Lectura', desc: 'Puede ver información' },
                    { key: 'write', label: 'Escritura', desc: 'Puede crear y editar' },
                    { key: 'delete', label: 'Eliminar', desc: 'Puede eliminar registros' },
                    { key: 'admin', label: 'Administrador', desc: 'Acceso completo al sistema' }
                  ].map(perm => (
                    <label key={perm.key} className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={roleForm.permissions[perm.key]}
                        onChange={(e) => setRoleForm({
                          ...roleForm,
                          permissions: { ...roleForm.permissions, [perm.key]: e.target.checked }
                        })}
                        className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{perm.label}</div>
                        <div className="text-xs text-gray-500">{perm.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowRoleModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveRole}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 transition-colors duration-200"
              >
                <Save size={16} />
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;