import { ComponentBase } from './base';
import { Colors } from './colors';

export class LinkComponent extends ComponentBase {
    constructor(){
        super();
    }
    getStyle() {
        return `
        a {
          font-family: system-ui;
          font-size: 1rem;
          text-decoration: none;
          color: ${Colors.BLUE};
        }
        a:hover {
          text-decoration: underline;
        }
        a:visited {
          color: ${Colors.BLUE};
        }
        `;
    }
    renderHTML(){
        return `
        <a href=${this.getAttribute("to")}>${this.getAttribute("label")}</a>
        `;
    }
}
customElements.define("link-component", LinkComponent);
