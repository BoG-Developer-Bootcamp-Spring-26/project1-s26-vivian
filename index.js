let count = 1;

const image = document.getElementById("image");
const name = document.getElementById("name");
const type = document.getElementById("Pokemon-type");
const left = document.getElementById("left-button");
const right = document.getElementById("right-button");
const info = document.getElementById("info-button");
const move = document.getElementById("move-button");
const height = document.getElementById("height");
const weight = document.getElementById("weight");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const special_attack = document.getElementById("special-attack");
const special_defense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

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

info.addEventListener("click", function() {
    fetchData();
});

move.addEventListener("click", function(){
    fetchData();
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
        
        // Display height and convert to m
        height.textContent = `height: ${data.height / 10} m`;

    } catch (e){
        console.error(e);
    }
}
fetchData();