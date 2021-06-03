import React, { useState, useEffect } from "react";
import PageHeader from "../../../components/PageHeader";
import InstallmentSaleForm from "./InstallmentSaleForm";
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
import { InstallmentSaleActions } from "../../../actions/InstallmentSaleAction";

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
  { id: "InstallmentSalename", label: "InstallmentSale Name" },
  { id: "size", label: "Size" },
  { id: "numberofInstallments", label: "No. Installments" },
  { id: "costprice", label: "Cost Price" },
  { id: "installments", label: "Installments" },
  { id: "price", label: "price" },
  { id: "actions", label: "Actions", disableSorting: true },
];

function Installment(props) {
  const { id } = props;
  const classes = useStyles();
  const InstallmentSales = useSelector((state) => state.InstallmentSales.InstallmentSales);
 
  const dispatch = useDispatch();
  // const fetchedInstallmentSale = InstallmentSaleervices.getAllInstallmentSale().then(data => data)
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
  
  const newInstallmentSale = InstallmentSales ? InstallmentSales.filter(  bn => bn.projectId === id ) : [];

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(newInstallmentSale, headCells, filterFn, isLoading);

  useEffect(() => {
    dispatch(InstallmentSaleActions.getInstallmentSale());
  }, [notify]);

  const addOrEdit = (InstallmentSale, resetForm) => {
    if (InstallmentSale.id) {
      console.log(InstallmentSale);
      dispatch(InstallmentSaleActions.updateInstallmentSale(InstallmentSale));
    } else {
      dispatch(InstallmentSaleActions.addInstallmentSale(InstallmentSale));
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
    dispatch(InstallmentSaleActions.deleteInstallmentSale(id));
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
            label="Search InstallmentSales"
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
            text="Add InstallmentSale"
            variant="outlined"
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => {
              setOpenPopup(true);
              setRecordForEdit(null);
            }}
          />
        </Toolbar>
        {InstallmentSales && InstallmentSales.length > 0 ? (
          <div>
            <TblContainer>
              <TblHead />
              <TableBody>
                {recordsAfterPagingAndSorting().map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>
                      {item.InstallmentSalename}
                    </TableCell>
                    <TableCell>{item.size +" Acres"}</TableCell>
                    <TableCell>{item.numberofInstallments}</TableCell>
                    <TableCell>{item.costprice}</TableCell>
                    <TableCell>{item.installments}</TableCell>
                    <TableCell>{item.costprice / item.installments}</TableCell>
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
                            title: "You are about to delete this InstallmentSale",
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
        title="InstallmentSale Form"
      >
        <InstallmentSaleForm
          addOrEdit={addOrEdit}
          recordForEdit={recordForEdit}
          projectId={id}
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

export default Installment;
