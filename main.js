document.getElementById('search-button').addEventListener('click', searchPokemon);

function searchPokemon() {
    const input = document.getElementById('search-input').value.trim().toLowerCase();
    
    // Clear previous data
    clearPokemonData();

    // Fetch Pokemon data
    fetch(`https://pokeapi.co/api/v2/pokemon/${input}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon not found');
            }
            return response.json();
        })
        .then(data => {
            displayPokemonData(data);
        })
        .catch(error => {
            alert(error.message);
        });
}

function clearPokemonData() {
    document.getElementById('pokemon-name').textContent = '';
    document.getElementById('pokemon-id').textContent = '';
    document.getElementById('weight').textContent = '';
    document.getElementById('height').textContent = '';
    document.getElementById('types').textContent = '';
    document.getElementById('hp').textContent = '';
    document.getElementById('attack').textContent = '';
    document.getElementById('defense').textContent = '';
    document.getElementById('special-attack').textContent = '';
    document.getElementById('special-defense').textContent = '';
    document.getElementById('speed').textContent = '';
    document.getElementById('sprite').src = '';
}

function displayPokemonData(data) {
    document.getElementById('pokemon-name').textContent = data.name.toUpperCase();
    document.getElementById('pokemon-id').textContent = `#${data.id}`;
    document.getElementById('weight').textContent = `Weight: ${data.weight}`;
    document.getElementById('height').textContent = `Height: ${data.height}`;
    
    const types = data.types.map(type => type.type.name.toUpperCase()).join(', ');
    document.getElementById('types').textContent = types;

    // Fetch stats
    data.stats.forEach(stat => {
        const statElement = document.getElementById(stat.stat.name.toLowerCase());
        if (statElement) {
            statElement.textContent = `${stat.stat.name.toUpperCase()}: ${stat.base_stat}`;
        }
    });

    // Display sprite
    document.getElementById('sprite').src = data.sprites.front_default;
}
