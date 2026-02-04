export class BackgroundManager{
    constructor(width,height){
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.bgImage = document.getElementById("grass-bg");
    }
    drawBackground(ctx){
        ctx.drawImage(this.bgImage, 0, 0,this.canvasWidth,this.canvasHeight);
    }
    setBackground(backgroundID){
        this.bgImage = document.getElementById(backgroundID);
    }
}