import React,{useRef,Component,useEffect} from "react";
import { useReactToPrint } from "react-to-print";
import {useSelector,useDispatch}from "react-redux";
import { receiptActions } from "../../actions/receiptActions";
import equitylogo from "../../assets/equitylogo.png";
export class PdfReceipt extends Component {
    render(){
     console.log("props,....this.props",this.props.receipt)
     const {receipt} = this.props;
        return (
    
            <div>
            <div style={{display:"flex",margin:"20px"}}>
              <div>
                <img src={equitylogo} height="120px" width="150px" style={{paddingRight:"20px",paddingLeft:"10px"}}/>
              </div>
              <div style={{paddingLeft:"40px"}}>
                <div style={{fontSize:"20px",fontWeight:"bold",color:"grey"}}>EQUITY PREMIER LAND SOLUTIONS LIMITED</div>
                <div> 
                <strong style={{color:"red"}}>Head Office</strong>:&ensp;Spur Mall 3rd Floor Suite T03 ,Along Thika Road Exit 13
               </div>
               <div><strong style={{color:"red"}}>Postal Address</strong>: P.O Box 5210-00100 GPO Nairobi, Kenya</div> 
               <div>
                 <strong style={{color:"red"}}>Website</strong>:&ensp;www.equitypremierlandsolutions.co.ke{" "}
               </div>
               <div><strong style={{color:"red"}}>Email</strong>:&ensp;equitypremierland@gmail.com/sales@equitylandsolutions.co.ke</div> 
              <div style={{color:"red", paddingRight:"20px"}}>Your Premier Investment Partner</div>
              </div>
            </div>
            {/* Date number title */}
            <div style={{display:"flex",margin:"auto"}}>
                <div style={{fontSize:"16px", fontWeight:"bold",color:"grey",marginRight:"80px",marginLeft:"50px",marginTop:"30px"}}>
                  No: {receipt.rcptno}
                </div>
                <div style={{fontSize:"16px", borderRadius:"10px",fontWeight:"bold",color:"#fff",backgroundColor:"gray",padding:"10px",marginRight:"50px"}}>
                  OFFICIAL RECEIPT
                </div>
               
                <div style={{fontSize:"16px", fontWeight:"bold",color:"red",marginLeft:"80px",marginTop:"20px"}}>
                  DATE :
                </div>
                <div style={{display:"flex",flexDirection:"column"}}>
                  <strong style={{paddingLeft:"30px"}}> {new Date(receipt.datecaptured).toLocaleDateString()}  </strong>
                  <strong style={{color:"red"}}>.................................</strong>
                </div>
            </div>
            {/* Name  */}
            <div style={{display:"flex",marginTop:"40px"}}>
            <i style={{fontWeight:"bold",color:"red",marginTop:"20px",marginLeft:"50px"}}>
                  Recieved from :
                </i>
            <div style={{display:"flex",flexDirection:"column",}}>
                  <strong style={{paddingLeft:"30px"}}> {receipt.name} </strong>
                  <strong style={{color:"red"}}>................................................................................................................................................</strong>
                </div>
                </div>
            {/* Member Number Id Number Pin Number */}
             <div style={{display:"flex"}}>
             <div style={{display:"flex"}}>
            <i style={{fontWeight:"bold",color:"red",marginTop:"20px",marginLeft:"50px"}}>
                  Member No :
                </i>
            <div style={{display:"flex",flexDirection:"column",}}>
                  <strong style={{paddingLeft:"30px"}}> {receipt.accountnumber} </strong>
                  <strong style={{color:"red"}}>..................................</strong>
                </div>
                </div>
                <div style={{display:"flex"}}>
            <i style={{fontWeight:"bold",color:"red",marginTop:"20px",marginLeft:"10px"}}>
                  ID No.:
                </i>
            <div style={{display:"flex",flexDirection:"column",}}>
                  <strong style={{paddingLeft:"30px"}}> {receipt.nationalid} </strong>
                  <strong style={{color:"red"}}>.......................................</strong>
                </div>
                </div>
                <div style={{display:"flex"}}>
            <i style={{fontWeight:"bold",color:"red",marginTop:"20px",marginLeft:"10px"}}>
                  Pin No.:
                </i>
            <div style={{display:"flex",flexDirection:"column",}}>
                  <strong style={{paddingLeft:"30px"}}> {receipt.krapin || "N/A"} </strong>
                  <strong style={{color:"red"}}>............................................</strong>
                </div>
                </div>
             </div>
             {/*  P.o Box  and tel number */}
                {/* Member Number Id Number Pin Number */}
                <div style={{display:"flex"}}>
             <div style={{display:"flex"}}>
            <i style={{fontWeight:"bold",color:"red",marginTop:"20px",marginLeft:"50px"}}>
                  P.O Box  :
                </i>
            <div style={{display:"flex",flexDirection:"column",}}>
                  <strong style={{paddingLeft:"30px"}}> {receipt.estate || "N/A"} </strong>
                  <strong style={{color:"red"}}>................................................................................</strong>
                </div>
                </div>
                <div style={{display:"flex"}}>
            <i style={{fontWeight:"bold",color:"red",marginTop:"20px",marginLeft:"10px"}}>
                  Tel No. : 
                </i>
            <div style={{display:"flex",flexDirection:"column",}}>
                  <strong style={{paddingLeft:"30px"}}>{receipt.contact || "N/A"}</strong>
                  <strong style={{color:"red"}}>.........................................................</strong>
                </div>
                </div>
      
             </div>
        
              {/* The sum of kenya shillings  */}
            <div style={{display:"flex"}}>
            <i style={{fontWeight:"bold",color:"red",marginTop:"20px",marginLeft:"50px"}}>
                  The Sum of Kenya Shillings : 
                </i>
            <div style={{display:"flex",flexDirection:"column",}}>
                  <strong style={{paddingLeft:"30px"}}> {receipt.amount || "N/A"} </strong>
                  <strong style={{color:"red"}}> ..........................................................................................................................</strong>
                </div>
                </div>
                <div style={{marginTop:"10px"}}>
                <strong style={{color:"red",marginLeft:"50px"}}> ...........................................................................................................................................................................</strong>
                </div>
                <div style={{display:"flex"}}>
                  <div style={{marginLeft:"50px"}}>
                    <h3 style={{color:"red"}}> Being Payment For: -</h3>
                    <div>Payment Mode: </div>
                    <div style={{display:"flex",flexDirection:"column"}}>
                    <div>{receipt.bankname.toUpperCase()}</div>
                     <strong style={{color:"red"}}>......................</strong>
                    </div>
                     
                  </div>
                  <div style={{marginLeft:"50px" ,marginTop:"20px"}}>
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
                        color:"red",
                        margin:"10px",
                        paddingRight:"30px",
                        paddingLeft:"30px"
                       
                      }}
                   >
                      Description
                     </th>
                       <th
                         style={{
                          border: "2px solid black",
                           borderCollapse: "collapse",
                           color:"red",
                          margin:"10px",
                          paddingRight:"30px",
                          paddingLeft:"30px"

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
                         {receipt.description }
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
                  </div>
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
