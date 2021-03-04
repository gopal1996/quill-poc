import React, { useRef, useEffect } from 'react';
import SunEditor from 'suneditor-react';
import './suneditor.min.css'; 

const Sun = () => {
    const editorRef = useRef();
    useEffect(() => {
        // Get underlining core object here
        // Notice that useEffect is been used because you have to make sure the editor is rendered.
        console.log(editorRef.current.editor.core);
    }, []);

    const handlingDragDrop = (event) => {
        // event.dataTransfer.dropEffect = 'copy';
        const draggedValue = event.target.dataset["value"];
        // event.dataTransfer.effectAllowed = 'move'
        event.dataTransfer.setData("text/plain", draggedValue);
    };

    const handler = (eve) => {
        console.log(eve)
    }

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
            <SunEditor ref={editorRef} onChange={handler} />
        </div>
    )
}

export default Sun
