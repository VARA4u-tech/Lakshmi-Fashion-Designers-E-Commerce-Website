import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.cluster import KMeans
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Lakshmi Fashion ML Service")

# CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Supabase Config
url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
supabase: Client = create_client(url, key)

class Product(BaseModel):
    id: str
    name_en: str
    name_te: Optional[str]
    category: str
    category_te: Optional[str]
    price: float

@app.get("/")
async def root():
    return {"message": "🪡 Lakshmi Fashion ML Service is Online"}

@app.get("/products/recommendations/{product_id}")
async def get_product_recommendations(product_id: str):
    try:
        response = supabase.table("products").select("*").execute()
        all_products = response.data
        if not all_products:
            raise HTTPException(status_code=404, detail="No products found")
        df = pd.DataFrame(all_products)
        if product_id not in df['id'].values:
            raise HTTPException(status_code=404, detail="Product ID not found")
        df['metadata'] = df['name_en'] + " " + df['category'] + " " + df['category_te'].fillna('')
        tfidf = TfidfVectorizer(stop_words='english')
        tfidf_matrix = tfidf.fit_transform(df['metadata'])
        cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)
        idx = df.index[df['id'] == product_id].tolist()[0]
        sim_scores = list(enumerate(cosine_sim[idx]))
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        sim_scores = [i for i in sim_scores if i[0] != idx][:5]
        product_indices = [i[0] for i in sim_scores]
        return {"success": True, "recommendations": df.iloc[product_indices].to_dict('records')}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/products/clusters")
async def get_product_clusters(k: int = 3):
    try:
        response = supabase.table("products").select("*").execute()
        all_products = response.data
        if len(all_products) < k:
            return {"success": True, "clusters": all_products}
        df = pd.DataFrame(all_products)
        df['category_idx'] = pd.Categorical(df['category']).codes
        X = df[['price', 'category_idx']]
        X_norm = (X - X.mean()) / X.std()
        kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
        df['cluster_id'] = kmeans.fit_predict(X_norm)
        return {"success": True, "clusters": df.to_dict('records')}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/gallery/recommendations/{item_id}")
async def get_gallery_recommendations(item_id: str):
    try:
        response = supabase.table("gallery").select("*").execute()
        all_items = response.data
        if not all_items:
            raise HTTPException(status_code=404, detail="No gallery items found")
        df = pd.DataFrame(all_items)
        if item_id not in df['id'].values:
            raise HTTPException(status_code=404, detail="Item ID not found")
        df['metadata'] = df['title_en'] + " " + df['category'] + " " + df['title_te'].fillna('')
        tfidf = TfidfVectorizer(stop_words='english')
        tfidf_matrix = tfidf.fit_transform(df['metadata'])
        cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)
        idx = df.index[df['id'] == item_id].tolist()[0]
        sim_scores = list(enumerate(cosine_sim[idx]))
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        sim_scores = [i for i in sim_scores if i[0] != idx][:5]
        item_indices = [i[0] for i in sim_scores]
        return {"success": True, "recommendations": df.iloc[item_indices].to_dict('records')}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/gallery/clusters")
async def get_gallery_clusters(k: int = 3):
    try:
        response = supabase.table("gallery").select("*").execute()
        all_items = response.data
        if len(all_items) < k:
            return {"success": True, "clusters": all_items}
        df = pd.DataFrame(all_items)
        df['category_idx'] = pd.Categorical(df['category']).codes
        X = df[['category_idx']]
        X = X.astype(float)
        X['noise'] = np.random.normal(0, 0.01, size=len(df))
        X_norm = (X - X.mean()) / (X.std() + 1e-9)
        kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
        df['cluster_id'] = kmeans.fit_predict(X_norm)
        return {"success": True, "clusters": df.to_dict('records')}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
