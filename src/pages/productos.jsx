import React, { useState } from 'react';
import { ShoppingCart, Search, Filter, Star, Plus, Minus, Grid, List, Heart, Eye } from 'lucide-react';

const Productos = () => {
  const [cart, setCart] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState(new Set());

  // Datos de ejemplo de productos
  const productos = [
    {
      id: 1,
      nombre: 'Laptop Dell Inspiron 15',
      precio: 2500000,
      categoria: 'electronica',
      descripcion: 'Laptop de alto rendimiento con procesador Intel i7 y 16GB RAM',
      imagen: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
      stock: 15,
      rating: 4.5,
      reviews: 128,
      tags: ['tecnologia', 'trabajo', 'estudiantes']
    },
    {
      id: 2,
      nombre: 'Silla Ergonómica Executive',
      precio: 450000,
      categoria: 'oficina',
      descripcion: 'Silla de oficina con soporte lumbar y ajuste de altura',
      imagen: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
      stock: 8,
      rating: 4.2,
      reviews: 89,
      tags: ['comodidad', 'oficina', 'ergonomia']
    },
    {
      id: 3,
      nombre: 'Smartphone Samsung Galaxy S23',
      precio: 3200000,
      categoria: 'electronica',
      descripcion: 'Smartphone de última generación con cámara de 50MP y 5G',
      imagen: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
      stock: 25,
      rating: 4.8,
      reviews: 256,
      tags: ['smartphone', '5g', 'camara']
    },
    {
      id: 4,
      nombre: 'Mesa de Escritorio Minimalista',
      precio: 350000,
      categoria: 'oficina',
      descripcion: 'Mesa de trabajo moderna con acabado en madera y estructura metálica',
      imagen: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
      stock: 12,
      rating: 4.3,
      reviews: 67,
      tags: ['minimalista', 'trabajo', 'diseño']
    },
    {
      id: 5,
      nombre: 'Audífonos Sony WH-1000XM4',
      precio: 890000,
      categoria: 'electronica',
      descripcion: 'Audífonos inalámbricos con cancelación de ruido activa',
      imagen: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
      stock: 20,
      rating: 4.7,
      reviews: 189,
      tags: ['audio', 'inalambrico', 'calidad']
    },
    {
      id: 6,
      nombre: 'Monitor 4K Ultra HD 27"',
      precio: 1200000,
      categoria: 'electronica',
      descripcion: 'Monitor profesional 4K con tecnología IPS y HDR10',
      imagen: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop',
      stock: 10,
      rating: 4.6,
      reviews: 94,
      tags: ['4k', 'profesional', 'diseño']
    }
  ];

  const categorias = [
    { id: 'all', nombre: 'Todos los Productos' },
    { id: 'electronica', nombre: 'Electrónicos' },
    { id: 'oficina', nombre: 'Oficina' }
  ];

  // Funciones del carrito
  const addToCart = (producto) => {
    const existingItem = cart.find(item => item.id === producto.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...producto, cantidad: 1 }]);
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      setCart(cart.filter(item => item.id !== productId));
    } else {
      setCart(cart.map(item =>
        item.id === productId
          ? { ...item, cantidad: newQuantity }
          : item
      ));
    }
  };

  const toggleFavorite = (productId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  // Filtrar y ordenar productos
  const filteredProducts = productos
    .filter(producto => {
      const matchesCategory = selectedCategory === 'all' || producto.categoria === selectedCategory;
      const matchesSearch = producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          producto.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.precio - b.precio;
        case 'price-high': return b.precio - a.precio;
        case 'rating': return b.rating - a.rating;
        default: return a.nombre.localeCompare(b.nombre);
      }
    });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const cartTotal = cart.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  const cartItemsCount = cart.reduce((total, item) => total + item.cantidad, 0);

  const StarRating = ({ rating, reviews }) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          className={star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
        />
      ))}
      <span className="text-sm text-gray-600 ml-1">({reviews})</span>
    </div>
  );

  const ProductCard = ({ producto }) => {
    const cartItem = cart.find(item => item.id === producto.id);
    const quantity = cartItem ? cartItem.cantidad : 0;
    const isFavorite = favorites.has(producto.id);

    return (
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
        <div className="relative">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <button
            onClick={() => toggleFavorite(producto.id)}
            className={`absolute top-3 right-3 p-2 rounded-full transition-all ${
              isFavorite 
                ? 'bg-red-500 text-white' 
                : 'bg-white text-gray-400 hover:text-red-500'
            }`}
          >
            <Heart size={20} className={isFavorite ? 'fill-current' : ''} />
          </button>
          <div className="absolute bottom-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
            Stock: {producto.stock}
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{producto.nombre}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{producto.descripcion}</p>
          
          <StarRating rating={producto.rating} reviews={producto.reviews} />
          
          <div className="flex flex-wrap gap-1 mt-2 mb-3">
            {producto.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs">
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex items-center justify-between mb-3">
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(producto.precio)}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {quantity > 0 ? (
              <div className="flex items-center gap-2 bg-blue-50 rounded-lg p-1">
                <button
                  onClick={() => updateQuantity(producto.id, quantity - 1)}
                  className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                >
                  <Minus size={16} />
                </button>
                <span className="px-2 font-semibold text-blue-600 min-w-[2rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => updateQuantity(producto.id, quantity + 1)}
                  className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                >
                  <Plus size={16} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => addToCart(producto)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex-1"
              >
                <ShoppingCart size={16} />
                Agregar
              </button>
            )}
            <button className="p-2 text-gray-400 hover:text-blue-600 border border-gray-200 rounded-lg hover:border-blue-200">
              <Eye size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Catálogo de Productos</h1>
            
            {/* Cart */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <ShoppingCart size={20} />
                  <span className="font-medium">Carrito</span>
                  {cartItemsCount > 0 && (
                    <span className="bg-blue-800 text-white rounded-full px-2 py-1 text-xs">
                      {cartItemsCount}
                    </span>
                  )}
                </button>
              </div>
              {cartTotal > 0 && (
                <div className="text-lg font-bold text-blue-600">
                  {formatCurrency(cartTotal)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        {/* Filters and Search */}
        <div className="bg-blue-50 rounded-2xl p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-600"
              >
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nombre}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-600"
              >
                <option value="name">Ordenar por Nombre</option>
                <option value="price-low">Precio: Menor a Mayor</option>
                <option value="price-high">Precio: Mayor a Menor</option>
                <option value="rating">Mejor Calificación</option>
              </select>

              {/* View Mode Toggle */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="text-gray-600 text-sm">
            Mostrando {filteredProducts.length} de {productos.length} productos
          </div>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {filteredProducts.map((producto) => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white rounded-xl p-12 shadow-sm">
              <Search className="mx-auto mb-4 text-gray-400" size={48} />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No se encontraron productos
              </h3>
              <p className="text-gray-600 mb-4">
                Prueba ajustando los filtros o términos de búsqueda
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Limpiar Filtros
              </button>
            </div>
          </div>
        )}

        {/* Cart Summary (Mobile) */}
        {cart.length > 0 && (
          <div className="fixed bottom-4 right-4 lg:hidden">
            <button className="bg-blue-600 text-white p-4 rounded-full shadow-lg">
              <ShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                {cartItemsCount}
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Productos;