import { CharacterStats } from "./character-stats-sub.js";
import { CharacterInventory } from "./character-inventory-sub.js";

export class Character
{
     
     constructor(x,y,width,height,hp,ap,sprite,inventoryCapacity,str,dex,con,int,wis,cha){
        this.hp = hp;
        this.ap = ap;

        this.statusEffects = [];

        this.sprite = document.getElementById(sprite);

        this.inventory = new CharacterInventory(inventoryCapacity);

        this.initiative;

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.stats = new CharacterStats(str,dex,con,int,wis,cha);
     }

     useSkill(cost)
     {
        ap-=cost;
     }

     getStatusEffects()
     {
        return this.statusEffects;
     }
     addStatusEffect(effect)
     {
        this.statusEffects.push(effect);
     }
     addStatusEffects(effects)
     {
        this.statusEffects.concat(effects);
     }

     rollInitiative()
     {
        this.initiative = Math.floor((Math.random()*20+1));
     }

     setPosition(x,y)
     {
      this.x = x;
      this.y = y;
     }

     drawCharacter(ctx)
     {
      ctx.drawImage(this.sprite,this.x,this.y,this.width,this.height);
      
      addEventListener("click",() => {console.log("clicked")});
      addEventListener("click",() => 
         {
            addEventListener("mousemove", (event) => 
               {
                  console.log(event.clientX);
                  this.setPosition(event.clientX,event.clientY);
                  ctx.drawImage(this.sprite,this.x,this.y,this.width,this.height);
               }
            )
         });
   }
}