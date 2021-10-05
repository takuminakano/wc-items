export class ComponentBase extends HTMLElement {
    constructor(){
        super();
        const shadow = this.attachShadow({mode: "open"});
        const style: HTMLElement = document.createElement("style");
        style.textContent = this.getStyle();
        shadow.innerHTML = this.renderHTML();
        shadow.appendChild(style);
    }
    getStyle(){
        return ``;
    }
    renderHTML(){
        return ``;
    }
}
