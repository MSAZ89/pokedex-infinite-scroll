import React, { useState } from "react";
import "./App.css";
import SidebarScroll from "./comps/SidebarScroll";
import SinglePokeContent from "./comps/SinglePokeContent";

type Pokemon = {
  id: number;
  name: string;
  // Add other properties as needed
};

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const handlePokemonSelect = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handlePokemonListUpdate = (pokemonList: Pokemon[]) => {
    // Handle updates to pokemonList from InfiniteScrollDivs component
    // You can update your state or perform any other logic here
    console.log("Updated Pokemon List:", pokemonList);
  };

  return (
    <div className="bg-slate-200 flex gap-2">
      <SidebarScroll
        onPokemonSelect={handlePokemonSelect}
        onPokemonListUpdate={handlePokemonListUpdate}
      />
      <SinglePokeContent selectedPokemon={selectedPokemon} />
    </div>
  );
}

export default App;
