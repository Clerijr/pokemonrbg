import React from "react";
import PokemonCard from "./PokemonCard";

function PokemonModal({ isOpen, onClose, pokemon }) {
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center ${
        isOpen ? "" : "hidden"
      }`}
      onClick={onClose}
    >
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Modal Title</h2>
        <p className="mb-4">Modal content goes here...</p>
        {pokemon.name ? <PokemonCard pokemon={pokemon} /> : null}
        <button
          className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default PokemonModal;
