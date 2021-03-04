import React from 'react'
import Quilljs from './Quilljs';

const style = {
    textAlign: "center"
}

const App = () => {

    return (
        <section className="main">
            <div className="container">
                <h3 style={style}>Quill</h3>
                
                <Quilljs />
                
            </div>
        </section>
    )
}

export default App
