import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/mainlayouts";
import NuevaFactura from "./pages/facturacion";
import LoginPage from "./pages/login";
import ConfigGlobal from "./pages/configGlobal";
import Admin from "./pages/admin";
import ReporteFacturas from "./pages/reporteFacturas";
import Productos from "./pages/productos";

export default function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<NuevaFactura />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/configuracion" element={<ConfigGlobal />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/reporteFacturas" element={<ReporteFacturas />} /> 
          <Route path="/productos" element={<Productos />} /> 
        </Routes>
      </MainLayout>
    </Router>
  );
}
