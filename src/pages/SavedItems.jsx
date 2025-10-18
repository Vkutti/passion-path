import { useLocation } from "react-router-dom"
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import '../css/Card.css'
import Modal from "../components/Modal";
import { supabase } from '../lib/supabase'
import { useState } from "react";
import { useEffect } from "react";

function SavedItems() {
    const [saved, setSaved] = useState([])
    
    useEffect(() => {getSaved()}, [])    

    async function getSaved() {
        const { data: { session } } = await supabase.auth.getSession();
        const user = session?.user;

        const { data } = await supabase.from("user_saved").select().eq('user', user.email)
        setSaved(data)
        console.log(saved)
    }
    
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
                {saved.map((items, index) => (
                    Array.isArray(items.info) ? (
                        items.info.map((item, idx) => (
                            <div key={index + '-' + idx} >
                                
                                <Card title={item.title} desc={item.description}/>
                            </div>
                        ))
                    ) : (
                        <div key={index}>
                            
                            <Card title={item.info.title} desc={item.info.description}/>

                        </div>
                    )
                ))}
            </div>
        </div>
    )
}

export default SavedItems