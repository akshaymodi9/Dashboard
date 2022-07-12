import React,{useEffect, useState} from 'react'


const Select = (props) =>{

    const {currencies,currentCurrency,updateCurrencyParams} = props

    const handleChange = e =>{
        updateCurrencyParams(e.target.value)
    }

    return (
            <select name="currencies" className='currencies' value={currentCurrency} onChange={handleChange}>
                {   
                    currencies.currencies && currencies.currencies.length > 0 ?
                    currencies.currencies.map((element,i)=>(
                        <option key={i} value={element['short-name']}>{element['long-name']}</option>
                    ))
                    : <></>
                }
               
            </select>
        
    )

}

export default Select