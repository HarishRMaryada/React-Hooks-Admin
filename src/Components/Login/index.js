import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

//import component
import LoginForm from "./Component/LoginForm";

function Index(props) {
  return props.auth.isLoggedIn ? (
    <Redirect
      to={{
        pathname: "/"
      }}
    />
  ) : (
    <div>
      <LoginForm />
    </div>
  );
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
