let lastClicked =0 ,count =0,rows1,max;
let elapsedTime;
let highscore;
let interval, startTime;
console.log(localStorage.getItem('highscore'));
if(localStorage.getItem('highscore') == null){
    localStorage.setItem('highscore','999');
}
function checkHighScore(elapsedTime){
if(elapsedTime/1000 < Number(localStorage.getItem('highscore'))){
    highscore = elapsedTime/1000;
    localStorage.setItem('highscore',highscore.toFixed(3));
}
}

function startTimer(){
    startTime = Date.now(),
    interval = setInterval(function() {
        elapsedTime = Date.now() - startTime;
        document.getElementById("timer").innerHTML = (elapsedTime / 1000).toFixed(3);
    }, 100);
}


function createTable(rows){
    let grid =document.createElement('table'),
    tr,cell, k=0,
    // max=rows*rows;
    arr = randomArray(rows);
   rows1 =rows;
    grid.id = 'myTable';
    for(let i=0;i<rows;i++)
    {
        tr=grid.insertRow();
        for(let j=0;j<rows;j++){
            cell=tr.appendChild(document.createElement('td'));
            cell.innerHTML= arr[k++];
            cell.addEventListener('click',checkClick);
        }
    }
    document.getElementById("tableSpace").appendChild(grid);
    let td =document.getElementById('myTable').classList.add('fadeIn');
    // td[0].classList.add('fadeIn');
}
// clearInterval(interval);
function playAudio(src) {
    new Audio(src).play();
  }
function checkClick(){
   if(lastClicked == 0){
       startTimer();
   }
    if(this.innerHTML ==lastClicked+1){
       playAudio('Ding-sound-effect.mp3');
       this.innerHTML = '';
       this.style.backgroundColor = 'grey';
       lastClicked++;
       count++;
   }else{
       playAudio('Game-show-buzzer-sound-effect.mp3');

   }
   if(count == rows1*rows1){ 
       clearInterval(interval);
       checkHighScore(elapsedTime);
       document.getElementById('myTable').remove();
       document.getElementById('timer').innerHTML  = '';
       document.getElementById('timeDisplay').style.display = 'block';
       document.getElementById('timeDisplay').innerHTML = "Your time: " + ((elapsedTime / 1000).toFixed(3)).toString();
       document.getElementById('highscore').style.display = 'inline';
       document.getElementById('highscore').innerHTML = 'HIGHSCORE:' +  localStorage.getItem('highscore');
       document.getElementById('gameMode').style.display = 'block';
   }
}


function randomArray(n){
 let arr = [];
 
 for(let i=0;i<n*n;i++){
     arr[i] = i +1;
    }
     
    for ( i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
   return arr;
}

function shuffleTable(){
    let allCells = document.getElementsByTagName('td');

    for(let i=allCells.length -1; i>0 ;i--){
        let j = Math.floor(Math.random() * (i + 1));
        if(allCells[i].style.backgroundColor != 'grey' && allCells[j].style.backgroundColor != 'grey'){
        let temp = allCells[i].innerHTML;
        allCells[i].innerHTML = allCells[j].innerHTML;
        allCells[j].innerHTML = temp;}
    }
}

// createTable(3);

let btnEasy = document.getElementById('btnEasy'),
    btnIntermediate = document.getElementById('btnIntermediate'),
    btnExpert = document.getElementById('btnExpert');

    btnEasy.addEventListener('click',() => {
        document.getElementById('gameMode').style.display = 'none';
        lastClicked = 0;
        count=0;
        createTable(3);
    })

    btnIntermediate.addEventListener('click',() => {
        document.getElementById('gameMode').style.display = 'none';
        lastClicked = 0;
        count=0;
        createTable(4);
        setInterval(shuffleTable, 6000);
    })

    btnExpert.addEventListener('click',() => {
        document.getElementById('gameMode').style.display = 'none';
        lastClicked = 0;
        count=0;
        createTable(5);
        document.getElementById('myTable').classList.add('expert-fadeIn');
        setInterval(shuffleTable, 4000);
    })





// btnStrt.addEventListener('click',() =>{
//     btnStrt.style.display = 'none';
//     createTable(3);
// });

// btn.addEventListener('click',()=>{
    // document.getElementById('timeDisplay').style.display = 'none';
    // document.getElementById('highscore').style.display = 'none';
    // lastClicked = 0;
    // count=0;
//     createTable(4);
//     setInterval(shuffleTable, 6000);
// });