import React, { useState, useEffect } from "react";
import PageHeader from "../../../components/PageHeader";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import HousingForm from "./HousingForm";
import Popup from "../../../components/Popup";
import AddIcon from "@material-ui/icons/Add";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { Controls } from "../../../components/controls/Controls";
import {
  Toolbar,
  Paper,
  makeStyles,
  TableCell,
  TableBody,
  TableRow,
  InputAdornment,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import useTable from "../../../components/useTable";
import { Search } from "@material-ui/icons";
import Notification from "../../../components/Notification";
import ConfirmDialog from "../../../components/ConfirmDialog";
import { useSelector, useDispatch } from "react-redux";
import LinearIndeterminate from "../../../components/LinearIndeterminate";
import { HousingActions } from "../../../actions/housingActions";
import {withRouter} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "75%",
  },
  newButton: {
    position: "absolute",
    right: "10px",
  },
}));
const headCells = [
  { id: "Projectname", label: "Project Name" },
  { id: "projectnumber", label: "Project Number" },
  { id: "Number Of Units", label: "Number Of Units" },
  { id: "location", label: "Location" },
  { id: "updatedat", label: "updated _at" },
  { id: "actions", label: "Actions", disableSorting: true },
];

function HousingList(props) {
  const { history } = props;
  console.log("history",history)
  const classes = useStyles();
  const dispatch = useDispatch();
  const Housings = useSelector((state) => state.houses.houses);
  console.log("Housings from you know", Housings);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(Housings ? Housings:[] , headCells, filterFn, isLoading);
   
   
    useEffect(() => {
      dispatch(HousingActions.getHouseProjects());
    }, [notify]);

  const addOrEdit = (Housing, resetForm) => {
    if (Housing.id) {
      console.log(Housing);
      dispatch(HousingActions.updateHouseProject(Housing));
    } else {
      dispatch(HousingActions.addHouseProject(Housing));
    }

    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    setNotify({
      isOpen: true,
      message: "Submitted Successfully",
      type: "success",
    });
  };

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        else
          return items.filter((x) =>
            x.Housingname.toLowerCase().includes(target.value.toLowerCase())
          );
      },
    });
  };

  const openInPopUp = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };
  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    console.log("delete");
    dispatch(HousingActions.deleteHouseProject(id));
    setNotify({
      isOpen: true,
      message: "Deleted Successfully",
      type: "error",
    });
  };

  return (
    <>
    <PageHeader title="Housings Projects" subtitle="Housings Projects List" icon={<FormatListBulletedIcon/>}/> 
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.Input
            label="Search Housings"
            className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
          <Controls.Button
            text="Add Housing Project"
            variant="outlined"
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => {
              setOpenPopup(true);
              setRecordForEdit(null);
            }}
          />
        </Toolbar>
        {Housings&&Housings.length>0 ? (
          <div>
            <TblContainer>
              <TblHead />
              <TableBody>
                {recordsAfterPagingAndSorting().map((item) => (
                  <TableRow key={item.id}>
                    <TableCell
                      onClick={() => history.push("/housing/"+item.id)}
                    >
                      {item.projectname}
                    </TableCell>
                    <TableCell
                      onClick={() => history.push("/housing/"+item.id)}
                    >
                      {item.projectnumber}
                    </TableCell>
                    <TableCell
                      onClick={() => history.push("/housing/"+ item.id)}
                    >
                      {item.numberofunits}
                    </TableCell>
                    <TableCell
                      onClick={() => history.push("/housing/"+item.id)}
                    >
                      {item.location}
                    </TableCell>
                    <TableCell
                      onClick={() => history.push("/housing/"+item.id)}
                    >
                      {new Date(item.updated_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Controls.ActionButton
                        color="primary"
                        onClick={() => {
                          openInPopUp(item);
                        }}
                      >
                        <EditOutlinedIcon fontSize="small" />
                      </Controls.ActionButton>
                      <Controls.ActionButton
                        color="secondary"
                        onClick={() => {
                          setConfirmDialog({
                            isOpen: true,
                            title: "You are about to delete this Housing",
                            subTitle: "You cant reverse this process",
                            onConfirm: () => {
                              onDelete(item.id);
                            },
                          });
                        }}
                      >
                        <CloseIcon fontSize="small" />
                      </Controls.ActionButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </TblContainer>
          </div>
        ) : (
          <LinearIndeterminate />
        )}
        <TblPagination />
      </Paper>

      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Housing Form"
      >
        <HousingForm
          addOrEdit={addOrEdit}
          recordForEdit={recordForEdit}
        />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirm={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
}

export default withRouter(HousingList);
