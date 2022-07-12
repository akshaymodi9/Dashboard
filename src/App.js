import TableBody from './components/Table/tableBody'
import Header from './components/Header';
import './App.css';
import React, { useState,useEffect } from 'react';
import { fetchService } from './service';
import { EVENTS_ENDPOINT, LOCATION_ENDPOINT,CURRENCIES_ENDPOINT } from './constants';
import TableHeader from './components/Table/tableHeader';
import NavigationTree from './components/NavigationTree';


const App =()=> {

  const [events,updateEvents] = useState([])
  const [sortVolumeAsc,updateSortVolume] = useState(true)
  const [sortTimeAsc, updateSortTime] = useState(true)
  const [location,updateLocation] = useState({})
  const [currencies,updateCurrencies] = useState([])
  const [currentCurrency, updateCurrentCurrency] = useState("")
  const [params,setParam] = useState({
    "offset":0,
    "tag-url-names":"",
    "price-depth":1,
    "include-price":true,
    "per-page":30,
    "currency":currentCurrency  
  })
  const [filterOptions, setFilterOptions] = useState({
    "SPORT":"",
    "COMPETITION":"",
    "OTHER":"",
    "COUNTRY":""
  })

  const updateFilterOptions = (key,value)=>{
    let updateValue = ""
    for(const k in filterOptions ){
      if (filterOptions[k]!==""){
        if(k === key){
          let tagUrl = params['tag-url-names']
          let currentValues = filterOptions[key]
          updateValue = tagUrl.replace(currentValues,value)
          if(updateValue && updateValue.charAt(0) == ","){
            updateValue = updateValue.substring(1)
          }
        }
        else updateValue+=filterOptions[k]+","
      }
    }
    updateValue+=value
    setFilterOptions({...filterOptions,[key]:value})
    updateParams(updateValue)
  
  }

  const updateParams = (value)=>{
    setParam({...params,"tag-url-names":value})
  }

  const updateCurrencyParams = (value)=>{
    setParam({...params,"currency":value})
    updateCurrentCurrency(value)
  }

  useEffect(()=>{

    const fetchLocationAndCurrencies = async ()=>{
      const locationResponse = await fetchService(LOCATION_ENDPOINT)
      const currenciesResponse = await fetchService(CURRENCIES_ENDPOINT)
      updateCurrentCurrency(locationResponse.currency)
      updateCurrencies(currenciesResponse)
      updateLocation(locationResponse)
    }

    fetchLocationAndCurrencies()
  },[])

  useEffect(()=>{

    const fetchData = async () => {
      const eventResponse = await fetchService(EVENTS_ENDPOINT,'GET',null,params)
 
      updateEvents(eventResponse.events)
    }
    
    fetchData()

  },[params])
  
  const sortData = (sortBy) =>{
      if(sortBy == "volume"){
          if(sortVolumeAsc){
            events.sort((a,b)=>a['volume']<b['volume'] ? 1 : -1)
          }
          else{
            events.sort((a,b)=>a['volume']>b['volume'] ? 1 : -1)
          }
          updateSortVolume(!sortVolumeAsc)
          
      }
      if(sortBy == "startTime"){
        if(sortTimeAsc){
          events.sort((a,b)=>a['start']<b['start'] ? 1 : -1)
        }
        else{
          events.sort((a,b)=>a['start']>b['start'] ? 1 : -1)
        }
        updateSortTime(!sortTimeAsc)
        
      }
      updateEvents(events)
  }

  return (
    <div className="App">
      <Header location={location} currencies={currencies} currentCurrency={currentCurrency} updateCurrencyParams={updateCurrencyParams}/>
      <div className='main-page'>
        <div className='sort-filter'>
          <div className='navigation'>
            <NavigationTree updateFilterOptions={updateFilterOptions}/> 
          </div>
          <div className='sort'>
          <span>Sort :</span> 
          <div className="btn-group">
            <button onClick={()=>{sortData('startTime')}}>Start Time</button>
            <button onClick={()=>{sortData('volume')}}>Volume</button>
      
          </div>  
          </div>
        </div>
        <div className='events'>
          <TableHeader/>
          {
              events.length > 0 ? events.map(element=>
                  <TableBody key={element.id} team={element.name} start={element.start} volume={element.volume} markets={element['markets']} meta={element['meta-tags']} />
            )
            :
            <>No Data Found</>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
