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
import styles from "../brands.styles";

function CategoryList(props) {
  const List = () => {
    console.log(props);
    return (
      <Paper>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>Brand Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.brands.map((brand, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  {brand.organization ? brand.organization.name : ""}
                </TableCell>
                <TableCell>{brand.name}</TableCell>
                <TableCell>
                  <Link to={`/brands/edit/${brand._id}`}>
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
  if (props.brands.length === 0) {
    listContent = <div>No Records Found</div>;
  }
  if (props.brands.length > 0) {
    listContent = <List />;
  }
  return listContent;
}

export default withStyles(styles)(CategoryList);
