import express from "express";
import { supabase } from "../config/supabase.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// GET /api/gallery/recommendations/:id - Proxy to Python ML Service
router.get("/recommendations/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const mlServiceUrl = process.env.ML_SERVICE_URL || "http://localhost:8000";

    const response = await fetch(
      `${mlServiceUrl}/gallery/recommendations/${id}`,
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

// GET /api/gallery/clusters - Proxy to Python ML Service
router.get("/clusters", async (req, res) => {
  try {
    const mlServiceUrl = process.env.ML_SERVICE_URL || "http://localhost:8000";

    const response = await fetch(`${mlServiceUrl}/gallery/clusters`);
    const data = await response.json();

    if (!response.ok) throw new Error(data.detail || "ML Service Error");
    res.json(data);
  } catch (err) {
    console.error("ML Proxy Error:", err.message);
    res.status(500).json({ error: "Grouping engine is currently offline." });
  }
});

// GET /api/gallery - Public: fetch all gallery items
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;

    let query = supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false });

    if (category && category !== "all") {
      query = query.eq("category", category);
    }

    const { data, error } = await query;
    if (error) throw error;

    res.json({ success: true, items: data });
  } catch (err) {
    console.error("GET /gallery error:", err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/gallery - Protected: add gallery image
router.post("/", verifyToken, async (req, res) => {
  try {
    const { title_en, title_te, category, image_url } = req.body;

    if (!title_en || !image_url) {
      return res
        .status(400)
        .json({ error: "title_en and image_url are required." });
    }

    const { data, error } = await supabase
      .from("gallery")
      .insert([
        { title_en, title_te, category: category || "tailoring", image_url },
      ])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ success: true, item: data });
  } catch (err) {
    console.error("POST /gallery error:", err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/gallery/:id - Protected: remove gallery image
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase.from("gallery").delete().eq("id", id);
    if (error) throw error;

    res.json({ success: true, message: "Gallery item deleted." });
  } catch (err) {
    console.error("DELETE /gallery/:id error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
