import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

import '@rainbow-me/rainbowkit/styles.css'
import { lightTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { polygonMumbai } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { ChakraProvider } from '@chakra-ui/react'
import { connectorsForWallets } from '@rainbow-me/rainbowkit'
import {
  injectedWallet,
  rainbowWallet,
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets'
import { extendTheme } from '@chakra-ui/react'

const { chains, provider } = configureChains(
  [polygonMumbai],
  [alchemyProvider({ apiKey: 'dHRURMHlGbWZvFYibmuOISLRyd_zW2Vs' }), publicProvider()]
)

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      injectedWallet({ chains }),
      metaMaskWallet({ chains }),
      // coinbaseWallet({ chains, appName: 'All Dapps' }),
    ],
  },
  {
    groupName: 'Others',
    wallets: [rainbowWallet({ chains }), walletConnectWallet({ chains }), ledgerWallet({ chains })],
  },
])

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

const theme = extendTheme({
  colors: {
    brand: {
      50: '#c2fdfe',
      400: '#02c6c9',
      500: '#0AC5A8',
      600: '#015f60',
    },
    second: {
      500: '#003C64',
    },
  },
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        showRecentTransactions={true}
        modalSize={'compact'}
        theme={lightTheme({
          accentColor: '#0AC5A8',
          borderRadius: 'medium',
          overlayBlur: 'small',
        })}
        appInfo={{
          appName: 'Decetalized Apps',
          learnMoreUrl: 'https://subtlecrypto.substack.com',
        }}
      >
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
)
