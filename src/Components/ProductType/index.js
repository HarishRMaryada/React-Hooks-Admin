import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

//material ui
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { Typography, Toolbar, Button } from "@material-ui/core";

//actions
import * as ProductTypeActions from "./redux/producttype.actions";

//custom styles
import styles from "./producttypes.styles.js";

//components
import ProductTypeList from "./Components/ProductTypeList";
import ProductTypeForm from "./Components/ProductTypeForm";

function Index(props) {
  //hooks
  const [viewType, setViewType] = useState("list");

  //regular functions
  const fetchData = () => {
    props.getProductTypes({});
  };

  function getDisplayName() {
    switch (viewType) {
      case "list":
        return "ProductTypes List";
      case "edit":
        return "Edit ProductType";
      case "view":
        return "View ProductType";
      case "create":
        return "Create ProductType";
      default:
        return "ProductTypes";
    }
  }

  const ListToolBar = () => (
    <div>
      <Link to={"/producttypes/create"}>
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
      <Link to={"/producttypes"}>
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
      fetchData();
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
        {viewType === "create" && <ProductTypeForm type={viewType} />}
        {viewType === "edit" && (
          <ProductTypeForm type={"edit"} id={props.match.params.id} />
        )}
        {viewType === "view" && (
          <ProductTypeForm type={"view"} id={props.match.params.id} />
        )}
        {viewType === "list" && (
          <ProductTypeList productTypes={props.productTypes.list.data} />
        )}
      </div>
    </div>
  );
  return content;
}

const mapStateToProps = state => ({
  auth: state.auth,
  productTypes: state.productTypes
});

const mapDispatchToProps = {
  getProductTypes: ProductTypeActions.getProductTypes
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Index));
