import Link from 'next/link'

import style from '../styles/header.module.css'

const Header = () => {
  return (
    <div className="inline-block mb-10 mt-4">
      <Link href="/">
        <a className="flex text-gray-900 font-bold text-2xl md:text-4xl tracking-tight md:tracking-tighter leading-tight rounded-full p-4 transition-shadow hover:shadow hover:no-underline">
          <img className={style.logo} src="/img/logo.png"/>
          <span className="mt-auto">imple is Best</span>
        </a>
      </Link>
    </div>
  )
}

export default Header
