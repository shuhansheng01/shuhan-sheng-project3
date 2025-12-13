import React from 'react';
import "./Form.css"; 

export default function Rules() {
  // 最终的内联样式修复，避免字符串中断
  const tipBoxStyle = {
    marginTop: '30px',
    padding: '15px',
    borderLeftWidth: '5px', // 分解样式属性
    borderLeftStyle: 'solid', // 分解样式属性
    borderLeftColor: '#ffc107', // 分解样式属性
    backgroundColor: '#fffbe6'
  };

  return (
    <div className="scores-container" style={{ textAlign: 'left' }}>
      <h1>Game Rules</h1>
      <p>
        The objective of Sudoku is to fill a grid with digits so that each 
column, each row, and each of the
        subgrids (also called "boxes") contains all of the digits from 1 
to 9.
      </p>

      <h2>1. Rows</h2>
      <p>
        Every row must contain the numbers 1 through 9 (or 1-6 for Easy 
mode) without repetition.
      </p>

      <h2>2. Columns</h2>
      <p>
        Every column must contain the numbers 1 through 9 without 
repetition.
      </p>

      <h2>3. Subgrids (Boxes)</h2>
      <p>
        Every 3x3 box (or 2x3 for Easy mode) must contain the numbers 1 
through 9 without repetition.
      </p>

      <div style={tipBoxStyle}>
        <strong>Tip:</strong> Cells that are part of the original puzzle 
are 
        <strong style={{ color: 'blue' }}> Fixed </strong> and cannot be 
changed. If you make 
        a mistake, the cell will turn <strong style={{ color: 'red' }}> 
Red </strong>.
      </div>
    </div>
  );
}
