import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

//material-ui styles
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Button
} from "@material-ui/core";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EditIcon from "@material-ui/icons/Create";
import CrossIcon from "@material-ui/icons/Clear";

//custom styles
import styles from "../users.styles";

//actions
import * as UserActions from "../redux/users.actions";

function UserList(props) {
  //hooks
  const [expanded, setExpanded] = useState(false);

  const _getStatusClassName = status => {
    switch (status) {
      case "Active":
        return classes.textActive;
      case "Processing":
        return classes.textProcessing;
      case "Deleted":
        return classes.textDeleted;
      default:
        return "";
    }
  };

  const handleChange = index => (event, expanded) => {
    setExpanded(expanded ? index : false);
  };

  const confirmDeleteUser = id => {
    console.log("DELETE HIT");
    deleteUser(id);
  };

  const deleteUser = id => {
    props.deleteUserById(id, { status: "Deleted" }, (err, result) => {
      //   if (result) {
      //     this.setState({ error: null, success: true, openDeleteDialog: false });
      //   } else {
      //     this.setState({ error: "Update Failed", openDeleteDialog: false });
      //   }
    });
  };

  const List = () => {
    return (
      <div>
        {users.map((user, index) => {
          return (
            <ExpansionPanel
              key={index}
              expanded={expanded === index}
              onChange={handleChange(index)}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <div className={classes.threeUnitSpace}>
                  <Typography className={classes.boldFont}>Name</Typography>
                  <Typography className={classes.regularFont}>
                    {user.name}
                  </Typography>
                </div>
                <div className={classes.threeUnitSpace}>
                  <Typography className={classes.boldFont}>Email</Typography>
                  <Typography className={classes.regularFont}>
                    {user.email}
                  </Typography>
                </div>
                <div className={classes.twoUnitSpace}>
                  <Typography className={classes.boldFont}>Phone</Typography>
                  <Typography className={classes.regularFont}>
                    {user.phone}
                  </Typography>
                </div>
                <div className={classes.twoUnitSpace}>
                  <Typography className={classes.boldFont}>Roles</Typography>
                  <Typography className={classes.regularFont}>
                    {user.roles.length > 1 ? user.roles.toString() : user.roles}
                  </Typography>
                </div>
                <div className={classes.twoUnitSpace}>
                  <Typography className={classes.boldFont}>Status</Typography>
                  <Typography
                    className={classNames(
                      classes.boldFont,
                      _getStatusClassName(user.status)
                    )}
                  >
                    {user.status}
                  </Typography>
                </div>
                <div className={classes.threeUnitSpace}>
                  <Typography className={classes.boldFont}>Actions</Typography>
                  <Typography>
                    <Link to={`/users/edit/${user._id}`}>
                      <Button
                        size="small"
                        color="inherit"
                        className={classes.iconBtn}
                      >
                        <EditIcon style={{ fontSize: 25 }} />
                      </Button>
                    </Link>
                    {props.auth.user &&
                      props.auth.user.roles.indexOf("SuperAdmin") > -1 &&
                      user.roles.indexOf("SuperAdmin") !== 0 && (
                        <Button
                          size="small"
                          color="secondary"
                          className={classes.iconBtn}
                          onClick={() => confirmDeleteUser(user._id)}
                        >
                          <CrossIcon style={{ fontSize: 25 }} />
                        </Button>
                      )}
                  </Typography>
                </div>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div className={classes.columnCustomer}>
                  <Typography className={classes.heading}>Address</Typography>
                  <Typography className={classes.datavalueSmall}>
                    Plot :{" "}
                  </Typography>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          );
        })}
      </div>
    );
  };
  const { users, classes } = props;
  let bodyContent = <p>Loading....</p>;
  if (users.length === 0) {
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
  deleteUserById: UserActions.deleteUserById
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UserList));
