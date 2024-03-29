export class CustomSelectView extends HTMLElement {
    internalOptions:{[key: string] : any}[] = [];
    static get observedAttributes(){
        return ["selectedoptionindex", "theme"];
    }
    constructor(){
        super();
        const shadow = this.attachShadow({mode: "open"});
        const style = document.createElement("style");
        if (this.getAttribute("theme") === "dark"){
            style.textContent = `
                button {
                  font-size: 1rem;
                text-align: start;
                background-color: #222222;
                border: none;
                padding: 8px 8px;
                color: white;
                }
                button:hover {
                background-color: #333333;
                }
                button.selected {
                background-color: #0077FF;
                color: white;
                }
                .d-none { display: none; }
                .d-block { display: block;}
                .d-flex { display: flex; flex-direction: column;}
                }
           `;
        } else {
            style.textContent = `
button {
text-align: start;
background-color: #FFFFFF;
border: none;
padding: 8px 8px;
color: black;
font-size: 1rem;
}
button:hover {
background-color: #F0F0F0;
}
button.selected {
background-color: #0077FF;
color: white;
}
.d-none { display: none; }
.d-block { display: block;}
.d-flex { display: flex; flex-direction: column;}
}
`;
        }
        shadow.innerHTML = `<div><div id="options-list" style="display: flex; flex-direction: column;"></div></div>`;
        shadow.appendChild(style);
    }
    renderAll(){
         const style = document.createElement("style");
        if (this.getAttribute("theme") === "dark"){
            style.textContent = `
                button {
                  font-size: 1rem;
                text-align: start;
                background-color: #222222;
                border: none;
                padding: 8px 8px;
                color: white;
                }
                button:hover {
                background-color: #333333;
                }
                button.selected {
                background-color: #0077FF;
                color: white;
                }
                .d-none { display: none; }
                .d-block { display: block;}
                .d-flex { display: flex; flex-direction: column;}
                }
           `;
        } else {
            style.textContent = `
button {
text-align: start;
background-color: #FFFFFF;
border: none;
padding: 8px 8px;
color: black;
font-size: 1rem;
}
button:hover {
background-color: #F0F0F0;
}
button.selected {
background-color: #0077FF;
color: white;
}
.d-none { display: none; }
.d-block { display: block;}
.d-flex { display: flex; flex-direction: column;}
}
`;
        }
        this.shadowRoot!.innerHTML = `<div><div id="options-list" style="display: flex; flex-direction: column;"></div></div>`;
        this.shadowRoot!.appendChild(style);

    }
    set options(options: {[key: string]:any}[]){
        this.internalOptions = options;
        const optionsListContainer = this.shadowRoot!.getElementById("options-list")!;
        optionsListContainer.innerText = "";
        for(const option of options){
            const optionElement = document.createElement("button");
            optionElement.setAttribute("value", option.value);
            optionElement.innerText = option.label;
            optionElement.addEventListener("click", ()=>{
                // console.debug("dispatch option-select");
                this.dispatchEvent(new CustomEvent(
                    "option-select", {detail: {
                        value: option.value
                    }}
                ));
            });
            // optionElement.setAttribute("onclick", "alert('click')");
            optionsListContainer.appendChild(optionElement);
        }
        console.debug("set options");
    }
    get options() {
        return this.internalOptions;
    }
    attributeChangedCallback(name: string, oldValue: any, newValue: any){
        // console.log("attributeChangedCallback");
        if (name === "selectedoptionindex"){
            // re-draw
            const selectedOptionIndex = parseInt(newValue);
            if (selectedOptionIndex < 0) return;
            for(const element of this.shadowRoot!.getElementById("options-list")!.getElementsByTagName("button")){
                element.className = "";
            }
            if (this.shadowRoot!.getElementById("options-list")!.getElementsByTagName("button").length > selectedOptionIndex){
                this.shadowRoot!.getElementById("options-list")!.getElementsByTagName("button")[selectedOptionIndex].className = "selected";
            }
        } else if (name === "theme"){
            this.renderAll();
            this.options = this.internalOptions;
        }
    }
}

export class TypeSelectView extends HTMLElement {
    shadowRoot: ShadowRoot = new ShadowRoot();
    Options: {[key: string] : any }[]= [
        {value: 0, label: "dog"},
        {value: 1, label: "cat"},
        {value: 2, label: "rabbit"},
    ];
    selectedOptionIndex: number = -1;
    static get observedAttributes() {
        return ["theme", "placeholder"];
    }
    attributeChangedCallback(name: string, oldValue: any, newValue: any){
        if (oldValue === newValue) return;
        if (name === "theme"){
            const style = this.shadowRoot.getElementById("root-style")!;
            const theme: string = newValue;
            this.shadowRoot.getElementById("select-view")!.setAttribute("theme", theme);
        if (theme === "dark"){
         style.textContent = `
        div#root {
        position: relative;
        display: flex;
        flex-direction: column;
        }
        div#sub {
          z-index: 1;
          position: absolute;
          top: 45px;
          width: calc(100% - 8px);
          margin: 0px 4px;
          border: 1px solid rgba(0, 0, 0, 0.7);
background-color: #333333;
        }
        button#create-new {
          text-align: start;
          background-color: #333333;
color: white;
          border: none;
          padding: 8px 4px;
        }
        button#create-new:hover {
          background-color: #505050;
        }
        .d-none { display: none; }
        .d-block { display: block;}
        div#sub.d-flex {
          display: flex; flex-direction: column;
          box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.3);
        }
        input#search {
          background-color: #303030;
          transition: border-color 0.1s;
          font-size: 1rem;
          margin: 4px 4px;
          border-radius: 0px;
          border: 2px solid #303030;
          padding: 8px 8px;
          outline: none;
color: white;
}    input#search:focus-visible {
border: 2px solid rgba(100, 170, 255, 0.7);
outline-width: 0;
}
input#search.selected {
color: #FF3311;
border-color: #FF3311;
}
`;
        } else {
 style.textContent = `
        div#root {
        position: relative;
        display: flex;
        flex-direction: column;
        }
        div#sub {
          z-index: 1;
          position: absolute;
          top: 45px;
          width: calc(100% - 8px);
          margin: 0px 4px;
          border: 1px solid #B0B0B0;
background-color: white;
        }
        button#create-new {
          text-align: start;
          background-color: #FFFFFF;
color: white;
          border: none;
          padding: 8px 4px;
          color:black;
          font-size: 1rem;
        }
        button#create-new:hover {
          background-color: #F0F0F0;
        }
        .d-none { display: none; }
        .d-block { display: block;}
        div#sub.d-flex {
          display: flex; flex-direction: column;
          box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.1);
        }
        input#search {
          background-color: #FFFFFF;
          transition: border-color 0.1s;
          font-size: 1rem;
          margin: 5px 5px;
          border-radius: 0px;
          border: 1px solid #707070;
          padding: 8px 8px;
          outline: none;
color: black;
}    input#search:focus-visible {
border: 2px solid rgba(100, 170, 255, 0.7);
margin: 4px;
outline-width: 0;
}
input#search.selected {
color: #FF3311;
border-color: #FF3311;
}
`;
        }
        }
    }
    constructor(){
        super();
        const shadow = this.attachShadow({mode: "open"});
        const style = document.createElement("style");
        style.setAttribute("id", "root-style");
        const theme: string = this.getAttribute("theme")!;
        if (theme === "dark"){
         style.textContent = `
        div#root {
        position: relative;
        display: flex;
        flex-direction: column;
        }
        div#sub {
          z-index: 1;
          position: absolute;
          top: 45px;
          width: calc(100% - 8px);
          margin: 0px 4px;
          border: 1px solid rgba(0, 0, 0, 0.7);
background-color: #333333;
        }
        button#create-new {
          text-align: start;
          background-color: #333333;
color: white;
          border: none;
          padding: 8px 4px;
        }
        button#create-new:hover {
          background-color: #505050;
        }
        .d-none { display: none; }
        .d-block { display: block;}
        div#sub.d-flex {
          display: flex; flex-direction: column;
          box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.3);
        }
        input#search {
          background-color: #303030;
          transition: border-color 0.1s;
          font-size: 1rem;
          margin: 4px 4px;
          border-radius: 0px;
          border: 2px solid #303030;
          padding: 8px 8px;
          outline: none;
color: white;
}    input#search:focus-visible {
border: 2px solid rgba(100, 170, 255, 0.7);
outline-width: 0;
}
input#search.selected {
color: #FF3311;
border-color: #FF3311;
}
`;
        } else {
 style.textContent = `
        div#root {
        position: relative;
        display: flex;
        flex-direction: column;
        }
        div#sub {
          z-index: 1;
          position: absolute;
          top: 45px;
          width: calc(100% - 8px);
          margin: 0px 4px;
          border: 1px solid #B0B0B0;
background-color: white;
        }
        button#create-new {
          text-align: start;
          background-color: #FFFFFF;
color: white;
          border: none;
          padding: 8px 4px;
          color:black;
          font-size: 1rem;
        }
        button#create-new:hover {
          background-color: #F0F0F0;
        }
        .d-none { display: none; }
        .d-block { display: block;}
        div#sub.d-flex {
          display: flex; flex-direction: column;
          box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.1);
        }
        input#search {
          background-color: #FFFFFF;
          transition: border-color 0.1s;
          font-size: 1rem;
          margin: 5px 5px;
          border-radius: 0px;
          border: 1px solid #707070;
          padding: 8px 8px;
          outline: none;
color: black;
}    input#search:focus-visible {
border: 2px solid rgba(100, 170, 255, 0.7);
margin: 4px;
outline-width: 0;
}
input#search.selected {
color: #FF3311;
border-color: #FF3311;
}
`;
        }
        const placeholder: string = this.getAttribute("placeholder") || "type here";
        shadow.innerHTML = `
        <div id="root">
          <form id="search-form" style="display: flex;">
            <input id="search" type="text" placeholder=${placeholder} style="width: 100%;" autocomplete="off"/>
          </form>
          <div id="sub" class="d-none">
            <custom-select-view id="select-view" theme=${theme}></custom-select-view>
            <button id="create-new">Create </button>
          </div>
        </div>
`;

        shadow.appendChild(style);
        const searchElement = shadow.getElementById("search")!;
        const searchFormElement = shadow.getElementById("search-form")!;
        searchElement.oninput = (event: Event) => {
            // console.log("oninput");
            this.onSearchInputChange((event.target as any).value);
        }
        searchElement.onkeydown = (event: KeyboardEvent) => {
            // console.log("on key down");
            const filteredOptions =  (this.shadowRoot.getElementById("select-view") as CustomSelectView).options;
            if (event.key === "ArrowUp") {
                this.selectedOptionIndex -= 1;
                if (this.selectedOptionIndex < 0) this.selectedOptionIndex = 0;
                if (this.selectedOptionIndex >= filteredOptions.length) this.selectedOptionIndex = filteredOptions.length - 1;
                // this.shadowRoot.getElementById("search").blur();
                // setTimeout(()=>{this.onFocus();}, 20);
                this.onFocus();
                this.shadowRoot.getElementById("select-view")!.setAttribute("selectedoptionindex", this.selectedOptionIndex.toString());
            } else if (event.key === "ArrowDown") {
                this.selectedOptionIndex += 1;
                if (this.selectedOptionIndex < 0) this.selectedOptionIndex = 0;
                if (this.selectedOptionIndex >= filteredOptions.length) this.selectedOptionIndex = filteredOptions.length - 1;
                // this.shadowRoot.getElementById("search").blur();
                this.onFocus();
                // setTimeout(()=>{this.onFocus();}, 20);
                this.shadowRoot.getElementById("select-view")!.setAttribute("selectedoptionindex", this.selectedOptionIndex.toString());
            } else if (event.key === "Escape") {
                this.onBlur();
            }
        }
        searchFormElement.onsubmit = (event: Event) => {
            this.onSearchFormSubmit();
            return false;
        }
        searchFormElement.onfocus = () => {this.onFocus()};
        searchElement.onfocus = () => {this.onFocus()};
        this.Options = [
            {value: 0, label: "dog"},
            {value: 1, label: "cat"},
            {value: 2, label: "rabbit"},
        ];
        searchElement.onblur = () => {
          // console.log("search blur");
          //this.onBlur();
        }
        searchFormElement.onblur = () => {
          // console.log("search form blur");
        }

        this.options = this.Options;
        this.onblur = ()=>{
          // console.log("this blur");
            setTimeout(() => {
                this.onBlur();
            }, 10);
          // this.onBlur()
        };
        this.onfocus = ()=>{this.onFocus()};
        const selectView = shadow.getElementById("select-view")!;
        selectView.addEventListener("option-select", ((event: CustomEvent) => {
          // console.debug("received option-select");
          // BUG: safariではinputにフォーカスがあったていると、クリックイベントが起きない。
            const selectedValue = (event.detail as any).value;
            this.onOptionSelected((selectedValue));
        }) as EventListener);
        // this.shadowRoot.getElementById("sub").setAttribute("style", "display: none;");
        this.shadowRoot.getElementById("sub")!.className = "d-none";
        const createNewButton = this.shadowRoot.getElementById("create-new")!;
        createNewButton.addEventListener("click", (event: Event) => {this.onCreateNewButtonClicked();});
        createNewButton.className = "d-none";
    }
    onSearchFormSubmit(){
        // create or set
        const selectView = (this.shadowRoot.getElementById("select-view") as CustomSelectView);
        if ((this.shadowRoot.getElementById("select-view") as CustomSelectView).options.length === 1){
            this.onOptionSelected(selectView.options[0]["value"]);
        } else if (this.selectedOptionIndex >= 0 && this.selectedOptionIndex <= this.Options.length){
            this.onOptionSelected(this.options[this.selectedOptionIndex]["value"]);
        } else {
            if (this.shadowRoot.getElementById("create-new")!.className === "d-block") {
                this.onCreateNewButtonClicked();
            }
        }
        this.onBlur();
    }
    onCreateNewButtonClicked(){
        const options = new Array(this.Options);
        const newOption: {[key: string] : any} = {
            "value": this.Options.length,
            "label": (this.shadowRoot.getElementById("search") as HTMLInputElement).value
        };
        // console.log(`options.length=${this.Options.length}`);
        // console.log(newOption);
        // options.push(newOption);
        this.Options.push(newOption);
        this.dispatchEvent(new CustomEvent(
            "selection-options-change", {
                detail: {
                    options: this.Options
                }
            }
        ));
        this.onOptionSelected(newOption.value);
    }
    onOptionSelected(value: any ){
        let label = "";
        let optionIndex = 0;
        for(const option of this.Options){
            if (option.value === value){
                label = option.label;
                this.selectedOptionIndex = optionIndex;
                this.shadowRoot.getElementById("select-view")!.setAttribute("selectedoptionindex", this.selectedOptionIndex.toString());
            }
            optionIndex += 1;
        }
        (this.shadowRoot.getElementById("search") as HTMLInputElement).value = label;
        this.dispatchEvent(new CustomEvent("type-select-change", {detail: {
            value: value
        }}));
        this.onBlur();
    }
    get currentLabel() {
        return (this.shadowRoot.getElementById("search") as HTMLInputElement).value;
    }
    onFocus(){
        // this.shadowRoot.getElementById("sub").setAttribute("style", "display: block;");
        // this.shadowRoot.getElementById("sub").setAttribute("style", "display: flex;");
        this.shadowRoot.getElementById("sub")!.className = "d-flex";
        this.shadowRoot.getElementById("search")!.focus();
    }
    onBlur(){
        // this.shadowRoot.getElementById("sub").setAttribute("style", "display: none;");
        this.shadowRoot.getElementById("search")!.blur();
        this.shadowRoot.getElementById("sub")!.className = "d-none";
    }
    setCreateNewButtonDisplay(filteredOptions: {[key: string]:string}[], searchQuery: string){
        const createNewButton = this.shadowRoot.getElementById("create-new")!;
        createNewButton.innerText = `Create: ${searchQuery}`;

        if (searchQuery === "") {
            createNewButton.className = "d-none";
            return;
        }
        if (filteredOptions.length > 1) {
            createNewButton.className = "d-block";
            return;
        } else if (filteredOptions.length === 1){
            if (filteredOptions[0]["label"] === searchQuery){
                createNewButton.className = "d-none";
                return;
            }
        }
        createNewButton.className = "d-block";

    }
    onSearchInputChange(searchQuery: string){
        const filteredOptions = this.Options.filter((option) => {
            return (option["label"] as string).includes(searchQuery);
        });
        (this.shadowRoot.getElementById("select-view") as CustomSelectView).options = filteredOptions;
        this.setCreateNewButtonDisplay(filteredOptions, searchQuery);
        // this.shadowRoot.getElementById("create-new").innerText = `新規作成: ${searchQuery}`;
    }
    set options(options: {[key: string] : any}[]){
        this.Options = options;
        (this.shadowRoot.getElementById("select-view") as CustomSelectView).options = options;
    }
    get options() {
        return this.Options;
    }
    set value(value: any) {
        for(const option of this.options){
            if (option["value"] === value){
                (this.shadowRoot.getElementById("search") as HTMLInputElement).value = option["label"];
            }
        }
    }
    set selected(selected: boolean) {
        // console.log("set selected");
        this.shadowRoot.getElementById("search")!.className = selected? "selected" : "not-selected";
    }
}
