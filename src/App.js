import React from 'react'
// import Quilljs from './Quilljs';
import Sun from './Sun';
import "./App.css"

const style = {
    textAlign: "center"
}

const App = () => {

    return (
        <section className="main">
            <div className="container">
                <h3 style={style}>Quill</h3>
                
                {/* <Quilljs /> */}
                <Sun />
                
            </div>
        </section>
    )
}

export default App
