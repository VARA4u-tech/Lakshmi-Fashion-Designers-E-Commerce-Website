import { render, act } from "@testing-library/react";
import { WishlistProvider, useWishlist, WishlistContextType } from "@/contexts/WishlistContext";
import { describe, it, expect, beforeEach, vi } from "vitest";
import React from "react";

// Helper component to access the hook
const TestComponent = ({ onAction }: { onAction: (wishlist: WishlistContextType) => void }) => {
  const wishlistData = useWishlist();
  React.useEffect(() => {
    onAction(wishlistData);
  }, [wishlistData, onAction]);
  return null;
};

describe("WishlistContext", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("should start with an empty wishlist", () => {
    let capturedWishlist: WishlistContextType | undefined;
    render(
      <WishlistProvider>
        <TestComponent onAction={(data) => (capturedWishlist = data)} />
      </WishlistProvider>,
    );
    expect(capturedWishlist?.wishlist).toEqual([]);
  });

  it("should add an item to the wishlist", () => {
    let capturedWishlist: WishlistContextType | undefined;
    const testItem = {
      id: "1",
      type: "product" as const,
      name: "Test Product",
      image_url: "url",
      category: "cat",
    };

    render(
      <WishlistProvider>
        <TestComponent onAction={(data) => (capturedWishlist = data)} />
      </WishlistProvider>,
    );

    act(() => {
      capturedWishlist?.addToWishlist(testItem);
    });

    expect(capturedWishlist?.wishlist).toContainEqual(testItem);
  });

  it("should remove an item from the wishlist", () => {
    let capturedWishlist: WishlistContextType | undefined;
    const testItem = {
      id: "1",
      type: "product" as const,
      name: "Test Product",
      image_url: "url",
      category: "cat",
    };

    render(
      <WishlistProvider>
        <TestComponent onAction={(data) => (capturedWishlist = data)} />
      </WishlistProvider>,
    );

    act(() => {
      capturedWishlist?.addToWishlist(testItem);
    });

    act(() => {
      capturedWishlist?.removeFromWishlist("1");
    });

    expect(capturedWishlist?.wishlist).toEqual([]);
  });

  it("should save to localStorage", () => {
    let capturedWishlist: WishlistContextType | undefined;
    const testItem = {
      id: "1",
      type: "product" as const,
      name: "Test Product",
      image_url: "url",
      category: "cat",
    };

    render(
      <WishlistProvider>
        <TestComponent onAction={(data) => (capturedWishlist = data)} />
      </WishlistProvider>,
    );

    act(() => {
      capturedWishlist?.addToWishlist(testItem);
    });

    const saved = JSON.parse(localStorage.getItem("lakshmi_wishlist") || "[]");
    expect(saved).toContainEqual(testItem);
  });
});
