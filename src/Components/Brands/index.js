import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

//material ui
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { Typography, Toolbar, Button } from "@material-ui/core";

//actions
import * as BrandActions from "./redux/brand.actions.js";

//custom styles
import styles from "./brands.styles.js";

//components
import BrandList from "./Components/BrandList";
import BrandForm from "./Components/BrandForm";

function Index(props) {
  //hooks
  const [viewType, setViewType] = useState("list");

  //regular functions
  const fetchBrandsList = () => {
    props.getBrands({});
  };

  function getDisplayName() {
    switch (viewType) {
      case "list":
        return "Brands List";
      case "edit":
        return "Edit Brand";
      case "view":
        return "View Brand";
      case "create":
        return "Create Brand";
      default:
        return "User";
    }
  }

  const ListToolBar = () => (
    <div>
      <Link to={"/brands/create"}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          className={classNames(classes.btn, classes.btnPrimary)}
        >
          Create
        </Button>
      </Link>
    </div>
  );

  const FormToolBar = () => (
    <div>
      <Link to={"/brands"}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          className={classNames(classes.btn, classes.btnPrimary)}
        >
          {"BACK"}
        </Button>
      </Link>
    </div>
  );

  //hooks
  useEffect(() => {
    let { mode } = props.match.params;
    if (mode) {
      setViewType(mode);
    } else {
      fetchBrandsList();
    }
  }, [viewType]);

  const { classes } = props;
  let content = (
    <div>
      <div>
        <Typography variant="h5" gutterBottom>
          {getDisplayName()}
        </Typography>
        <Toolbar display="flex" dir="rtl">
          {viewType === "list" ? <ListToolBar /> : <FormToolBar />}
        </Toolbar>
      </div>
      <div>
        {viewType === "create" && <BrandForm type={viewType} />}
        {viewType === "edit" && (
          <BrandForm type={"edit"} id={props.match.params.id} />
        )}
        {viewType === "view" && (
          <BrandForm type={"view"} id={props.match.params.id} />
        )}
        {viewType === "list" && <BrandList brands={props.brands.list.data} />}
      </div>
    </div>
  );
  return content;
}

const mapStateToProps = state => ({
  auth: state.auth,
  brands:state.brands
});

const mapDispatchToProps = {
  getBrands: BrandActions.getBrands
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Index));
