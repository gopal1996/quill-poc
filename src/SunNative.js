import React, {useRef, useEffect, useState, useCallback} from 'react'
import suneditor from 'suneditor';
// import "suneditor/dist/css/suneditor.min.css";
import "suneditor/src/assets/css/suneditor.css";
// import './suneditor.min.css'; 
import {blockquote, align, font, fontSize, fontColor, hiliteColor, horizontalRule, list, table, formatBlock, lineHeight, template, paragraphStyle, textStyle, link, image, video, audio, math, imageGallery} from "suneditor/src/plugins";
import {plugin_command} from './suneditor/customComand'
import {plugin_submenu} from './suneditor/customSubmenu'
import {plugin_customTable} from './suneditor/customTable'
import {plugin_pageBreak} from './suneditor/customPageBreak'
import {plugin_padding} from './suneditor/customPadding'
import { cleanDocx } from '@prezly/docx-cleaner'

// payload
// import payload1 from './payload/metadata1.json'
// import payload2 from './payload/metadata2.json'
// import payload3 from './payload/metadata3.json'
// import owaspPayload from './payload/OwaspBug.json'

const SunNative = () => {
    let editor = useRef(null);
    let txtArea = useRef()
    let sunCore = useRef()
    let [Top, setTop] = useState(0)
    let [Left, setLeft] = useState(0)
    let [data, setData] = useState('')
    let [currentIndex, setCurrentIndex] = useState(0)
    let currentRef = useRef(0)
    let suggestionRef = useRef(null)
    const [isSuggestionOpen, setSuggestion] = useState(false)
    const [suggestionList, setList] = useState(["Name", "Email", "Mobile Number", "Address"])
    let tempList = suggestionList;

    useEffect(() => {
        editor.current = suneditor.create(txtArea.current, {
            plugins: [plugin_padding, plugin_pageBreak, plugin_submenu,plugin_customTable ,blockquote, align, font, fontSize, fontColor, hiliteColor, horizontalRule, table, formatBlock, lineHeight, template, paragraphStyle, textStyle, link, image, video, list, audio, math, imageGallery, plugin_command],
            width: "100%",
            height: "794px",
            minHeight: "600px",
            buttonList: [
                ['undo', 'redo'],
                ['font', 'fontSize', 'formatBlock'],
                ['paragraphStyle', 'blockquote'],
                ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                ['fontColor', 'hiliteColor', 'textStyle'],
                ['removeFormat'],
                ['outdent', 'indent'],
                ['align', 'horizontalRule', 'list', 'lineHeight'],
                ['table', 'link', 'image', 'video'],
                ['fullScreen', 'showBlocks', 'codeView', 'print'],
                ['preview', 'customCommand', 'customSubmenu', 'customTable', 'customPageBreak', 'customPadding'],
            ],
            linkRelDefault: {
                "default": "nofollow noreferrer noopener",
                "check_new_window": "noreferrer noopener",
                "check_bookmark": "bookmark"
            },
            colorList: [],
            historyStackDelayTime: 100,
            attributesWhitelist: {
                all: "style",
            }
        })

        // editor.current.disabled()

        // editor.current.onChange = (content, core) => {
        //     // console.log(core.getSelectionNode().getRange().getBoundingClientRect())
        //     setData(content)
        //     if(editor.current.getText().slice(-2) === "{{") {
                
        //         setSuggestion(true)
        //         const {top, left} = core.getRange().getBoundingClientRect();
        //         console.log(top, left)
        //         if(isSuggestionOpen) {
        //             if(top <=0) {
        //                 setTop(0)
        //             } else {
        //                 setTop(top - 70);
        //             }
        
        //             if(left <=0) {
        //                 setLeft(0)
        //             } else {
        //                 setLeft(left - 5)
        //             }
        //         }
                
                
        //     }

        //     // if(isSuggestionOpen) {
        //     //     setList(tempList.filter(item => item.includes()))
        //     // }

            // let sunEditorChildren = document.querySelector('.sun-editor-editable');
            // let node1 = document.createElement('div')
            // node1.setAttribute("style","border-top: 1px solid #000; width: 900px; position: absolute; top: 387mm; z-index: 888;")
            // let node2 = document.createElement('div')
            // node2.setAttribute("style","border-top: 1px solid #000; width: 900px; position: absolute; top: 774mm; z-index: 888;")
            // let node3 = document.createElement('div')
            // node3.setAttribute("style","border-top: 1px solid #000; width: 900px; position: absolute; top: 1161mm; z-index: 888;")
            // sunEditorChildren.appendChild(node1)
            // sunEditorChildren.appendChild(node2)
            // sunEditorChildren.appendChild(node3)
        // }

        // editor.current.onScroll = function(event, core) {
        //     console.log("scrollHeight",event.target.scrollHeight, "scrollTop", event.target.scrollTop)
        // }

        // editor.current.onPaste = (e, cleanData, maxCharCount) => {
        //     // console.log("SunEditor :: cleanData", cleanData)
        //     let g = e.clipboardData || window.clipboardData;
        //     let html = g.getData('text/html');
        //     let plain = g.getData('text/plain');
        //     console.log("plain",plain)
        //     let rtf = g.getData('text/rtf');
        //     // console.log(rtf)
        //     try {
        //         const cleanHtml = cleanDocx(html, rtf)
        //       //   console.log(cleanHtml)
      
        //         var m;
        //         let imageList = [];
        //         var re = /<img[^>]+src="([^">]+)"/g
      
        //         while(m = re.exec(cleanHtml)) {
        //           imageList.push(m[1])
        //         }
      
        //       //   console.log(imageList)
      
        //         if(imageList.length > 0) {
        //         //   let editorData = this.quill.container.innerHTML;
      
        //           var n;
        //           let localFile = [];
        //           while(n = re.exec(cleanData)) {
        //             localFile.push(n[1])
        //           }
      
        //           for(let i=0; i< imageList.length; i++) {
        //             cleanData = cleanData.replace(localFile[i], imageList[i])
        //           }
      
        //           // console.log(editorData)
      
        //           // editor.setContent(editorData)
        //         //   this.quill.container.innerHTML = editorData
        //         }
      
        //       } catch(err) {
        //         console.error(err)
        //       }
            
    
        //     return html
        // }

        // document.addEventListener('click', function(e) {
        //     e.preventDefault()
        //     if(e.target.dataset['id']) {
        //         e.target.dataset['id']
        //         setSuggestion(false)
        //     }
        // })
            
        // document.addEventListener("keydown", keyDownHandler);

    }, [])

    useEffect(() => {
        editor.current.onChange = (content, core) => {
            // console.log(core.getSelectionNode().getRange().getBoundingClientRect())
            // setSunEditorCore(core)
            console.log("SunEditor :: Core", core)
            console.log("SunEditor :: Range", core.getRange())
            console.log("SunEditor :: topArea", core.context.element.wysiwyg)
            console.log("SunEditor :: Selection", core.getSelection())
            console.log("SunEditor :: ClientRects", core.getRange().getClientRects())
            console.log("SunEditor :: Global Scroll", core.getGlobalScrollOffset())
            console.log("SunEditor :: SelectionNode", core.getSelectionNode())
            console.log("SunEditor :: getOffset", core.util.getOffset(core.getSelectionNode(), core.context.element.wysiwygFrame))

            var range = core.getSelection().getRangeAt(0);
            let text;
            if (range.collapsed) {
                text = range.startContainer.textContent.substring(0, range.startOffset);
            }
            setData(content)
            if(text.slice(-2) === "{{") {
                
                
                // console.log("text",text)
                // console.log("range", range.getBoundingClientRect())
                // const {top, left} = core.getRange().getBoundingClientRect();


                const {left} = range.getBoundingClientRect();

                // get x and y of wysiwyg Frame
                const {top} = core.util.getOffset(core.getSelectionNode(), core.context.element.wysiwygFrame)
                
                setSuggestion(true)
                updatePosition(top, left)
            }
        }
    }, [isSuggestionOpen, Top, Left])

    function updatePosition(top, left) {
        console.log(top, left, isSuggestionOpen)
        // if(isSuggestionOpen) {
            // console.log(top, left)
            if(top <=0) {
                setTop(0)
            } else {
                setTop(top + 10);
            }

            if(left <=0) {
                setLeft(0)
            } else {
                setLeft(left - 5)
            }
        // }
    }

    useEffect(() => {
        editor.current.onKeyDown = (event, core) => {

            if(event.keyCode === 40 ) {
                if(isSuggestionOpen) {
                    console.log("Run")
                    event.preventDefault()
                    setCurrentIndex(prev => prev === suggestionList.length - 1 ? 0 : prev + 1)
                    currentRef.current = currentRef.current + 1

                }
            } else if(event.keyCode === 38) {
                if(isSuggestionOpen) {
                    event.preventDefault()
                    setCurrentIndex(prev => prev === 0 ? suggestionList.length - 1 : prev - 1)
                    currentRef.current = currentRef.current - 1

                }
            } else if(event.keyCode === 13) {
                if(isSuggestionOpen) {

                    event.preventDefault();
                    setSuggestion(false)
                    core.functions.insertHTML(suggestionList[currentRef.current])
                }
            }
        }
    }, [currentIndex, isSuggestionOpen])

    const keyDownHandler = (event, core) => {

        if(event.keyCode ==40 ) {
            event.preventDefault()
            setCurrentIndex(prev => prev === suggestionList.length - 1 ? 0 : prev + 1)
        } else if(event.keyCode == 38) {
            event.preventDefault()
            setCurrentIndex(prev => prev === 0 ? suggestionList.length - 1 : prev - 1)
        } else if(event.keyCode == 13) {
            event.preventDefault();
            console.log(core)
            console.log(suggestionList[currentIndex], currentIndex, suggestionList, top)
            core.functions.insertHTML(suggestionList[currentIndex])
        }
    }

    const handlingDragDrop = (event) => {
        // event.dataTransfer.dropEffect = 'copy';
        const draggedValue = event.target.dataset["value"];
        // event.dataTransfer.effectAllowed = 'move'
        event.dataTransfer.setData("text/html", draggedValue);
        // event.dataTransfer.setData("text/html", '<table><thead><tr><th><div><br></div></th><th><div><br></div></th></tr></thead><tbody><tr><td><div><br></div></td><td><div><br></div></td></tr></tbody></table>');
    };

    function handleSubmit(e) {
        data = `
            <div class="se-wrapper-inner se-wrapper-wysiwyg sun-editor-editable">
                ${data}
            </div>
        `
        data = data.replaceAll('break-before: page;', 'page-break-before: always;')

        fetch("http://localhost:5000/pdf", {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({"desc": data})
        })
        .then(res => res.blob())
        .then(blob => {
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = `${+new Date()}.pdf`;
            document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
            a.click();    
            a.remove();
        })
    }

    function owasp1Handle() {
        navigator.clipboard.writeText(JSON.stringify(payload1, null, 4))
        fetch("https://test.gopalakrishnanc.in/api", {
        // fetch("http://localhost:5000/owasp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload2)
        })
        .then(res => {
           return res.json()
        })
        .then(out => console.log(out))
    }

    function owasp2Handle() {
        // using FormData
        // let data = new FormData()
        // data.append("desc",JSON.stringify(payload2))

        // fetch("https://test.gopalakrishnanc.in/api", {
        // // fetch("http://localhost:5000/owasp", {
        //     method: "POST",
        //     body: data
        // })
        // .then(res => {
        //    return res.json()
        // })
        // .then(out => console.log(out))

        // ************************************************ //

        // using Json

        fetch("https://test.gopalakrishnanc.in/api", {
        // fetch("http://localhost:5000/owasp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload2, null, 2)
        })
        .then(res => {
           return res.json()
        })
        .then(out => console.log(out))
    }

    function owasp3Handle() {
        // let data = new FormData()
        // data.append("desc",JSON.stringify(payload3))

        fetch("https://test.gopalakrishnanc.in/api", {
        // fetch("http://localhost:5000/owasp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload3, null, 2)
        })
        .then(res => {
           return res.json()
        })
        .then(out => console.log(out))
    }


    return (
        <div style={{position: "relative"}}>
            {
                (isSuggestionOpen ? (
                    <ul ref={suggestionRef} className="suggestion-list" style={{position: "absolute", top: Top, left: Left, zIndex: "10"}}>
                        {
                            suggestionList.map((item, idx) => (
                                <li key={idx} data-id={idx} className={`suggestion-item ${currentIndex === idx ? 'active' : ''}`}>{item}</li>
                            ))
                        }
                    </ul>
                ) : null)
            }

            <div className="container" style={{display: 'flex'}}>

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
                <textarea ref={txtArea} />
            </div>
            {currentIndex}
            <button onClick={handleSubmit} style={{
                  padding: ".5rem 1rem", 
                  background: "#e91d63",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginTop: "1rem"
                  }}>Generate PDF</button>

            <button onClick={owasp1Handle} style={{
                  padding: ".5rem 1rem", 
                  background: "#e91d63",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginTop: "1rem"
                  }}>OWASP Payload 1</button>

            <button onClick={owasp2Handle} style={{
                  padding: ".5rem 1rem", 
                  background: "#e91d63",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginTop: "1rem"
                  }}>OWASP Payload 2</button>

            <button onClick={owasp3Handle} style={{
                  padding: ".5rem 1rem", 
                  background: "#e91d63",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginTop: "1rem"
                  }}>OWASP Payload 3</button>
                
            {/* <div className="pagination" style={{borderTop: "1px solid #000", width: "900px", position: "absolute",top: "297mm", zIndex: "888"}}></div>
            <div className="pagination" style={{borderTop: "1px solid #000", width: "900px", position: "absolute",top: "594mm", zIndex: "888"}}></div>
            <div className="pagination" style={{borderTop: "1px solid #000", width: "900px", position: "absolute",top: "891mm", zIndex: "888"}}></div> */}
            
        </div>
    )
}

export default SunNative
