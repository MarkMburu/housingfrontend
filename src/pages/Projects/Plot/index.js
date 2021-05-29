import React, { useState, useEffect } from "react";
import PageHeader from "../../../components/PageHeader";
import PlotForm from "./PlotForm";
import Popup from "../../../components/Popup";
import AddIcon from "@material-ui/icons/Add";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { Controls } from "../../../components/controls/Controls";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import { Grid, Typography } from "@material-ui/core";
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
import { PlotActions } from "../../../actions/plotActions";

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
  { id: "fullname", label: "FullName" },
  { id: "Phone", label: "Phone" },
  { id: "national Id", label: "National ID" },
  { id: "Allocation", label: "Allocation" },
  { id: "updatedat", label: "updated _at" },
  { id: "actions", label: "Actions", disableSorting: true },
];

function Plot(props) {
  const { id } = props;
  const classes = useStyles();
  const plots = useSelector((state) => state.plots.plots);
 
  const dispatch = useDispatch();
  // const fetchedPlot = Plotervices.getAllPlot().then(data => data)
  const [records, setRecords] = useState([]);
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

  // check beneficiaries exist then filter per member id
  
  const newPlot = plots ? plots.filter(  bn => bn.projectId === id ) : [];

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(newPlot, headCells, filterFn, isLoading);

  useEffect(() => {
    dispatch(PlotActions.getPlot());
  }, [notify]);

  const addOrEdit = (Plot, resetForm) => {
    if (Plot.id) {
      console.log(Plot);
      dispatch(PlotActions.updatePlot(Plot));
    } else {
      dispatch(PlotActions.addPlot(Plot));
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
            x.firstname.toLowerCase().includes(target.value.toLowerCase())
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
    dispatch(PlotActions.deletePlot(id));
    setNotify({
      isOpen: true,
      message: "Deleted Successfully",
      type: "error",
    });
  };

  return (
    <>
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.Input
            label="Search Plots"
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
            text="Add Plot"
            variant="outlined"
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => {
              setOpenPopup(true);
              setRecordForEdit(null);
            }}
          />
        </Toolbar>
        {plots && plots.length > 0 ? (
          <div>
            <TblContainer>
              <TblHead />
              <TableBody>
                {recordsAfterPagingAndSorting().map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>
                      {item.firstname +
                        " " +
                        item.middlename +
                        " " +
                        item.surname}
                    </TableCell>
                    <TableCell>{item.contact}</TableCell>
                    <TableCell>{item.nationalid}</TableCell>
                    <TableCell>{item.allocation}%</TableCell>
                    <TableCell>
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
                            title: "You are about to delete this Plot",
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
        title="Plot Form"
      >
        <PlotForm
          addOrEdit={addOrEdit}
          recordForEdit={recordForEdit}
          memberId={id}
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

export default Plot;
