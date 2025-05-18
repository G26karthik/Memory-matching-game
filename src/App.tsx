import GameBoard from './components/GameBoard';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Tech Memory Match</h1>
        <p>Test your memory with technology icons!</p>
      </header>
      <main>
        <GameBoard />
      </main>
      <footer>
        <p>Created by G Karthik for CodeCircuit Hackathon</p>
      </footer>
    </div>
  );
}

export default App;
