import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface NFCSignature {
  raw: {
    r: string;
    s: string;
    v: number;
  };
  der: string;
  ether: string;
}

export interface NFCBandInfo {
  id: string;
  name: string;
  publicKey: string;
  etherAddress: string;
  signature?: NFCSignature;
  digest?: string;
  message?: string;
  timestamp: number;
}

interface NFCStore {
  bandInfo: NFCBandInfo | null;
  isLoggedIn: boolean;
  hasHydrated: boolean;
  setBandInfo: (info: NFCBandInfo) => void;
  clearBandInfo: () => void;
  login: () => void;
  logout: () => void;
  setHasHydrated: (state: boolean) => void;
}

export const useNFCStore = create<NFCStore>()(
  persist(
    (set, get) => ({
      bandInfo: null,
      isLoggedIn: false,
      hasHydrated: false,
      setBandInfo: (info: NFCBandInfo) => set({ bandInfo: info }),
      clearBandInfo: () => set({ bandInfo: null }),
      login: () => set({ isLoggedIn: true }),
      logout: () => set({ isLoggedIn: false, bandInfo: null }),
      setHasHydrated: (state: boolean) => set({ hasHydrated: state }),
    }),
    {
      name: "nfc-band-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: (state) => {
        console.log("onRehydrateStorage", state);
        return () => state.setHasHydrated(true);
      },
    }
  )
);
