import { useState, useEffect } from 'react';
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/v1', 
});

const ProductForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [products, setProducts] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  // Fetch subcategories
  const fetchSubcategories = async () => {
    try {
      const res = await API.get('/getsubcategory');
      console.log('Fetched subcategories:', res.data);
      setSubcategories(res.data);
    } catch (error) {
      console.error('Failed to fetch subcategories:', error.response?.data || error.message);
    }
  };

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await API.get('/getproduct');
      setProducts(res.data);
    } catch (error) {
      console.error('Failed to fetch products:', error.response?.data || error.message);
    }
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !price || !subcategory) return;

    try {
      await API.post('/createproduct', {
        name,
        price,
        subcategory,
      });
      setName('');
      setPrice('');
      setSubcategory('');
      fetchProducts();
    } catch (error) {
      console.error('Failed to add product:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchSubcategories();
    fetchProducts();
  }, []);

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Create Product</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-6">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product name"
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <select
          value={subcategory}
          onChange={(e) => setSubcategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Select Subcategory</option>
          {subcategories.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name} {s.category ? `(${s.category.name})` : ''}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
          Add
        </button>
      </form>

      <ul className="space-y-2">
        {products.map((p) => (
          <li
            key={p._id}
            className="px-4 py-2 bg-gray-100 rounded-md shadow-sm text-gray-700"
          >
            <div className="font-semibold">{p.name}</div>
            <div className="text-sm text-gray-500">
              ${p.price} — {p.subcategory?.name} / {p.subcategory?.category?.name}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductForm;
