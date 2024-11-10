import { Link } from "react-router-dom";

function Header() {
    return (
      <header>
        <h1>Minesweeper Clone</h1>
        <nav>
          {/* Links to navigate between pages */}
          <Link to="/">Home</Link>
          <Link to="/rules">Rules</Link>
          <Link to="/game/easy">Easy</Link>
          <Link to="/game/medium">Medium</Link>
          <Link to="/game/hard">Hard</Link>
        </nav>
      </header>
    );
  }
  
  export default Header;