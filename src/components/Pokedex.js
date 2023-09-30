import React, { useEffect, useState } from "react";
import capitalize from "../helpers/capitalize";
let pokemonApi = "https://pokeapi.co/api/v2/pokemon/";

const colors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
}
function PokemonContainer(pokemon) {
  return (
    <div key={pokemon.pkmnID} className="pt-7 min-w-max w-full card bg-gray-200 shadow-xl">
      <figure>
        <img
          src={pokemon.pokemon.image}
          alt={capitalize(pokemon.pokemon.name)}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {capitalize(pokemon.pokemon.name)}
          {/* <div className="badge badge-secondary">NEW</div> */}
        </h2>
        <div className="card-actions justify-end">
          {pokemon.pokemon.types.map((type) => (
            <div style={{ backgroundColor: `${colors.type}` } } className="badge badge-lg">{type}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Pokedex = function ()  {
  const [pokemons, setPokemons] = useState([]);

  async function fetchPokemons(limit = 10) {
    const newPokemons = [];
    for (let i = 1; i <= limit; i++) {
      try {
        const response = await fetch(pokemonApi + i);
        const pokemonJSON = await response.json();
        const pokemon = {
          pkmnID: pokemonJSON.id,
          name: pokemonJSON.name,
          image: pokemonJSON.sprites.front_default,
          types: pokemonJSON.types.map((type) => type.type.name),
        };
        
        // Check if the fetched pokemon already exists in the state
        if (!pokemons.find((p) => p.pkmnID === pokemon.pkmnID)) {
          newPokemons.push(pokemon);
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
      <div className="min-w-max px-20 py-6 grid grid-cols-5 gap-4 pokedexContainer">
        {pokemons.map((pokemon, index) => (
          <PokemonContainer key={index} pokemon={pokemon}/> 
      ))}
      </div>
    </div>
  );
};

export default Pokedex;
