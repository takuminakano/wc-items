export class ComponentBase extends HTMLElement {
    constructor(){
        super();
        const shadow = this.attachShadow({mode: "open"});
        const style: HTMLElement = document.createElement("style");
        style.textContent = this.getStyle();
        shadow.innerHTML = this.renderHTML();
        shadow.appendChild(style);
    }
    renderAll(){
        const style: HTMLElement = document.createElement("style");
        style.textContent = this.getStyle();
        this.shadowRoot!.innerHTML = this.renderHTML();
        this.shadowRoot!.appendChild(style);
    }
    getStyle(){
        return ``;
    }
    renderHTML(){
        return ``;
    }
}
