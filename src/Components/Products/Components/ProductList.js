import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

//material ui styles
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  Button
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EditIcon from "@material-ui/icons/Create";


//custom styles
import styles from "../products.styles";

function ProductList(props) {
  //hooks
  const [expanded, setExpanded] = useState(false);

  const handleChange = index => (event, expanded) => {
    setExpanded(expanded ? index : false);
  };

  const _getStatusClassName = status => {
    switch (status) {
      case "Publish":
        return classes.textActive;
      case "Draft":
        return classes.textProcessing;
      case "Deleted":
        return classes.textDeleted;
      default:
        return "";
    }
  };

  const List = () => {
    return (
      <div>
        {products.map((product, index) => {
          return (
            <ExpansionPanel
              key={index}
              expanded={expanded === index}
              onChange={handleChange(index)}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <div className={classes.threeUnitSpace}>
                  <Typography className={classes.boldFont}>Company Name</Typography>
                  <Typography className={classes.regularFont}>
                  {product.organization ? product.organization.name : ""}
                  </Typography>
                </div>
                <div className={classes.threeUnitSpace}>
                  <Typography className={classes.boldFont}>Product Title</Typography>
                  <Typography className={classes.regularFont}>
                  {product.productTitle ? product.productTitle : ""}
                  </Typography>
                </div>
                <div className={classes.twoUnitSpace}>
                  <Typography className={classes.boldFont}>Product Type</Typography>
                  <Typography className={classes.regularFont}>
                  {product.productType ? product.productType.name : ""}
                  </Typography>
                </div>
                <div className={classes.twoUnitSpace}>
                  <Typography className={classes.boldFont}>Category</Typography>
                  <Typography className={classes.regularFont}>
                  {product.category ? product.category.name : ""}
                  </Typography>
                </div>
                <div className={classes.twoUnitSpace}>
                  <Typography className={classes.boldFont}>Model</Typography>
                  <Typography className={classes.regularFont}>
                  {product.model}
                  </Typography>
                </div>
                <div className={classes.twoUnitSpace}>
                  <Typography className={classes.boldFont}>Status</Typography>
                  <Typography
                    className={classNames(
                      classes.boldFont,
                      _getStatusClassName(product.status)
                    )}
                  >
                    {product.status}
                  </Typography>
                </div>
                <div className={classes.threeUnitSpace}>
                  <Typography className={classes.boldFont}>Actions</Typography>
                  <Typography>
                    <Link to={`/products/edit/${product._id}`}>
                      <Button
                        size="small"
                        color="inherit"
                        className={classes.iconBtn}
                      >
                        <EditIcon style={{ fontSize: 25 }} />
                      </Button>
                    </Link>                    
                  </Typography>
                </div>
              </ExpansionPanelSummary>
              {/* <ExpansionPanelDetails>
                <div className={classes.columnCustomer}>
                  <Typography className={classes.heading}>Address</Typography>
                  <Typography className={classes.datavalueSmall}>
                    Plot :{" "}
                  </Typography>
                </div>
              </ExpansionPanelDetails> */}
            </ExpansionPanel>
          );
        })}
      </div>
    );
  };

  const { products, classes } = props;

  let bodyContent = <p>Loading....</p>;
  if (products.length === 0) {
    bodyContent = <p>No Records Found</p>;
  } else {
    bodyContent = <List />;
  }
  return bodyContent;
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {
  // deleteUserById: Product.deleteUserById
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ProductList));
