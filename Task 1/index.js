let lastClicked =0 ,count =0,rows1,max;
let elapsedTime;
let modes = ['easy1','easy2', 'easy3','medium1','medium2', 'medium3','hard1', 'hard2', 'hard3','C1','C2','C3'],
easy = ['easy1','easy2', 'easy3'], medium = ['medium1','medium2', 'medium3'], hard = ['hard1', 'hard2', 'hard3'];conveyor=['C1','C2','C3'];
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
    }else{
        for(let e of conveyor)
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

function colourGradient(cell){
    let allCells = document.getElementsByTagName(cell);
    r =170,b =155;

    for(let i=0,max=allCells.length; i<max ;i++){
        allCells[i].style.backgroundColor = RGB2HTML(r, 0, b);
        if(rows1 == 3){
            r-= 10;
            b-=10;
        }else{
            r-=1;
            r-=1;}    
}}

function createTable(rows){
    let grid =document.createElement('table'),
    tr,cell, k=0;
    document.getElementById('timeDisplay').style.display = 'none';
    arr = randomArray(rows);
    rows1 =rows;
    appendNumberMax = rows*rows*(rows1%3);
    max=rows*rows+rows*rows*(rows1%3);
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
    colourGradient('td');
    shuffleTable('td');
}

function playAudio(src) {
    new Audio(src).play();
  }

  function checkClick(){
   if(lastClicked == 0){
       startTimer();
   }
    if(this.innerHTML ==lastClicked+1){
       playAudio('Ding-sound-effect.mp3');
       lastClicked++;
       count++;
       if(count <= appendNumberMax){
        this.innerHTML = appendNumber++;
        this.style.backgroundColor = RGB2HTML(r, 0, b);
        r-=2;
        b-=2;
       }
       else{
       this.innerHTML = '';
       this.style.backgroundColor = 'grey';
       }
    }else {
        playAudio('Game-show-buzzer-sound-effect.mp3');
    }
   if(count == max){ 
       clearInterval(interval);
       checkHighScore(elapsedTime);

       if(max!=60){document.getElementById('myTable').remove();}
       else{document.getElementById('conveyor').style.display='none';
       clearInterval(i1);clearInterval(i2);clearInterval(i3);clearInterval(i4);
       let element = document.getElementsByTagName("button"), index;
       for (index = element.length - 1; index >= 0; index--) {
           element[index].parentNode.removeChild(element[index]);
       }}

       document.getElementById('timer').innerHTML  = '';
       document.getElementById('timeDisplay').style.display = 'block';
       document.getElementById('timeDisplay').innerHTML = "Your time: " + ((elapsedTime / 1000).toFixed(3)).toString();
       document.getElementById('highscoreEasy').innerHTML = 'Highscore Easy: ' +  localStorage.getItem('easy1');
       document.getElementById('highscoreMedium').innerHTML = 'Highscore Intermediate: ' +  localStorage.getItem('medium1');
       document.getElementById('highscoreHard').innerHTML = 'Highscore Expert: ' +  localStorage.getItem('hard1');
       document.getElementById('hTable').style.display = 'block'; 
       displayHTable(rows1);   
   }
}


function randomArray(n){
 let arr = [];
 for(let i=0;i<n*n;i++){
     arr[i] = i +1;
    }
   return arr;
}

function shuffleTable(cell){
    let allCells = document.getElementsByTagName(cell);

    for(let i=allCells.length -1; i>0 ;i--){
        let j = Math.floor(Math.random() * (i + 1));
        if((allCells[i].style.backgroundColor != 'grey' && allCells[j].style.backgroundColor != 'grey') && (allCells[i].innerHTML!='' && allCells[j].innerHTML!='')){
        let temp = allCells[i].innerHTML, tempBg=allCells[i].style.backgroundColor;
        allCells[i].innerHTML = allCells[j].innerHTML;
        allCells[i].style.backgroundColor = allCells[j].style.backgroundColor;
        allCells[j].innerHTML = temp;
        allCells[j].style.backgroundColor = tempBg;}
    }
}

let btnEasy = document.getElementById('btnEasy'),
    btnIntermediate = document.getElementById('btnIntermediate'),
    btnExpert = document.getElementById('btnExpert'),
    btnMenu = document.getElementById('btnMenu'),
    btnConveyor = document.getElementById('btnConveyor'),j, i1,i2,i3,i4;

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
btnConveyor.addEventListener('click', ()=>{
    document.getElementById('gameMode').style.display = 'none';
    document.getElementById('conveyor').style.display = 'block';
    lastClicked = 0; rows1=0; appendNumber = 21; appendNumberMax = 40; max=60; count=0; j=1;
    createConveyor('one',0,0); createConveyor('two',-20, 25); createConveyor('three',0,50); createConveyor('four',-20,75);
    colourGradient('button');
    shuffleTable('button');
    i1 =setInterval(() => {conveyorAnimation('one', -1)}, 80); i2 = setInterval(() => {conveyorAnimation('two', 1)}, 30);
    i3 = setInterval(() => {conveyorAnimation('three', -1)}, 50); i4 = setInterval(() => {conveyorAnimation('four', 1)}, 65)
})

function displayHTable(rows1){
    let scores = document.getElementById('scores'),
    score = scores.getElementsByTagName('p'), i=0;
    switch(rows1){
    case 0: for(let e of conveyor){
                score[i].innerHTML = (i+1).toString() + ' - ' + localStorage.getItem(e); i++;
            } break;
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

function createConveyor( row,left, top){
    document.getElementById('timeDisplay').style.display = 'none';
    let x = left;
    for(let i=0; i<6; i++){
    let btn = document.createElement("button");
    btn.type = "button";
    btn.style.left = left.toString() + '%';
    btn.style.top = top.toString() + '%';
    if((x == 0&& i!=5) || (x==-20 && i!=0)){
    btn.innerHTML = j++;}
    btn.addEventListener('click',checkClick);
    document.getElementById(row).appendChild(btn);
    left +=20;
    }
}

function conveyorAnimation(row, direction){
    let rows = document.getElementById(row);
    let btns = rows.getElementsByTagName('button');

    for(let i=0; i<6; i++){
        btns[i].style.left = (parseFloat(btns[i].style.left)+ direction).toString() + '%';
        if(direction == -1){
        if(parseFloat(btns[i].style.left)<0 && parseFloat(btns[i].style.left)>-15){
            btns[((i+5)%6)].innerHTML=btns[i].innerHTML;
            btns[((i+5)%6)].style.backgroundColor=btns[i].style.backgroundColor;
        }
        if(parseFloat(btns[i].style.left)<-20){
            btns[i].style.left = "100%";
        }}
        else{
            if(parseFloat(btns[i].style.left)>82 && parseFloat(btns[i].style.left)<98){
                btns[((i+1)%6)].innerHTML=btns[i].innerHTML;
                btns[((i+1)%6)].style.backgroundColor=btns[i].style.backgroundColor;
            }
            if(parseFloat(btns[i].style.left)>100){
                btns[i].style.left = "-20%";
            }}
    }
}
document.getElementById('highscoreEasy').innerHTML = 'Highscore Easy: ' +  localStorage.getItem('easy1');
document.getElementById('highscoreMedium').innerHTML = 'Highscore Intermediate: ' +  localStorage.getItem('medium1');
document.getElementById('highscoreHard').innerHTML = 'Highscore Expert: ' +  localStorage.getItem('hard1');