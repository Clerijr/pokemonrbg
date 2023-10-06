import React, { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard.js";
import PokemonModal from "./PokemonModal.js";
let pokemonApi = "https://pokeapi.co/api/v2/pokemon/";

const Pokedex = function () {
  const [pokemons, setPokemons] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [ pokemonContent, setPokemonContent ] = useState({})
  const openModal = (pokemon) => {
    setPokemonContent(pokemon)
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  async function fetchPokemons(limit = 10) {
    const newPokemons = new Set();
    let pokemon;
    for (let i = 1; i <= limit; i++) {
      try {
        const response = await fetch(pokemonApi + i);
        const pokemonJSON = await response.json();
        pokemon = {
          pkmnID: pokemonJSON.id,
          name: pokemonJSON.name,
          image:
            pokemonJSON.sprites.versions["generation-v"]["black-white"].animated
              .front_default,
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
          <div className="h-50 flex flex-col">
            <PokemonCard
              key={index}
              pokemon={pokemon}
              onClick={() => openModal(pokemon)}
            />
          </div>
        ))}
        <PokemonModal isOpen={modalOpen} onClose={closeModal} pokemonContent={pokemonContent}/>
      </div>
    </div>
  );
};

export default Pokedex;
