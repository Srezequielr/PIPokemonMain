import {
  Hidden,
  IconButton,
  Link,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import icon from "./../../images/icon.png";
import styles from "./Navbar.module.css";

export default function Navbar({ currentLocation }) {
  const theme = useTheme();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  return (
    <div>
      <nav
        className={styles.navBar}
        style={{ backgroundColor: theme.palette.primary.main }}
      >
        <div className={styles.iconContainer}>
          <img src={icon} className={styles.icon} alt="Pokemon icon" />
        </div>
        <div className={styles.buttonsContainer}>
          <Hidden mdDown>
            {currentLocation !== "/" && (
              <Link sx={{ marginRight: "20px" }} href="/">
                <button className={styles.buttonsmall}>Inicio</button>
              </Link>
            )}
            <Link sx={{ marginRight: "20px" }} href="/create_pokemon">
              <button className={styles.buttonsmall}>Crear Pokemon</button>
            </Link>
            <Link sx={{ marginRight: "20px" }} href="/my_pokemons">
              <button className={styles.buttonsmall}>Mis pokemons</button>
            </Link>
          </Hidden>
          <Hidden mdUp>
            {currentLocation !== "/" && (
              <Link sx={{ marginRight: "20px" }} href="/">
                <button className={styles.buttonsmall}>Inicio</button>
              </Link>
            )}
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem>
                <Link href="/create_pokemon">
                  <button>Crear Pokemon</button>
                </Link>
              </MenuItem>{" "}
              <MenuItem>
                <Link href="/my_pokemons">
                  <button>Mis pokemons</button>
                </Link>
              </MenuItem>
            </Menu>
          </Hidden>
        </div>
      </nav>
      <div className={styles.space} />
    </div>
  );
}

// <Grid container justify="center" alignItems="center">
// <Grid
//   xs={10}
//   lg={8}
//   item
//   style={{ display: "flex", alignItems: "center" }}
// >
//   <img src={icon} className={styles.icon} alt="Pokemon icon" />
//   <span>PokeApp</span>
// </Grid>
// <Hidden mdDown>
//   <Grid item>
//     <Grid container spacing={4} justifyContent={"center"}>
//       <Grid item>
// {currentLocation !== "/" && (
//   <Link href="/">
//     <button>Inicio</button>
//   </Link>
// )}
//       </Grid>
//       <Grid item>
// <Link href="/create_pokemon">
//   <button>Crear Pokemon</button>
// </Link>
//       </Grid>
//       <Grid item>
// <Link href="/my_pokemons">
//   <button>Mis pokemons</button>
// </Link>
//       </Grid>
//     </Grid>
//   </Grid>
// </Hidden>
// <Hidden mdUp>
//   <Grid item>
//     <Grid container spacing={4} justifyContent={"center"}>
//       <Grid item>hola</Grid>
//     </Grid>
//   </Grid>
// </Hidden>
// </Grid>
