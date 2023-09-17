
import './App.css';
import {useState} from "react";

function Square({value,squareClick}) {
  let myClass;
  if(value==="X"){
    myClass="btn btn-primary p-5 ";
  }else if(value==="O"){
    myClass="btn btn-danger p-5 ";
  }else{
    myClass="btn btn-outline-secondary p-5";
  }
  return <button  className={"border-black rounded "+ myClass}  onClick={squareClick}>{value? value:"-"}</button>
}

function StatusBar({status,handleReset}){
  let btnStyle="visually-hidden";
  if (status==="Draw!!!" || status.includes("Winner")){
     btnStyle="btn btn-warning";
  }
  return <div className="p-3  container flex-row ">
    <h1 className="display-4 d-inline-block col-10 px-5 ">{status}</h1>
    <button className={"col-2 fs-3 mb-2 "+btnStyle} onClick={handleReset}><em>Continue</em></button>
  </div>
}

function ScoreBoard({handleReset,result}){
  let first=["X:",result[0],"table-primary"];
  let second=["O:",result[1],"table-danger"];
  if(result[0]>result[1]){
    first=["X:",result[0],"table-primary"];
    second=["O:",result[1],"table-danger"];
  }else {
    first=["O:",result[1],"table-danger"];
    second=["X:",result[0],"table-primary"];
  }
  return <table className="table fs-5 text-center">
    <thead>
    <tr>
      <th colSpan="2" className="table-warning ">Score:</th>
    </tr>
    </thead>
    <tbody className="table-group-divider ">
    <tr>
      <td className={first[2]}>{first[0]}</td>
      <td className={first[2]}>{first[1]}</td>
    </tr>
    <tr>
      <td className={second[2]}>{second[0]}</td>
      <td className={second[2]}>{second[1]}</td>
    </tr>
    </tbody>
    <tfoot className="">
    <td></td>
    <td className="d-flex flex-row-reverse pt-5"><button className="btn btn-outline-success btn-lg mt-5 p-3 px-4" onClick={handleReset}>Reset</button></td>
    </tfoot>
  </table>
}

function Board(){
  const [square,setSquare]=useState(Array(9).fill(null));
  const [xIsNext,setXIsNext]=useState(true);
  const [result,setResult]=useState([0,0,0]);
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  function handleReset(j=0){
    setSquare(Array(9).fill(null));
    if(status==="Draw!!!"){
      setResult([result[0],result[1],result[2]+1]);
    }else if(status.includes("X")){
      setResult([result[0]+1,result[1],result[2]]);
    }else{
      setResult([result[0],result[1]+1,result[2]]);
    }
    setXIsNext(true);
    if(j==1){
      setResult([0,0,0]);
    }

  }
  function handleClick(i){
    if(square[i] || calculateWinner(square)){
      return;
    }
    const nextSquare=square.slice();
    if(xIsNext){
      nextSquare[i]="X";
    }else {
      nextSquare[i]="O";
    }
    setXIsNext(!xIsNext);
    setSquare(nextSquare);
  }
  const winner=calculateWinner(square);
  let status;
  if(winner) {
    status = winner + " is the Winner.";
    if(winner==="X"){
      // setResult([result[0]+1,result[1],result[2]]);
    }else {
      //setResult([result[0],result[1]+1,result[2]]);

    }
  }else if(square.includes(null)){
    status=(xIsNext ? "X":"O")+"'s turn."
  }else{
    status="Draw!!!"
  }
  return <div className="row  align-items-center justify-content-center pt-xl-5">
      <div className="btn-group-vertical btn-group-lg  p-3 col-7  ">
    {/*<h1 className="display-1  mb-5 m-auto border border-black">{status}<span className="p-2 justify-content-end"><button>reset</button></span></h1>*/}
    {/*<button className="visually-hidden">adfw </button>*/}
      <StatusBar status={status} handleReset={handleReset} />
      <div className="btn-group btn-group-lg ">
        <Square value={square[0]} squareClick={()=>handleClick(0)}/>
        <Square value={square[1]} squareClick={()=>handleClick(1)}/>
        <Square value={square[2]} squareClick={()=>handleClick(2)}/>
      </div>
      <div className="btn-group btn-group-lg ">
        <Square value={square[3]} squareClick={()=>handleClick(3)}/>
        <Square value={square[4]} squareClick={()=>handleClick(4)}/>
        <Square value={square[5]} squareClick={()=>handleClick(5)}/>
      </div>
      <div className="btn-group btn-group-lg ">
        <Square value={square[6]} squareClick={()=>handleClick(6)}/>
        <Square value={square[7]} squareClick={()=>handleClick(7)}/>
        <Square value={square[8]} squareClick={()=>handleClick(8)}/>
      </div>
    </div>
      <div className="col-3 pt-xl-5">
      <ScoreBoard result={result} handleReset={()=>handleReset(1)} />
    </div>
    </div>
}
function App() {

  return <Board/>

}
export default App;
