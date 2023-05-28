import React from "react";
import Landing from "../../components/Landing/Landing";
import Pokemons from "../../components/Pokemons/Pokemons";
import SearchInputs from "../../components/SearchInputs/SearchInputs";
import { useLocation } from "react-router-dom";

export default function Home(props) {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const searchValue = query.get("search");
  const typeValue = query.get("type");
  const sortValue = query.get("sort");
  return (
    <div>
      <Landing />
      <hr />
      <SearchInputs />
      <Pokemons searchValue={searchValue} typeValue={typeValue} sortValue={sortValue} />
    </div>
  );
}
