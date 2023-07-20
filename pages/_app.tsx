import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { WagmiConfig, createConfig } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { polygonMumbai } from "wagmi/chains";
import { Toaster } from "react-hot-toast";

const chains = [polygonMumbai];

const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: "C1vZFHP_lrxdnHutKBmmkeNVDeiOZR71", // or infuraId
    walletConnectProjectId: "a0c93d8a0ad928d0ca69ad15058d48a3",
    chains,
    // Required
    appName: "BrewBucks",
  })
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider
        debugMode
        theme="soft"
        customTheme={{ "--ck-connectbutton-border-radius": "3rem" }}
      >
        <RecoilRoot>
          <Toaster position="bottom-right" />
          <Component {...pageProps} />
        </RecoilRoot>
      </ConnectKitProvider>
    </WagmiConfig>
  );
}

