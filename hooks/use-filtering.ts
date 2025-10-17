"use client"

import { create } from "zustand/react"

type StateType = {
  renderMode: "grid" | "list"
  search: string
  sortBy: "Earlier first" | "Later first" | "Order added"
  updateRenderMode: (mode: "grid" | "list") => void
  updateSearch: (text: string) => void
  updateSortBy: (by: "Earlier first" | "Later first" | "Order added") => void
}

const useFiltering = create<StateType>((set) => ({
  renderMode: "grid",
  search: "",
  sortBy: "Order added",
  updateRenderMode: (mode) => set((state) => ({ ...state, renderMode: mode })),
  updateSearch: (text) => set((state) => ({ ...state, search: text })),
  updateSortBy: (by) => set((state) => ({ ...state, sortBy: by })),
}))

export default useFiltering
