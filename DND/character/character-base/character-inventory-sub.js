export class CharacterInventory
{
    #inventory;
    #capacity;
    constructor(capacity){
        this.#inventory = new Array(capacity);
        this.#capacity = capacity;
    }

    getItem(idx)
    {
        if(idx<this.#inventory.length())
            this.#inventory[idx];
    }

    giveItem(item)
    {
        for(let i = 0; i<this.capacity; i++)
        {
            if(this.#inventory[i]==null)
            {
                this.#inventory[i] = item;
            }
        }
    }
}