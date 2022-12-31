import { ComponentBase } from './base';
export class TabSelection extends ComponentBase {
    currentSelectedIndex: number = -1;
    static get observedAttributes(){
        return ["theme", "labels", "optionindex"];
    }
    constructor(){
        super();
        this.renderLabels();
    }
    renderLabels(){
        const labels: string[] = JSON.parse(this.getAttribute("labels")!);
        const rootElement = this.shadowRoot!.getElementById("root")!;
        rootElement.innerText = "";
        if (this.currentSelectedIndex < 0){
            const selectedIndex = parseInt(this.getAttribute("optionindex") || "0");
            this.currentSelectedIndex = selectedIndex;
        }
        let index = 0;
        for(const label of labels){
            const labelElement = document.createElement("div");
            const labelSelected: boolean = (index === this.currentSelectedIndex);
            labelElement.setAttribute("class", `tab-item-container ${labelSelected? 'selected':'not-selected'}`);
            labelElement.innerHTML = `
              <button class=${labelSelected? "selected":"not-selected"}>${label}</button>
            `;
            rootElement.appendChild(labelElement);
            const finalIndex: number = index;
            labelElement.addEventListener("click", () => {
                this.currentSelectedIndex = finalIndex;
                this.renderLabels();
                this.dispatchEvent(new CustomEvent(
                    "option-select",{ detail: {
                        index: finalIndex,
                        label: label
                    }}
                ));
            });
            index += 1;
        }
    }
    getStyle(){
        return `div#root {
          display: grid;
          gap: 0px;
          grid-auto-columns: 1fr;
          grid-auto-flow: column;
          border-radius: 0px;
        }
        div#root.dark {
          background-color: #1F1F1F;
          border: 1px solid #505050;
        }
        div#root.light {
          background-color: white;;
          border: 1px solid transparent;
        }
        button {
          appearance: none;
          margin: 0px;
          margin-right: auto;
          margin-left: auto;
          border: 0px;
          padding: 4px 8px;
          font-size: 0.8rem;
          font-weight: bold;
          font-family: system-ui;
        }
        div.light button {
          background-color: transparent
        }
        div.dark button {
          background-color: rgba(0, 0, 0, 0.0);
        }
        div.dark button.selected{
          color: rgba(0, 0, 0, 1.0);
          //background-color: rgba(0, 0, 0, 0.07);
        }
        div.dark button.not-selected{
          color: rgba(255, 255, 255, 0.8);
          //background-color: rgba(0, 0, 0, 0);
        }
        

    div.light button.selected { color: white;}
    div.light button.not-selected { color: #505050;}
    div.selected, div.not-selected{
      display: flex;
      padding: 0px 4px;
border-radius: 0px;
transition: background-color 0.1s;
    }
    div.dark div.selected {
      background-color: #AAAAAA;
    }
    div.dark div.not-selected {
      background-color: rgba(0, 0, 0, 0.0);

    }
    div.dark div.not-selected:hover {
      background-color: #303030;
    }
div.light div.not-selected:hover {background-color: rgba(0, 0, 0, 0.05);}
    div.light div.selected {
background-color: #0077FF;
}
div.light div.not-selected {
background-color: #F7F7F7;
}

    `;

        // return `
        // div#root{
        //   display: grid;
        //   grid-auto-columns: 1fr;
        //   grid-auto-flow: column;
        // }
        // div.tab-item-container {
        //   display: flex;
        //   justify-items: stretch;
        //   padding: 0px 8px;
        // }
        // div.tab-item-container.selected {
        //   border-bottom: 1px solid black;
        // }
        // div.tab-item-container button {
        //   width: 100%;
        //   background-color: #FFFFFF;
        //   outline: none;
        //   border: none;
        // }
        // div.tab-item-container button:hover {
        //   background-color: #F0F0F0;
        // }
        //   `;
    }
    renderHTML() {
        return `
        <div id="root" class=${this.getAttribute("theme") || "light"}>
        </div>
        `;
    }
}
customElements.define("tab-selection", TabSelection);
