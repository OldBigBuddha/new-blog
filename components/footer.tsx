const Footer = () => {
  return (
    <footer className="flex bg-accent-1 border-t border-accent-2 justify-between">
      <div className="flex flex-col lg:flex-row">
        <span className="mx-3">License: <a className="font-bold hover:underline" href="https://creativecommons.org/licenses/by-sa/4.0/">CC-BY-SA 4.0</a></span>
      </div>
      <div>
        <small>&copy; 2020 OldBigBuddha.</small>
      </div>
      <div className="flex flex-col lg:flex-row">
        <a
          href="#"
          className="mx-3 font-bold hover:underline"
        >
          Privacy Policy
        </a>
        <a
          href="https://github.com/OldBigBuddha/Blog"
          className="mx-3 font-bold hover:underline"
        >
          View on GitHub
        </a>
      </div>
    </footer>
  )
}

export default Footer
