import { BackgroundManager } from "./stage/background.js"
import { GridManager } from "./stage/grid.js";
import { Character } from "./character/character-base/Character.js";

const canvasWidth = 1000;
const canvasHeight = 500;

window.addEventListener('load',function(){
    console.log("main.js is running")
    const canvas = document.getElementById("map");
    const ctx = canvas.getContext('2d');

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    class Game{
        draw(ctx){
            const bgManager = new BackgroundManager(canvasWidth,canvasHeight);
            bgManager.setBackground("stone-bg");
            bgManager.drawBackground(ctx);


            const gridManager = new GridManager(canvasWidth,canvasHeight,10,18);
            gridManager.drawGrid(ctx);

            const hero = new Character(200,200,100,150,10,10,"default-character",10);
            hero.drawCharacter(ctx);

            const wizard = new Character(600,200,300,200,10,10,"evilWizard-character",10);
            wizard.drawCharacter(ctx);

            console.log("drawing...");
        }
    }
    const dndGame = new Game();
    dndGame.draw(ctx);
    
})