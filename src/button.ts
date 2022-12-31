import { ComponentBase } from './base';
export class ButtonItem extends ComponentBase {
    static get observedAttributes(){
        return ["label", "theme", "onclick"];
    }
    attributeChangedCallback(name: string, oldValue: any, newValue: any){
        if (oldValue == newValue) return;
        if (name === "label") {
            this.shadowRoot!.getElementById("button")!.innerText = newValue;
        }
    }
    constructor(){
      super();
      this.shadowRoot!.getElementById("button")!.addEventListener("focus", () => {
        this.shadowRoot!.getElementById("container")!.className = `focus ${this.getAttribute("theme")}`;
      });

      this.shadowRoot!.getElementById("button")!.addEventListener("blur", () => {
        this.shadowRoot!.getElementById("container")!.className = this.getAttribute("theme")!;
      });
    }
    getStyle(){
      const borderRadius: number = 0;
      const borderWidth: number = 0;
      const hoverColor = "#4982DB";
        return `
        div#container {
          width:100%;
          padding: ${borderWidth}px;
          border: 2px solid transparent;
          border-radius: ${borderRadius + 1}px;
          transition: background-color 0.1s;
        }
        div#container.focus {
          // border-color: #2684FF60;
          border: 2px solid #2684FF60;
        }
        div#container.bg-transparent.focus {
          border: 1px solid #707070;
        }
        button{
          font-size: 1rem;
          width: 100%;
          background-color: #0088FF;
          color: white;
          padding: 7px 10px;
          border-radius: ${borderRadius - borderWidth}px;
          border: 2px solid transparent;
          appearance: none;
          outline: none;
          transition: background-color 0.1s;
        }
        div#container.bg-transparent{
          border-width: 1px;
        }
        button#button:hover {
          background-color: ${hoverColor};
        }
        button#button.bg-transparent {
          color: black;
          background-color: transparent;
          border: 2px solid #707070;
        }
        button#button.bg-transparent:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }
        button:focus {
          border: 2px solid ${hoverColor};
          background-color: ${hoverColor};
        }
        `;
    }
    renderHTML(){
        const label = this.getAttribute("label");
        return `
        <div id="container" class=${this.getAttribute("theme")}>
          <button id="button" class=${this.getAttribute("theme")} onclick=${this.getAttribute("click")}>${label}</button>
        </div>
        `;
    }
}
customElements.define("button-component", ButtonItem);
