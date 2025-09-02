import { useLocation } from "react-router-dom"
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import '../css/Card.css'
import Modal from "../components/Modal";

function ResultsPage() {
    const location = useLocation()
    const interest = location.state?.interest;

    const data = location.state?.dataObject;


    return (
        <div>
            <Navbar />
            <div>
                <div className="center-objects">
                    <h2 className="normal-text">You are interested in</h2>
                    <h2 className="color-text">{ interest }</h2>
                </div>
                <h1 className="suggestion-title">Here's what we suggest</h1>
            </div>

            <div className="cards-holder">
                <Card title={data.title1} desc={data.description1}/>
                <Card title={data.title2} desc={data.description2}/>
                <Card title={data.title3} desc={data.description3}/>
            </div>
        </div>
    )
}

export default ResultsPage