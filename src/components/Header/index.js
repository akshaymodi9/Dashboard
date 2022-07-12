import React from 'react'
import './index.sass'
import Select from '../Filters/Select'

const Header = (props) =>{

    const {location,currencies,currentCurrency,updateCurrencyParams} = props

    return (
        <>
        <h2 className='heading'>Xanadu Betting Dashboard</h2>
        <p className='location'>Current Location : {location.country}</p>
        <p className='currency'>Currency : <Select currencies={currencies} currentCurrency={currentCurrency} updateCurrencyParams={updateCurrencyParams}/></p>
        </>
    )
}

export default Header