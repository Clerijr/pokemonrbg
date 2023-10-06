import capitalize from "../helpers/capitalize";
const typeColors = {
  normal: "text-gray-200 bg-normal",
  fire: "text-gray-200 bg-fire",
  water: "text-gray-200 bg-water",
  electric: "text-gray-900 bg-electric",
  grass: "text-gray-100 bg-grass",
  ice: "text-gray-100 bg-ice",
  fighting: "text-gray-100 bg-fighting",
  poison: "text-gray-200 bg-poison",
  ground: "text-gray-700 bg-ground",
  flying: "text-gray-200 bg-flying",
  psychic: "text-gray-200 bg-psychic",
  bug: "text-gray-200 bg-bug",
  rock: "text-gray-900 bg-rock",
  ghost: "text-gray-100 bg-ghost",
  dragon: "text-gray-100 bg-dragon",
  dark: "text-gray-100 bg-dark",
  steel: "text-gray-100 bg-steel",
  fairy: "text-gray-200 bg-fairy",
};
export default function PokemonCard({ pokemon, onClick }) {
  return (
    <div
      key={pokemon.pkmnID}
      className={`h-full flex flex-col col-span-1 w-48 card card-compact pt-6 m-2 drop-shadow-2xl bg-opacity-60 hover:bg-opacity-100 ${
        typeColors[pokemon.types[0]]
      }`}
      onClick={onClick}
    >
      <figure className="h-full scale-125">
        <img src={pokemon.image} alt={capitalize(pokemon.name)} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{capitalize(pokemon.name)}</h2>
        <h3 className="font-bold">#{pokemon.pkmnID}</h3>
        <div className="card-actions justify-end">
          {pokemon.types.map((type) => (
            <div
              key={type}
              className={`badge badge-lg font-bold p-3 ${typeColors[type]}`}
            >
              {type}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
