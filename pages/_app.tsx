import { AppProps } from 'next/app'
import * as gtag from '../lib/gtag'
import 'highlight.js/styles/atom-one-dark.css'
import '../styles/global.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  useEffect(() => {
    if (!gtag.existsGaId) return;

    const handleRouteChange = (path: string) => {
      gtag.pageview(path);
    }

    router.events.on("routeChangeComplete", handleRouteChange)
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange)
    }
  }, [router.events])
  return <Component {...pageProps} />
}
