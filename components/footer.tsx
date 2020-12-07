import Link from "next/link"

const Footer = () => {
  return (
    <footer className="flex text-xs md:text-base  bg-accent-1 border-t border-accent-2 justify-between">
      <span className="flex flex-col md:flex-row mx-3 ">License: <a className="font-bold hover:underline" href="https://creativecommons.org/licenses/by-sa/4.0/">CC-BY-SA 4.0</a></span>
      <small>&copy; 2020 OldBigBuddha.</small>
      <div className="flex flex-col lg:flex-row">
        <Link href="/privacy-policy"><a className="mx-3 font-bold hover:underline">Privacy Policy</a></Link>
        <a href="https://github.com/OldBigBuddha/Blog" className="mx-3 font-bold hover:underline">View on GitHub</a>
      </div>
    </footer>
  )
}

export default Footer
