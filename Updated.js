const readline = require('readline-sync');

const rows = 5;
const cols = 5;

// Define color namesabc.js
const colorNames = ["BLUE  ", "GREEN ", "RED   ", "YELLOW", "PURPLE"];

// Function to generate a valid queen placement
function generateSolution() {
    let mat = Array.from({ length: rows }, () => new Array(cols).fill(0));
    let queenPositions = [];
    let usedCols = new Set();  // Ensure one queen per column

    for (let r = 0; r < rows; r++) {
        let c;
        do {
            c = Math.floor(Math.random() * cols);
        } while (usedCols.has(c)); // Prevent duplicate columns

        usedCols.add(c);
      
        queenPositions.push([r, c]);
    }

    return { mat, queenPositions };
}


// Function to generate connected color regions
function generateColorRegions(queenPositions) {
    let colorMatrix = Array.from({ length: rows }, () => new Array(cols).fill(0));
    let queue = [];

    // Assign unique regions to queen positions first
    queenPositions.forEach(([r, c], index) => {
        let regionID = index + 1; // Each queen starts a region
        colorMatrix[r][c] = regionID;
        queue.push([r, c]);
    });

    // Expand regions dynamically using BFS
    while (queue.length > 0) {
        let [r, c] = queue.shift();
        
        // Movement directions (up, down, left, right)
        [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dr, dc]) => {
            let nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && colorMatrix[nr][nc] === 0) {
                colorMatrix[nr][nc] = colorMatrix[r][c]; // Spread the same region
                queue.push([nr, nc]);
            }
        });
    }

    return colorMatrix;
}


// Generate initial board
const { mat, queenPositions } = generateSolution();
const colorMatrix = generateColorRegions(queenPositions);

// Map region numbers to color names
const colorRegions = colorMatrix.map(row => row.map(num => colorNames[num - 1] || "WHITE"));

console.log("Initial Board with Color Regions:");
colorRegions.forEach(row => console.log(row));

// Function to check if placing a queen is safe
function isSafe(r, c, mat, colorMatrix) {
    if (mat[r][c] === 1) return false; // Already occupied

    // Check row
    for (let j = 0; j < cols; j++) {
        if (mat[r][j] === 1) return false;
    }

    // Check column
    for (let i = 0; i < rows; i++) {
        if (mat[i][c] === 1) return false;
    }

    // Check diagonals
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (mat[i][j] === 1 && Math.abs(i - r) === Math.abs(j - c)) {
                return false;
            }
        }
    }

    // Check color region
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (mat[i][j] === 1 && colorMatrix[i][j] === colorMatrix[r][c]) {
                return false;
            }
        }
    }
    return true;
}

// Function to display the board
function printMat() {
    mat.forEach(row => console.log(row));
}

let q = 0;
while (q < 5) {
    const a = parseInt(readline.question("Enter row index: "));
    const b = parseInt(readline.question("Enter column index: "));

    if (a < 0 || a >= rows || b < 0 || b >= cols) {
        console.log("Invalid Index, please enter a valid index.");
        continue;
    }

    if (isSafe(a, b, mat, colorMatrix)) {
        mat[a][b] = 1;
        q++;
        printMat();
    } else {
        console.log("Invalid Move!! Try again.");
    }
}

console.log("\nFinal Board:");
printMat();







