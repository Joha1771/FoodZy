import { create } from "zustand";
import { persist } from "zustand/middleware";

const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [], // массив product объектов

      addItem: (product) => {
        const exists = get().items.find((p) => p.id === product.id);
        if (!exists) {
          set((state) => ({ items: [...state.items, product] }));
        }
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((p) => p.id !== productId),
        }));
      },

      toggleItem: (product) => {
        const exists = get().items.find((p) => p.id === product.id);
        if (exists) {
          set((state) => ({
            items: state.items.filter((p) => p.id !== product.id),
          }));
        } else {
          set((state) => ({ items: [...state.items, product] }));
        }
      },

      isInWishlist: (productId) => {
        return get().items.some((p) => p.id === productId);
      },

      getTotalItems: () => get().items.length,

      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: "wishlist-storage",
    }
  )
);

export default useWishlistStore;
