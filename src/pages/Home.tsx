import React from "react"
import "./Home.css"
import Invitation from "./Invitation"
import Registry from "./Registry"
import RsvpForm from "./RsvpForm"

const Home = () => {
    return (
        <div id="home">
            <div className="section_top">
                <img src="./images/eddie_dina_ring.jpg" className="background_main" />
                <div className="title_text">
                </div>
            </div>
            <Invitation />
            <div className="section_details">
                <div className="section_content">
                    <div className="text_content">
                        <h1>Details...</h1>
                        <p>Sands Castle</p>
                        <p>505 Franklin Ave, Franklin Square, NY 11010</p>
                        <br/>
                        <p>Monday, March 9th, 2026</p>
                        <p>Chuppah Ceremony - <b>6PM Sharp</b></p>
                        <p>Cocktail Hour - <b>7PM</b></p>
                        <p>Party! 🕺 💃 - <b>8:30 PM</b></p>
                    </div>
                    <img src="./images/sands_castle.jpg" className="venue_image"/>
                </div>
            </div>
            {/* <Registry /> */}
        </div>
    )
}

export default Home
