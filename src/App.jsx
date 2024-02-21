import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
}

const intialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function derivecurPlayer(turns) {
  let curPlayer = "X";

  if (turns.length > 0 && turns[0].player === "X") {
    curPlayer = "O";
  }
  return curPlayer;
}

function deriveWinner(gameBoard, players) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstTileSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondTileSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdTileSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstTileSymbol &&
      firstTileSymbol === secondTileSymbol &&
      firstTileSymbol === thirdTileSymbol
    ) {
      winner = players[firstTileSymbol];
    } else {
    }
  }

  return winner;
}

function deriveGameBoard(turns) {
  let gameBoard = [...intialGameBoard.map((array) => [...array])];

  for (const turn of turns) {
    const { tile, player } = turn;
    const { row, col } = tile;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [turns, setTurns] = useState([]);
  // const [curPlayer, setcurPlayer] = useState("X");

  const curPlayer = derivecurPlayer(turns);
  const gameBoard = deriveGameBoard(turns);
  const winner = deriveWinner(gameBoard, players);

  const hasDraw = turns.length === 9 && !winner;

  function handleSelectTile(rowIndex, colIndex) {
    setTurns((prevTurns) => {
      const curPlayer = derivecurPlayer(prevTurns);
      const updatedTurns = [
        { tile: { row: rowIndex, col: colIndex }, player: curPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function handleRematch() {
    setTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={curPlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={curPlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRematch} />
        )}
        <GameBoard onSelectTile={handleSelectTile} board={gameBoard} />
      </div>
      <Log turns={turns} />
    </main>
  );
}
export default App;
