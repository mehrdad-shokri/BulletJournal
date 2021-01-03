/* eslint-env browser */

import * as Y from 'yjs'
import {QuillBinding} from 'y-quill'
import Quill from 'quill'
import QuillCursors from 'quill-cursors'
import {WebrtcProvider} from 'y-webrtc'

var userList = {};

Quill.register('modules/cursors', QuillCursors);

function getCookie(cname) {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }

    if (window.location.host === 'localhost') {
        return "BulletJournal##group##sig";
    }
    return "";
}

function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

const updateUserList = (map) =>{
    const userListDiv = document.getElementById('userList');
    userListDiv.innerHTML = "";
    map.forEach((values)=>{
        let span = document.createElement("SPAN");
        span.innerText = values.user.name + " ";
        span.setAttribute("style", "color:" + values.user.color);
        userListDiv.appendChild(span);
    });
};

window.addEventListener('load', () => {
    let defaultName = 'anonymous' + Math.floor(Math.random() * 20);
    const loginCookie = getCookie('__discourse_proxy');
    if (loginCookie) {
        defaultName = decodeURIComponent(loginCookie.split('##')[0]);
    }
    let name = prompt("Please enter your name", defaultName);
    if (!name) {
        name = defaultName;
    }
    console.log(name);

    const params = new URLSearchParams(window.location.search);
    const contentId = params.has('uid') ? params.get('uid') : pad(Math.floor(Math.random() * 99999999), 8);
    fetch("/api/public/collab/" + contentId).then(response => {
        console.log(response.json());
    }).catch(reason => {
            console.log(reason);
        }
    );


    const ydoc = new Y.Doc();
    const rtcProviderUrl = 'ws://'+ window.location.hostname + ':4444';
    const provider = new WebrtcProvider('your-room-name1', ydoc, {signaling: [rtcProviderUrl]});
    const type = ydoc.getText('quill');
    const editorContainer = document.getElementById('editor-container');

    var editor = new Quill(editorContainer, {
        modules: {
            cursors: true,
            toolbar: [
                [
                    {header: [1, 2, 3, false]},
                    {color: []},
                    {background: []},
                    {align: []},
                ],
                ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
                [
                    {list: 'ordered'},
                    {list: 'bullet'},
                    {indent: '-1'},
                    {indent: '+1'},
                ],

                ['link'],

                ['clean'],
            ],
            history: {
                delay: 500,
                maxStack: 100,
                userOnly: true,
            },
        },
        placeholder: 'Start collaborating...',
        theme: 'snow' // or 'bubble'
    });

    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    console.log("color:" + randomColor);
    // Define user name and user name
    // Check the quill-cursors package on how to change the way cursors are rendered
    provider.awareness.setLocalStateField('user', {
        name: name,
        color: randomColor
    });

    userList = provider.awareness.getStates();
    console.log(userList);
    updateUserList(userList);

    provider.awareness.on('update', ({ added, updated,removed}) => {
        if(added.length !== 0 || removed.length !== 0 ){
            userList = provider.awareness.getStates();
            console.log(userList);
            updateUserList(userList);
        }
    });

    const binding = new QuillBinding(type, editor, provider.awareness);

    // @ts-ignore
    window.example = {provider, ydoc, type, binding, Y}
});


const colors = ['aqua', 'black', 'blue', 'fuchsia', 'gray', 'green',
    'lime', 'maroon', 'navy', 'olive', 'orange', 'purple', 'red',
    'silver', 'teal', 'white', 'yellow'];

