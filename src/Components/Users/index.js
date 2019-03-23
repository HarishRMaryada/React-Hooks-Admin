import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

//material ui
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { Typography, Toolbar, Button } from "@material-ui/core";

//actions
import * as UserActions from "./redux/users.actions.js";

//custom styles
import styles from "./users.styles.js";

//components
import UserList from "./Components/UserList";
import UserForm from "./Components/UserForm";

function Index(props) {
  //hooks
  const [viewType, setViewType] = useState("list");

  //regular functions
  const fetchUsersList = () => {
    let query = {};
    query.organization = props.auth.user.organization;
    props.getUsers(query);
  };

  function getDisplayName() {
    switch (viewType) {
      case "list":
        return "Users List";
      case "edit":
        return "Edit User";
      case "view":
        return "View User";
      case "create":
        return "Create User";
      default:
        return "User";
    }
  }

  const ListToolBar = () => (
    <div>
      <Link to={"/users/create"}>
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
      <Link to={"/users"}>
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
      fetchUsersList();
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
        {viewType === "create" && <UserForm type={viewType} />}
        {viewType === "edit" && (
          <UserForm type={"edit"} id={props.match.params.id} />
        )}
        {viewType === "view" && (
          <UserForm type={"view"} id={props.match.params.id} />
        )}
        {viewType === "list" && <UserList users={props.users.list.data} />}
      </div>
    </div>
  );
  return content;
}

const mapStateToProps = state => ({
  users: state.users,
  auth: state.auth
});

const mapDispatchToProps = {
  getUsers: UserActions.getUsers
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Index));
