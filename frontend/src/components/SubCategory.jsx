import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/v1', 
});

const SubcategoryForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);

  
  const fetchCategories = async () => {
    try {
      const res = await API.get('/get'); 
      setCategories(res.data);
    } catch (error) {
      console.error('Failed to fetch categories', error);
    }
  };

  
  const fetchSubcategories = async () => {
    try {
      const res = await API.get('/getcategory');
      setSubcategories(res.data);
    } catch (error) {
      console.error('Failed to fetch subcategories', error);
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !category) return;

    try {
      await API.post('/subcategories', { name, category }); 
      setName('');
      setCategory('');
      fetchSubcategories();
      navigate('/products'); 
    } catch (error) {
      console.error('Failed to add subcategory', error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
  }, []);

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Create Subcategory</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-6">
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Subcategory name"
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Select Category</option>
          {categories.map(c => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>

        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
        >
          Add
        </button>
      </form>

      <ul className="space-y-2">
        {subcategories.map(s => (
          <li
            key={s._id}
            className="px-4 py-2 bg-gray-100 rounded-md shadow-sm text-gray-700"
          >
            {s.name} <span className="text-sm text-gray-500">(Category: {s.category?.name})</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubcategoryForm;
