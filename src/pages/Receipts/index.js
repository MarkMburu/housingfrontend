import React, { useState, useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import { Controls } from "../../components/controls/Controls";
import {
  Toolbar,
  Paper,
  makeStyles,
  TableCell,
  TableBody,
  TableRow,
  InputAdornment,
} from "@material-ui/core";
import useTable from "../../components/useTable";
import { Search } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import LinearIndeterminate from "../../components/LinearIndeterminate";
import { receiptActions } from "../../actions/receiptActions";
import { HousingActions } from "../../actions/housingActions";
import { withRouter } from "react-router-dom";
import SortIcon from "@material-ui/icons/Sort";
import ReceiptIcon from "@material-ui/icons/Receipt";

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
  { id: "rcptno", label: "RcptNo:" },
  { id: "accountnumber", label: "MemberNo:" },
  { id: "amount", label: "Amount" },
  { id: "particulars", label: "Particulars" },
  { id: "E.T", label: "E.T" },
  { id: "dateCaptured", label: "DateCaptured" },
];

function Receipt(props) {
  const { history } = props;
  console.log("history", history);
  const classes = useStyles();
  const dispatch = useDispatch();
  const receipts = useSelector((state) => state.receipts.receipts);
  const houses = useSelector((state) => state.houses.houses);
  console.log("receipts from you know", receipts);

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
    useTable(receipts ? receipts : [], headCells, filterFn, isLoading);

  useEffect(() => {
    dispatch(receiptActions.getReceipts());
  }, [notify]);

  const addOrEdit = (member, resetForm) => {
    if (member.id) {
      console.log(member);
      dispatch(receiptActions.updateMember(member));
    } else {
      dispatch(receiptActions.addMember(member));
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
  const getProjectName = (id) => {
    const project = houses.find((project) => project.id === id);
    console.log(id);
    return project.projectname;
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
    dispatch(receiptActions.deleteMember(id));
    setNotify({
      isOpen: true,
      message: "Deleted Successfully",
      type: "error",
    });
  };

  return (
    <>
      <PageHeader
        title="Receipts"
        subtitle="Receipt List"
        icon={<ReceiptIcon />}
      />
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.Input
            label="Search Receipts"
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
            text="Sort Receipts"
            variant="outlined"
            startIcon={<SortIcon />}
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
                  <TableRow key={item.id}>
                    <TableCell
                      onClick={() => history.push("/transactions/" + item.id)}
                    >
                      {item.rcptno}
                    </TableCell>
                    <TableCell
                      onClick={() => history.push("/transactions/" + item.id)}
                    >
                      {item.accountnumber}
                    </TableCell>
                    <TableCell
                      onClick={() => history.push("/transactions/" + item.id)}
                    >
                      { (item.amount).toLocaleString('en-US', {style: 'currency',currency: 'KSH',}) || "N/A"}
                    </TableCell>
                    <TableCell
                      onClick={() => history.push("/transactions/" + item.id)}
                    >
                      {item.description}
                    </TableCell>
                    <TableCell
                      onClick={() => history.push("/transactions/" + item.id)}
                    >
                      {item.entrytype}
                    </TableCell>

                    <TableCell>
                      {new Date(item.datecaptured).toLocaleDateString()}
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

      {/* <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Member Form"
      >
        <PersonalInformationForm
          addOrEdit={addOrEdit}
          recordForEdit={recordForEdit}
        />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirm={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      /> */}
    </>
  );
}

export default withRouter(Receipt);
