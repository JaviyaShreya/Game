const readline = require('readline-sync');

const color = [
    [1, 1, 1, 1, 1],
    [1, 2, 2, 2, 3],
    [1, 2, 2, 2, 3],
    [1, 4, 4, 4, 5],
    [1, 5, 5, 5, 5],
  ];
  
const rows = 5;
const cols = 5;
const mat = Array.from({ length: rows }, () => new Array(cols).fill(0));

function isSafe(rows,cols,mat,color){
    let size = mat.length
   
    // checking for rows
    for(let i=0;i<size;i++){
        if(mat[rows][i] == 1) return false
    }

    //checking for cols
    for(let j=0;j<size;j++){
        if(mat[j][cols] == 1) return false
    }

    //checking for edges
    for(let i=0;i<size;i++){
        for(let j=0;j<size;j++){
            if(mat[i][j] == 1 && Math.abs(i - rows) === Math.abs(j - cols)){
                return false
            }
        }
    }

    //checking for color region
    for(let i=0;i<size;i++){
        for(let j=0;j<size;j++){
            if(mat[i][j] == 1 && color[i][j] == color[rows][cols]){
                return false
            }
        }
    }
    return true
}


function printmat(){
    //mat.forEach(row => console.log(row.join(" ")));
    mat.forEach(row => console.log(row))
}
console.log("Initial Board!")
console.log(color)//shows initial board with region


q=0

while(q<5){
   
    const a = parseInt(readline.question("Enter first value: "));  // Prompt user
    const b = parseInt(readline.question("Enter second value: ")); // Prompt user

   

    if(a<0 || a>=rows || b<0 || b>=cols){
        console.log("Invalid Index, please Enter Valid Index")
        continue;
    }

    if(isSafe(a,b,mat,color)){
        mat[a][b] = 1
        q++
        printmat()
   
    }
    else{
        console.log("Invalid Move!!")
      
    }


    
}





// if(a>=0 && a<rows && b>=0 && b<cols){
//     mat[a][b] = 1
// }
// else{
//     cpnsole.log("Invalid Index, Please inter valid index")
// }






