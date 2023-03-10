import React, { useEffect, useState } from 'react'

type obj = {
    Country:string,CustomerID:string,Description:string,InvoiceDate:string,InvoiceNo:string,Quantity:string,StockCode:string,UnitPrice:string
}
type countryProps={
    dataArr:obj|undefined|any
}

const CountryComp = (props:countryProps) => {
    var [countryObj,setcountryObj]=useState<any>([])
    var [countryArr,setCountryArr]=useState<obj[]>([])

    // function checks for repeated countries in a select box
    useEffect(()=>{
        var countryObj:any=[]
        props.dataArr.map((item:any)=>{
            if(item.Country!=="" && item.InvoiceNo!=='' && item.Description!=='' && item.CustomerID!=='' && item.InvoiceDate!=='' && item.Quantity!=='' && item.StockCode!=='' && item.UnitPrice!==''){
                if(item.Country.match(/\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/)){
                    if(!countryObj.includes(item.Country)){
                        countryObj.push(item.Country)
                    }
                }
            }
        })
        setcountryObj(countryObj)
    },[props.dataArr])

    // function renders the selected country data
    const selecthandler=(e:React.ChangeEvent<HTMLSelectElement>)=>{
        countryArr=[]
        props.dataArr.map((item:any)=>{
            if(item.Country==e.currentTarget.value){
                countryArr.push(item)
            }
        })
        setCountryArr(countryArr)
    }

  return (
    <div className='mt-3'>
        <h2>Orders in country</h2>
        {props.dataArr!==undefined?
        // renders the countries into selectbox
        <select className='mt-3 p-2 fs-6 fw-bold bg-primary text-white col-4 border-primary border-3 rounded' onChange={(e)=>selecthandler(e)}>
            <option>Select Country</option>
            {countryObj.map((item:any)=>{
                return <option>{item}</option>
            })}
        </select>
        :
        <></>}
        {countryArr.length>0?
        // renders the selected country data into tabular format
        <table className='m-auto mt-4 border-2 border-primary p-2 col-8'>
            <tr className='fs-5'><th className='border border-primary border-2 p-2 bg-primary text-white'>CustomerID</th><th className=' bg-primary text-white border border-primary border-2 p-2'>Description</th><th className='bg-primary text-white border border-primary border-2 p-2'>Quantity</th></tr>
            {countryArr.map((item)=>{
                return <tr className='fw-bold'>
                <td className='border border-primary border-2 p-2'>{parseInt(item.CustomerID)}</td>
                <td className='border border-primary border-2 p-2'>{item.Description}</td>
                <td className='border border-primary border-2 p-2'>{item.Quantity}</td>
                </tr>
            })}
        </table>
        :<></>}
    </div>
  )
}

export default CountryComp