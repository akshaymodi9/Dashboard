import React,{useEffect, useState} from 'react'
import './index.sass'
import MultiSelect from '../Filters/MultiSelect'
import {NAVIGATION_ENDPOINT } from '../../constants';
import { fetchService } from '../../service';

const NavigationTree = (props) =>{

    const {updateFilterOptions} = props
    const [navigation,updateNavigation] = useState([])
    const [filters,updateFilters] = useState([])
    
    const setFilters = (element)=>{
       
        if(element["type"]!=undefined && element["type"] in filters){
            filters[element["type"]].push({"name":element['name'],"url-name":element['url-name']})
        }
        else if(element["type"]!=undefined ){
            filters[element["type"]] = [{"name":element['name'],"url-name":element['url-name']}]
        }
    }

    useEffect(()=>{
        const fetchData = async () => {
            const navigationResponse = await fetchService(NAVIGATION_ENDPOINT)
            updateNavigation(navigationResponse)
            navigationResponse.map(element=>{
                if(element['meta-tags'].length > 0){
                    setFilters(element)
                    element['meta-tags'].map(ele=>{
                        setFilters(ele)
                        if(ele['meta-tags'].length>0){
                            ele['meta-tags'].map(e=>{
                                setFilters(e)
                            })
                        }
                    })
                }
                
            })
        }
        fetchData()
    },[filters])
    


    return (
        <div className="select-filters">
            {
                Object.keys(filters).map((key,i)=> {
                    return <MultiSelect key={i} className="select-items" selectKey={key} value={filters[key]} updateFilterOptions={updateFilterOptions}/>
                })
            }    
      </div>
       
    )
}

export default NavigationTree