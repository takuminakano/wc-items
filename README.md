# WC items
[Link to demo](https://takuminakano.github.io/wc-items)

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
### tab-select
```html
<tab-select labels='["Dog", "Cat", "Bird"]'></tab-select>
```
### switch-component
```html
<switch-component></switch-component>
```
