import { GoogleGenAI } from "@google/genai";
import { useState } from "react";
import Input from "../components/Input";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import SignInModal from "../components/SignInModal";
import "../css/ModelCreate.css";


function ModelCreate() {
    const apiKey = "AIzaSyDzGLKQZK6He1el1SssyHCbRfLe1kIDEX4"
    const { user } = useAuth();
    const ai = new GoogleGenAI({apiKey});

    const [title1, setTitle1] = useState();
    const [desc1, setDesc1] = useState();
    const [title2, setTitle2] = useState();
    const [desc2, setDesc2] = useState();
    const [title3, setTitle3] = useState();
    const [desc3, setDesc3] = useState();


    const [interest, setInterest] = useState('');
    const [loading, setLoading] = useState(false);
    const [showSignInModal, setShowSignInModal] = useState(false);
    const [pendingInterest, setPendingInterest] = useState('');

    const navigate = useNavigate();

    // Function to handle successful login and continue with research generation
    const handleSuccessfulLogin = async () => {
        setShowSignInModal(false);
        if (pendingInterest) {
            // Use the pending interest directly instead of waiting for state update
            const interestToUse = pendingInterest;
            setInterest(interestToUse);
            
            // Generate the research ideas directly
            setLoading(true);
            try {
                const response = await ai.models.generateContent({
                    model: "gemini-2.5-flash",
                    contents: "The user is interested in " + interestToUse + ". Suggest 3 research paper ideas for high schoolers that incorporates these topics, only give me the title of the paper and what it is, make sure these papers can feasibly be written by high schoolers and can be written with resources and content that they can find to research. Do not add any formatting, this will be added later. Return in a json format exactly like this: {'title1: 'your title would go here' , 'description1': 'put the description here', 'title2: 'your title would go here' , 'description2': 'put the description here', 'title3: 'your title would go here' , 'description3': 'put the description here'}. Just use double quotes instead of single, and limit the descriptiom word count to 50 words and the title word count to about 10 to 15 words",
                });

                const text = await response.text;
                const dataObject = JSON.parse(text);

                setTitle1(dataObject.title1);
                setDesc1(dataObject.description1);
                setTitle2(dataObject.title2);
                setDesc2(dataObject.description2);
                setTitle3(dataObject.title3);
                setDesc3(dataObject.description3);
                navigate("/results", { state: { interest: interestToUse, dataObject } });
            } catch (err) {
                console.error("Error generating content:", err);
                // handle error if needed
            } finally {
                setLoading(false);
            }
        }
    };


    async function runModel() {
        // Check if user is authenticated
        if (!user) {
            setPendingInterest(interest);
            setShowSignInModal(true);
            return;
        }

        setLoading(true);
        try {
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: "The user is interested in " + interest + ". Suggest 3 research paper ideas for high schoolers that incorporates these topics, only give me the title of the paper and what it is, make sure these papers can feasibly be written by high schoolers and can be written with resources and content that they can find to research. Do not add any formatting, this will be added later. Return in a json format exactly like this: {'title1: 'your title would go here' , 'description1': 'put the description here', 'title2: 'your title would go here' , 'description2': 'put the description here', 'title3: 'your title would go here' , 'description3': 'put the description here'}. Just use double quotes instead of single, and limit the descriptiom word count to 50 words and the title word count to about 10 to 15 words",
            });

            const text = await response.text;
            const dataObject = JSON.parse(text);

            setTitle1(dataObject.title1);
            setDesc1(dataObject.description1);
            setTitle2(dataObject.title2);
            setDesc2(dataObject.description2);
            setTitle3(dataObject.title3);
            setDesc3(dataObject.description3);
            navigate("/results", { state: { interest, dataObject } });
        } catch (err) {
            // handle error if needed
        } finally {
            setLoading(false);
        }
    }


    return (
        <>
            <div>
                <Navbar/>
                <div className="main-content">
                    <h1 className="landing-title">Let AI guide your research journey from passion to paper.</h1>

                    <form onSubmit={e => { 
                        e.preventDefault(); 
                        runModel(); 
                    }} className="research-form">
                        <div className="input-container">
                            <Input value={interest} setValue={setInterest} placeholderText={"What are you interested in? (math, science..."}/>
                        </div>
                        <div className="button-container">
                            <button type="submit" className="primary-btn" disabled={loading} >
                                {loading ? (
                                    <span className="spinner"></span>
                                ) : (
                                    "Generate"
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                <div>
                    <h2>{title1}</h2>
                    <h2>{desc1}</h2>

                    <br/>

                    <h2>{title2}</h2>
                    <h2>{desc2}</h2>

                    <br/>

                    <h2>{title3}</h2>
                    <h2>{desc3}</h2>
                </div>
            </div>
            
            <SignInModal 
                isOpen={showSignInModal} 
                onClose={() => setShowSignInModal(false)}
                onSuccessfulLogin={handleSuccessfulLogin}
            />
        </>
    );
}
export default ModelCreate;