import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className="Header">
        <h1>Redux Blog</h1>
        <nav>
            <ul>
                <l1><Link to="/">Home</Link></l1>
                <l1><Link to="post">Post</Link></l1>
            </ul>
        </nav>
      
    </header>
  )
}

export default Header
