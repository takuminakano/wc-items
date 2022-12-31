import { ComponentBase } from './base';
import { Colors } from './colors';
export class HoverNotification extends ComponentBase {
    getStyle(){
        return `
div#container {
font-family: system-ui;
position: fixed;
bottom: 24px;
right: 24px;
width: 250px;
background-color: #101010;
border-radius: 16px;
border: 1px solid #303030;
box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.1);
padding: 8px 8px;
display: flex;
flex-direction: column;
}
div#container.light {
background-color: #FFFFFF;
border-color: rgba(0, 0, 0, 0.15);
box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.05);
}
span {
color: white;
font-family: system-ui;
}
div#container.light span { color: black;}
span#title {
font-weight: bold;
font-size: 16px;
}
span#content {
font-size: 14px;
color: #A0A0A0;
}
.d-none {
display: none;
}
.d-block {
display:block;
}
.d-flex{
display: flex;
}
button{
background-color: #4982DB;
border-radius: 50px;
color: white;
border: none;
outline: none;
padding: 4px 8px;
}
button#button-dismiss {
background-color: transparent;
color: ${Colors.BLUE};
border: 1px solid ${Colors.BLUE};
}
div.dark button#button-dismiss {
color: white;
background-color: rgba(255, 255, 255, 0.2);
border-color: transparent;
}
div#container.d-none {
display: none;
}
div.light button#button-dismiss:hover {
background-color: #F0F0F0;
}
div.dark button#button-dismiss:hover {
background-color: rgba(255, 255, 255, 0.1);
}
`;
    }
    renderHTML(){
        const title = "Notification Title";
        const content = "Notification content";
        const theme = this.getAttribute("theme") || "light";
        return `
        <div id="container" class="${theme} d-none">
          <div style="display: flex; flex-direction: column; padding: 8px 8px;">
            <span id="title">${title}</span>
            <span id="content">${content}</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 8px 8px;">
            <button id="button-ok">OK</buton>
            <button id="button-dismiss">Dismiss</button>
          </div>
        </div>
        `;
    }
    constructor(){
        super();
        this.shadowRoot!.getElementById("button-dismiss")!.addEventListener("click", () => {
            this.hide();
            this.dispatchEvent(new CustomEvent("dismiss-clicked"));
        });
        this.shadowRoot!.getElementById("button-ok")!.addEventListener("click", () => {
            this.hide();
            this.dispatchEvent(new CustomEvent("ok-clicked"));
        });
    }
    show(title: string, message: string){
        this.title = title;
        this.message = message;
        this.showContainer();
        setTimeout(()=>{
            this.hide();
        }, 5000);
    }
    set title(title: string){
        this.shadowRoot!.getElementById("title")!.innerText = title;
    }
    set message(message: string){
        this.shadowRoot!.getElementById("content")!.innerText = message;
    }
    showContainer(){
        const theme = this.getAttribute("theme") || "light";
        this.shadowRoot!.getElementById("container")!.className = `${theme}`;
    }
    hide(){
        const theme = this.getAttribute("theme") || "light";
        this.shadowRoot!.getElementById("container")!.className = `${theme} d-none`;
    }
}
customElements.define("hover-notification", HoverNotification);
