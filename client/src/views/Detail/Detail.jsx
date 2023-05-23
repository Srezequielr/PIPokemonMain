import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPokeDetail } from "../../redux/actions";
import loader from "./../../images/loadingGif.gif";
import errorImage from "./../../images/errorImage.png";
import { Grid, useTheme } from "@mui/material";
import styles from "./Detail.module.css";

export default function Detail(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.pokeDetail);
  const { error, data } = pokemon;
  const theme = useTheme();
  useEffect(() => {
    dispatch(getPokeDetail(id));
  }, [dispatch, id]);

  console.log(pokemon);

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
            <Grid container>
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
            </Grid>
          </Grid>
          <Grid lg={6} md={6} sm={12} xs={12} item>
            <div className={styles.imageContainer}>
              <img style={{padding: "10px"}} src={data.img} alt={`imagen de pokemon ${data.name}`} />
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
