import React, { useEffect } from "react";
import { useForm, Form } from "../../../components/useForm";
import { Grid, Typography } from "@material-ui/core";
import { Controls } from "../../../components/controls/Controls";
import {useSelector,useDispatch} from "react-redux";
import { MemberActions } from "../../../actions/memberActions";

const accountDebits =[
  {id:"cash",title:"Cash"},
  {id:"mpesa",title:"Mpesa"},
  {id:"equity",title:"Equity Bank"},
  {id:"dtb",title:"DTB Bank"}
]

const initialFvalues = {
  amount: null,
  datecaptured: new Date(),
  bankname: "",
  paymentref: "",
  entrytype:"EF",
  rcptno:null,
  narration:"Entrance Fees",
  status:"POSTED",
 
};


function EntranceFeeForm(props) {
  const { addOrEdit, recordForEdit } = props;
  const { memberId } = props;
  const members = useSelector(state => state.members.members);
  const dispatch = useDispatch()
  const member = members.find(member => member.id === memberId);
  console.log("member........",member);
  const {name,contact,accountnumber,nationalid} = member;

  const validate = (fieldvalues = values) => {
    let temp = { ...errors };
    if ("accountnumber" in fieldvalues) {
      temp.accountnumber = fieldvalues.accountnumber
        ? ""
        : "This Field is required";
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

  useEffect(() => {
    dispatch(MemberActions.getMembers());
    if (recordForEdit !== null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      let balance = 1000 - values.amount;
      console.log({ ...values, memberId,name,contact,accountnumber,nationalid,balance }, "values");
      addOrEdit({ ...values, memberId,name,contact,accountnumber,nationalid,balance}, resetForm);
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            label="Receipt No"
            name="rcptno"
            type="number"
            value={values.rcptno}
            onChange={handleInputChange}
            error={errors.accountnumber}
          />
          <Controls.Input
            label="Amount"
            name="amount"
            type="number"
            value={values.amount}
            onChange={handleInputChange}
            error={errors.accountnumber}
          />

           <Controls.Input
            label="Remaining Balance"
            type="number"
            value={1000 - values.amount }
            onChange={handleInputChange}
            error={errors.accountnumber}
          />
        </Grid>

        <Grid item xs={6}>
          <Controls.Select
            name="bankname"
            label="a/cdebit"
            value={values.bankname}
            onChange={handleInputChange}
            options={accountDebits}
            key={accountDebits.id}
            error={errors._id}
          />
          <Controls.Input
            label="Payment Ref"
            name="paymentref"
            value={values.paymentref}
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

export default EntranceFeeForm;
