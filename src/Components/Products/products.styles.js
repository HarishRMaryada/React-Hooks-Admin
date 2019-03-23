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
  //  --------------------------------------products list ----------------------------------------
  //  ----------------------------------------------- ----------------------------------------
  oneUnitSpace: {
    flexBasis: "20%"
  },
  twoUnitSpace: {
    flexBasis: "20%"
  },
  threeUnitSpace: {
    flexBasis: "20%"
  },
  fourUnitSpace: {
    flexBasis: "20%"
  },
  boldFont: {
    fontSize: theme.typography.pxToRem(13),
    fontWeight: "bold"
  },
  regularFont: {
    fontSize: theme.typography.pxToRem(13)
  },
  textActive: {
    color: theme.local.deepTealColor
  },
  textProcessing: {
    color: theme.local.deepAmberColor
  },
  textDeleted: {
    color: theme.local.lightRedColor
  },
  iconBtn: {
    maxWidth: "40px",
    maxHeight: "30px",
    minWidth: "40px",
    minHeight: "30px"
  },

  // -----------------------------------------------------------------------------------------
  //  --------------------------------------products list ----------------------------------------
  //  ----------------------------------------------- ----------------------------------------\

  // -----------------------------------------------------------------------------------------
  //  --------------------------------------product form ----------------------------------------
  //  ----------------------------------------------- ----------------------------------------\

  formRootPaper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit * 5,
    justify: "center"
  },
  textBase: {
    margin: theme.spacing.unit,
    width: 400
  },
  selectBase: {
    margin: theme.spacing.unit
  },
   
 

  // -----------------------------------------------------------------------------------------
  //  --------------------------------------product form ----------------------------------------
  //  ----------------------------------------------- ----------------------------------------\
});

export default styles;
