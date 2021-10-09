# WC items
[Link to demo](https://takuminakano.github.io/wc-items)

<iframe width="100px" height="200px" src="https://takuminakano.github.io/wc-items"></iframe>

## Usage
1. `npm i --save takuminakano/wc-items`
2. setup webpack (`ts-loader` is required)
## Exposed web components
### `<type-select-view>`
Usage:
```html
<type-select-view theme="light"></type-select-view>
<type-select-view theme="dark"></type-select-view>
```
### button-component
```html
<button-component label="Sample Button" style="display: inline-block"></button-component>
<button-component label="Sample Button" theme="bg-transparent" style="display: inline-block;" onclick="alert('click')"></button-component>
```
