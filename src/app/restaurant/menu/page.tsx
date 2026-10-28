'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Utensils, ToggleLeft, ToggleRight } from 'lucide-react';
import { getRestaurantMenuForOwner, createCategory, createMenuItem, toggleItemAvailability } from '@/features/restaurants/restaurant-menu-service';
import { ProtectedRoute } from '@/lib/authorization/protected-route';

export default function RestaurantMenuPage() {
  const [restaurant, setRestaurant] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const [newItemDesc, setNewItemDesc] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [showItemForm, setShowItemForm] = useState(false);

  const loadMenu = async () => {
    try {
      const data = await getRestaurantMenuForOwner();
      setRestaurant(data.restaurant);
      setCategories(data.categories);
      if (data.categories.length > 0 && !selectedCategoryId) {
        setSelectedCategoryId(data.categories[0].id);
      }
    } catch (err) {
      console.error('Failed to load menu:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMenu();
  }, []);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim() || !restaurant) return;
    try {
      await createCategory(restaurant.id, newCategoryName.trim());
      setNewCategoryName('');
      await loadMenu();
    } catch (err: any) {
      alert(err.message || 'Failed to create category');
    }
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim() || !newItemPrice || !selectedCategoryId || !restaurant) return;
    try {
      await createMenuItem({
        restaurant_id: restaurant.id,
        category_id: selectedCategoryId,
        name: newItemName.trim(),
        description: newItemDesc.trim() || undefined,
        price_pkr: parseFloat(newItemPrice),
        is_available: true,
      });
      setNewItemName('');
      setNewItemDesc('');
      setNewItemPrice('');
      setShowItemForm(false);
      await loadMenu();
    } catch (err: any) {
      alert(err.message || 'Failed to create menu item');
    }
  };

  const handleToggle = async (itemId: string, currentStatus: boolean) => {
    try {
      await toggleItemAvailability(itemId, !currentStatus);
      await loadMenu();
    } catch (err: any) {
      alert(err.message || 'Failed to toggle availability');
    }
  };

  return (
    <ProtectedRoute requiredRoles={['restaurant_owner']}>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link
              href="/restaurant/dashboard"
              className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-red-600"
            >
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              Back to Dashboard
            </Link>
            <span className="font-bold text-lg text-gray-900">Menu Management</span>
            <div className="w-20" />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
          {loading ? (
            <div className="py-12 text-center text-gray-500 text-sm">Loading menu...</div>
          ) : !restaurant ? (
            <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
              <p className="text-gray-500 text-sm">No restaurant found for this account.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Add Category & Item Forms */}
              <div className="lg:col-span-1 space-y-6">
                {/* Add Category Form */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
                  <h3 className="font-bold text-gray-900 text-base border-b border-gray-100 pb-3">Add Category</h3>
                  <form onSubmit={handleAddCategory} className="space-y-3">
                    <input
                      type="text"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      placeholder="Category name (e.g. Burgers)"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <button
                      type="submit"
                      className="w-full bg-gray-900 hover:bg-black text-white py-2.5 rounded-lg text-xs font-semibold transition"
                    >
                      Add Category
                    </button>
                  </form>
                </div>

                {/* Add Menu Item Form */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
                  <h3 className="font-bold text-gray-900 text-base border-b border-gray-100 pb-3">Add Menu Item</h3>
                  {categories.length === 0 ? (
                    <p className="text-xs text-gray-500">Please create a category first.</p>
                  ) : (
                    <form onSubmit={handleAddItem} className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
                        <select
                          value={selectedCategoryId}
                          onChange={(e) => setSelectedCategoryId(e.target.value)}
                          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          {categories.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Item Name</label>
                        <input
                          type="text"
                          value={newItemName}
                          onChange={(e) => setNewItemName(e.target.value)}
                          placeholder="e.g. Zinger Burger"
                          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                          value={newItemDesc}
                          onChange={(e) => setNewItemDesc(e.target.value)}
                          placeholder="Ingredients & details..."
                          rows={2}
                          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Price (PKR)</label>
                        <input
                          type="number"
                          value={newItemPrice}
                          onChange={(e) => setNewItemPrice(e.target.value)}
                          placeholder="450"
                          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg text-xs font-semibold transition shadow-sm"
                      >
                        Add Item
                      </button>
                    </form>
                  )}
                </div>
              </div>

              {/* Right Column: Menu Categories & Items List */}
              <div className="lg:col-span-2 space-y-6">
                {categories.length === 0 ? (
                  <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-500 text-sm">
                    No categories created yet. Use the left panel to add categories and menu items.
                  </div>
                ) : (
                  categories.map((category) => (
                    <div key={category.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-4">
                      <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                        <h3 className="font-bold text-gray-900 text-lg flex items-center space-x-2">
                          <Utensils className="w-5 h-5 text-red-600" />
                          <span>{category.name}</span>
                        </h3>
                        <span className="text-xs bg-gray-100 px-2.5 py-1 rounded-full text-gray-600 font-medium">
                          {category.menu_items?.length || 0} items
                        </span>
                      </div>

                      <div className="divide-y divide-gray-100">
                        {category.menu_items?.length === 0 ? (
                          <p className="text-xs text-gray-400 py-4 text-center">No items in this category.</p>
                        ) : (
                          category.menu_items?.map((item: any) => (
                            <div key={item.id} className="py-3 flex items-center justify-between">
                              <div>
                                <h4 className="font-semibold text-gray-900 text-sm">{item.name}</h4>
                                <p className="text-xs text-gray-500 line-clamp-1">{item.description}</p>
                                <span className="text-xs font-bold text-red-600">
                                  Rs. {item.price_pkr.toLocaleString()}
                                </span>
                              </div>
                              <div className="flex items-center space-x-4">
                                <span
                                  className={`text-xs px-2 py-0.5 rounded font-medium ${
                                    item.is_available ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                                  }`}
                                >
                                  {item.is_available ? 'Available' : 'Sold Out'}
                                </span>
                                <button
                                  onClick={() => handleToggle(item.id, item.is_available)}
                                  className="text-gray-600 hover:text-red-600 transition"
                                  title="Toggle Availability"
                                >
                                  {item.is_available ? (
                                    <ToggleRight className="w-6 h-6 text-green-600" />
                                  ) : (
                                    <ToggleLeft className="w-6 h-6 text-gray-400" />
                                  )}
                                </button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
