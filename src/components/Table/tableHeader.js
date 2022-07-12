import React from "react"
import "./index.sass"

const TableHeader = () =>{

    return (
        <div className="grouped-components">
            <div className="timestamp-header"></div>
            <div className="team-name-header"></div>
            <div className="home-header"> Home Team</div>
            <div className="draw-header"> Draw</div>
            <div className="away-header"> Away Team</div>
        </div>
    )
}

export default TableHeader