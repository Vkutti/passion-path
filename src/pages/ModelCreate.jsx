import { GoogleGenAI } from "@google/genai";
import { useState } from "react";
import Input from "../components/Input";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import SignInModal from "../components/SignInModal";
import "../css/ModelCreate.css";

function ModelCreate() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;


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
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const navigate = useNavigate();

    // Function to handle successful login and continue with research generation
    const handleSuccessfulLogin = async () => {
        setShowSignInModal(false);
        if (pendingInterest) {
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
                alert("Error generating research ideas. Please check that your Gemini API key is valid and try again.");
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
            setShowSignUpModal(false);
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
            console.error("Error generating content:", err);
            alert("Error generating research ideas. Please check that your Gemini API key is valid and try again.");
        } finally {
            setLoading(false);
        }
    }


    return (
        <>
            <div className="landing-page">
                <Navbar/>
                
                {/* Hero Section */}
                <section className="hero-section">
                    <div className="hero-content">
                        <h1 className="hero-title">Let AI guide your research journey from passion to paper.</h1>
                        <p className="hero-subtitle">Transform your interests into compelling research paper ideas with AI-powered suggestions tailored for high school students.</p>
                        
                        <form onSubmit={e => { 
                            e.preventDefault(); 
                            runModel(); 
                        }} className="hero-form">
                            <div className="input-container">
                                <Input value={interest} setValue={setInterest} placeholderText={"What are you interested in? (math, science..."}/>
                            </div>
                            <div className="button-container">
                                <button type="submit" className="cta-button" disabled={loading}>
                                    {loading ? (
                                        <span className="spinner"></span>
                                    ) : (
                                        "Generate Research Ideas"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </section>

                {/* Features Section */}
                <section className="features-section">
                    <div className="container">
                        <h2 className="section-title">Why Choose PassionPath?</h2>
                        <div className="features-grid">
                            <div className="feature-card">
                                <div className="feature-icon">🎯</div>
                                <h3>AI-Powered Suggestions</h3>
                                <p>Get personalized research paper ideas based on your specific interests and academic level.</p>
                            </div>
                            <div className="feature-card">
                                <div className="feature-icon">📚</div>
                                <h3>High School Focused</h3>
                                <p>All suggestions are tailored for high school students with achievable research goals.</p>
                            </div>
                            <div className="feature-card">
                                <div className="feature-icon">⚡</div>
                                <h3>Instant Results</h3>
                                <p>Generate three unique research ideas in seconds, not hours of brainstorming.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section className="how-it-works-section">
                    <div className="container">
                        <h2 className="section-title">How It Works</h2>
                        <div className="steps-grid">
                            <div className="step-card">
                                <div className="step-number">1</div>
                                <h3>Share Your Interest</h3>
                                <p>Tell us what fascinates you - whether it's math, science, history, or any other subject.</p>
                            </div>
                            <div className="step-card">
                                <div className="step-number">2</div>
                                <h3>AI Generates Ideas</h3>
                                <p>Our advanced AI analyzes your interests and creates three unique research paper concepts.</p>
                            </div>
                            <div className="step-card">
                                <div className="step-number">3</div>
                                <h3>Start Your Research</h3>
                                <p>Choose your favorite idea and begin your academic journey with confidence.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Use Cases Section */}
                
                {/* CTA Section */}
                <section className="cta-section">
                    <div className="container">
                        <h2>Ready to Transform Your Research Journey?</h2>
                        <p>Join students who have discovered their perfect research topics with PassionPath.</p>
                        <button className="cta-button-secondary" onClick={() => {
                            console.log('Button clicked!');
                            console.log('Current modal state:', showSignInModal);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                            setTimeout(() => {
                                console.log('Setting modal to true');
                                setShowSignInModal(true);
                                console.log('Modal state after setting:', true);
                            }, 500);
                        }}>
                            Get Started Now
                        </button>
                    </div>
                </section>

                {/* Results Preview (Hidden by default) */}
                {title1 && (
                    <section className="results-section">
                        <div className="container">
                            <h2 className="section-title">Your Research Ideas</h2>
                            <div className="results-grid">
                                <div className="result-card">
                                    <h3>{title1}</h3>
                                    <p>{desc1}</p>
                                </div>
                                <div className="result-card">
                                    <h3>{title2}</h3>
                                    <p>{desc2}</p>
                                </div>
                                <div className="result-card">
                                    <h3>{title3}</h3>
                                    <p>{desc3}</p>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </div>
            
            <SignInModal 
                isOpen={showSignInModal} 
                onClose={() => {
                    console.log('Closing modal');
                    setShowSignInModal(false);
                    showSignUpModal(false);
                }}
                onSuccessfulLogin={handleSuccessfulLogin}
                onSwitchToSignUp={() => {
                    setShowSignInModal(false);
                    showSignUpModal(true);
                    onSwitchToSignUp(true);
                }}
            />
        </>
    );
}
export default ModelCreate;