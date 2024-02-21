export default function Log({ turns }) {
    
  return <ol id="log">
    {turns.map(turn => <li key={`${turn.tile.row}${turn.tile.col}`}>{turn.player} selected {turn.tile.row},{turn.tile.col}</li>)}
  </ol>;
}
