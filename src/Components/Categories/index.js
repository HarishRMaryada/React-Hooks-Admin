import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

//material ui
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { Typography, Toolbar, Button } from "@material-ui/core";

//actions
import * as CategoriesAction from "./redux/categories.actions";

//custom styles
import styles from "./categories.styles.js";

//components
import CategoryList from "./Components/CategoryList";
import CategoryForm from "./Components/CategoryForm";

function Index(props) {
  //hooks
  const [viewType, setViewType] = useState("list");

  //regular functions
  const fetchCategories = () => {
    props.getCategories();
  };

  function getDisplayName() {
    switch (viewType) {
      case "list":
        return "Categories List";
      case "sublist":
        return "Sub-Categories List";
      case "edit":
        return "Edit Category";
      case "subedit":
        return "Edit Sub Category";
      case "view":
        return "View Category";
      case "create":
        return "Create Category";
      case "subcreate":
        return "Create Sub Category";

      default:
        return "Category";
    }
  }

  const ListToolBar = props => (
    <div>
      <Link
        to={
          props.type === "list" ? "/categories/create" : "/categories/subcreate"
        }
      >
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

  const FormToolBar = props => (
    <div>
      <Link
        to={
          props.type === "create" || props.type === "edit"
            ? "/categories"
            : "/categories/sublist"
        }
      >
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

  const CategoriesList = () => {
    let categories = [];
    if (props.categories.list.data) {
      props.categories.list.data.forEach(category => {
        if (!category.parentCategory) {
          categories.push(category);
        }
      });
    }
    return categories;
  };
  const SubCategoriesList = () => {
    let subCategoryList = [];
    if (props.categories.list.data) {
      props.categories.list.data.forEach(category => {
        if (category.parentCategory) {
          subCategoryList.push(category);
        }
      });
    }
    return subCategoryList;
  };

  //hooks
  useEffect(() => {
    let { mode } = props.match.params;
    if (mode) {
      setViewType(mode);
      console.log("viewType");
      console.log(viewType);
      if (mode === "sublist") {
        fetchCategories();
      }
    } else {
      fetchCategories();
    }
  }, [viewType, props.match.params]);
  const { classes } = props;
  let content = (
    <div>
      <div>
        <Typography variant="h5" gutterBottom>
          {getDisplayName()}
        </Typography>
        <Toolbar display="flex" dir="rtl">
          {viewType === "list" || viewType === "sublist" ? (
            <ListToolBar type={viewType} />
          ) : (
            <FormToolBar type={viewType} />
          )}
        </Toolbar>
      </div>
      <div>
        {viewType === "create" && (
          <CategoryForm type={viewType} catType={"category"} />
        )}
        {viewType === "subcreate" && (
          <CategoryForm type={viewType} catType={"subcategory"} />
        )}
        {viewType === "edit" && (
          <CategoryForm
            type={"edit"}
            id={props.match.params.id}
            catType={"category"}
          />
        )}
        {viewType === "subedit" && (
          <CategoryForm
            type={"edit"}
            id={props.match.params.id}
            catType={"subcategory"}
          />
        )}
        {viewType === "view" && (
          <CategoryForm type={"view"} id={props.match.params.id} />
        )}
        {viewType === "list" && (
          <CategoryList categories={CategoriesList()} catType={"category"} />
        )}
        {viewType === "sublist" && (
          <CategoryList
            subcategories={SubCategoriesList()}
            catType={"subcategory"}
          />
        )}
      </div>
    </div>
  );
  return content;
}

const mapStateToProps = state => ({
  categories: state.categories
});

const mapDispatchToProps = {
  getCategories: CategoriesAction.getCategories
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Index));
