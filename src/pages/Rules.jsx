import React from "react";
import "./Form.css";

export default function Rules() {
  return (
    <div className="form-container" style={{maxWidth: '700px'}}>
      <h1>Game Rules</h1>
      
      <div style={{textAlign: 'left', lineHeight: '1.8', color: 
'#334155'}}>
        <p>
          The objective of Sudoku is to fill a grid with digits so that 
each column, each row, and each of the subgrids (also called "boxes") 
contains all of the digits from 1 to 9.
        </p>

        <h3 style={{color: '#3b82f6', marginTop: '20px'}}>1. Rows</h3>
        <p>Every row must contain the numbers 1 through 9 (or 1-6 for Easy 
mode) without repetition.</p>

        <h3 style={{color: '#3b82f6'}}>2. Columns</h3>
        <p>Every column must contain the numbers 1 through 9 without 
repetition.</p>

        <h3 style={{color: '#3b82f6'}}>3. Subgrids (Boxes)</h3>
        <p>
          Every 3x3 box (or 2x3 for Easy mode) must contain the numbers 1 
through 9 without repetition.
        </p>

        <div style={{backgroundColor: '#f1f5f9', padding: '15px', 
borderRadius: '8px', marginTop: '30px'}}>
          <strong>Tip:</strong> Cells that are part of the original puzzle 
are <span style={{backgroundColor:'#ddd', padding:'2px 6px', 
borderRadius:'4px', fontWeight:'bold'}}>Fixed</span> and cannot be 
changed. If you make a mistake, the cell will turn <span 
style={{color:'red', backgroundColor:'#ffe6e6', padding:'2px 6px', 
borderRadius:'4px'}}>Red</span>.
        </div>
      </div>
    </div>
  );
}
