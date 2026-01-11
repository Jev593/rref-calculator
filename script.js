// Array to represent the input matrix
let matrix = [];

function resizeMatrix() {
  // Get matrix size from input fields
  const rows = document.getElementById("rowInput").value;
  const columns = document.getElementById("columnInput").value;

  // Clear matrix
  matrix = [];

  // Clear previous input
  const grid = document.getElementById("input-grid");
  grid.innerHTML = "";
  grid.style.display = "grid";
  grid.style.gridTemplateColumns = `repeat(${columns}, auto)`;

  // Generate grid
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < columns; j++) {
      const input = document.createElement("input");
      input.type = "number";
      input.id = `cell-${i}-${j}`;
      input.placeholder = "0";
      input.className = "matrix-cell";

      // Append input to grid and column
      grid.appendChild(input);
      row[j] = input;
    }
    matrix[i] = row;
  }

}

// Default to a 2x2 grid
window.onload = resizeMatrix;

function clearAll() {
  // Nested for loop implementation
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      matrix[i][j].value = ""; 
    }
  }

  // Reset computation
  document.getElementById("computation").classList.add("is-hidden");
}

function compute() {
  // 1. Create a clean numerical copy of the CURRENT matrix size
  let data = [];
  for (let i = 0; i < matrix.length; i++) {
    data[i] = [];
    for (let j = 0; j < matrix[i].length; j++) {
      let val = parseFloat(matrix[i][j].value);
      data[i][j] = isNaN(val) ? 0 : val;
      
      // Fill the UI with 0 if it was empty
      if (matrix[i][j].value === "") matrix[i][j].value = 0;
    }
  }

  // 2. Run the math on the 'data' array, not the 'matrix' array
  let refData = getRREF(JSON.parse(JSON.stringify(data)), false);
  let rrefData = getRREF(JSON.parse(JSON.stringify(data)), true);

  // 3. Display
  document.getElementById("ref-matrix").innerHTML = formatMatrix(refData);
  document.getElementById("rref-matrix").innerHTML = formatMatrix(rrefData);
  document.getElementById("computation").classList.remove("is-hidden");
}

function getRREF(matrix, reduced) {
  let rows = matrix.length;
  let cols = matrix[0].length;
  let pivot = 0;

  for (let r = 0; r < rows; r++) {
    if (pivot >= cols) break;
    let i = r;

    // Find the best pivot (partial pivoting)
    while (matrix[i][pivot] === 0) {
      i++;
      if (i === rows) {
        i = r;
        pivot++;
        if (pivot === cols) return matrix;
      }
    }

    // Swap rows
    [matrix[i], matrix[r]] = [matrix[r], matrix[i]];

    // Normalize pivot row
    let val = matrix[r][pivot];
    for (let j = 0; j < cols; j++) matrix[r][j] /= val;

    // Eliminate other rows
    for (let i = 0; i < rows; i++) {
      if (i !== r) {
        // For REF, only eliminate rows BELOW the pivot
        if (!reduced && i < r) continue; 
        
        let factor = matrix[i][pivot];
        for (let j = 0; j < cols; j++) {
          matrix[i][j] -= factor * matrix[r][j];
        }
      }
    }
    pivot++;
  }
  return matrix;
}

/**
 * Converts a 2D array into a pretty-printed string for HTML
 */
function formatMatrix(mat) {
  return mat.map(row => {
    const formattedRow = row.map(num => {
      // Round to 2 decimal places to keep it clean
      let displayNum = Number.isInteger(num) ? num : num.toFixed(2);
      return displayNum;
    }).join(" ");
    return `[${formattedRow}]`;
  }).join("<br>");
}
