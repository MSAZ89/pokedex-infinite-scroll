import React, { useState, useEffect, useRef } from "react";

type Pokemon = {
  id: number;
  name: string;
  // Add other properties as needed
};

const SidebarScroll = ({
  onPokemonSelect,
  onPokemonListUpdate,
}: {
  onPokemonSelect: (pokemon: Pokemon) => void;
  onPokemonListUpdate: (pokemonList: Pokemon[]) => void;
}) => {
  const handlePokemonClick = (pokemon: Pokemon) => {
    // Call the callback prop with the selected Pokemon
    onPokemonSelect(pokemon);
  };
  const [pokemonList, setPokemonList] = useState<
    {
      id: number;
      name: string;
    }[]
  >([]);

  const [nextPageUrl, setNextPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=150&offset=0"
  );
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const pokemonListRef = useRef<HTMLDivElement | null>(null); // Ref for the div element

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(nextPageUrl);
      const data = await response.json();
      const updatedPokemonList = data.results.map(
        (pokemon: { name: string }, index: number) => ({
          id: index + 1, // Assigning an id based on index, you can use a different logic to assign id if needed
          name: pokemon.name,
        })
      );
      setPokemonList((prevList) => [...prevList, ...updatedPokemonList]);
      setNextPageUrl(data.next);
      setLoading(false);

      // Update parent component's pokemonList state with the new data
      onPokemonListUpdate([...pokemonList, ...updatedPokemonList]);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = pokemonListRef.current!; // Accessing scroll related properties from the ref
    if (
      scrollTop + clientHeight >= scrollHeight - 100 &&
      !loading &&
      nextPageUrl
    ) {
      fetchData();
    }
  };

  useEffect(() => {
    pokemonListRef.current?.addEventListener("scroll", handleScroll); // Attaching event listener to the div element
    return () => {
      pokemonListRef.current?.removeEventListener("scroll", handleScroll); // Removing event listener on cleanup
    };
  }, [loading, nextPageUrl]);

  const filteredPokemonList = pokemonList
    .filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (pokemon, index, self) =>
        index === self.findIndex((p) => p.name === pokemon.name)
    );

  return (
    <div
      id="pokemonListDiv"
      className="md:w-1/6 w-1/2 text-center overflow-y-scroll h-screen"
      ref={pokemonListRef} // Adding ref to the div element
    >
      {/* search input for pokemon name */}
      <input
        type="text"
        placeholder="Search Pokemon"
        className="border-slate-50 border m-2 w-1/2 mx-auto p-1"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <br />
      {/* Render Pokemon list with click handler */}
      <div className="grid-template-columns: repeat(2, minmax(0, 1fr)); mx-auto">
        {filteredPokemonList.map((pokemon, index) => (
          <button
            key={`pokemon_${index}`}
            onClick={() => handlePokemonClick(pokemon)}
            className="border-slate-50 border p-1 m-1"
          >
            {pokemon.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SidebarScroll;
