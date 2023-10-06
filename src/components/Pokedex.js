import React, { useEffect, useState } from "react";
import PokemonContainer from "./PokemonContainer.js";
let pokemonApi = "https://pokeapi.co/api/v2/pokemon/";


const Pokedex = function () {
  const [pokemons, setPokemons] = useState([]);

  async function fetchPokemons(limit = 60) {
    const newPokemons = new Set();
    let pokemon;
    for (let i = 1; i <= limit; i++) {
      try {
        const response = await fetch(pokemonApi + i);
        const pokemonJSON = await response.json();
        pokemon = {
          pkmnID: pokemonJSON.id,
          name: pokemonJSON.name,
          image: pokemonJSON.sprites.versions['generation-v']['black-white'].animated.front_default,
          types: pokemonJSON.types.map((type) => type.type.name),
        };

        // Check if the fetched pokemon already exists in the state
        const pokemonExists = pokemons.some((p) => p.pkmnID === pokemon.pkmnID);

        if (!pokemonExists) {
          newPokemons.add(pokemon);
        }
      } catch (error) {
        throw new Error(error);
      }
    }

    // Update the state only once after fetching all the new Pokemon
    setPokemons((prevPokemons) => [...prevPokemons, ...newPokemons]);
  }
  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <div>
      <div className="flex justify-center flex-row gap-x-4 flex-wrap pokedexContainer">
        {pokemons?.map((pokemon, index) => (
          <PokemonContainer key={index} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default Pokedex;
