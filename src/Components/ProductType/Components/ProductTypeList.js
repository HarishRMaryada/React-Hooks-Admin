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
import styles from "../producttypes.styles";

function ProductTypesList(props) {
  const List = () => {
    return (
      <Paper>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>Product Type</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.productTypes.map((productType, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  {productType.name ? productType.name : ""}
                </TableCell>
                <TableCell>
                  <Link to={`/producttypes/edit/${productType._id}`}>
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
  if (props.productTypes.length === 0) {
    listContent = <div>No Records Found</div>;
  }
  if (props.productTypes.length > 0) {
    listContent = <List />;
  }
  return listContent;
}

export default withStyles(styles)(ProductTypesList);
