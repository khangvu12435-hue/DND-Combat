export class CharacterStats
{
    constructor(str,dex,con,int,wis,cha){
        this.str = str;
        this.dex = dex;
        this.con = con;
        this.int = int;
        this.wis = wis;
        this.cha = cha;
    }

    getStrBonus(){
        if (this.str%2 == 1){
            this.str -=1;
        }
        this.str -= 10;
        return this.str/2;
    }
    
    getDexBonus(){
        if (this.dex%2 == 1){
            this.dex -=1;
        }
        this.dex -= 10;
        return this.dex/2;
    }

    getConBonus(){
        if (this.con%2 == 1){
            this.con -=1;
        }
        this.con -= 10;
        return this.con/2;
    }

    getIntBonus(){
        if (this.int%2 == 1){
            this.int -=1;
        }
        this.int -= 10;
        return this.int/2;
    }

    getWisBonus(){
        if (this.wis%2 == 1){
            this.wis -=1;
        }
        this.wis -= 10;
        return this.wis/2;
    }

    getChaBonus(){
        if (this.cha%2 == 1){
            this.cha -=1;
        }
        this.cha -= 10;
        return this.cha/2;
    }
    

}