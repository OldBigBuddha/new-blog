import { AppProps } from 'next/app'
import 'highlight.js/styles/atom-one-dark.css'
import '../styles/index.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
