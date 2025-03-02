import '../styles/PokemonCard.css';

export default function PokemonCard({pokemonQuery}) {

  if (pokemonQuery.image == null) {
    pokemonQuery.image = "pokedex.png";
  }

  return (
    <div className='pokemon-card'>
      <h2>{pokemonQuery.name}</h2>
      <h3>#{pokemonQuery.id}</h3>
      <img src={pokemonQuery.image} alt={pokemonQuery.name} />
      <p>
        <strong>Type:</strong>{" "}
        {pokemonQuery.types.map((type) => type).join(", ")}
      </p>
    </div>
  );
}
