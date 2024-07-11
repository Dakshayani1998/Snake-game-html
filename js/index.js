//game constants and variables
let inputDir ={x:0,y:0};
const foodsound= new Audio('food.mp3.mp3');
const gameOverSound = new Audio ('game end.mp3');
const MoveSound = new Audio('directio9in change.mp3');
const musicsound = new Audio('game main.mp3');
let speed=4;
let score=0;
let lastpaintTime =0;
let snakeArr=[
    {x:13,y:15}
]
food = {x:6, y:7};

// game functions
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime - lastpaintTime)/1000 < 1/speed){
        return;
    }
    lastpaintTime = ctime;
    gameEngine();
   
}

function isCollide(snake){
    // if u bump into urself
    for(let i=1; i<snakeArr.length; i++) {
        if(snake[i].x=== snake[0].x && snake[i].y===snake[0].y){
            return true;
          
        }
    }
    // if you bump into the wall   
        if(snake[0].x>= 18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0){
            return true;
        }
    
}

function gameEngine(){
    //Part1: Updating the snake array& food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicsound.pause();
        inputDir ={ x:0 , y:0};
        alert(" Game Over. Press any key to play again!");
        snakeArr =[{x:13,y:15}];
        musicsound.play();
        score =0;
    }
   
    // if you have eaten the food, increment the score and regenerate the food
      
    if(snakeArr[0].y=== food.y && snakeArr[0].x===food.x){
        foodsound.play();
        score+=1;
        if(score>hiscoreval){
            hiscoreval= score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML ="High Score:" + hiscoreval;
        }
        speed+=1;
        scoreBox.innerHTML =" Score:" +score;
        snakeArr.unshift({x:snakeArr[0].x +inputDir.x, y:snakeArr[0].y+inputDir.y});
        let a=2;
        let b=16;
        food={x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())}
    }
     // Moving the snake
     musicsound.play();
     for(let i= snakeArr.length -2; i>=0; i--){
        snakeArr[i+1]= {...snakeArr[i]};
     } 
     
     snakeArr[0].x += inputDir.x;
     snakeArr[0].y += inputDir.y;

    //Part2 : Display The snake and food
    // Display the snake
    board.innerHTML="";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart= e.x;
        
        if(index==0){
            snakeElement.classList.add('head');
        }
        else{
           snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // Display the food
   foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart= food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
}












//game logic main starts here
let hiscore= localStorage.getItem("hiscore");
if(hiscore===null){
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
}
else{
    hiscoreval= JSON.parse(hiscore);
    hiscoreBox.innerHTML="High Score:"+hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir = { x:0,y:1} // start the game
    MoveSound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        
        case "ArrowDown":
            console.log("ArrowDownp");
            inputDir.x =0;
            inputDir.y =1;
            break;
                
                
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x= -1;
            inputDir.y= 0;
            break;
                    
                    
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x= 1;
            inputDir.y = 0;
            break;
        default:
            break;            
    }
})