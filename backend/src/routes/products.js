import express from "express";
import { supabase } from "../config/supabase.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// GET /api/products - Public: fetch all products
router.get("/", async (req, res) => {
  try {
    const { category, in_stock } = req.query;

    let query = supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    // Optional filters
    if (category) query = query.eq("category", category);
    if (in_stock !== undefined)
      query = query.eq("in_stock", in_stock === "true");

    const { data, error } = await query;
    if (error) throw error;

    res.json({ success: true, products: data });
  } catch (err) {
    console.error("GET /products error:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/products/categories - Public: get unique categories
router.get("/categories", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("category, category_te");

    if (error) throw error;

    const unique = [...new Map(data.map((p) => [p.category, p])).values()].map(
      (p) => ({ en: p.category, te: p.category_te }),
    );

    res.json({ success: true, categories: unique });
  } catch (err) {
    console.error("GET /products/categories error:", err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/products - Protected: add a new product
router.post("/", verifyToken, async (req, res) => {
  try {
    const {
      name_en,
      name_te,
      category,
      category_te,
      price,
      image_url,
      in_stock,
    } = req.body;

    if (!name_en || !category || !price || !image_url) {
      return res.status(400).json({
        error: "name_en, category, price, and image_url are required.",
      });
    }

    const { data, error } = await supabase
      .from("products")
      .insert([
        {
          name_en,
          name_te,
          category,
          category_te,
          price,
          image_url,
          in_stock: in_stock ?? true,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ success: true, product: data });
  } catch (err) {
    console.error("POST /products error:", err);
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/products/:id - Protected: update product details
router.patch("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    delete updates.id;
    delete updates.created_at;

    const { data, error } = await supabase
      .from("products")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    res.json({ success: true, product: data });
  } catch (err) {
    console.error("PATCH /products/:id error:", err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/products/:id - Protected: delete a product
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) throw error;

    res.json({ success: true, message: "Product deleted." });
  } catch (err) {
    console.error("DELETE /products/:id error:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/products/recommendations/:id - Proxy to Python ML Service
router.get("/recommendations/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const mlServiceUrl = process.env.ML_SERVICE_URL || "http://localhost:8000";

    const response = await fetch(
      `${mlServiceUrl}/products/recommendations/${id}`,
    );
    const data = await response.json();

    if (!response.ok) throw new Error(data.detail || "ML Service Error");
    res.json(data);
  } catch (err) {
    console.error("ML Proxy Error:", err.message);
    res
      .status(500)
      .json({ error: "Recommendation engine is currently offline." });
  }
});

// GET /api/products/clusters - Proxy to Python ML Service
router.get("/clusters", async (req, res) => {
  try {
    const mlServiceUrl = process.env.ML_SERVICE_URL || "http://localhost:8000";

    const response = await fetch(`${mlServiceUrl}/products/clusters`);
    const data = await response.json();

    if (!response.ok) throw new Error(data.detail || "ML Service Error");
    res.json(data);
  } catch (err) {
    console.error("ML Proxy Error:", err.message);
    res.status(500).json({ error: "Grouping engine is currently offline." });
  }
});

export default router;
