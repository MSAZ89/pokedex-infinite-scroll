import React from "react";

const SinglePokeContent = ({
  selectedPokemon,
}: {
  selectedPokemon: { name: string; id: number } | null;
}) => {
  // Render Pokemon details if a Pokemon is selected
  if (selectedPokemon) {
    return (
      <div className="md:w-5/6 w-1/2 bg-red-100 p-2 mx-auto text-center flex flex-col items-center justify-start h-screen">
        <h1 className="text-2xl font-bold uppercase my-16">
          {selectedPokemon.name}
        </h1>
        {/* Render additional details about the selected Pokemon */}
        {/* Randomizes the cache in browser so no loading issues */}
        <img
          src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${
            selectedPokemon.id
          }.svg?cache=${Math.random()}`}
          alt={`${selectedPokemon.name} sprite`}
          className="mx-auto"
        />
        {/* ... */}
      </div>
    );
  }

  // Render a message if no Pokemon is selected
  return (
    <div className="w-5/6 bg-red-100 p-2 mx-auto text-center">
      <p>No Pokemon selected</p>
    </div>
  );
};

export default SinglePokeContent;
