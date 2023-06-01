import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPokeDetail } from "../../redux/actions";
import loader from "./../../images/loadingGif.gif";
import errorImage from "./../../images/errorImage.png";
import { Grid, useTheme } from "@mui/material";
import styles from "./Detail.module.css";

export default function Detail() {
  const { id } = useParams();
  const theme = useTheme();
  const dispatch = useDispatch();

  //Traigo y fragmento la informacion del pokemon
  const pokemon = useSelector((state) => state.pokeDetail);
  const { error, data } = pokemon;
  useEffect(() => {
    dispatch(getPokeDetail(id));
  }, [dispatch, id]);
  //----------------------------------

  //Borra un pokemon
  const deletePokemon = (event) => {
    event.preventDefault();
  };

  if (error) {
    return (
      <div style={{ backgroundColor: theme.palette.secondary.main }}>
        <h2>{data}</h2>
        <img
          style={{ width: "300px" }}
          src={errorImage}
          alt="error al carcar los pokemons"
        />
      </div>
    );
  }

  console.log(data);

  if (data.hasOwnProperty("id")) {
    return (
      <div
        className={styles.detailContainer}
        style={{ backgroundColor: theme.palette.primary.main }}
      >
        <Grid container>
          <Grid lg={6} md={6} sm={12} xs={12} item>
            <div style={{ margin: "20px auto" }}>
              <h2 className={styles.title}>
                {data.name.charAt(0).toUpperCase() + data.name.slice(1)}
              </h2>
            </div>
            <hr />
            <Grid container justifyContent={"center"}>
              <Grid lg={6} md={6} sm={6} xs={6} item>
                <div className={styles.dataContainer}>
                  <p>Ataque</p>
                  <p>{data.attack}</p>
                </div>
              </Grid>
              <Grid lg={6} md={6} sm={6} xs={6} item>
                <div className={styles.dataContainer}>
                  <p>Defensa</p>
                  <p>{data.defense}</p>
                </div>
              </Grid>
              <Grid lg={6} md={6} sm={6} xs={6} item>
                <div className={styles.dataContainer}>
                  <p>Puntos de vida</p>
                  <p>{data.hp}</p>
                </div>
              </Grid>
              <Grid lg={6} md={6} sm={6} xs={6} item>
                <div className={styles.dataContainer}>
                  <p>Velocidad</p>
                  <p>{data.speed}</p>
                </div>
              </Grid>
              <Grid lg={6} md={6} sm={6} xs={6} item>
                <div className={styles.dataContainer}>
                  <p>Peso</p>
                  <p>{data.weight}</p>
                </div>
              </Grid>
              <Grid lg={6} md={6} sm={6} xs={6} item>
                <div className={styles.dataContainer}>
                  <p>Altura</p>
                  <p>{data.height}</p>
                </div>
              </Grid>
              <Grid lg={12} md={12} sm={12} xs={12} item>
                <div className={styles.typesContainer}>
                  <Grid container alignItems={"center"}>
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                      <p style={{ fontWeight: "bold" }}>Tipos</p>
                    </Grid>
                    <Grid
                      item
                      lg={6}
                      md={6}
                      sm={6}
                      xs={6}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <Grid
                        container
                        alignItems={"center"}
                        justifyContent={"center"}
                      >
                        {data.types.map((type, index) => (
                          <Grid
                            item
                            lg={6}
                            md={6}
                            sm={6}
                            xs={6}
                            justifyContent={"center"}
                            key={index}
                          >
                            <span>{type}</span>
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
              <Grid
                lg={6}
                md={6}
                sm={6}
                xs={6}
                item
                alignItems={"center"}
                justifyContent={"center"}
              >
                <p>Id: {data.id}</p>
              </Grid>
              {isNaN(data.id) && (
                <Grid
                  item
                  lg={6}
                  md={6}
                  sm={6}
                  xs={6}
                  container
                  alignItems={"center"}
                  justify={"center"}
                >
                  <button onClick={deletePokemon} className={styles.button}>
                    Borrar Pokemon
                  </button>
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid lg={6} md={6} sm={12} xs={12} item>
            <div className={styles.imageContainer}>
              <img
                style={{ padding: "10px" }}
                src={data.img}
                alt={`imagen de pokemon ${data.name}`}
                className={styles.img}
              />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  } else {
    return (
      <div>
        <img style={{ width: "350px" }} src={loader} alt="Loading gif" />
      </div>
    );
  }
}
