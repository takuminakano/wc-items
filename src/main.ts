import { TypeSelectView, CustomSelectView } from './selection';
import './button';
import './linkComponent';
import './inputs';
import './tabSelection';
// import { TabSelection } from './tabSelection';
customElements.define("custom-select-view", CustomSelectView);
customElements.define("type-select-view", TypeSelectView);
// customElements.define("tab-selection", TabSelection);
export { TypeSelectView, CustomSelectView }
