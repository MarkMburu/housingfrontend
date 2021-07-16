import React, { useEffect } from "react";
import { useForm, Form } from "../../../components/useForm";
import { Grid, Typography } from "@material-ui/core";
import { Controls } from "../../../components/controls/Controls";
import { useSelector, useDispatch } from "react-redux";
import { MemberActions } from "../../../actions/memberActions";
import { HousingActions } from "../../../actions/housingActions";
import { HouseActions } from "../../../actions/houseActions";
import { receiptActions } from "../../../actions/receiptActions";

const accountnumberDebits = [
  { id: "cash", title: "Cash" },
  { id: "mpesa", title: "Mpesa" },
  { id: "equity", title: "Equity Bank" },
  { id: "dtb", title: "DTB Bank" },
];

const initialFvalues = {
  memberId: "",
  projectId: "",
  name: "",
  nationalid: "",
  houseId: "",
  projectname: "",
  housenumber: "",
  amount: null,
  price: null,
  datecaptured: new Date(),
  bankname: "",
  paymentref: "",
  entrytype: "NS",
  narration: " ",
  status: "POSTED",
  amount: null,
  description: "",
};

function PurchaseForm(props) {
  const { addOrEdit, recordForEdit } = props;

  const memberList = useSelector((state) => state.members.members);
  const housing = useSelector((state) => state.houses.houses);
  const house = useSelector((state) => state.house.house);


  const dispatch = useDispatch();
  const validate = (fieldvalues = values) => {
    let temp = { ...errors };
    if ("firstname" in fieldvalues) {
      temp.firstname = fieldvalues.firstname ? "" : "This Field is required";
    }
    if ("projectNumber" in fieldvalues)
      temp.projectNumber = fieldvalues.projectNumber ? "" : "Enter a Number";
    if ("numberOfUnits" in fieldvalues)
      temp.numberOfUnits = fieldvalues.numberOfUnits ? "" : "Enter a Number";

    setErrors({
      ...temp,
    });
    if (fieldvalues === values)
      return Object.values(temp).every((x) => x === "");
  };
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFvalues, true, validate);
  const selectedproject =
    housing && values.projectId !== ""
      ? housing.find((p) => p.id === values.projectId)
      : "";
  const member =
    memberList && values.memberId !== ""
      ? memberList.find((member) => member.accountnumber === values.memberId)
      : "";
      console.log("member",member)
  const houses = house.filter(
    (housing) => housing.projectId === values.projectId
  );
  const houseSale =
    houses && values.houseId !== ""
      ? houses.find((house) => house.id === values.houseId)
      : "";
  console.log("Houses", houses);
  const { name, contact, accountnumber, nationalid, estate, krapin } = member;

  values.projectname = selectedproject.projectname || "";
  values.price = houseSale.price || "";
  values.name = name || "";
  values.accountnumber = accountnumber || "";
  values.nationalid = nationalid || "";
  values.housenumber = houseSale.housenumber || "";
  values.balance = values.price - values.amount;
  let description = "Purchase of " + values.projectname + " House no: " + values.housenumber;
  useEffect(() => {
    dispatch(MemberActions.getMembers());
    dispatch(HousingActions.getHouseProjects());
    dispatch(HouseActions.getHouse());
    if (recordForEdit !== null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const {
        memberId,
        accountnumber,
        houseProjectId: projectId,
        houseId,
        balance,
        amount,
        datecaptured,
        bankname,
        paymentref,
        entrytype,
        narration,
        status,
      } = values;
      console.log({
          ...values,
          memberId,
          accountnumber,
          houseProjectId: projectId,
          description,
          houseId,
          name,
          contact,
          nationalid,
          balance,
          amount,
          datecaptured,
          bankname,
          paymentref,
          entrytype,
          narration,
          status,
          estate, 
          krapin
      })
      addOrEdit(
        {
          ...values,
          memberId,
          accountnumber,
          houseProjectId: projectId,
          description,
          houseId,
          name,
          contact,
          nationalid,
          balance,
          amount,
          datecaptured,
          bankname,
          paymentref,
          entrytype,
          narration,
          status,
          estate, 
          krapin
       
        },
        resetForm
      );
      // addOrEdit({ ...values, projectId }, resetForm);
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={4}>
          <Controls.MemberSelect
            name="memberId"
            label="Select Member"
            value={values.memberid}
            onChange={handleInputChange}
            options={memberList}
            key={memberList.id}
            error={errors._id}
          />

          <Controls.HouseSelect
            name="projectId"
            label="Choose Project"
            value={values.projectId}
            onChange={handleInputChange}
            options={housing}
            key={housing.id}
            error={errors._id}
          />
          <Controls.Input
            label="Price"
            name="price"
            type="number"
            value={values.price}
            onChange={handleInputChange}
            error={errors.accountnumber}
          />

          <Controls.Input
            label="Balance"
            name="balance"
            type="number"
            value={values.balance}
            onChange={handleInputChange}
            error={errors.accountnumber}
          />
          <Controls.DatePickers
            name="datecaptured"
            label="Date Captured"
            value={values.datecaptured}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={4}>
          <Controls.Input
            label="Name"
            name="name"
            value={values.name}
            onChange={handleInputChange}
            error={errors.firstname}
          />
          <Controls.Input
            label="accountnumber Number"
            name="accountnumber"
            value={values.accountnumber}
            onChange={handleInputChange}
            error={errors.firstname}
          />
          <Controls.Input
            label="Project Name"
            name="projectname"
            value={values.projectname}
            onChange={handleInputChange}
            error={errors.firstname}
          />
          <Controls.Select
            name="bankname"
            label="a/cdebit"
            value={values.title}
            onChange={handleInputChange}
            options={accountnumberDebits}
            key={accountnumberDebits.id}
            error={errors._id}
          />

          <Controls.Input
            label="Payment Ref"
            name="paymentref"
            value={values.paymentref}
            onChange={handleInputChange}
            error={errors.accountnumber}
          />
        </Grid>

        <Grid item xs={4}>
          <Controls.Input
            label="Id"
            name="nationalid"
            value={values.nationalid}
            onChange={handleInputChange}
            error={errors.firstname}
          />
          <Controls.FloorSelect
            label="House Number"
            name="houseId"
            value={values.houseId}
            options={houses}
            key={houses.id}
            onChange={handleInputChange}
            error={errors.firstname}
          />
          {/* <Controls.Input
            label="Plot Number"
            name="numberofbedrooms"
            value={values.numberofbedrooms}
            onChange={handleInputChange}
            error={errors.firstname}
          /> */}
          <Controls.Input
            label="Amount"
            name="amount"
            type="number"
            value={values.amount}
            onChange={handleInputChange}
            error={errors.accountnumber}
          />

          <Controls.Input
            label="Narration"
            name="narration"
            value={values.narration}
            onChange={handleInputChange}
            error={errors.accountnumber}
          />
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={8}></Grid>
        <Grid item xs={4}>
          <div>
            <Controls.Button text="Submit" type="submit" />
            <Controls.Button text="Reset" onClick={resetForm} color="default" />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}

export default PurchaseForm;
