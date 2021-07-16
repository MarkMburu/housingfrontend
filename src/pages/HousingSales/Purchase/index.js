import React, { useState, useEffect } from "react";
import PageHeader from "../../../components/PageHeader";
import PurchaseForm from "./PurchaseForm";
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
import { receiptActions } from "../../../actions/receiptActions";

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
  { id: "rcptno", label: "rcptno" },
  { id: "size", label: "Particulars" },
  { id: "datecaptured", label: "Date Captured" },
  { id: "costprice", label: "Cost Price" },
  { id: "amount", label: "Amount Paid" },
  { id: "price", label: "Balance" },
  { id: "actions", label: "Actions", disableSorting: true },
];

function Purchase(props) {
  const classes = useStyles();
  const receipts = useSelector((state) => state.receipts.receipts);
 
  const dispatch = useDispatch();
  // const fetchedPurchase = Purchaseervices.getAllPurchase().then(data => data)
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
  
  const newPurchase = receipts ? receipts.filter( bn => bn.houseId !== null ) : [];

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(newPurchase ? newPurchase : [], headCells, filterFn, isLoading);

  useEffect(() => {
    dispatch(receiptActions.getReceipts());;
  }, [notify]);

  const addOrEdit = (Purchase, resetForm) => {
    if (Purchase.id) {
      console.log(Purchase);
      dispatch(receiptActions.updateReceipt(Purchase));;
    } else {
      dispatch(receiptActions.addReceipt(Purchase));
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
    dispatch( dispatch(receiptActions.deleteReceipt(id)));
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
            label="Search Purchases"
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
            text="New Sale"
            variant="outlined"
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => {
              setOpenPopup(true);
              setRecordForEdit(null);
            }}
          />
        </Toolbar>
        {receipts && receipts.length > 0 ? (
          <div>
            <TblContainer>
              <TblHead />
              <TableBody>
                {recordsAfterPagingAndSorting().map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>
                      {item.rcptno}
                    </TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{new Date(item.datecaptured).toLocaleDateString()}</TableCell>
                    <TableCell>{(item.price).toLocaleString('en-US', {style: 'currency',currency: 'KSH',})}</TableCell>
                    <TableCell>{(item.amount).toLocaleString('en-US', {style: 'currency',currency: 'KSH',})}</TableCell>
                    <TableCell>{(item.balance).toLocaleString('en-US', {style: 'currency',currency: 'KSH',})}</TableCell>
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
                            title: "You are about to delete this Purchase",
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
        title="New Sale Form"
      >
        <PurchaseForm
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

export default Purchase;
