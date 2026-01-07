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
    for (let j = 0; j < columns; j++) {
      const input = document.createElement("input");
      input.type = "number";;
      input.id = `cell-${i}-${j}`;
      input.placeholder = "0";
      input.className = "matrix-cell";

      grid.appendChild(input);
    }
  }

}

// Default to a 2x2 grid
window.onload = resizeMatrix;
