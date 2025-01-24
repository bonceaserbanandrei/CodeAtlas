class Pokemon {
  constructor(name, type) {
    this._name = name;
    this._type = type;
  }

  getName() {
    return this._name;
  }

  getType() {
    return this._type;
  }

  introduce() {
    return `I am ${this.getName()}, a ${this.getType()}-type Pokemon!`;
  }
}

export default function App() {
  const bulbasaur = new Pokemon('Bulbasaur', 'Grass');
  const charmander = new Pokemon('Charmander', 'Fire');
  const squirtle = new Pokemon('Squirtle', 'Water');

  return (
    <div className="App">
      <h1>PokeDex</h1>
      <p>{bulbasaur.introduce()}</p>
      <p>{charmander.introduce()}</p>
      <p>{squirtle.introduce()}</p>
    </div>
  );
}