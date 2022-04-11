import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios'
import './App.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CurrencyFormat from 'react-currency-format';

function App() {

  const [products,setProducts] = useState([]);
  const [month,setMonth] = useState(1);
  const [amount,setAmount] = useState(0);
  const [amountErr,setAmountErr] = useState({});
  const [interest,setInterest] =useState(4.5);




// handle Arrow keys to increase ans decrease Month value
  const handleMonth = (type) => {
    if (type === "dec") {
       month>1 &&   setMonth(month - 1) ;
    } else {
       month<12 && setMonth(month + 1) ;  
    }
};

// handle Keyboard keys to increase ans decrease Month value
const handleKey = (e) => {
  if (e.key === 'ArrowDown') {
    month>1 && setMonth(month - 1) ;
  } else if (e.key === 'ArrowUp'){
    month<12 && setMonth(month + 1) ;
  }
   
};
  
// Fetching Data from local file
  const getData = async ()=>{
    try {
      await  axios.get('../products.json')
      .then(response=>setProducts(response.data));
    }catch(err){
      console.log(err);
    } 
  }

  useEffect(()=>{
    getData();
  },[]);

   // submit data function
   const onSubmit = (e)=>{
     e.preventDefault();
     const isValid = formValidation();
   }

  // form validation
  const formValidation = ()=> {
    const amountError = {};
    let isValid = true ;
    if (isNaN(amount)) {
      amountError.amountNotNumber = "Only number accepted";
      isValid = false ;
    }
    setAmountErr(amountError);
    return isValid;
  }

  return (
    <div className="App">
      <div className='title' >
        Let's plan your loan.
      </div>
       <div className='container'>
          <div className='LoanTypes'>
             {products?.map(product=> <img key={product.id}className='LoanTypesImg' onClick={()=>setInterest(product.interest)} src={product.image} alt=""/>)}
          </div>
          <div className='LoanSpecs'>
            <div className='left'>
              <span className='AmountSpan'>Loan Amount</span>
              <div className='LoanAmountInput'>
                <label htmlFor="dollarSign">$</label>
                <CurrencyFormat
                thousandSeparator={true}
                name='amount'
                type="text" 
                className='AmountInput'
                value={amount}
                onChange={e=>{setAmount(e.target.value)}}
                />
                {Object.keys(amountErr).map((key)=>{
                  return <div style={{color:"red"}}>{amountErr[key]}</div>
                })}
              </div>       
            </div>
            <div className='right'>
              <span className='MonthSpan'>Number of Months</span>
              <div className='LoanMonthInput'>
                <ArrowBackIosIcon 
                color='disabled' 
                onClick={()=>handleMonth("dec")}
                />
                <input 
                name="month"
                type="text" 
                readOnly
                className='MonthInput' 
                autoComplete='off'
                value={month} 
                onChange={e=>{setMonth(e.target.value)}}
                onKeyDown={handleKey}  />
                <ArrowForwardIosIcon 
                color='disabled' 
                onClick={()=>handleMonth("inc")}
                />
              </div>
            </div>
          </div>
          <div className='LoanInfos'>
               <div className='section1'>
                 <span className='section1-title'>Monthly Amount</span>
                 <span className='section1-total'>$521</span>
               </div>
               <div className='section2'>
                  <p>you are planing {month} months deposits to reach your ${amount} goal by july 2022, the total amount loaned  will be {amount+(amount*Number(interest))}</p>
               </div>
          </div>
          <button type='submit' onClick={onSubmit}>Apply Now</button>
       </div>
    </div>
  );
}

export default App;
