
const MovesHistory = ({moves}) => {

  const movesCopy = [...moves];

  const colOne = getWhiteMoves();
  const colTwo = getBlackMoves();

  function getWhiteMoves() {
    let counter = 1;
    const whiteMoves = [];
    for(let i = 0; i < movesCopy.length; i++) {
      if(i % 2 === 0) {
        whiteMoves.push(`${counter++}. ` + movesCopy[i]);
      }
    }
    return whiteMoves.join('\r\n');
  }

  function getBlackMoves() {
    let counter = 1;
    const blackMoves = [];
    for(let i = 0; i < movesCopy.length; i++) {
      if(i % 2 !== 0) {
        blackMoves.push(`${counter++}. ` + movesCopy[i]);
      }
    }
    return blackMoves.join('\r\n');
  }

  return (
    <div class='some-page-wrapper'>
  <div class='row'>
    <div class='column'>
      <div class='white-column'>
        {colOne}
      </div>
    </div>
    <div class='column'>
      <div class='black-column'>
        {colTwo}
      </div>
    </div>
  </div>
</div>
  )

}

export default MovesHistory;