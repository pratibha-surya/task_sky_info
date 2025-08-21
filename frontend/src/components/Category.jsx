import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
});

const CategoryForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await API.get('/get');
      setCategories(res.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
      toast.error('Failed to load categories');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.error('Category name is required');

    try {
      setLoading(true);
      await API.post('/createcategory', { name });
      toast.success('Category added successfully!');
      setName('');
      fetchCategories();
      navigate('/subcategories');
    } catch (err) {
      console.error('Error adding category:', err);
      toast.error('Failed to add category');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 p-4">
    
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            borderRadius: '8px',
            padding: '14px 20px',
            fontSize: '0.875rem',
            background: '#eff6ff',
            color: '#1e3a8a',
          },
          success: {
            style: {
              background: '#dcfce7',
              color: '#166534',
              border: '1px solid #10b981',
            },
          },
          error: {
            style: {
              background: '#fee2e2',
              color: '#991b1b',
              border: '1px solid #f87171',
            },
          },
        }}
      />

      
      <div className="w-full max-w-md p-8 bg-white center shadow-2xl rounded-2xl border border-blue-200">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-700">
          Create a New Category
        </h2>

       
        <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-6">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter category name"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 text-white rounded-md transition duration-300 ${
              loading
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Adding...' : 'Add'}
          </button>
        </form>

        
        <ul className="space-y-2 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 pr-1">
          {categories.map((c) => (
            <li
              key={c._id}
              className="px-4 py-2 bg-gray-100 rounded-md shadow-sm text-gray-700"
            >
              {c.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryForm;
