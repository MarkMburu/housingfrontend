import React, { useState, useEffect } from "react";
import PageHeader from "../../../components/PageHeader";
import PersonalInformationForm from "./PersonalInformationForm";
import Popup from "../../../components/Popup";
import AddIcon from "@material-ui/icons/Add";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { Controls } from "../../../components/controls/Controls";
import GroupAddIcon from '@material-ui/icons/GroupAdd';
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
import { MemberActions } from "../../../actions/memberActions";
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
  { id: "accounttype", label: "Account Type" },
  { id: "accountnumber", label: "Member No:" },
  { id: "fullname", label: "FullName" },
  { id: "nationalid", label: "ID" },
  { id: "phone", label: "Phone" },
  { id: "actions", label: "Actions", disableSorting: true },
];

function MemberList(props) {
  const { history } = props;
  console.log("history",history)
  const classes = useStyles();
  const dispatch = useDispatch();
  const members = useSelector((state) => state.members.members);
  console.log("Members from you know", members);

  const [records, setRecords] = useState(members);
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
    useTable(members ? members : [], headCells, filterFn, isLoading);
   
   
    useEffect(() => {
      dispatch(MemberActions.getMembers());
    }, [notify]);

  const addOrEdit = (member, resetForm) => {
    if (member.id) {
      console.log(member);
      dispatch(MemberActions.updateMember(member));
    } else {
      dispatch(MemberActions.addMember(member));
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
    dispatch(MemberActions.deleteMember(id));
    setNotify({
      isOpen: true,
      message: "Deleted Successfully",
      type: "error",
    });
  };

  return (
    <>
    <PageHeader title="Members" subtitle="Members List" icon={<GroupAddIcon/>}/> 
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.Input
            label="Search Members"
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
            text="Add Member"
            variant="outlined"
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => {
              setOpenPopup(true);
              setRecordForEdit(null);
            }}
          />
        </Toolbar>
        {members&&members.length>0 ? (
          <div>
            <TblContainer>
              <TblHead />
              <TableBody>
                {recordsAfterPagingAndSorting().map((item) => (
                  <TableRow key={item.id}>
                    <TableCell
                      onClick={() => history.push("/members/"+item.id)}
                    >
                      {item.accounttype}
                    </TableCell>
                    <TableCell
                      onClick={() => history.push("/members/"+item.id)}
                    >
                      {item.accountnumber}
                    </TableCell>
                    <TableCell
                      onClick={() => history.push("/members/"+item.id)}
                    >
                      {item.name}
                    </TableCell>
                    <TableCell
                      onClick={() => history.push("/members/"+ item.id)}
                    >
                      {item.nationalid}
                    </TableCell>
                    <TableCell
                      onClick={() => history.push("/members/"+item.id)}
                    >
                      {item.contact}
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
                            title: "You are about to delete this MemberList",
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
      />
    </>
  );
}

export default withRouter(MemberList);
