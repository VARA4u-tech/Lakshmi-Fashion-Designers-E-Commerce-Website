import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/layout/PageTransition";

// Lazy load pages for performance
const WelcomePage = lazy(() =>
  import("./pages/Welcome").then((module) => ({ default: module.WelcomePage })),
);
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Products = lazy(() => import("./pages/Products"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Contact = lazy(() => import("./pages/Contact"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const RefundPolicy = lazy(() => import("./pages/RefundPolicy"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Admin = lazy(() => import("./pages/Admin"));

const queryClient = new QueryClient();

import { PageLoader } from "@/components/ui/PageLoader";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition title="Welcome">
              <WelcomePage />
            </PageTransition>
          }
        />
        <Route
          path="/home"
          element={
            <PageTransition title="Home">
              <Index />
            </PageTransition>
          }
        />
        <Route
          path="/about"
          element={
            <PageTransition title="About Us">
              <About />
            </PageTransition>
          }
        />
        <Route
          path="/services"
          element={
            <PageTransition title="Our Services">
              <Services />
            </PageTransition>
          }
        />
        <Route
          path="/products"
          element={
            <PageTransition title="Collections">
              <Products />
            </PageTransition>
          }
        />
        <Route
          path="/gallery"
          element={
            <PageTransition title="Gallery">
              <Gallery />
            </PageTransition>
          }
        />
        <Route
          path="/contact"
          element={
            <PageTransition title="Contact Us">
              <Contact />
            </PageTransition>
          }
        />
        <Route
          path="/admin"
          element={
            <PageTransition title="Admin Dashboard">
              <Admin />
            </PageTransition>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <PageTransition title="Privacy Policy">
              <PrivacyPolicy />
            </PageTransition>
          }
        />
        <Route
          path="/terms-of-service"
          element={
            <PageTransition title="Terms of Service">
              <TermsOfService />
            </PageTransition>
          }
        />
        <Route
          path="/refund-policy"
          element={
            <PageTransition title="Refund Policy">
              <RefundPolicy />
            </PageTransition>
          }
        />
        <Route
          path="*"
          element={
            <PageTransition title="Page Not Found">
              <NotFound />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

import { LanguageProvider } from "@/contexts/LanguageContext";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <LanguageProvider>
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <Suspense fallback={<PageLoader />}>
            <AnimatedRoutes />
          </Suspense>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
