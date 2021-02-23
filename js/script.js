function pageLoaded() {

    var marioFrame = "";
    var lutinFrame = "";

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.responseText);
        marioFrame = data.mario;
        lutinFrame = data.lutin;
      }
      else 
        marioFrame=6;
        lutinFrame=6;
    };
    xmlhttp.open("GET", "./data/level.json", true);
    xmlhttp.send();

    
    var progress = true; // the games plays

    var canvas = document.getElementById("game");
    var context = canvas.getContext("2d");


    var left = document.getElementById("left");
    var right = document.getElementById("right");
    var up = document.getElementById("up");
    var lastScore= "";  

 

    // init all image
    var gamerInput = new GamerInput("None");
    var player = new PlayerObject( './img/mario.png', marioFrame , 203, 307, 5, 318);
    var playerInvers = new PlayerObject( './img/mario-invers.png', marioFrame, 203, 307, 5, 318);
    var santa = new PlayerObject( "./img/santa.png", lutinFrame, 203, 307, 5, 318);
    var santaInvers = new PlayerObject( "./img/santa-invers.png", lutinFrame, 203, 307, 5, 318);
    var background = new GameObject("./img/bg.jpg", 1300, 600);
    var backgroundSnow = new GameObject("./img/bgsnow.jpg", 1300, 600);
    var win = new GameObject("./img/win.png", 50, 40);
    var flag = new GameObject( "./img/flag.png", 1100, 220);
    var tuyau = new GameObject( "./img/tuyau.png", 500, 420);
    
    // init fonction
    var currentFrame = 0;
    var x = 0;
    var initial = new Date().getTime();

    // init move
    var current;
    var jump= false;
    var way=[];
    var affImage= player.img;
    var move = false;
    var theme ="basic";
    var character="mario";
    var startTimeGame="";
    var scorePlayer ="";

    var urlParam = new URLSearchParams(window.location.search);

    if (urlParam.has("type")) {
        switch (urlParam.get("type")) {
            case "basic":
                theme="basic";
                break;
            case "winter":
                theme = "winter";
                break;
        }
    }

    if (urlParam.has("character")) {
        switch (urlParam.get("character")) {
            case "mario":
                character="mario";
                break;
            case "lutin":
                character = "lutin";
                break;
        }
    }

    if (urlParam.has("playerName")) {
        playerName = urlParam.get("playerName");
        document.getElementById('playerName').innerHTML=playerName;
    }

   


    // init game
    window.requestAnimationFrame(gameloop);
    window.addEventListener('keyup', input);
    window.addEventListener('keydown', input);

    left.addEventListener('mousedown', function(event){
        move=true;
        gamerInput = new GamerInput("Left");
        setTimeout(function(){ 
            gamerInput = new GamerInput("None");
        }, 100);
    });
    
    right.addEventListener('mousedown', function(event){
        move=true;
        gamerInput = new GamerInput("Right");
        setTimeout(function(){ 
            gamerInput = new GamerInput("None");
        }, 100);
    });

    up.addEventListener('mousedown', function(event){
        move=true;
        gamerInput = new GamerInput("Up");
        setTimeout(function(){ 
            gamerInput = new GamerInput("None");
        }, 100);
    });
    
    // function init object game
    function GameObject(image, posx, posy) {
        this.img = new Image();
        this.img.src= image;
        this.w = posx;
        this.h = posy;
    }

     // function init palyer game   
    function PlayerObject(image, frames, width, height, posx, posy) {
        this.img = new Image();
        this.img.src=image;
        this.frames=frames;
        this.w=width;
        this.h=height;
        this.x = posx;
        this.y = posy;
    }

    function gameloop() {
        if(progress){
            update();
            draw();
            score();
            updateScore();
            window.requestAnimationFrame(gameloop);
        }else{
            console.log('win');
            addScore();
        } 
    }

    function GamerInput(input) {
        this.action = input; 
    }

    // function draw all image 
    function draw() {
        if (x < background.w)x += 1;
        else x=0;
        if(theme=="basic"){
            bgImg=background.img;
        }else bgImg=backgroundSnow.img;   
        context.drawImage(bgImg, x, 0, background.w, background.h, 0, 0, background.w ,background.h); 
        context.save();
        animate(); // call function for animate player
        context.restore();  
        context.drawImage(flag.img, flag.w, flag.h);  
        context.drawImage(tuyau.img, tuyau.w, tuyau.h); 
        if(!progress){
            context.drawImage(win.img, win.w, win.h);
         }
    }
     
    // function animate player 
    function animate() {
        current = new Date().getTime();
        if(move){
            if (current - initial >= 400) {  // update frame player
                currentFrame = (currentFrame + 1) % player.frames; 
                initial = current; 
                } 
        }
        if(jump){ // if player jump
            if(way[0]==='right'){
                context.translate(0,-120);
                player.x+=5;
            }
            if(way[0]==='left'){
                context.translate(0,-120);
                player.x-=5;
            }
            jump=false;
        }
        if(player.x>=331 && player.x<=521) player.y=220; // init player placement for tuyau
        else player.y=320;
        if(character=='lutin'){
            if(way[0]===way[1]){ // change direction of player 
                if(way[0]==='right')affImage=santa.img; 
                if(way[0]==='left')affImage=santaInvers.img;
            }else affImage=santaInvers.img;
        }
        if(character=='mario'){
            if(way[0]===way[1]){ // change direction of player 
                if(way[0]==='right')affImage=player.img; 
                if(way[0]==='left')affImage=playerInvers.img;
            }else affImage=playerInvers.img;
        }
        context.drawImage(affImage, (player.img.width / player.frames) * currentFrame, 0, player.w, player.h, player.x, player.y, player.w, player.h);
    }
    
        
    function update() { // function control direction
        if(player.x>1030 && player.x<1100){
            progress=false;
            //move=false;
        }else{
            if(gamerInput.action === "Left"){
                way.unshift('left'); // add left on tab way
                if(player.y>240){ //level road
                    if(player.x>=510 && player.x<=530)player.x+=0; 
                    else player.x-=5; 
               }else player.x-=5;
            }
            if(gamerInput.action === "Right"){
                way.unshift('right'); // add right on tab way
                if(player.y>240){ //level road
                     if(player.x>=321 && player.x<=331)player.x+=0;
                     else player.x+=5;
                }else player.x+=5;    
            }
            if(gamerInput.action === "Up"){
                jump=true;} // player jump
            if(gamerInput.action === "Down"){
                if(player.y<320) player.y+=5;
            } 
            }
        }
        

    function input(event) {
        move=true;
        if (event.type === "keydown") {
            switch (event.keyCode) {
                case 37: // Left Arrow
                    gamerInput = new GamerInput("Left");
                    break; //Left key
                case 38: // Up Arrow
                    gamerInput = new GamerInput("Up");
                    break; //Up key
                case 39: // Right Arrow
                    gamerInput = new GamerInput("Right");
                    break; //Right key
                case 40: // Down Arrow
                    gamerInput = new GamerInput("Down");
                    break; //Down key
                default:
                    gamerInput = new GamerInput("None"); //No Input
            }
        } else {
            gamerInput = new GamerInput("None"); //No Input
        }
    }

    function score(){
        if(move){
            haveTime();
            var nowTime = new Date().getTime();
            scorePlayer = nowTime - startTimeGame ;
            document.getElementById('score').innerHTML=scorePlayer;
        }
    }


    function haveTime(){
        if(startTimeGame==""){
            startTimeGame = new Date().getTime();
            console.log(startTimeGame);
        }
    }return startTimeGame;


    function addScore(){

        var namePlayer = urlParam.get("playerName");
        var player = {
            name : namePlayer,
            score : scorePlayer,
        };

        localStorage.setItem('player', JSON.stringify(player));
        var npcObjects = localStorage.getItem('player');
        console.log('player: ', JSON.parse(npcObjects));
    }

    function updateScore(){
        var datascore = JSON.parse(window.localStorage.getItem('player'));
       
        document.getElementById('highScore').innerHTML=datascore.score;
        document.getElementById('highName').innerHTML=datascore.name;

    }
}

