import './Header.css'

export default function Header() {
  return (
    <div className="Header">
      <div className="container">
        <a href={'/'}>Flash Cards</a>
        <div>
          <a href={'/login'}>Login</a>
        </div>
        <div>
          <a href={'/'}>Decks</a>
        </div>
      </div>
    </div>
  )
}
