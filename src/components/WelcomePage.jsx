import { Link } from 'react-router-dom';
import '../styles/WelcomePage.css'

function WelcomePage() {
  return (
    <div className="welcome">
      <h2>Welcome to Minesweeper</h2>
      <p>Choose a difficulty level to start playing:</p>
      <Link to="/game/easy">Play Easy</Link>
      <Link to="/game/medium">Play Medium</Link>
      <Link to="/game/hard">Play Hard</Link>
      <p>Rules of this game: </p>
      <Link to="/rules">rules page</Link>
    </div>
  );
}

export default WelcomePage;
