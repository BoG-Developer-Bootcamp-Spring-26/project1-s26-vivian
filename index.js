let count = 1;

const image = document.getElementById("image");
const name = document.getElementById("name");
const type = document.getElementById("Pokemon-type");
const left = document.getElementById("left-button");
const right = document.getElementById("right-button");

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

async function fetchData() {
    try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${count}`);
        const data = await response.json();

        // Update image
        image.src = data.sprites.front_default;
        image.style.display = "block";

        // Update name
        name.textContent = data.name;

        // Update type
        type.textContent = data.types.map(typeInfo => typeInfo.type.name).join(", ");

    } catch (e){
        console.error(e);
    }
}
fetchData();