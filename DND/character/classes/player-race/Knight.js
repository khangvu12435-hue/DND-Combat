import { Character } from "../../Character"

class Knight extends Character {
    constructor(x,y,width,height,hp,ap,speed,sprite,inventoryCapacity,str,dex,con,int,wis,cha)
    {
        super(x,y,width,height,hp,ap,speed,sprite,inventoryCapacity,str,dex,con,int,wis,cha);
        this.str+=1;
        this.dex+=2;
        this.int-=1;
        this.wis-=2;

        this.maxTilesMoved = 5;
        this.tilesMoved = 0;
    }

    useSlash(target){
        this.useSkill(1);
        target.addHP(-5);
    }

}