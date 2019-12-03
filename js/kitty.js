"use strict";

let app = new PIXI.Application({

    width: window.innerWidth,
    height: window.innerHeight,
    antialias: true,
    transparent: false,
    resolution: 1

});
document.body.appendChild(app.view);






PIXI.loader
    .add("./images/treasureHunter.json")
    .load(setup);

let id, background, player, door, enemies, treasure, enemiesArray = [], gotTreasure = false, gameCompleted = false, gameOver = false;


function setup() {

    id = PIXI.loader.resources["./images/treasureHunter.json"].textures;


    //setting background

    background = new PIXI.Sprite(id["dungeon.png"]);
    background.width = app.renderer.width;
    background.height = app.renderer.height;
    app.stage.addChild(background);

    //setting player

    player = new PIXI.Sprite(id["explorer.png"]);
    player.position.x = 100;
    player.position.y = app.renderer.height / 2;
    app.stage.addChild(player);
    //moving player

    window.addEventListener('keydown', move);



    //setting door
    door = new PIXI.Sprite(id["door.png"]);
    door.x = 90;
    door.y = 30;
    app.stage.addChild(door);

    //setting enemies


    let enemyNumber = 8;
    let enemySpace = 80;
    let enemyOffset = 200;
    function intRandomNum(max, min) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    for (let i = 0; i < enemyNumber; i++) {
        let enemies = new PIXI.Sprite(id["blob.png"]);
        enemies.position.x = (enemyOffset + enemySpace * i) + 100;
        enemies.position.y = intRandomNum(app.renderer.height - 70, 60);
        app.stage.addChild(enemies);
        enemiesArray.push(enemies);
        enemies.speed = 2;

    }
   /*  console.log(enemiesArray); */

    //setting treasure

    treasure = new PIXI.Sprite(id["treasure.png"]);
    treasure.x = app.renderer.width - treasure.width - 90;
    treasure.y = app.renderer.height / 2 - (treasure.height / 2);
    app.stage.addChild(treasure);

    //setting life box

    /* let lifeContainer= new PIXI.Container();

    let lifeBox= new PIXI.Graphics();
    lifeBox.beginFill(0x66CCFF);
    lifeBox.drawRect(900,20,100, 50);
    lifeBox.endFill();

    lifeContainer.addChild(lifeBox);
    app.stage.addChild(lifeContainer); */




    app.ticker.add(update);
}

function move(e) {

    if (e.key === "ArrowRight") {

        if ((player.position.x + player.width) < app.renderer.width - 90) {
            player.position.x += 10;
        }
    } else if (e.key === "ArrowLeft") {
        if (player.position.x > 80) {
            player.position.x -= 10;
        }
    } else if (e.key === "ArrowUp") {
        if (player.position.y > 60) {
            player.position.y -= 10;
        }
    } else if (e.key === "ArrowDown") {
        if ((player.position.y + player.height) < app.renderer.height - 50) {
            player.position.y += 10;
        }
    }



}

function hitTreasure() {

    if ((player.x + player.width) >= treasure.x && player.x <= treasure.x + treasure.width) {
        if ((player.y + player.height) >= treasure.y && player.y <= treasure.y + treasure.height) {

            treasure.x = player.x;
            treasure.y = player.y;
            gotTreasure = true;
        }


    }
}

function update() {

    hitTreasure();
    if (gameOver == false && gameCompleted == false) {
        moveEnemies();
        hitEnemy();
    }
    if (gameOver == true || gameCompleted == true) {
        window.removeEventListener("keydown", move);
    }

    if (gotTreasure && gameCompleted == false) {
        win();

    }


}

function moveEnemies() {
    for (let enemy of enemiesArray) {

        enemy.position.y += enemy.speed;
        if (enemy.y >= app.renderer.height - 70 || enemy.y <= 60) {
            enemy.speed *= -1;

        }
    }

}

function win() {



    if (player.x <= door.x + door.width && player.y <= door.y + door.height) {
        //console.log("win");
        gameWin();
        gameCompleted = true;

    }



}
/* let rectangle = new Graphics();
rectangle.beginFill(0x66CCFF);
 */
function hitEnemy() {

    /*  if(player.x + player.width >= enemies.x || player.y + player.height >= enemies.y){
 
         console.log(hit);
 
     } */
    for (let enemy of enemiesArray) {
        // console.log(enemyArray);
        if (player.x + player.width >= enemy.x && player.x <= enemy.x + enemy.width) {
            if (player.y + player.height >= enemy.y && player.y <= enemy.y + enemy.height) {

                // console.log("hit");
                popupGameOver();
                
                gameOver = true;


            }


        }
    }

}

function popupGameOver() {

    let popupContainer = new PIXI.Container();
    let popup = new PIXI.Graphics().drawRect(0, 0, 300, 300);
    popupContainer.addChild(popup);



    let popupText = new PIXI.Text('Game Over');

    popupContainer.addChild(popupText);
    popupText.anchor.set(0.5);
    app.stage.addChild(popupContainer);

    
    popupContainer.position.set(app.renderer.width / 2, app.renderer.height / 2);
    
}

function gameWin(){

    let winContainer = new PIXI.Container();
    let winBox = new PIXI.Graphics().drawRect(0,0,300,300);

    winContainer.addChild(winBox);

    let winText = new PIXI.Text("FINISH");
    winText.anchor.set(0.5);
    winContainer.addChild(winText);

    app.stage.addChild(winContainer);

    winContainer.position.set(app.renderer.width/2, app.renderer.height/2);

}

/* function life(){

    let lifeContainer= new PIXI.Container();

    let lifeBox= new PIXI.Graphics().drawRect(500,100,500, 200);

    lifeContainer.addChild(lifeBox);
    app.stage.addChild(lifeContainer);
    
}
life(); */