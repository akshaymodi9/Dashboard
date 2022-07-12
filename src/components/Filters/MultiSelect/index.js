import React,{useEffect, useState} from 'react'
import './index.sass'

const MultiSelect = (props) =>{
    const {selectKey,value,updateFilterOptions} = props
    const [checked, setChecked] = useState([]);

    const expandDropdown=(e)=>{       
        const allWithClass = Array.from(
            document.querySelectorAll('.dropdown-check-list')
        )
        allWithClass.map(element=>{
            if(element.classList != e.currentTarget.parentElement.classList){
                element.classList.remove('visible')
            }
        })  
        
        if ( e.currentTarget.parentElement.classList.contains('visible')){
            e.currentTarget.parentElement.classList.remove('visible');
        }
        else{
            e.currentTarget.parentElement.classList.add('visible');  
        }
    }

    const setCheckedOption = (key,value)=>{
        const newChecked = [...checked]
        if(checked.includes(value)){
            const index = newChecked.indexOf(value)
            newChecked.splice(index,1)
            setChecked(newChecked)
        }
        else{
            newChecked.push(value)
            setChecked(newChecked)
        }
        updateFilterOptions(key,newChecked.toString())
    }

    return (
        <div className={`dropdown-check-list ${selectKey}`} tabIndex="100">
            <span className="anchor" onClick={(e)=>{expandDropdown(e)}}>{selectKey}</span>
            <ul className="items">
                {
                    value.map((element,i)=>{
                        return <li key={i}><input type="checkbox" onChange={()=>setCheckedOption(selectKey,element["url-name"])} />{element.name} </li>
                    })
                }
            </ul>
        </div>
    )

}

export default MultiSelect