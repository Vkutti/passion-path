import { useLocation } from "react-router-dom"
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import '../css/Card.css'
import Modal from "../components/Modal";

function SavedItems() {



    return (
        <div>
            <Navbar />
            <div>
                <div className="center-objects">
                    <h2 className="normal-text">Saved</h2>
                </div>
                <h1 className="suggestion-title">Here's what we suggest</h1>
            </div>

            <div className="cards-holder">
                <Card title="Saved" desc="Its been saved"/>
                
            </div>
        </div>
    )
}

export default SavedItems