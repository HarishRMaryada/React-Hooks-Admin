import React, { useState } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";

//material ui
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";

//material ui styling
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Drawer,
  Divider,
  Typography,
  IconButton,
  List
} from "@material-ui/core";

//custom style
import styles from "./layout.styles";

//material components
import MenuIcon from "@material-ui/icons/Menu";
import PowerIcon from "@material-ui/icons/PowerSettingsNew";

//components and presentators
import LeftMenu from "./LeftMenu";
import BreadCrum from "../../Common/Presentators/BreadCrum";

import Dashboard from "../Dashboard/Index";
import Users from "../Users";
import Organizations from "../Organizations";
import Products from "../Products";
import Brands from "../Brands";
import Categories from "../Categories";
import ProductTypes from "../ProductType";
import Partners from "../Partners";
import PageNotFound from "../../Common/Presentators/PageNotFound";

//store
import store from "../../Store/store";
//actions
import * as AuthActions from "../Login/redux/login.actions";
//images
import logo from "../../Common/Images/logo.svg";

function Index(props) {
  //state
  const [openDrawer, setOpenDrawer] = useState(false);
  const SuperAdmin = props.auth.user.roles.indexOf("SuperAdmin") > -1;

  const { classes } = props;
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={classNames(classes.appBar, {
          [classes.appBarShift]: openDrawer
        })}
      >
        <Toolbar disableGutters={!openDrawer}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={() => {
              setOpenDrawer(!openDrawer);
            }}
            className={classNames(classes.IconButton)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.grow}
          >
            EV-MAX
          </Typography>
          {props.auth && props.auth.user && props.auth.user.username}
          <IconButton
            color="inherit"
            className={classNames(classes.IconButton)}
            onClick={() => {
              store.dispatch(AuthActions.logout());
              props.history.push("/login");
            }}
          >
            <PowerIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={classNames(classes.drawer, {
          [classes.drawerOpen]: openDrawer,
          [classes.drawerClose]: !openDrawer
        })}
        classes={{
          paper: classNames({
            [classes.drawerOpen]: openDrawer,
            [classes.drawerClose]: !openDrawer
          })
        }}
        open={openDrawer}
      >
        <div className={classes.toolbar}>
          <img className={classes.logoToolbar} src={logo} alt={"logo"} />
        </div>
        <Divider />
        <List>
          <LeftMenu
            roles={props.auth.user.roles}
            status={props.auth.user.status}
          />
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <BreadCrum
          breadCrum={props.location.pathname}
          baseUrl={props.match.url}
        />
        {!(props.auth.user.status === "Active") && !SuperAdmin ? (
          <Route path="/" exact={true} component={Partners} />
        ) : (
          <Route path="/" exact={true} component={Dashboard} />
        )}

        {/*users routing */}
        <Route path="/users/:mode/:id" exact={true} component={Users} />
        <Route path="/users/:mode" exact={true} component={Users} />
        <Route path="/users" exact={true} component={Users} />

        {SuperAdmin ? (
          <Route
            path="/organizations/:mode/:id"
            exact={true}
            component={Organizations}
          />
        ) : (
          <Route
            path="/organizations/:mode/:id"
            exact={true}
            component={PageNotFound}
          />
        )}
        {SuperAdmin ? (
          <Route
            path="/organizations/:mode"
            exact={true}
            component={Organizations}
          />
        ) : (
          <Route
            path="/organizations/:mode"
            exact={true}
            component={PageNotFound}
          />
        )}
        {SuperAdmin ? (
          <Route path="/organizations" exact={true} component={Organizations} />
        ) : (
          <Route path="/organizations" exact={true} component={PageNotFound} />
        )}

        {/*products routing */}
        <Route path="/products/:mode/:id" exact={true} component={Products} />
        <Route path="/products/:mode" exact={true} component={Products} />
        <Route path="/products" exact={true} component={Products} />
        <div>
          {/*organizations routing */}

          {/*brands routing */}
          <Route path="/brands/:mode/:id" exact={true} component={Brands} />
          <Route path="/brands/:mode" exact={true} component={Brands} />
          <Route path="/brands" exact={true} component={Brands} />
          {/*producttypes routing */}
          <Route
            path="/producttypes/:mode/:id"
            exact={true}
            component={ProductTypes}
          />
          <Route
            path="/producttypes/:mode"
            exact={true}
            component={ProductTypes}
          />
          <Route path="/producttypes" exact={true} component={ProductTypes} />
          {/*Categories routing */}
          <Route
            path="/categories/:mode/:id"
            exact={true}
            component={Categories}
          />
          <Route path="/categories/:mode" exact={true} component={Categories} />
          <Route path="/categories" exact={true} component={Categories} />

          {/*parnters routing */}
          <Route path="/partners" exact={true} component={Partners} />
        </div>
      </main>
    </div>
  );
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(Index));
