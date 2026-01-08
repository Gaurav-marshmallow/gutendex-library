// src/pages/CategoriesPage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../services/api";

export default function CategoriesPage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      const cats = await getCategories();
      setCategories(cats);
    };
    loadCategories();
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Gutendex Library</h1>
      {categories.length === 0 ? (
        <p>Loading categories...</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => navigate(`/books/${cat}`)}
              style={{
                padding: "1rem 2rem",
                fontSize: "1rem",
                borderRadius: "8px",
                border: "1px solid #ccc",
                cursor: "pointer",
                background: "#3498db",
                color: "white"
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}