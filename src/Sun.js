import React, { useRef, useEffect } from 'react';
import SunEditor from 'suneditor-react';
import { cleanDocx } from '@prezly/docx-cleaner'
import image from 'suneditor/src/plugins/dialog/link'
import list from 'suneditor/src/plugins/submenu/list'
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

    const handlePaste = (e, cleanData, maxCharCount) => {
        // console.log("SunEditor :: cleanData", cleanData)
        let g = e.clipboardData || window.clipboardData;

        let html = g.getData('text/html');
        let rtf = g.getData('text/rtf');
        console.log(rtf)
        try {
            const cleanHtml = cleanDocx(html, rtf)
          //   console.log(cleanHtml)
  
            var m;
            let imageList = [];
            var re = /<img[^>]+src="([^">]+)"/g
  
            while(m = re.exec(cleanHtml)) {
              imageList.push(m[1])
            }
  
          //   console.log(imageList)
  
            if(imageList.length > 0) {
            //   let editorData = this.quill.container.innerHTML;
  
              var n;
              let localFile = [];
              while(n = re.exec(cleanData)) {
                localFile.push(n[1])
              }
  
              for(let i=0; i< imageList.length; i++) {
                cleanData = cleanData.replace(localFile[i], imageList[i])
              }
  
              // console.log(editorData)
  
              // editor.setContent(editorData)
            //   this.quill.container.innerHTML = editorData
            }
  
          } catch(err) {
            console.error(err)
          }
        

        return html
    }

    const handleImageUploadBefore = (files, info, uploadHandler) => {
        // uploadHandler is a function
        console.log(files, info)

        const FounderData = new FormData();
        FounderData.append("file", files[0])

        const postHeaders = new Headers()
        postHeaders.append("Content-Type","application/json")

        fetch(`http://localhost:5000/upload`, {
            method: "POST",
            body: FounderData,
        })
        .then(res => res.json())
        .then(res => {
            let response = {
                result: [
                  {
                    url: res.location,
                    name: res.name || 'Imagem',
                    size: res.size
                  }
                ]
              }

            uploadHandler(response)
        })
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
            <SunEditor ref={editorRef} onChange={handler} setOptions={{
                height: 500,
                buttonList: [
                    ['undo', 'redo'],
                    ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                    ['align', 'horizontalRule', 'list', 'lineHeight'],
                    ['table', 'link', 'image', 'video'],
                    ['fullScreen', 'showBlocks', 'codeView'],
                    ['preview', 'print'],
                ],
                plugins: [image],
                imageUploadUrl: "http://localhost:5000/upload"
            }} onPaste={handlePaste} onImageUploadBefore={handleImageUploadBefore} />
        </div>
    )
}

export default Sun
