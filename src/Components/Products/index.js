import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

//material ui
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { Toolbar, Button, Typography } from "@material-ui/core";

//custom styles
import styles from "./products.styles";

//actions
import * as ProductActions from "./redux/products.actions";

//components
import ProductForm from "./Components/ProductForm";
import ProductList from "./Components/ProductList";

function index(props) {
  //hooks
  const [viewType, setViewType] = useState("list");

  //regular functions
  function getDisplayName() {
    switch (viewType) {
      case "list":
        return "Products List";
      case "edit":
        return "Edit Product";
      case "view":
        return "View Product";
      case "create":
        return "Create Product";
      default:
        return "Product";
    }
  }
  const fetchProductsList = () => {
    let searchObj = {
      searchQuery: {
        organization: props.auth.user.organization
      }
    };
    props.getProducts(searchObj);
  };

  const ListToolBar = () => (
    <div>
      <Link to={"/products/create"}>
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
      <Link to={"/products"}>
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
      fetchProductsList();
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
        {viewType === "create" && <ProductForm type={viewType} />}
        {viewType === "edit" && (
          <ProductForm type={"edit"} id={props.match.params.id} />
        )}
        {viewType === "view" && (
          <ProductForm type={"view"} id={props.match.params.id} />
        )}
        {viewType === "list" && (
          <ProductList products={props.products.list.data} />
        )}
      </div>
    </div>
  );
  return content;
}

const mapStateToProps = state => ({
  auth: state.auth,
  products: state.products
});

const mapDispatchToProps = {
  getProducts: ProductActions.getProducts
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(index));
