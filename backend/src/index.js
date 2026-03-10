import app from "./app.js";

const PORT = process.env.PORT || 5000;

// ─── Start Server ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n  🪡  Lakshmi Fashion API running!`);
  console.log(`  🚀  http://localhost:${PORT}`);
  console.log(`  🌿  Environment: ${process.env.NODE_ENV || "development"}\n`);
});
