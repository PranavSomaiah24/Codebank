let lastClicked =0 ,count =0,rows1,max;
let elapsedTime;
let modes = ['easy1','easy2', 'easy3','medium1','medium2', 'medium3','hard1', 'hard2', 'hard3'],
easy = ['easy1','easy2', 'easy3'], medium = ['medium1','medium2', 'medium3'], hard = ['hard1', 'hard2', 'hard3'];
let interval, startTime;
let appendNumberMax, appendNumber;
let r,b;

for(let e of modes)
if(localStorage.getItem(e) == null){
    localStorage.setItem(e,'0.000');
}

function checkHighScore(elapsedTime){
    let check = elapsedTime;
if(rows1==3){
    for(let e of easy){  
        if(check/1000 < Number(localStorage.getItem(e)) || Number(localStorage.getItem(e)) == 0.000){
            highscore = check/1000;
            check = Number(localStorage.getItem(e))*1000;
            localStorage.setItem(e, highscore.toFixed(3));}}
}else if(rows1 == 4){
    for(let e of medium){
        if(check/1000 < Number(localStorage.getItem(e)) || Number(localStorage.getItem(e)) == 0.000){
            highscore = check/1000;
            check = Number(localStorage.getItem(e))*1000;
            localStorage.setItem(e,highscore.toFixed(3));}}
}else if (rows1 == 5){
    for(let e of hard)
    if(check/1000 < Number(localStorage.getItem(e)) || Number(localStorage.getItem(e)) == 0.000){
        highscore = check/1000;
        check = Number(localStorage.getItem(e))*1000;
        localStorage.setItem(e, highscore.toFixed(3));}
}
}

function startTimer(){
    startTime = Date.now(),
    interval = setInterval(function() {
        elapsedTime = Date.now() - startTime;
        document.getElementById("timer").innerHTML = (elapsedTime / 1000).toFixed(3);
    }, 100);
}
function RGB2HTML(red, green, blue)
{
    var decColor =0x1000000+ blue + 0x100 * green + 0x10000 *red ;
    return '#'+decColor.toString(16).substr(1);
}
function colourGradient(){
    let allCells = document.getElementsByTagName('td');
    r =170,b =155;

    for(let i=0,max=allCells.length; i<max ;i++){
        allCells[i].style.backgroundColor = RGB2HTML(r, 0, b);
        if(rows1 == 3){
            r-= 10;
            b-=10;
        }else{
        r-=3;
        b-=3;
        }
    }
}

function createTable(rows){
    let grid =document.createElement('table'),
    tr,cell, k=0;
    document.getElementById('timeDisplay').style.display = 'none';
    arr = randomArray(rows);
    rows1 =rows;
    appendNumberMax = rows*2;
    appendNumber = (rows*rows) + 1;
    grid.id = 'myTable';
    for(let i=0;i<rows;i++)
    {
        tr=grid.insertRow();
        for(let j=0;j<rows;j++){
            cell=tr.appendChild(document.createElement('td'));
            cell.innerHTML= arr[k++];
            cell.addEventListener('click', checkClick);
        }
    }
    document.getElementById("tableSpace").appendChild(grid);
    colourGradient();
    shuffleTable();
    
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
    //    if(rows1 ==5){
    //     document.getElementById('myTable').classList.add('expert-fadeIn');
    //    }
   }
    if(this.innerHTML ==lastClicked+1){
       playAudio('Ding-sound-effect.mp3');
       lastClicked++;
       count++;
       if(count <= appendNumberMax){
        this.innerHTML = appendNumber++;
        this.style.backgroundColor = RGB2HTML(r, 0, b);
        r-=5;
        b-=5;
       }
       else{
       this.innerHTML = '';
       this.style.backgroundColor = 'grey';
       }
    }else {
        playAudio('Game-show-buzzer-sound-effect.mp3');
    }
   if(count == rows1*rows1 + appendNumberMax){ 
       clearInterval(interval);
       checkHighScore(elapsedTime);
       document.getElementById('myTable').remove();
       document.getElementById('timer').innerHTML  = '';
       document.getElementById('timeDisplay').style.display = 'block';
       document.getElementById('timeDisplay').innerHTML = "Your time: " + ((elapsedTime / 1000).toFixed(3)).toString();
       document.getElementById('highscoreEasy').innerHTML = 'Highscore Easy: ' +  localStorage.getItem('easy1');
       document.getElementById('highscoreMedium').innerHTML = 'Highscore Intermediate: ' +  localStorage.getItem('medium1');
       document.getElementById('highscoreHard').innerHTML = 'Highscore Expert: ' +  localStorage.getItem('hard1');
       document.getElementById('hTable').style.display = 'block'; 
       displayHTable(rows1);   
       //    document.getElementById('gameMode').style.display = 'block';
   }
}


function randomArray(n){
 let arr = [];
 
 for(let i=0;i<n*n;i++){
     arr[i] = i +1;
    }
   return arr;
}

function shuffleTable(){
    let allCells = document.getElementsByTagName('td');

    for(let i=allCells.length -1; i>0 ;i--){
        let j = Math.floor(Math.random() * (i + 1));
        if(allCells[i].style.backgroundColor != 'grey' && allCells[j].style.backgroundColor != 'grey'){
        let temp = allCells[i].innerHTML, tempBg=allCells[i].style.backgroundColor;
        allCells[i].innerHTML = allCells[j].innerHTML;
        allCells[i].style.backgroundColor = allCells[j].style.backgroundColor;
        allCells[j].innerHTML = temp;
        allCells[j].style.backgroundColor = tempBg;}
    }
}

// createTable(3);

let btnEasy = document.getElementById('btnEasy'),
    btnIntermediate = document.getElementById('btnIntermediate'),
    btnExpert = document.getElementById('btnExpert'),
    btnMenu = document.getElementById('btnMenu');

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
        // setInterval(shuffleTable, 6000);
    })

    btnExpert.addEventListener('click',() => {
        document.getElementById('gameMode').style.display = 'none';
        lastClicked = 0;
        count=0;
        createTable(5);
    })

    btnMenu.addEventListener('click', () => {
        document.getElementById('hTable').style.display = 'none';
        document.getElementById('gameMode').style.display = 'block';
    })
    
    function displayHTable(rows1){
        let scores = document.getElementById('scores'),
        score = scores.getElementsByTagName('p'), i=0;
        // console.log(score[i].innerHTML);
        switch(rows1){
            case 3: for(let e of easy){
                        score[i].innerHTML = (i+1).toString() + ' - ' + localStorage.getItem(e); i++;
                    } break;
            case 4: for(let e of medium){
                        score[i].innerHTML = (i+1).toString() +' - ' + localStorage.getItem(e); i++;
                     } break;
            case 5: for(let e of hard){
                        score[i].innerHTML = (i+1).toString() +' - ' + localStorage.getItem(e); i++;
                    } break;
        }
    }
    console.log( localStorage.getItem('easy1'));
    document.getElementById('highscoreEasy').innerHTML = 'Highscore Easy: ' +  localStorage.getItem('easy1');
    document.getElementById('highscoreMedium').innerHTML = 'Highscore Intermediate: ' +  localStorage.getItem('medium1');
    document.getElementById('highscoreHard').innerHTML = 'Highscore Expert: ' +  localStorage.getItem('hard1');