import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "./app.js";

describe("Backend API smoke tests", () => {
  it("GET / should return welcome message", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toContain("Lakshmi Fashion & Designers API");
  });

  it("GET /api/health should return health status", async () => {
    const res = await request(app).get("/api/health");
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual("✅ OK");
  });

  it("GET /random-route should return 404", async () => {
    const res = await request(app).get("/api/non-existent");
    expect(res.statusCode).toEqual(404);
  });
});
