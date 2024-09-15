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

const Admin: React.FC = () => {
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

  // const BACKEND_URI = "http://localhost:5000/api";
  const BACKEND_URI = "https://rouse-be.vercel.app/api";

  // Fetch categories from the server
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${BACKEND_URI}/menu`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const addCategory = async () => {
    if (newCategory.trim()) {
      try {
        const response = await fetch(`${BACKEND_URI}/`, {
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
          `${BACKEND_URI}/menu/${selectedCategory}/items`,
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
    try {
      const response = await fetch(`${BACKEND_URI}/menu/${categoryId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Network response was not ok");
      setCategories(
        categories.filter((category) => category._id !== categoryId)
      );
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const deleteItem = async (categoryId: string, itemId: string) => {
    try {
      const response = await fetch(
        `${BACKEND_URI}/menu/${categoryId}/items/${itemId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Network response was not ok");
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
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const startEditCategory = (category: Category) => {
    setEditingCategoryId(category._id);
    setCategoryEditValue(category.category);
  };

  const saveCategoryEdit = async (categoryId: string) => {
    try {
      const response = await fetch(`${BACKEND_URI}/menu/${categoryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: categoryEditValue,
        }),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const updatedCategory = await response.json();
      setCategories(
        categories.map((category) =>
          category._id === categoryId ? updatedCategory : category
        )
      );
      setEditingCategoryId(null);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const startEditItem = (item: Item) => {
    setEditingItemId(item._id);
    setItemEditName(item.name);
    setItemEditPrice(item.price);
  };

  const saveItemEdit = async (categoryId: string, itemId: string) => {
    try {
      const response = await fetch(
        `${BACKEND_URI}/menu/${categoryId}/items/${itemId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: itemEditName,
            price: itemEditPrice,
          }),
        }
      );
      if (!response.ok) throw new Error("Network response was not ok");
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
    } catch (error) {
      console.error("Error updating item:", error);
    }
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
          className="w-full p-3 border border-gray-300 rounded-lg bg-white mb-4"
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
          className="w-full p-3 border border-gray-300 bg-white rounded-lg mb-4"
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
          className="w-full p-3 border border-gray-300 rounded-lg bg-white mb-4"
        />
        <input
          type="number"
          value={newItemPrice}
          onChange={(e) => setNewItemPrice(e.target.value)}
          placeholder="Item price"
          className="w-full p-3 border border-gray-300 rounded-lg bg-white mb-4"
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
        {categories.map((category) => (
          <div key={category._id} className="mb-6 border-b pb-4">
            <div className="flex  items-center justify-between">
              {editingCategoryId === category._id ? (
                <input
                  type="text"
                  value={categoryEditValue}
                  onChange={(e) => setCategoryEditValue(e.target.value)}
                  className="w-1/2 p-2 border border-gray-300 rounded-lg mr-4 bg-white"
                />
              ) : (
                <h3 className="text-xl font-semibold text-gray-800">
                  {category.category}
                </h3>
              )}
              <div>
                {editingCategoryId === category._id ? (
                  <button
                    onClick={() => saveCategoryEdit(category._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => startEditCategory(category)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 mr-2"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => deleteCategory(category._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
            {category.items.map((item) => (
              <div key={item._id} className="flex items-center  gap-10 mt-4">
                <div>
                  {editingItemId === item._id ? (
                    <button
                      onClick={() => saveItemEdit(category._id, item._id)}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => startEditItem(item)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 mr-2"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => deleteItem(category._id, item._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
                {editingItemId === item._id ? (
                  <>
                    <input
                      type="text"
                      value={itemEditName}
                      onChange={(e) => setItemEditName(e.target.value)}
                      className="w-1/4 p-2 border border-gray-300 rounded-lg mr-4 bg-white"
                    />
                    <input
                      type="number"
                      value={itemEditPrice}
                      onChange={(e) => setItemEditPrice(e.target.value)}
                      className="w-1/4 p-2 border border-gray-300 rounded-lg bg-white"
                    />
                  </>
                ) : (
                  <>
                    <div className="flex w-1/4 justify-between ">
                      <span className="text-lg text-gray-800">{item.name}</span>
                      <span className="text-lg text-gray-600 w-20">
                        ${item.price}
                      </span>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
