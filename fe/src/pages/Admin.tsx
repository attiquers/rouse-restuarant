import React, { useState, useEffect } from "react";

interface Item {
  _id: string;
  name: string;
  price: string;
}

interface Category {
  _id: string;
  category: string;
  icon: string;
  items: Item[];
}

const App: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
    null
  );
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [categoryEditValue, setCategoryEditValue] = useState("");
  const [itemEditName, setItemEditName] = useState("");
  const [itemEditPrice, setItemEditPrice] = useState("");

  const BACKEND_URI = "http://localhost:5000";

  // Fetch categories from the server
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${BACKEND_URI}/api/menu`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [BACKEND_URI]);

  const addCategory = async () => {
    if (newCategory.trim()) {
      try {
        const response = await fetch(`${BACKEND_URI}/api/menu`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            category: newCategory,
            icon: "default-icon",
            items: [],
          }),
        });
        if (!response.ok) throw new Error("Network response was not ok");
        const newCategoryData = await response.json();
        setCategories([...categories, newCategoryData]);
        setNewCategory("");
      } catch (error) {
        console.error("Error adding category:", error);
      }
    }
  };

  const addItem = async () => {
    if (selectedCategory && newItemName.trim() && newItemPrice.trim()) {
      try {
        const response = await fetch(
          `${BACKEND_URI}/api/menu/${selectedCategory}/items`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: newItemName,
              price: newItemPrice,
            }),
          }
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const updatedCategory = await response.json();
        setCategories(
          categories.map((cat) =>
            cat._id === updatedCategory._id ? updatedCategory : cat
          )
        );
        setNewItemName("");
        setNewItemPrice("");
      } catch (error) {
        console.error("Error adding item:", error);
      }
    }
  };

  const deleteCategory = async (categoryId: string) => {
    // Placeholder for delete API call
    setCategories(categories.filter((category) => category._id !== categoryId));
  };

  const deleteItem = async (categoryId: string, itemId: string) => {
    // Placeholder for delete API call
    setCategories(
      categories.map((category) =>
        category._id === categoryId
          ? {
              ...category,
              items: category.items.filter((item) => item._id !== itemId),
            }
          : category
      )
    );
  };

  const startEditCategory = (category: Category) => {
    setEditingCategoryId(category._id);
    setCategoryEditValue(category.category);
  };

  const saveCategoryEdit = async (categoryId: string) => {
    // Placeholder for edit API call
    setCategories(
      categories.map((category) =>
        category._id === categoryId
          ? { ...category, category: categoryEditValue }
          : category
      )
    );
    setEditingCategoryId(null);
  };

  const startEditItem = (categoryId: string, item: Item) => {
    setEditingItemId(item._id);
    setItemEditName(item.name);
    setItemEditPrice(item.price);
  };

  const saveItemEdit = async (categoryId: string, itemId: string) => {
    // Placeholder for edit API call
    setCategories(
      categories.map((category) =>
        category._id === categoryId
          ? {
              ...category,
              items: category.items.map((item) =>
                item._id === itemId
                  ? { ...item, name: itemEditName, price: itemEditPrice }
                  : item
              ),
            }
          : category
      )
    );
    setEditingItemId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Category and Item Manager
      </h1>

      {/* Add Category Section */}
      <div className="mb-8 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Add Category
        </h2>
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Category name"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        />
        <button
          onClick={addCategory}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Add Category
        </button>
      </div>

      {/* Add Item Section */}
      <div className="mb-8 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Add Item</h2>
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory || ""}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        >
          <option value="" disabled>
            Select Category
          </option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.category}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="Item name"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        />
        <input
          type="text"
          value={newItemPrice}
          onChange={(e) => setNewItemPrice(e.target.value)}
          placeholder="Item price"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        />
        <button
          onClick={addItem}
          disabled={!selectedCategory}
          className={`w-full py-2 rounded-lg ${
            !selectedCategory ? "bg-gray-400" : "bg-green-500"
          } text-white hover:${
            !selectedCategory ? "bg-gray-400" : "bg-green-600"
          }`}
        >
          Add Item
        </button>
      </div>

      {/* Category and Item List Section */}
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Categories and Items
        </h2>
        <ul>
          {categories.map((cat) => (
            <li key={cat._id} className="mb-4">
              {editingCategoryId === cat._id ? (
                <div>
                  <input
                    type="text"
                    value={categoryEditValue}
                    onChange={(e) => setCategoryEditValue(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                  />
                  <button
                    onClick={() => saveCategoryEdit(cat._id)}
                    className="mr-2 bg-blue-500 text-white py-1 px-4 rounded-lg"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingCategoryId(null)}
                    className="bg-gray-500 text-white py-1 px-4 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {cat.category}
                  </h3>
                  <div>
                    <button
                      onClick={() => startEditCategory(cat)}
                      className="mr-2 bg-yellow-500 text-white py-1 px-4 rounded-lg"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteCategory(cat._id)}
                      className="bg-red-500 text-white py-1 px-4 rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}

              <ul className="ml-4 mt-2">
                {cat.items.map((item) => (
                  <li
                    key={item._id}
                    className="mb-2 flex justify-between items-center"
                  >
                    {editingItemId === item._id ? (
                      <div>
                        <input
                          type="text"
                          value={itemEditName}
                          onChange={(e) => setItemEditName(e.target.value)}
                          className="p-2 border border-gray-300 rounded-lg mr-2"
                        />
                        <input
                          type="text"
                          value={itemEditPrice}
                          onChange={(e) => setItemEditPrice(e.target.value)}
                          className="p-2 border border-gray-300 rounded-lg mr-2"
                        />
                        <button
                          onClick={() => saveItemEdit(cat._id, item._id)}
                          className="bg-blue-500 text-white py-1 px-4 rounded-lg"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-between w-full">
                        <div className="flex-1">
                          {item.name} - ${item.price}
                        </div>
                        <div>
                          <button
                            onClick={() => startEditItem(cat._id, item)}
                            className="mr-2 bg-yellow-500 text-white py-1 px-4 rounded-lg"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteItem(cat._id, item._id)}
                            className="bg-red-500 text-white py-1 px-4 rounded-lg"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
