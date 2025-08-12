import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState("nueva-factura");

  const menuItems = [
     { id: "admin", icon: "fa-solid fa-user-tie", text: "Administracion", path: "/admin" },
    { id: "nueva-factura", icon: "fas fa-file-invoice", text: "Nueva Factura", path: "/" },
    { id: "administrar-facturas", icon: "fas fa-file-invoice-dollar", text: "Administrar Facturas", path: "/administrar-facturas" },
    { id: "reportes", icon: "fas fa-chart-bar", text: "Reportes de Facturas", path: "/reportes" },
    { id: "productos", icon: "fas fa-box", text: "Productos", path: "/productos" },
    { id: "clientes", icon: "fas fa-users", text: "Clientes", path: "/clientes" },
    { id: "usuarios", icon: "fas fa-user-shield", text: "Usuarios", path: "/usuarios" },
    { id: "configuracion", icon: "fas fa-cog", text: "Configuración", path: "/configuracion" },
    { id: "salir", icon: "fas fa-sign-out-alt", text: "Salir", path: "/login" }
  ];

  return (
    <div className="w-64 bg-slate-800 text-white">
      <div className="p-5 border-b border-slate-700 text-center">
        <h2 className="text-blue-400 text-xl font-bold">SmartBill</h2>
        <p className="text-sm text-gray-300">Sistema de Facturación</p>
      </div>

      <div className="mt-5">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            onClick={() => setActiveMenu(item.id)}
            className={`flex items-center px-5 py-4 transition-all hover:bg-slate-700 ${
              activeMenu === item.id ? "bg-blue-600" : ""
            }`}
          >
            <i className={`${item.icon} mr-3 text-lg`}></i>
            <span>{item.text}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
