import React, { useState, useEffect } from "react";
import PageHeader from "../../../components/PageHeader";
import EntranceFeeForm from "./EntranceFeeForm";
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
  { id: "rctno", label: "Rcpt No:" },
  { id: "Name", label: "Full Name" },
  { id: "amount", label: "Amount" },
  { id: "balance", label: "Balance" },
  { id: "updatedat", label: "updated _at" },
  { id: "actions", label: "Actions", disableSorting: true },
];

function EntranceFee(props) {
  const { id } = props;
  const classes = useStyles();
  const receipts = useSelector((state) => state.receipts.receipts);
  console.log(receipts)
  const dispatch = useDispatch();
  // const fetchedEntranceFee = EntranceFeeervices.getAllEntranceFee().then(data => data)
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
  const memberReceipt = receipts ? receipts.filter(receipt => receipt.memberId === id) : [];

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(memberReceipt, headCells, filterFn, isLoading);

  useEffect(() => {
    dispatch(receiptActions.getReceipts());
  }, [notify]);

  const addOrEdit = (receipt, resetForm) => {
    if (receipt.id) {
      console.log(receipt);
      dispatch(receiptActions.updateReceipt(receipt));
    } else {
      dispatch(receiptActions.addReceipt(receipt));
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
            x.name.toLowerCase().includes(target.value.toLowerCase())
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
    dispatch(receiptActions.addreceipt(id));
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
            label="Search Entrance Fee Receipts"
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
            text="Add EntranceFee"
            variant="outlined"
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => {
              setOpenPopup(true);
              setRecordForEdit(null);
            }}
          />
        </Toolbar>
        {memberReceipt && memberReceipt > 0 ? (
          <div>
            <TblContainer>
              <TblHead />
              <TableBody>
                {recordsAfterPagingAndSorting().map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.amount}</TableCell>
                    <TableCell>{item.balance}</TableCell>
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
                            title: "You are about to delete this EntranceFee",
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
        title="Entrance Fee Form"
      >
        <EntranceFeeForm addOrEdit={addOrEdit} recordForEdit={recordForEdit} memberId={id} />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirm={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
}

export default EntranceFee;
