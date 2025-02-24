let N

function getbox(){
    let inp=document.getElementById("boxInput")
    N = parseInt(inp.value)
    let divb = document.getElementById("board")
    divb.innerHTML=""
    initializeGame(N)

}
        let colorMatrix = Array.from({ length: N }, () => new Array(N).fill(0)); 
        let queenPositions = [];

        function initializeGame(N) {
            colorMatrix = Array.from({ length: N }, () => new Array(N).fill(0));
            mat = Array.from({ length: N }, () => new Array(N).fill(0));
            queenPositions = [];
        
            placeQueen(0, mat, [],N);
            const colors = assignRegions(N);
            creatMat(colors,N);
            safeBoard(N);
        }
        
        //to get random color from rgb
        function getRandomColor() {
            const randomValue = () => Math.floor(Math.random() * 256);
            const randomValue1 = () => Math.floor(Math.random() * 256);
            const randomValue2 = () => Math.floor(Math.random() * 256);
        
            return `rgb(${randomValue()}, ${randomValue1()}, ${randomValue2()})`}
            
        //function to generate solution using backtracking algorithm
        function placeQueen(row, board, queens,N) {
            if (row === N) {
                queenPositions = [...queens];
                return true;
            }
            for (let col = 0; col < N; col++) {
                if (isSafe(row, col, board,N)) {
                    board[row][col] = 1;
                    queens.push([row, col]);

                    if (placeQueen(row + 1, board, queens,N)) return true;

                    board[row][col] = 0;
                    queens.pop();
                }
            }
            return false;
        }
        
        //function to check weather the queen is safe or not       
        function isSafe(r, c, board,N) {
            for (let i = 0; i < N; i++) {
                if (board[r][i] === 1 || board[i][c] === 1) return false;
            }
            for (let i = 0; i < N; i++) {
                for (let j = 0; j < N; j++) {
                    if (board[i][j] === 1 && Math.abs(i - r) === Math.abs(j - c)) return false;
                }
            }
            return true;
        }

        function assignRegions(N) {
            let queue = [];
            let regionColors = {};
            let regionID = 1; // number the region 

            // select the start point for region
            for (let i = 0; i < N; i++) { 
                let r, c;
                do {
                    r = Math.floor(Math.random() * N);
                    c = Math.floor(Math.random() * N);
                } while (colorMatrix[r][c] !== 0); // to check if it is empty 
        
                queenPositions.forEach(([r, c]) => {
                    colorMatrix[r][c] = regionID;
                    queue.push([r, c]);
                    regionColors[regionID] = getRandomColor();
                    regionID++;
                });
            }
        
            // Spread each region
            while (queue.length > 0) {
                let [r, c] = queue.shift();
                let validMove = [[1, 0], [-1, 0], [0, 1], [0, -1]];

                validMove.sort(() => Math.random() - 0.5)
        
                validMove.forEach(([dr, dc]) => {
                    let nr = r + dr, nc = c + dc;
                    if (nr >= 0 && nr < N && nc >= 0 && nc < N && colorMatrix[nr][nc] === 0) {
                        colorMatrix[nr][nc] = colorMatrix[r][c]; // Spread region ID
                        queue.push([nr, nc]);
                    }
                });
            }
            return regionColors;
        }
        

        function creatMat(colors,N) {
            safeBoard(N)
            const matdiv = document.getElementById("board");
            const table = document.createElement("table");
            table.className=table

            
            for (let i = 0; i < N; i++) {
                const rowt = document.createElement("tr");
                for (let j = 0; j < N; j++) {
                    const cell = document.createElement("td");
                    cell.dataset.row = i;
                    cell.dataset.col = j;
                    let regionID = colorMatrix[i][j];
                    cell.style.background = colors[regionID] || "white"; 
                    rowt.appendChild(cell);
                }
                table.appendChild(rowt);
            }

            matdiv.innerHTML = "";
            matdiv.appendChild(table);
        }

        let mat = Array.from({ length: N }, () => new Array(N).fill(0));
        placeQueen(0, mat, []);
        const colors = assignRegions(N); // assign colors 
        creatMat(); //  create the board

        function safeBoard(N) {
            document.getElementById("board").addEventListener("click", function(event) {
                let cell = event.target;
                let row = parseInt(cell.dataset.row);
                let col = parseInt(cell.dataset.col);
        
                // it will check weather there is already a queen
                if (mat[row][col] === 1) {
                    mat[row][col] = 0
                    queenPositions = queenPositions.filter(([r,c]) => r!== row || c!== col)
                    cell.textContent = "" 
                    return
                }
        
                // check safe position 
                if (isSafe(row, col, mat,N)) {
                    mat[row][col] = 1; // 
                    queenPositions.push([row, col]); // used to store queen position
                    cell.textContent = "👑"; 
                    cell.style.fontSize = "30px";
                    cell.style.textAlign = "center";
                } 
                else {
                    alert("Invalid move!!!");
                    return
                }

                
            });
        }

        function showWin() {
            let winbox = document.getElementById("winbox");
            winbox.style.display = "flex";  // Show the win message box
        
            document.getElementById("playAgainBtn").addEventListener("click", function () {
                winbox.style.display = "none";  
                initializeGame(N);  
            });
        }
        creatMat(N);
        safeBoard(N);
        



        














    
    