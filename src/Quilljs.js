import React, {useRef, useEffect} from 'react'
import Quill from "quill";
import "quill/dist/quill.snow.css"
import "./App.css"

const Quilljs = () => {
    let editor = useRef(null)
    let editorContainer = useRef()

    

    const handlingDragDrop = (event) => {
        // event.dataTransfer.dropEffect = 'copy';
        const draggedValue = event.target.dataset["value"];
        // event.dataTransfer.effectAllowed = 'move'
        event.dataTransfer.setData("text/plain", draggedValue);
    };

    const changeHandler = (value, delta, source) => {
        console.log(editor.current.root.innerHTML)
    }

    useEffect(() => {
        editor.current = new Quill(editorContainer.current, {
            theme: 'snow',
            modules: {
                toolbar: true
            }
        })

        editor.current.on('text-change', changeHandler)
    }, [])
    return (
        <div>
            <div className="flow-field">
                <ul className="flow-field--list" onDragStart={handlingDragDrop}>
                    <li
                        data-value="{{requestor_email}}"
                        className="flow-field--item"
                        contentEditable="false"
                        draggable="true"
                    >
                        Requestor Email
                    </li>
                    <li
                        data-value="{{created_by}}"
                        className="flow-field--item"
                        draggable="true"
                    >
                        Created By
                    </li>
                    <li
                        data-value="{{created_at}}"
                        className="flow-field--item"
                        draggable="true"
                    >
                        Created At
                    </li>
                    <li
                        data-value="{{requestor_name}}"
                        className="flow-field--item"
                        draggable="true"
                    >
                        Requestor Name
                    </li>
                </ul>
            </div>
            <div 
             ref={editorContainer} 
            ></div>
        </div>
    )
}

export default Quilljs