export class GridManager{
    constructor(width,height,rows,columns){
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.rows = rows;
        this.columns = columns;
    }
    drawGrid(ctx){
        ctx.beginPath();
        for(let c = 0; c<this.canvasWidth; c+=this.canvasWidth/this.columns){
            ctx.moveTo(c,0);
            ctx.lineTo(c,this.canvasHeight);
        }
        for(let r = 0; r<this.canvasHeight; r+=this.canvasHeight/this.rows){
            ctx.moveTo(0,r);
            ctx.lineTo(this.canvasWidth,r);
        }
        ctx.stroke();
    }
    setRows(rows){
        this.rows = rows;
    }
    setColumns(columns){
        this.columns = columns;
    }
}