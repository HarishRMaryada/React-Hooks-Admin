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
  //  --------------------------------------list ----------------------------------------
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
  //  --------------------------------------list ----------------------------------------
  //  ----------------------------------------------- ----------------------------------------\

  // -----------------------------------------------------------------------------------------\
  //  --------------------------------------enquiry view -------------------------------------
  //  ----------------------------------------------- ----------------------------------------\

  view_enquiry_card: {
    minWidth: 275
  },
  view_enquiry_typography: {
    backgroundColor: theme.palette.reactPrimary,
    color: theme.palette.common.white
  },
  // -----------------------------------------------------------------------------------------\
  //  --------------------------------------enquiry view --------------------------------------
  //  ----------------------------------------------- ----------------------------------------\
  // -----------------------------------------------------------------------------------------\
  //  --------------------------------------Organization view -------------------------------------
  //  ----------------------------------------------- ----------------------------------------\

  view_organization_card: {
    minWidth: 275
  },
  view_organization_typography: {
    backgroundColor: theme.palette.reactPrimary,
    color: theme.palette.common.white
  },
  // -----------------------------------------------------------------------------------------\
  //  --------------------------------------Organization view --------------------------------------
  //  ----------------------------------------------- ----------------------------------------\

  // -----------------------------------------------------------------------------------------
  //  --------------------------------------organization form --------------------------------
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
  //  --------------------------------------organization list --------------------------------
  //  ----------------------------------------------- ----------------------------------------\
});

export default styles;
