import Select from './select.js'

const selectElements = document.querySelectorAll('[data-behaviour="custom"]')

selectElements.forEach(selectElement => {
     console.log(new Select(selectElement))
})

//const select = new Select(selectElement)

