import React, {useRef, useEffect} from 'react'
import Quill from "quill";
import "quill/dist/quill.snow.css"
import { cleanDocx } from '@prezly/docx-cleaner'
import "./App.css"
import QuillImageDropAndPaste from 'quill-image-drop-and-paste';
// import 'quill-paste-smart';

// var ColorClass = Quill.import('attributors/class/color');
// var SizeStyle = Quill.import('attributors/style/size');
// var BackgroundClass = Quill.import('attributors/class/background');
// Quill.register(ColorClass, true);
// Quill.register(SizeStyle, true);
// Quill.register(BackgroundClass, true)

// var Clipboard = Quill.import('modules/clipboard');
// var Delta = Quill.import('delta');

// class PlainClipboard extends Clipboard {
//     onPaste (evt) {
//         // e.preventDefault()
//         // const range = this.quill.getSelection()
//         let g = evt.clipboardData || window.clipboardData;

//         let html = g.getData('text/html');
//         let rtf = g.getData('text/rtf');
//         console.log(this.quill)
        
//         try {
//           const cleanHtml = cleanDocx(html, rtf)
//         //   console.log(cleanHtml)

//           var m;
//           let imageList = [];
//           var re = /<img[^>]+src="([^">]+)"/g

//           while(m = re.exec(cleanHtml)) {
//             imageList.push(m[1])
//           }

//         //   console.log(imageList)

//           if(imageList.length > 0) {
//             let editorData = this.quill.container.innerHTML;

//             var n;
//             let localFile = [];
//             while(n = re.exec(editorData)) {
//               localFile.push(n[1])
//             }

//             for(let i=0; i< imageList.length; i++) {
//               editorData = editorData.replace(localFile[i], imageList[i])
//             }

//             // console.log(editorData)

//             // editor.setContent(editorData)
//             this.quill.container.innerHTML = editorData
//           }

//         } catch(err) {
//           console.error(err)
//         }
//       }
// }

var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
  
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
  
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
  
    ['clean']                                         // remove formatting button
];

const Quilljs = () => {
    let editor = useRef(null)
    let editorContainer = useRef()
    

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

    useEffect(() => {
        // Quill.register('modules/clipboard', PlainClipboard, true);

        editor.current = new Quill(editorContainer.current, {
            theme: 'snow',
            modules: {
                toolbar: toolbarOptions,
                table: true,
            }
        })

        editor.current.on('text-change', changeHandler)
    }, [])
    return (
        <div>
            {/* <div className="flow-field">
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
            </div> */}
            <div 
             ref={editorContainer} 
            ></div>
        </div>
    )
}

export default Quilljs