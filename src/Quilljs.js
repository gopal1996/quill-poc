import React, {useRef, useEffect} from 'react'
import Quill from "quill";
import "quill/dist/quill.snow.css"
import { cleanDocx } from '@prezly/docx-cleaner'
import "./App.css"
import { toolbarOptions } from './Quill/toolbar'
// import {BoldBlot} from './suneditor/Quill/bold'


const Quilljs = () => {
    let editor = useRef(null)
    let editorContainer = useRef()
    
    useEffect(() => {
        // Quill.register("blots/inline", BoldBlot, true)
        // Quill.register('modules/clipboard', PlainClipboard, true);

        editor.current = new Quill(editorContainer.current, {
            theme: 'snow',
            modules: {
                toolbar: toolbarOptions,
            }
        })

        editor.current.on('text-change', changeHandler)
    }, [])

    function imageHandler(imageDataUrl, type, imageData) {
        console.log("testing")
        var filename = 'my_cool_image.png'
        var blob = imageData.toBlob()
        var file = imageData.toFile(filename)
       
        // generate a form data
        var formData = new FormData()
       
        // append blob data
        formData.append('filename', filename)
        formData.append('file', blob)
       
        // or just append the file
        formData.append('file', file)
       
        // upload image to your server
        callUploadAPI("http://127.0.0.1:5000/upload", formData, (err, res) => {
          if (err) return
          // success? you should return the uploaded image's url
          // then insert into the quill editor
          var index = (quill.getSelection() || {}).index || quill.getLength()
          if (index) quill.insertEmbed(index, 'image', res.data.image_url, 'user')
        })
      }

    const handlingDragDrop = (event) => {
        // event.dataTransfer.dropEffect = 'copy';
        const draggedValue = event.target.dataset["value"];
        // event.dataTransfer.effectAllowed = 'move'
        event.dataTransfer.setData("text/plain", draggedValue);
    };

    const changeHandler = (value, delta, source) => {
        // console.log(editor.current.root.innerHTML)
    }

    return (
        <div>
            <div 
             ref={editorContainer} 
            ></div>
        </div>
    )
}

export default Quilljs