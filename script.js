// Array to represent the input matrix
let matrix = [];

function resizeMatrix() {
  // Get matrix size from input fields
  const rows = document.getElementById("rowInput").value;
  const columns = document.getElementById("columnInput").value;

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
  // Fill empty cells with values
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      // Check for empty cell
      if (matrix[i][j].value == "") {
        matrix[i][j].value = 0;
      }
    }
  }

  // Show Contents
  document.getElementById("computation").classList.remove("is-hidden");
}
