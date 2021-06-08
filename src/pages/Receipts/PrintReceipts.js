import React,{useRef,Component,useEffect} from "react";
import { useReactToPrint } from "react-to-print";
import {useSelector,useDispatch}from "react-redux";
import { receiptActions } from "../../actions/receiptActions";
export class PdfReceipt extends Component {
    render(){
     console.log("props,....this.props",this.props.receipt)
     const {receipt} = this.props;
        return (
            <div
              style={{
                margin: "auto",
                width: "50%",
                padding: "10px",
                lineHeight: "normal",
              }}
            >
              <div style={{ margin: "auto", width: "90%", padding: "10px" }}>
                <h1
                  style={{
                    fontSize: "42px",
                    color: "#b30000",
                    marginBottom: "0px",
                    paddingBottom: "0px",
                  }}
                >
                  EQUITY PREMIER{" "}
                </h1>
                <h2
                  style={{
                    fontSize: "24px",
                    color: "#b30000",
                    paddingLeft: "20px",
                    marginBottom: "0px",
                    paddingBottom: "0px",
                  }}
                >
                  LAND SOLUTIONS LIMITED
                </h2>
              </div>
              <p>
                Main Office:&ensp;3rd Floor Suite T003 Spur Mall -Thika Rd
                &ensp;Contact:&ensp;0774970474
              </p>
              <p>
                Address:&ensp;PO BOX 5210-00100 NAIROBI &ensp;
                Website:&ensp;www.equitypremierland.co.ke{" "}
              </p>
              <p>Email:&ensp;info@equitypremier.co.ke</p>
        
              <div style={{ margin: "auto", width: "70%" }}>
                <h3
                  style={{
                    fontSize: "28px",
                    color: "#b30000",
                    marginBottom: "0px",
                    paddingBottom: "0px",
                  }}
                >
                  PAYMENT RECEIPT
                </h3>
              </div>
              <div>
                <h4>Received From:&ensp;{receipt.name}</h4>
                <h4>ID NO :&ensp;{receipt.nationalid}</h4>
              </div>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <h5>A/C No:&ensp; {receipt.accountnumber}</h5>
                <h5>Phone No:&ensp; {receipt.contact}</h5>
                <h5>Date:&ensp; {new Date().getFullYear()} </h5>
              </div>
              <div>
                <table
                  style={{
                    width: "100%",
                    border: "2px solid black",
                    borderCollapse: "collapse",
                  }}
                >
                  <thead>
                    <tr>
                      <th
                        style={{
                          border: "2px solid black",
                          borderCollapse: "collapse",
                        }}
                      >
                        RCT No:
                      </th>
                      <th
                        style={{
                          border: "2px solid black",
                          borderCollapse: "collapse",
                        }}
                      >
                        Description
                      </th>
                      <th
                        style={{
                          border: "2px solid black",
                          borderCollapse: "collapse",
                        }}
                      >
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td
                        style={{
                          border: "2px solid black",
                          borderCollapse: "collapse",
                        }}
                      >
                        {receipt.rcptno}
                      </td>
                      <td
                        style={{
                          border: "2px solid black",
                          borderCollapse: "collapse",
                        }}
                      >
                        {receipt.entrytype == "EF" ? receipt.narration +" for "+ receipt.name: receipt.narration +" "+ receipt.description}
                      </td>
                      <td
                        style={{
                          border: "2px solid black",
                          borderCollapse: "collapse",
                        }}
                      >
                       {receipt.amount}
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          border: "2px solid black",
                          borderCollapse: "collapse",
                          textAlign:"center",
                          fontSize:"22px"
                        }}
                        colspan="2"
                      >
                       Total
                      </td>
                      <td
                        style={{
                          border: "2px solid black",
                          borderCollapse: "collapse",
                        }}
                      >
                       {receipt.amount}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table style={{
                    width: "100%",
                    border: "2px solid black",
                    borderCollapse: "collapse",
                    paddingTop:"10px",
                    marginTop:"10px"
                  }}>
                  <tr>
                      <td
                        style={{
                          border: "2px solid black",
                          borderCollapse: "collapse",
                        }}
                      >
                        Balance : {receipt.balance}
                      </td>
                      <td
                        style={{
                          border: "2px solid black",
                          borderCollapse: "collapse",
                        }}
                      >
                        Bank : {receipt.bankname}
                      </td>
                      <td
                        style={{
                          border: "2px solid black",
                          borderCollapse: "collapse",
                        }}
                      >
                       Reference : {receipt.paymentref}
                      </td>
                    </tr>
                </table>
              </div>
              <div style={{paddingTop:"20px",marginTop:"20px", display: "flex", justifyContent: "space-between" }}>
                <h5>ADMIN:&ensp; .....................</h5>
    
                <h5>Sign:&ensp;....................... </h5>
              </div>
            </div>
          );
        }
        

    }
  

function PrintReceipts(props) {
    const {id} = props.match.params
    const dispatch = useDispatch();
    const receipts = useSelector((state) => state.receipts.receipts);
    const receipt = receipts.find(receipt => receipt.id === id);
    useEffect(() => {
      dispatch(receiptActions.getReceipts());
    }, [])
    console.log("receipt...",receipt);
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content:()=> componentRef.current
    })
    return (
      <div>
        <PdfReceipt ref={componentRef} receipt={receipt}/>
        <button onClick={handlePrint}>Print this out</button>
      </div>
    );
}

export default PrintReceipts
