import Link from 'next/link'

const Header = () => {
  return (
    <h2 className="inline-block mb-20 mt-8">
      <Link href="/">
        <a className="flex text-gray-900 font-bold text-2xl md:text-4xl tracking-tight md:tracking-tighter leading-tight rounded-full p-4 hover:shadow hover:no-underline">
          <img id="logo" src="/img/logo.png"/>
          <span className="mt-auto">imple is Best</span>
        </a>
      </Link>
    </h2>
  )
}

export default Header
