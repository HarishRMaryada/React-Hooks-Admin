import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

//material package
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";

//material core styles
import { CssBaseline, Paper, Typography, Button } from "@material-ui/core";

//images
import Logo from "../../../Common/Images/logo.svg";

//input components
import TextField from "../../../Common/Inputs/TextField";

// styles
import styles from "../login.styles";

// actions
import * as LoginActions from "../redux/login.actions";

class Login extends React.Component {
  onSubmitLogin = values => {
    values = {
      username: values.username,
      password: values.password,
      grant_type: "password",
      client_id: "evmax-SuperAdmin",
      client_secret: "y2w5jtCqhgYIo7MbJ4PlQF3QEet3mqOqc8Aq10"
    };
    this.props.loginUser(values);
  };
  render() {
    const { classes, handleSubmit } = this.props;
    return (
      <div>
        <main className={classes.main}>
          <CssBaseline />
          <Paper className={classes.paper}>
            <img src={Logo} alt={"logo"} className={classes.logo} />
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <form onSubmit={handleSubmit(this.onSubmitLogin)}>
              <Field
                className={classes.textBase}
                name="username"
                autoComplete="username"
                component={TextField}
                label="UserName/Email"
              />
              <Field
                className={classes.textBase}
                name="password"
                type="password"
                autoComplete="current-password"
                component={TextField}
                label="password"               
              />
              <Button
                className={classNames(classes.btn, classes.btnPrimary)}
                type="submit"
              >
                Login
              </Button>
            </form>
          </Paper>
        </main>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func
};

let LoginForm = reduxForm({
  form: "loginForm" // a unique identifier for this form
})(Login);

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {
  loginUser: LoginActions.loginUser
};

LoginForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);

export default withStyles(styles)(LoginForm);
