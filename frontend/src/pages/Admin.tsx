import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  Loader2,
  Plus,
  Trash2,
  LogOut,
  LayoutDashboard,
  ShoppingBag,
  Image as ImageIcon,
  MessageSquare,
  ChevronRight,
  ArrowLeft,
  Package,
  Store,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { motion, AnimatePresence } from "framer-motion";

// Types
interface Product {
  id: string;
  name_en: string;
  name_te: string;
  category: string;
  category_te: string;
  price: number;
  image_url: string;
  in_stock: boolean;
}

interface GalleryItem {
  id: string;
  title_en: string;
  title_te: string;
  category: string;
  image_url: string;
}

type AdminView = "dashboard" | "products" | "gallery" | "enquiries";

const Admin = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState<AdminView>("dashboard");
  const { toast } = useToast();

  // Auth State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Data States
  const [products, setProducts] = useState<Product[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [fetchLoading, setFetchLoading] = useState(false);

  // Form States
  const [newProduct, setNewProduct] = useState({
    name_en: "",
    name_te: "",
    category: "",
    category_te: "",
    price: "",
    image_url: "",
  });

  const [newGalleryItem, setNewGalleryItem] = useState({
    title_en: "",
    title_te: "",
    category: "tailoring",
    image_url: "",
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
      if (session) {
        fetchProducts();
        fetchGalleryItems();
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchProducts();
        fetchGalleryItems();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProducts = async () => {
    setFetchLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) console.error("Error fetching products:", error);
    else setProducts(data || []);
    setFetchLoading(false);
  };

  const fetchGalleryItems = async () => {
    setFetchLoading(true);
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) console.error("Error fetching gallery:", error);
    else setGalleryItems(data || []);
    setFetchLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({ title: "Welcome Back!", description: "Logged in successfully." });
    }
    setAuthLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setActiveView("dashboard");
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return;
    const { error } = await supabase.from("products").insert([
      {
        ...newProduct,
        price: parseFloat(newProduct.price) || 0,
      },
    ]);
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({ title: "Success", description: "Product added successfully!" });
      setNewProduct({
        name_en: "",
        name_te: "",
        category: "",
        category_te: "",
        price: "",
        image_url: "",
      });
      fetchProducts();
    }
  };

  const handleAddGalleryItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return;
    const { error } = await supabase.from("gallery").insert([newGalleryItem]);
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({ title: "Success", description: "Image added to gallery!" });
      setNewGalleryItem({
        title_en: "",
        title_te: "",
        category: "tailoring",
        image_url: "",
      });
      fetchGalleryItems();
    }
  };

  const handleDelete = async (table: "products" | "gallery", id: string) => {
    if (
      !confirm(
        `Are you sure you want to delete this ${table === "products" ? "product" : "image"}?`,
      )
    )
      return;
    const { error } = await supabase.from(table).delete().match({ id });
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({ title: "Deleted", description: "Item removed successfully." });
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      table === "products" ? fetchProducts() : fetchGalleryItems();
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-12 h-12 animate-spin text-accent" />
      </div>
    );

  if (!session)
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-maroon-dark/20 to-accent/5 pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md z-10"
        >
          <Card className="border-accent/20 shadow-2xl backdrop-blur-sm bg-background/80">
            <CardHeader className="text-center space-y-1">
              <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <Store className="w-8 h-8 text-accent" />
              </div>
              <CardTitle className="font-heading text-3xl text-foreground">Admin Portal</CardTitle>
              <CardDescription>Enter your credentials to manage your store</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    className="bg-secondary/50"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@lakshmi-tailors.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Password</label>
                  <Input
                    className="bg-secondary/50"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent/90 mt-2"
                  disabled={authLoading}
                >
                  {authLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Sign In
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );

  return (
    <Layout language="en" onLanguageChange={() => {}}>
      <div className="flex min-h-screen bg-background pt-20">
        {/* Sidebar */}
        <aside className="w-64 border-r border-border/50 hidden md:block p-6 space-y-8 bg-secondary/10">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-2">
              Navigation
            </p>
            <NavButton
              active={activeView === "dashboard"}
              onClick={() => setActiveView("dashboard")}
              icon={<LayoutDashboard size={20} />}
              label="Overview"
            />
            <NavButton
              active={activeView === "products"}
              onClick={() => setActiveView("products")}
              icon={<ShoppingBag size={20} />}
              label="Products"
            />
            <NavButton
              active={activeView === "gallery"}
              onClick={() => setActiveView("gallery")}
              icon={<ImageIcon size={20} />}
              label="Gallery"
            />
            <NavButton
              active={activeView === "enquiries"}
              onClick={() => setActiveView("enquiries")}
              icon={<MessageSquare size={20} />}
              label="Enquiries"
            />
          </div>
          <div className="pt-8 border-t border-border/50">
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Sign Out
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              {activeView === "dashboard" && (
                <div className="space-y-8">
                  <header>
                    <h1 className="text-4xl font-heading font-bold mb-2">Welcome back, Admin</h1>
                    <p className="text-muted-foreground">
                      Here is what's happening in your shop today.
                    </p>
                  </header>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <DashboardCard
                      title="Total Products"
                      value={products.length}
                      icon={<ShoppingBag className="text-accent" />}
                      onClick={() => setActiveView("products")}
                    />
                    <DashboardCard
                      title="Gallery Images"
                      value={galleryItems.length}
                      icon={<ImageIcon className="text-accent" />}
                      onClick={() => setActiveView("gallery")}
                    />
                    <DashboardCard
                      title="Pending Enquiries"
                      value={0}
                      icon={<MessageSquare className="text-accent" />}
                      onClick={() => setActiveView("enquiries")}
                    />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card className="border-accent/10">
                      <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                      </CardHeader>
                      <CardContent className="grid grid-cols-2 gap-4">
                        <Button
                          variant="outline"
                          className="h-24 flex flex-col gap-2"
                          onClick={() => setActiveView("products")}
                        >
                          <Plus className="w-6 h-6" />
                          Add Product
                        </Button>
                        <Button
                          variant="outline"
                          className="h-24 flex flex-col gap-2"
                          onClick={() => setActiveView("gallery")}
                        >
                          <ImageIcon className="w-6 h-6" />
                          Add Gallery
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="border-accent/10 overflow-hidden">
                      <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Recent Products</CardTitle>
                        <Button variant="link" onClick={() => setActiveView("products")}>
                          View All
                        </Button>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="divide-y divide-border/50">
                          {products.slice(0, 4).map((p) => (
                            <div key={p.id} className="p-4 flex items-center gap-4">
                              <div className="w-10 h-10 rounded bg-secondary overflow-hidden flex-shrink-0">
                                <img
                                  src={p.image_url}
                                  alt=""
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{p.name_en}</p>
                                <p className="text-xs text-muted-foreground truncate">
                                  {p.category} | {p.category_te}
                                </p>
                              </div>
                              <p className="text-sm font-semibold">₹{p.price}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {activeView === "products" && (
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => setActiveView("dashboard")}>
                      <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <h2 className="text-3xl font-heading font-bold">Products Management</h2>
                  </div>

                  <Card className="border-accent/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Plus className="w-5 h-5 text-accent" />
                        Add New Product
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form
                        onSubmit={handleAddProduct}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                      >
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-muted-foreground">
                            Product Name (EN)
                          </label>
                          <Input
                            placeholder="Traditional Bangles"
                            value={newProduct.name_en}
                            onChange={(e) =>
                              setNewProduct({
                                ...newProduct,
                                name_en: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-muted-foreground">
                            Product Name (TE)
                          </label>
                          <Input
                            placeholder="సంప్రదాయ గాజులు"
                            value={newProduct.name_te}
                            onChange={(e) =>
                              setNewProduct({
                                ...newProduct,
                                name_te: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-muted-foreground">
                            Category (EN)
                          </label>
                          <Input
                            placeholder="Earrings, Bangles..."
                            value={newProduct.category}
                            onChange={(e) =>
                              setNewProduct({
                                ...newProduct,
                                category: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-muted-foreground">
                            Category (TE)
                          </label>
                          <Input
                            placeholder="చెవి పోగులు, గాజులు..."
                            value={newProduct.category_te}
                            onChange={(e) =>
                              setNewProduct({
                                ...newProduct,
                                category_te: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-muted-foreground">
                            Price (₹)
                          </label>
                          <Input
                            type="number"
                            placeholder="0"
                            value={newProduct.price}
                            onChange={(e) =>
                              setNewProduct({
                                ...newProduct,
                                price: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2 lg:col-span-2">
                          <label className="text-sm font-medium text-muted-foreground">
                            Image URL
                          </label>
                          <Input
                            placeholder="https://..."
                            value={newProduct.image_url}
                            onChange={(e) =>
                              setNewProduct({
                                ...newProduct,
                                image_url: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <Button
                          type="submit"
                          className="md:col-span-1 bg-accent hover:bg-accent/90 self-end"
                        >
                          Create Product
                        </Button>
                      </form>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {fetchLoading ? (
                      <div className="col-span-full py-20 flex flex-col items-center gap-4">
                        <Loader2 className="w-8 h-8 animate-spin text-accent" />
                        <p className="text-muted-foreground">Loading products...</p>
                      </div>
                    ) : (
                      products.map((product) => (
                        <Card
                          key={product.id}
                          className="group relative overflow-hidden border-accent/5 hover:border-accent/20 transition-all bg-secondary/20"
                        >
                          <div className="aspect-square overflow-hidden relative">
                            <img
                              src={product.image_url}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 right-2 flex gap-2">
                              <Button
                                variant="destructive"
                                size="icon"
                                className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => handleDelete("products", product.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-1">
                              <p className="text-[10px] uppercase tracking-wider text-accent font-bold">
                                {product.category}
                              </p>
                              <p className="text-[10px] text-accent/70 font-bold">
                                {product.category_te}
                              </p>
                            </div>
                            <h3 className="font-heading font-semibold text-lg leading-tight mb-2 line-clamp-1">
                              {product.name_en}
                            </h3>
                            <div className="flex items-center justify-between">
                              <span className="text-lg font-bold">₹{product.price}</span>
                              <div
                                className={`px-2 py-0.5 rounded text-[10px] font-bold ${product.in_stock ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}
                              >
                                {product.in_stock ? "IN STOCK" : "OUT OF STOCK"}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </div>
              )}

              {activeView === "gallery" && (
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => setActiveView("dashboard")}>
                      <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <h2 className="text-3xl font-heading font-bold">Gallery Management</h2>
                  </div>

                  <Card className="border-accent/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <ImageIcon className="w-5 h-5 text-accent" />
                        Add New Gallery Image
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form
                        onSubmit={handleAddGalleryItem}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                      >
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-muted-foreground">
                            Title (EN)
                          </label>
                          <Input
                            placeholder="Bridal Lehenga Work"
                            value={newGalleryItem.title_en}
                            onChange={(e) =>
                              setNewGalleryItem({
                                ...newGalleryItem,
                                title_en: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-muted-foreground">
                            Title (TE)
                          </label>
                          <Input
                            placeholder="బ్రాడల్ లెహంగా వర్క్"
                            value={newGalleryItem.title_te}
                            onChange={(e) =>
                              setNewGalleryItem({
                                ...newGalleryItem,
                                title_te: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-muted-foreground">
                            Work Category
                          </label>
                          <select
                            className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={newGalleryItem.category}
                            onChange={(e) =>
                              setNewGalleryItem({
                                ...newGalleryItem,
                                category: e.target.value,
                              })
                            }
                          >
                            <option value="tailoring">Tailoring</option>
                            <option value="product">Product</option>
                            <option value="other's">Others</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-muted-foreground">
                            Image URL
                          </label>
                          <Input
                            placeholder="https://..."
                            value={newGalleryItem.image_url}
                            onChange={(e) =>
                              setNewGalleryItem({
                                ...newGalleryItem,
                                image_url: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <Button
                          type="submit"
                          className="md:col-span-2 bg-accent hover:bg-accent/90 w-full md:w-auto"
                        >
                          Upload to Gallery
                        </Button>
                      </form>
                    </CardContent>
                  </Card>

                  <div className="columns-1 md:columns-3 lg:columns-4 gap-6 space-y-6">
                    {fetchLoading ? (
                      <div className="col-span-full py-20 flex justify-center">
                        <Loader2 className="w-8 h-8 animate-spin text-accent" />
                      </div>
                    ) : (
                      galleryItems.map((item) => (
                        <div
                          key={item.id}
                          className="group relative rounded-xl overflow-hidden border border-accent/5 break-inside-avoid shadow-lg"
                        >
                          <img src={item.image_url} alt="" className="w-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all flex flex-col justify-end p-4">
                            <h4 className="text-white font-heading font-semibold text-lg">
                              {item.title_en}
                            </h4>
                            <p className="text-white/70 text-xs mb-3 capitalize">{item.category}</p>
                            <Button
                              variant="destructive"
                              size="sm"
                              className="w-full flex gap-2"
                              onClick={() => handleDelete("gallery", item.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                              Remove Image
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {activeView === "enquiries" && (
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => setActiveView("dashboard")}>
                      <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <h2 className="text-3xl font-heading font-bold">Enquiries</h2>
                  </div>
                  <Card className="border-accent/10 py-20 bg-secondary/10">
                    <CardContent className="flex flex-col items-center justify-center text-center space-y-4">
                      <div className="w-20 h-20 bg-accent/5 rounded-full flex items-center justify-center">
                        <MessageSquare className="w-10 h-10 text-accent/40" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl mb-2">No Enquiries Yet</CardTitle>
                        <p className="text-muted-foreground">
                          When customers contact you, their messages will appear here.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </Layout>
  );
};

const NavButton = ({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) => (
  <Button
    variant={active ? "secondary" : "ghost"}
    className={`w-full justify-start gap-3 h-11 transition-all ${active ? "bg-accent/10 text-accent font-semibold" : "text-muted-foreground hover:text-foreground"}`}
    onClick={onClick}
  >
    {icon}
    {label}
    {active && <ChevronRight className="ml-auto w-4 h-4" />}
  </Button>
);

const DashboardCard = ({
  title,
  value,
  icon,
  onClick,
}: {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  onClick: () => void;
}) => (
  <Card className="hover:border-accent/30 transition-all cursor-pointer group" onClick={onClick}>
    <CardContent className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-accent/5 rounded-lg group-hover:bg-accent/10 transition-colors">
          {icon}
        </div>
        <span className="text-xs font-medium text-muted-foreground flex items-center gap-1 group-hover:text-accent transition-colors">
          Manage <ChevronRight size={12} />
        </span>
      </div>
      <p className="text-sm font-medium text-muted-foreground">{title}</p>
      <h3 className="text-3xl font-bold font-heading mt-1">{value}</h3>
    </CardContent>
  </Card>
);

export default Admin;
