import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons } from "../../redux/actions";
import InfiniteScroll from "react-infinite-scroll-component";
import Pokemon from "../Pokemon/Pokemon";
import { Grid } from "@mui/material";
import loader from "./../../images/loadingGif.gif";
import errorImage from "./../../images/errorImage.png"

export default function Pokemons(props) {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const pokemons = useSelector((state) => state.pokemons);
  const { data, error, totalPages } = pokemons;
  const isMounted = useRef(false);
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      dispatch(getAllPokemons(page));
      setHasMore(totalPagesRef.current !== page);
    }
  }, [page, dispatch]);

  const totalPagesRef = useRef(totalPages);
  useEffect(() => {
    totalPagesRef.current = totalPages;
  }, [totalPages]);

  if (error) {
    return (
      <div>
          <h2>{data}</h2>
          <img style={{width: "300px"}} src={errorImage} alt="error al carcar los pokemons" />
      </div>
    )
  }

  return (
    <div style={{ margin: "40px" }}>
      <InfiniteScroll
        dataLength={data.length}
        hasMore={hasMore}
        loader={
          <img src={loader} alt="Loading gif" style={{ width: "250px" }} />
        }
        next={() => {
          console.log("Me ejecute soy el scroll");
          setPage((prevPage) => prevPage + 1);
        }}
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
