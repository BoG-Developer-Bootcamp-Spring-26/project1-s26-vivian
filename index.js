let count = 1;
let isInfoActive = true; // tracking if info button being click

const image = document.getElementById("image");
const name = document.getElementById("name");
const type = document.getElementById("Pokemon-type");
const left = document.getElementById("left-button");
const right = document.getElementById("right-button");
const info_button = document.getElementById("info-button");
const move_button = document.getElementById("move-button");
const height = document.getElementById("height");
const weight = document.getElementById("weight");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const special_attack = document.getElementById("special-attack");
const special_defense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const move = document.getElementById("move");
const info_text = document.getElementById("info-text");

left.addEventListener("click", function() {
    if (count <= 1 ) {
        return;
    }
    count -= 1;
    fetchData();
});

right.addEventListener("click", function() {
    if (count > 1025 ) {
        return;
    }
    count += 1;
    fetchData();
});

info_button.addEventListener("click", function() {
    isInfoActive = true;
    info_button.style.backgroundColor = "#7CFF79";
    move_button.style.backgroundColor = "#E8E8E8";
    fetchInfo();
});

move_button.addEventListener("click", function(){
    isInfoActive = false;
    info_button.style.backgroundColor = "#E8E8E8";
    move_button.style.backgroundColor = "#7CFF79";
    fetchMove();
});

async function fetchData() {
    try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${count}`);
        const data = await response.json();

        // Display image
        image.src = data.sprites.front_default;
        image.style.display = "block";

        // Display name
        name.textContent = data.name;

        // Display type with each span for each type
        type.innerHTML = data.types.map(typeInfo => 
            `<span class="type-badge ${typeInfo.type.name}">${typeInfo.type.name}</span>`).join(" ");

        // show by default
        fetchInfo();
        info_button.style.backgroundColor = "#7CFF79";
        move_button.style.backgroundColor = "#E8E8E8";

    } catch (e) {
        console.error(e);
    }
}

async function fetchInfo() {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${count}`);
        const data = await response.json();

        // display info text
        info_text.textContent = "Info";
        
        // show info 
        height.style.display = "block";
        weight.style.display = "block";
        hp.style.display = "block";   
        attack.style.display = "block";
        defense.style.display = "block";
        special_attack.style.display = "block";
        special_defense.style.display = "block";
        speed.style.display = "block";   
        
        // Display height and convert to m
        height.textContent = `height: ${data.height / 10} m`;

        // Display weight and convert to kg
        weight.textContent = `weight: ${data.weight / 10} kg`;

        // Display stat
        hp.textContent = `hp: ${data.stats[0].base_stat}`;
        attack.textContent = `attack: ${data.stats[1].base_stat}`;
        defense.textContent = `defense: ${data.stats[2].base_stat}`;
        special_attack.textContent = `special attack: ${data.stats[3].base_stat}`;
        special_defense.textContent = `special defense: ${data.stats[4].base_stat}`;
        speed.textContent = `speed: ${data.stats[5].base_stat}`;
        
        //hide move
        move.style.display = "none";

    } catch (e){
        console.error(e);
    }
}

async function fetchMove() {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${count}`);
        const data = await response.json();
       
        // display info text
        info_text.textContent = "Moves";
        
        //hide stat
        height.style.display = "none";
        weight.style.display = "none";
        hp.style.display = "none";
        attack.style.display = "none";
        defense.style.display = "none";
        special_attack.style.display = "none";
        special_defense.style.display = "none";
        speed.style.display = "none";
    
        // show move
        move.style.display = "block";
        move.innerHTML = data.moves.slice(0,5).map(m => 
            `<div class="move-item">${m.move.name}</div>`).join("");

    } catch (e){
        console.error(e);
    }
}

fetchData();