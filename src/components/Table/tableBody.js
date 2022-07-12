import React from "react"
import "./index.sass"

const TableBody = (props) =>{

    const {start,volume,team,markets,meta} = props

    const getCompetitionAndSports = (meta)=>{
        let result = []
        
        for (let i=0;i<meta.length;i++){
            if(meta[i]['type']== "SPORT" || meta[i]['type'] == "COMPETITION"){
                let obj = {
                    "type":meta[i]['type'],
                    "name": meta[i]['name']
                }
                result.push(obj)
            }
        }
        return result
    }

    const getOdds = (market)=>{
        let result = []
        for(let i=0;i<market.length;i++){
            if(market[i]['name'] == "Moneyline" || market[i]['name'] == "Match Odds"){
                const runners = market[i]['runners']
                for(let j=0;j<runners.length;j++){
                    const prices = runners[j]['prices']
                    if(prices.length>0){
                        let obj ={
                            "runner":runners[j]['name'],
                            "side" : prices[0].side,
                            "odds" : prices[0].odds,
                            "amount" : prices[0]['available-amount']
                        }
                        result.push(obj)
                    }
                }
            }
        }
        return result
    }

    const odds = getOdds(markets);
    const competitionAndSports = getCompetitionAndSports(meta)
    

    return (
        
        <div className="grouped-components">
            <div className="timestamp">
                {new Date(start).toLocaleString()}
            </div>
            <div className="team-name">
                <span className="name">
                    <b>{team}</b>
                </span>
                
                <hr/>
                {
                    competitionAndSports.map(element=>(
                        <>
                            <br/>
                            <span>{element['type']} - {element['name']}</span>
                           
                        </>
                    ))
                }
                <span className="volume">
                    Volume - {volume}
                </span>
            </div>
            {
                odds.length == 2  ? 
                (
                    <>
                     <div className="home">
                        <div className="home-back">
                            <div>Name : {odds[0].runner}</div>
                            <div>Back odds : {odds[0].odds}</div>
                            <div>Amount : {odds[0].amount}</div>  
                        </div>
                    </div>
                    <div className="draw">
                        <div className="draw-back">
                            <div>Back odds : -</div>
                            <div>Amount : -</div>  
                        </div>
                    </div>
                    <div className="away">
                        <div className="away-back">
                            <div>Name : {odds[1].runner}</div>
                            <div>Back odds : {odds[1].odds}</div>
                            <div>Amount : {odds[1].amount}</div>  
                        </div>
                    </div>
                    </>

                )
                : 
                odds.length == 3 ?
                (
                    <>
                    <div className="home">
                        <div className="home-back">
                            <div>Name : {odds[0].runner}</div>
                            <div>Back odds : {odds[0].odds}</div>
                            <div>Amount : {odds[0].amount}</div>  
                        </div>
                    </div>
                    <div className="draw">
                        <div className="draw-back">
                            <div>Name : {odds[2].runner}</div>
                            <div>Back odds : {odds[2].odds}</div>
                            <div>Amount : {odds[2].amount}</div>  
                        </div>
                    </div>
                    <div className="away">
                        <div className="away-back">
                            <div>Name : {odds[1].runner}</div>
                            <div>Back odds : {odds[1].odds}</div>
                            <div>Amount : {odds[1].amount}</div>  
                        </div>
                    </div>
                    </>
                )
                :
                <>
                    <div className="home">
                        <div className="home-back">
                            <div>Back odds : -</div>
                            <div>Amount : -</div>  
                        </div>
                    </div>
                    <div className="draw">
                        <div className="draw-back">
                            <div>Back odds : -</div>
                            <div>Amount : -</div>  
                        </div>
                    </div>
                    <div className="away">
                        <div className="away-back">
                            <div>Back odds : -</div>
                            <div>Amount : -</div>  
                        </div>
                    </div>
                    </>
            }
            
        </div>
    )
}

export default TableBody