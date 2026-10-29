import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home.jsx';
import Product from './pages/Product.jsx';
import { products } from './products/index.js';
import './index.css';

// Each HTML entry names its page on the root element
const root = document.getElementById('root');
const product = products.find((p) => p.key === root.dataset.page);

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    {product ? <Product product={product} /> : <Home />}
  </React.StrictMode>
);
