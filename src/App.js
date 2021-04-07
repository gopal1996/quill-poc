import React from 'react'
import Quilljs from './Quilljs';
// import Sun from './Sun';
import "./App.css"
import SunNative from './SunNative';

const style = {
    textAlign: "center"
}

const App = () => {

    return (
        <section className="main">
            <div className="container">
                {/* <h3 style={style}>Quill</h3>
                <Quilljs /> */}
                {/* <h3 style={style}>Sun Editor React</h3>
                <Sun /> */}
                <h3 style={style}>Sun Editor</h3>
                <SunNative />
                
            </div>
        </section>
    )
}

export default App
