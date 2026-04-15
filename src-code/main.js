document.addEventListener("DOMContentLoaded", () => {

const shapeToCharClass = new Map()

//window

const canvasWidth = 1600;
const canvasHeight = 1000;

const stage = new Konva.Stage({
    container: 'container',
    width: canvasWidth,
    height: canvasHeight
    });
stage.container().style.cursor = "crosshair";

//layers
const backgroundLayer = new Konva.Layer();
const gridLayer = new Konva.Layer();
const foregroundLayer = new Konva.Layer();
stage.add(backgroundLayer);
stage.add(gridLayer);
stage.add(foregroundLayer);


//backgorund
const backgroundImg = new Image()
backgroundImg.onload = function(){
    const bg = new Konva.Image({
        x: 0,
        y: 0,
        image: backgroundImg,
        width: canvasWidth,
        height: canvasHeight,
    });
    backgroundLayer.add(bg)
}
backgroundImg.src = "/assets/backgrounds/grass.jpg";

//grid
const gridTileSize = 100;
for(let c=0; c<99; c++)
{
    for(let r=0; r<99; r++)
    {
        let tile = new Konva.Rect({
            x:c*gridTileSize,
            y:r*gridTileSize,
            width:gridTileSize,
            height:gridTileSize,
            stroke:"black",
            strokeWidth:1,
        })
        gridLayer.add(tile);
        console.log("added tile "+r+" "+c)
    }
}

//load character menu
stage.on('contextmenu', function(e) {
    e.evt.preventDefault();
    if (e.target === gridLayer) return;
    const clickedChar = shapeToCharClass.get(e.target.getParent());
    if (!clickedChar) return;
    console.log("displaying")
    clickedChar.attackNode.style.display = 'initial';
    const containerRect = stage.container().getBoundingClientRect();
    clickedChar.attackNode.style.top  = containerRect.top  + stage.getPointerPosition().y + 4 + 'px';
    clickedChar.attackNode.style.left = containerRect.left + stage.getPointerPosition().x + 4 + 'px';
});

class Dice
{
    static roll(max)
    {
        return Math.floor((max*Math.random())+1)
    }
} 

class CharacterStats
{
    constructor(str,dex,con,int,wis,cha){
        this.str = str;
        this.dex = dex;
        this.con = con;
        this.int = int;
        this.wis = wis;
        this.cha = cha;
    }

    randomize()
    {
        this.str = Dice.roll(20);
        this.dex = Dice.roll(20);
        this.con = Dice.roll(20);
        this.int = Dice.roll(20);
        this.wis = Dice.roll(20);
        this.cha = Dice.roll(20);
        console.log("str:"+this.str+", dex:"+this.dex+" con:"+this.con+", int:"+this.int+" wis:"+this.wis+", cha:"+this.cha)
    }

    getStrBonus(){
        let val = this.str;
        if (val%2 == 1){
            val -=1;
        }
        val -= 10;
        return val/2;
    }
    
    getDexBonus(){
        let val = this.dex;
        if (val%2 == 1){
            val -=1;
        }
        val -= 10;
        return val/2;
    }

    getConBonus(){
        let val = this.con;
        if (val%2 == 1){
            val -=1;
        }
        val -= 10;
        return val/2;
    }

    getIntBonus(){
        let val = this.int;
        if (val%2 == 1){
            val -=1;
        }
        val -= 10;
        return val/2;
    }

    getWisBonus(){
        let val = this.wis;
        if (val%2 == 1){
            val -=1;
        }
        val -= 10;
        return val/2;
    }

    getChaBonus(){
        let val = this.cha;
        if (val%2 == 1){
            val -=1;
        }
        val -= 10;
        return val/2;
    }
}

class Character
{
     
   constructor(name,hp,ap,sprite,stats){
      this.name = name;

      this.hp = hp;
      this.ap = ap;

      this.sprite = sprite;

      this.stats = stats;
    this.createMenu();
   }
   
    drawCharacter(w, h)
    {
        const self = this;
        let charImg = new Image();
        charImg.onload = () =>
        {
            this.group = new Konva.Group({
                x: 3*gridTileSize,
                y: 3*gridTileSize,
                draggable: true,
            })
            const char = new Konva.Image({
                image: charImg,
                width: w*gridTileSize,
                height: h*gridTileSize,
            });
            self.nametag = new Konva.Text({
                text: self.name+": "+self.hp+" HP",
                fontSize:gridTileSize/5,
                offsetY:15,
                fill:"red"
            })
            shapeToCharClass.set(this.group, self);
            this.group.add(char);
            this.group.add(self.nametag)
            foregroundLayer.add(this.group);
            this.group.on('dragend', (e) => {
                this.group.position({
                    x: Math.round(this.group.x()/gridTileSize)*gridTileSize,
                    y: Math.round(this.group.y()/gridTileSize)*gridTileSize,
                });
            });
            this.group.on('click', (e) => {
                console.log("clicked");
            });
        }
        charImg.src = this.sprite;
    }
   fillAttackNode(name1,skill1,name2,skill2,name3,skill3)
   {
        let attack1 = document.createElement('button');
        attack1.style.height = '60px' 
        attack1.style.width = '60px' 
        attack1.textContent = name1;
        this.attackNode.appendChild(attack1);

        let attack2 = document.createElement('button');
        attack2.style.height = '60px' 
        attack2.style.width = '60px' 
        attack2.textContent = name2;
        this.attackNode.appendChild(attack2);

        let attack3 = document.createElement('button');
        attack3.style.height = '60px' 
        attack3.style.width = '60px' 
        attack3.textContent = name3;
        this.attackNode.appendChild(attack3);

        attack1.addEventListener("click", () => {
            console.log("no attack attatched"+this.name)
            this.attackNode.style.display = 'none';
            skill1();
            })

        attack2.addEventListener("click", () => {
            console.log("no attack attatched"+this.name)
            this.attackNode.style.display = 'none';
            skill2();
            })
        attack3.addEventListener("click", () => {
            console.log("no attack attatched"+this.name)
            this.attackNode.style.display = 'none';
            skill3();
        })
   }

   createMenu()
   {
        const attackNode = document.createElement('div');

        attackNode.id = 'attackMenu';
        attackNode.style.display = 'none';
        attackNode.style.position = 'absolute';
        attackNode.style.width = '180px';
        attackNode.style.height = '60px';
        attackNode.style.backgroundColor = 'white';
        attackNode.style.boxShadow = '0 0 5px grey';
        attackNode.style.borderRadius = '3px';

        this.attackNode = attackNode;
        document.body.appendChild(attackNode);

        document.body.appendChild(attackNode);
        window.addEventListener('click', () => {
            attackNode.style.display = 'none';
        });
   }
}

class Rogue extends Character{
    constructor(name,stats)
    {
        super(name,stats.con,4,"/assets/sprites/rogue.png",stats)
        this.fillAttackNode(
            "stab",
            () => this.stab(),
            "stealth",
            () => this.dash(),
            "throwing knife",
            () => this.throwingKnife()
        )
    }
    stab()
    {
        const cost = 1;
        const roll = Dice.roll(6)
        const damage = roll+this.stats.getDexBonus()
        console.log(roll+" + bonus:"+this.stats.getDexBonus())
        stage.on("click", (e) =>{
            if(this.ap-cost >= 0 && damage>0){
                const target = shapeToCharClass.get(e.target.getParent());
                target.hp -= damage;
                this.ap -= cost;
                console.log(this.name+" has attacked "+ target.name+". "+this.name+" now has "+this.ap+"AP, and "+target.name+" now has "+target.hp+" HP")
                stage.off("click");
                target.nametag.text(target.name+": "+String(target.hp)+" HP");
                if(target.hp<=0)
                {
                    target.group.destroy()
                }
                stage.batchDraw();
            }
        })
    }
    dash()
    {
        this.ap -= 3;
        if (Dice.roll(20)>10){        
            this.stats.dex += 5
        }
    }
    throwingKnife()
    {
        stage.on("click", (e) =>{
            const cost = 2
            const damage = Dice.roll(10);
            if(this.ap-cost >= 0 && Dice.roll(20)>1 && damage>0)
            {
                const target = shapeToCharClass.get(e.target.getParent());
                target.hp -= damage;
                this.ap -= cost;
                console.log(this.name+" has attacked "+ target.name+". "+this.name+" now has "+this.ap+"AP, and "+target.name+" now has "+target.hp+" HP")
                stage.off("click");
                target.nametag.text(target.name+": "+String(target.hp)+" HP");
                if(target.hp<=0)
                {
                    target.group.destroy()
                }
                stage.batchDraw();
            }
            else{
                console.log("miss")
                stage.off("click");
            }
        })
    }
}

class Sniper extends Character{
    constructor(name,stats)
    {
        super(name,stats.con,4,"/assets/sprites/sniper.png",stats)
        this.fillAttackNode(
            "shoot",
            () => this.shoot(),
            "Multishot",
            () => this.dash(),
            "Focus",
            () => this.focus()
        )
    }
    shoot()
    {
        const cost = 1;
        const roll = Dice.roll(10)
        const damage = roll+this.stats.getConBonus()
        console.log(roll+" + bonus:"+this.stats.getConBonus())
        stage.on("click", (e) =>{
            if(this.ap-cost >= 0 && damage>0){
                const target = shapeToCharClass.get(e.target.getParent());
                target.hp -= damage;
                this.ap -= cost;
                console.log(this.name+" has attacked "+ target.name+". "+this.name+" now has "+this.ap+"AP, and "+target.name+" now has "+target.hp+" HP")
                stage.off("click");
                target.nametag.text(target.name+": "+String(target.hp)+" HP");
                if(target.hp<=0)
                {
                    target.group.destroy()
                }
                stage.batchDraw();
            }
        })
    }
    multishot()
    {
        const cost = 1;
        const roll = Dice.roll(4)+Dice.roll(4)+Dice.roll(4)+Dice.roll(4)+Dice.roll(4)
        const damage = roll+this.stats.getStrBonus()
        console.log(roll+" + bonus:"+this.stats.getStrBonus())
        stage.on("click", (e) =>{
            if(this.ap-cost >= 0 && damage>0){
                const target = shapeToCharClass.get(e.target.getParent());
                target.hp -= damage;
                this.ap -= cost;
                console.log(this.name+" has attacked "+ target.name+". "+this.name+" now has "+this.ap+"AP, and "+target.name+" now has "+target.hp+" HP")
                stage.off("click");
                target.nametag.text(target.name+": "+String(target.hp)+" HP");
                if(target.hp<=0)
                {
                    target.group.destroy()
                }
                stage.batchDraw();
            }
        })
    }
    focus()
    {
        this.ap-=1;
        this.stats.dex+=2;
    }
}
class Wizard extends Character
{
    constructor(name,stats)
    {
        super(name,stats.con,1,"/assets/sprites/evilWizard.png",stats)
        this.fillAttackNode(
            "Fireball",
            () => this.fireball(),
            "Lightning Strike",
            () => this.lightning(),
            "Sleep",
            () => this.sleep()
        )
    }
    fireball()
    {
        const roll = Dice.roll(6)
        const damage = roll+this.stats.getStrBonus()
        stage.on("click", (e) =>{
                const target = shapeToCharClass.get(e.target.getParent());
                target.hp -= damage;
                console.log(this.name+" has attacked "+ target.name+". "+this.name+" now has "+this.ap+"AP, and "+target.name+" now has "+target.hp+" HP")
                stage.off("click");
                target.nametag.text(target.name+": "+String(target.hp)+" HP");
                if(target.hp<=0)
                {
                    target.group.destroy();

                }
                stage.batchDraw();
        })
    }
    lightning()
    {
        const roll = Dice.roll(6)
        const damage = roll+this.stats.getStrBonus()
        stage.on("click", (e) =>{
                const target = shapeToCharClass.get(e.target.getParent());
                target.hp -= damage;
                console.log(this.name+" has attacked "+ target.name+". "+this.name+" now has "+this.ap+"AP, and "+target.name+" now has "+target.hp+" HP")
                stage.off("click");
                target.nametag.text(target.name+": "+String(target.hp)+" HP");
                if(target.hp<=0)
                {
                    target.group.destroy()
                }
                stage.batchDraw();
        })
    }
    sleep()
    {
        if(Dice.roll(20)>15)
        {
        this.stats.cha += 5;
        }
    }
}

class Demon extends Character
{
    constructor(name,stats)
    {
        super(name,stats.con,1,"/assets/sprites/demon.png",stats)
        this.fillAttackNode(
            "Swing",
            () => this.swing(),
            "Swipe",
            () => this.swipe(),
            "Flee",
            () => this.flee()
        )
    }
    swing()
    {
        const roll = Dice.roll(6)
        const damage = roll+this.stats.getStrBonus()
        stage.on("click", (e) =>{
                const target = shapeToCharClass.get(e.target.getParent());
                target.hp -= damage;
                console.log(this.name+" has attacked "+ target.name+". "+this.name+" now has "+this.ap+"AP, and "+target.name+" now has "+target.hp+" HP")
                stage.off("click");
                target.nametag.text(target.name+": "+String(target.hp)+" HP");
                if(target.hp<=0)
                {
                    target.group.destroy();

                }
                stage.batchDraw();
        })
    }
    swipe()
    {
        const roll = Dice.roll(6)
        const damage = roll+this.stats.getStrBonus()
        stage.on("click", (e) =>{
                const target = shapeToCharClass.get(e.target.getParent());
                target.hp -= damage;
                console.log(this.name+" has attacked "+ target.name+". "+this.name+" now has "+this.ap+"AP, and "+target.name+" now has "+target.hp+" HP")
                stage.off("click");
                target.nametag.text(target.name+": "+String(target.hp)+" HP");
                if(target.hp<=0)
                {
                    target.group.destroy()
                }
                stage.batchDraw();
        })
    }
    flee()
    {
        if(Dice.roll(20)>15)
        {
            this.group.destroy()
        }
    }
}

class Combat
{
    constructor(heroes,enemies)
    {
        console.log("constructor")
        this.heroes = heroes;
        this.enemies = enemies;
        this.turnOrder = [...heroes, ...enemies];
        let sorted = false;
        while (!sorted)
        {
            sorted = true;
            for (let i=0; i<this.turnOrder.length-1; i++)
            {
                if (this.turnOrder[i].dex < this.turnOrder[i+1].dex)
                {
                    let temp = this.turnOrder[i];
                    this.turnOrder[i] = this.turnOrder[i+1];
                    this.turnOrder[i+1] = temp;
                    sorted = false;
                }
            }
        }
        this.turnOrderDisplayLayer = new Konva.Layer();
        let bg = new Konva.Rect({
            x:0,
            y:0,
            width:canvasWidth,
            height:gridTileSize,
            fill:"white"
        })

        this.turnOrderDisplayLayer.add(bg)
        stage.add(this.turnOrderDisplayLayer);
    }
    awaitButtonPress(button)
    {
        return new Promise(resolve => {
        button.addEventListener('click',resolve,{once: true});
    });
    }
    async loop()
    {
        console.log("looping... through "+this.turnOrder)
        let img = new Image();
        img.onload = () => {
            console.log("creatign konva.image for turnorderdisplay")
            let g = new Konva.Group({
                x:0,
                y:0,
            });
            let i = new Konva.Image({
                height:gridTileSize,
                width:gridTileSize,
                image:img
            })
            this.turnOrderDisplayLayer.add(i)
        }
        while(true)
        {
            for (let idx=0; idx<this.turnOrder.length;idx++)
            {
                img.src = this.turnOrder[idx].sprite;
                this.turnOrder[idx].ap += 2;
                await this.awaitButtonPress(document.getElementById("next-turn-button"));
            }
        }
    }
}


const heroes = []
const enemies = []
//create character

let submit = document.getElementById("create-button");
submit.addEventListener("click", ()=>{
    let width = document.getElementById("input-w").value;
    let height = document.getElementById("input-h").value;
    let charName = document.getElementById("input-name").value;
    let charStr = document.getElementById("input-str").value;
    let charDex = document.getElementById("input-dex").value;
    let charCon = document.getElementById("input-con").value;
    let charInt = document.getElementById("input-int").value;
    let charWis = document.getElementById("input-wis").value;
    let charCha = document.getElementById("input-cha").value;
    let charClass = document.getElementById("input-class").value;

    let stats = new CharacterStats(charStr,charDex,charCon,charInt,charWis,charCha)
    if(charClass == "rogue")
    {
        let entity = new Rogue(charName,stats)
        heroes.push(entity)
        entity.drawCharacter(width,height)
    }
    if(charClass == "sniper")
    {
        let entity = new Sniper(charName,stats)
        heroes.push(entity)
        entity.drawCharacter(width,height)
    }
    if(charClass == "wizard")
    {
        let entity = new Wizard(charName,stats)
        enemies.push(entity)
        entity.drawCharacter(width,height)
    }
    if(charClass == "demon")
    {
        let entity = new Demon(charName,stats)
        enemies.push(entity)
        entity.drawCharacter(width,height)
    }
    let game = new Combat(heroes,enemies);
    game.loop();
})
});