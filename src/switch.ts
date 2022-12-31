import { ComponentBase } from './base';

export class SwitchComponent extends ComponentBase {
    constructor(){
        super();
        // const toggleElement = this.shadowRoot.getElementById("toggle");
        // toggleElement.addEventListener("click", () => {
        //     this.toggleOnOff();
        // });
        this.shadowRoot!.getElementById("container")?.addEventListener("click", () => {this.toggleOnOff();});
    }
    toggleOnOff(){
        const toggleElement = this.shadowRoot!.getElementById("toggle")!;
        const containerElement = this.shadowRoot!.getElementById("container")!;
        const toggleOn: boolean = toggleElement.classList.contains("on");
        toggleElement.className = toggleOn? "off" : "on";
        containerElement.className = toggleOn? "off": "on";
        this.dispatchEvent(new CustomEvent(
            "switch-toggle",
            {detail: {
                toggleOn: !toggleOn
            }}
        ));
    }
    getStyle(){
        return `
        div#container{
          border-radius: 50px;
          height: 30px;
          padding: 0px;
          background-color: #E0E0E0;
          border: 1px solid #AAAAAA;
          position: relative;
          width: 55px;
          transition: all 0.1s;
        }
        div#container.on{
          background-color: #0077FF;
        }
        #toggle{
          position: absolute;
          transition: all 0.1s;
          left: 5px;
          top: 5px;
        }
        span{
        font-size: 0.65rem;
        font-family: system-ui;
        display: inline-flex;
        align-items: center;
        height: 100%;
        font-weight: bold;
        }
        span#on{
        position: absolute;
        left: 7px;
        color: white;
        }
        span#off{
        position: absolute;
        right: 7px;
        color: #505050;
        }

        div#container.on span#off{display: none;}
        div#container.off span#on {display: none;}
        #toggle.on {
          left: calc(100% - 25px);
        }
        `;
    }
    renderHTML(){
        return `
        <div id="container">
          <span id="on">ON</span>
          <span id="off">OFF</span>
          <div id="toggle">
          <svg width="20px" height="20px" viewbox="0 0 100 100">
            <circle cx="50" cy="50" r="50" fill="#FFFFFF" stroke="#303030" stroke-width="2"/>
          </svg>
          </div>
        </div>
        `;
    }
}
customElements.define("switch-component", SwitchComponent);
