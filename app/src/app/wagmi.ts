import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { base, sepolia } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "InTime",
  projectId: "35f19a1f86a2adb623a650767c2eb93a",
  chains: [
    base,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [sepolia] : []),
  ],
  ssr: true,
});
