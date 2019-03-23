import React from "react";
import { Link } from "react-router-dom";

//material-ui styles
import { withStyles } from "@material-ui/core/styles";
import {
  Paper,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Create";

//cutom styles
import styles from "../categories.styles";

function CategoryList(props) {
  const List = props => {
    console.log(props);
    return (
      <Paper>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              {props.type === "category" ? (
                <TableCell>Product Type</TableCell>
              ) : (
                <TableCell>Category</TableCell>
              )}

              {props.type === "category" ? (
                <TableCell>Category</TableCell>
              ) : (
                <TableCell>Sub-Category</TableCell>
              )}

              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.categories.map((Category, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>

                {props.type === "category" ? (
                  <TableCell>
                    {Category.productType ? Category.productType.name : ""}
                  </TableCell>
                ) : (
                  <TableCell>
                    {Category.parentCategory
                      ? Category.parentCategory.name
                      : ""}
                  </TableCell>
                )}

                <TableCell>{Category.name}</TableCell>

                <TableCell>
                  <Link to={props.type === "category" ?`/categories/edit/${Category._id}`:`/categories/subedit/${Category._id}`}>
                    <Button
                      size="small"
                      color="inherit"
                      className={classes.btnVerySmall}
                    >
                      <EditIcon style={{ fontSize: 25 }} />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  };

  const { classes } = props;
  let listContent = <div>Loading...</div>;
  if (props.catType === "category" && props.categories.length === 0) {
    listContent = <div>No Records Found</div>;
  }
  if (props.catType === "category" && props.categories.length > 0) {
    listContent = <List categories={props.categories} type={props.catType} />;
  }
  if (props.catType === "subcategory" && props.subcategories.length === 0) {
    listContent = <div>No Records Found</div>;
  }
  if (props.catType === "subcategory" && props.subcategories.length > 0) {
    listContent = (
      <List categories={props.subcategories} type={props.catType} />
    );
  }
  return listContent;
}

export default withStyles(styles)(CategoryList);
