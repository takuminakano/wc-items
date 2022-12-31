import { ComponentBase } from './base';
import { Colors } from './colors';
export class TextInput extends ComponentBase {
    constructor(){
        super();
        const cascadeEvent = (event: Event) => {
            console.log(this);
            // this.dispatchEvent(event);
            this.dispatchEvent(new CustomEvent("event"));
        }
        cascadeEvent.bind(this);
        const inputElement: HTMLInputElement = (this.shadowRoot!.getElementById("text-input") as HTMLInputElement);
        //inputElement.oninput = (e: Event) => {cascadeEvent(e)};
        inputElement.addEventListener("click", (e) => {cascadeEvent(e)});
        // inputElement.onkeydown = (e: Event) => {cascadeEvent(e)};
        // inputElement.onkeyup = (e: Event) => {cascadeEvent(e)};
    }
    onInput(e: Event){
        // console.log("on input");
        this.dispatchEvent(e);
    }
    getStyle(){
        return `
        div#root {
padding: 0px;
        }
        input{
        background-color: transparent;
        font-size: 1rem;
        margin: 5px;
padding: 8px;
        border-radius: 0px;
        border: 1px solid #707070;
transition: border-color 0.1s;
        }
        input:focus-visible {
        border: 2px solid ${Colors.BLUE};
        margin: 4px;
outline: none;
        }
        `;
    }
    renderHTML(){
        return `
        <div id="root">
          <input id="text-input" type="text" placeholder=${this.getAttribute("placeholder") || "Type" } />
        </div>
        `;
    }
}
customElements.define("text-input", TextInput);
