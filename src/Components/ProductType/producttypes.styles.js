const styles = theme => ({
    btn: {
      marginTop: theme.spacing.unit * 3
    },
    btnPrimary: {
      background: theme.palette.reactPrimary,
      color: "white",
      "&:hover": {
        background: theme.palette.reactPrimary
      }
    },
  
  
    // -----------------------------------------------------------------------------------------
    //  --------------------------------------user form ----------------------------------------
    //  ----------------------------------------------- ----------------------------------------\
  
  
    formRootPaper: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 5,
      paddingBottom: theme.spacing.unit * 5,
      justify: "center"
    },
    textBase: {
      margin: theme.spacing.unit,
      width: 300
    },
    selectBase: {
      margin: theme.spacing.unit,
    },
    // -----------------------------------------------------------------------------------------
    //  --------------------------------------user list ----------------------------------------
    //  ----------------------------------------------- ----------------------------------------\
  });
  
  export default styles;
  