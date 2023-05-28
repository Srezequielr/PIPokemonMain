import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons } from "../../redux/actions";
import { useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Pokemon from "../Pokemon/Pokemon";
import { Grid } from "@mui/material";
import loader from "./../../images/loadingGif.gif";
import errorImage from "./../../images/errorImage.png";

export default function Pokemons({ searchValue, typeValue, sortValue }) {
  const location = useLocation();
  const dispatch = useDispatch();

  //Obtencion de querys de la url
  // const query = new URLSearchParams(location.search);
  // const searchValue = query.get("search");
  // const typeValue = query.get("type");
  // const sortValue = query.get("sort");
  ////-------------------------------

  //Estados del scroll infinito
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  ////-------------------------------

  //UseEffect para obtener los pokemons
  const pokemons = useSelector((state) => state.pokemons);
  const { data, error, totalPages } = pokemons;
  const isMounted = useRef(false);
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      dispatch(
        getAllPokemons(page, {
          search: searchValue,
          type: typeValue,
          sort: sortValue,
        })
      );
    }
  }, [page, dispatch, searchValue, typeValue, sortValue]);
  ////-------------------------------

  //Proteccion de variable para no recargar el useEffect
  const totalPagesRef = useRef(totalPages);
  useEffect(() => {
    totalPagesRef.current = totalPages;
    // console.log(`Paginas totales: ${totalPagesRef.current} \n
    // Pagina actual: ${page} \n
    // Relacion Booleana entre ellas: ${totalPages > page} `);
    setHasMore(totalPages > page);
  }, [totalPages, page]);
  ////-------------------------------

  if (error) {
    return (
      <div>
        <h2>{data}</h2>
        <img
          style={{ width: "300px" }}
          src={errorImage}
          alt="error al cargar los pokemons"
        />
      </div>
    );
  }

  if (data[0] === null) {
    return (
      <div>
        <h2>No se encontraron pokemons</h2>
        <img
          style={{ width: "300px" }}
          src={errorImage}
          alt="error al cargar los pokemons"
        />
      </div>
    );
  }

  if (!data[0]) {
    return <img src={loader} alt="Loading gif" style={{ width: "250px" }} />;
  }

  return (
    <div style={{ margin: "40px" }}>
      <InfiniteScroll
        dataLength={data.length}
        hasMore={hasMore}
        loader={
          <img src={loader} alt="Loading gif" style={{ width: "250px" }} />
        }
        next={() => setPage((prevPage) => prevPage + 1)}
      >
        <Grid container spacing={3} justifyContent={"center"}>
          {data?.map((pokemon, index) => (
            <Pokemon
              key={index}
              id={pokemon.id}
              name={pokemon.name}
              img={pokemon.img}
              types={pokemon.types}
            />
          ))}
        </Grid>
      </InfiniteScroll>
    </div>
  );
}
