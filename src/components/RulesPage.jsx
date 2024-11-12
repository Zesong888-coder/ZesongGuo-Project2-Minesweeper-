import '../styles/RulesPage.css'
import {useNavigate} from "react-router-dom";
import { returnToHome } from "./GamePage.jsx";

function RulesPage() {
    return (
      <div className="rules">
        <button className="home-button" onClick={returnToHome}>Menu</button>
        <h2>Rules of Minesweeper</h2>
        <p>
          The objective is to reveal all safe cells without detonating any mines.
          <ul>
            <li>Click a cell to reveal it.</li>
            <li>If a cell shows a number, it indicates how many mines are adjacent to it.</li>
            <li>If you reveal a mine, you lose the game.</li>
            <li>Win the game by revealing all cells without mines.</li>
          </ul>
        </p>
      </div>
    );
  }
  
  export default RulesPage;
  
