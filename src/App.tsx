import React from "react"
import logo from "./logo.svg"
import "./App.css"
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom"
import Home from "./pages/Home"
import RsvpForm from "./pages/RsvpForm"

function App() {
    return (
        <div className="App">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Dancing+Script:wght@400..700&family=Great+Vibes&family=Parisienne&display=swap" rel="stylesheet"/>
            </head>
            <nav id="main_nav">
                <div className="left">
                    <a href="/" className="home_link">Edward & Dina</a>
                </div>
            </nav>
            <div id="page_content">
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/*"
                            element={<Navigate replace to="/" />}
                        />
                    </Routes>
                </Router>
            </div>
            {/* <RsvpForm /> */}
        </div>
    )
}

export default App
