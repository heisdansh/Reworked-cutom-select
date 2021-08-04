export default class Select {
    constructor(element) {
        this.element = element
        this.options = getFormattedOptions(element.querySelectorAll('option'))
        this.customElement = document.createElement('div')
        this.labelElement = document.createElement('span')
        this.optionsCustomElement = document.createElement('ul')
        setupCustomElement(this)
        element.style.display = "none"
        element.after(this.customElement)
    }

    get selectedOptionIndex() {
        return this.options.indexOf(this.selectedOption)
    }

    get selectedOption() {
        return this.options.find(option => option.selected)
    }

    selectValue(value) {
        const selected = ['bg-blue-600']
        const newSelectedOption = this.options.find(option =>{
            return option.value === value
        })
        const prevSelectedOption = this.selectedOption
        prevSelectedOption.selected = false
        prevSelectedOption.element.selected = false

        newSelectedOption.selected = true
        newSelectedOption.element.selected = true

        this.labelElement.innerText = newSelectedOption.label

        this.optionsCustomElement.querySelector(
            `[data-value="${prevSelectedOption.value}"]`
                ).classList.remove(...selected)
        const newCustomElement = this.optionsCustomElement.querySelector(`[data-value="${newSelectedOption.value}"]`)
        newCustomElement.classList.add(...selected)
        newCustomElement.scrollIntoView({block: 'nearest'})

    }
}
function setupCustomElement(select) {
    const customSelectContainer = ['cutom-select-container','box-border','flex','flex-col']
    const customSelectValue = ['cutom-select-value','box-border','bg-black','text-white','text-center','text-lg','font-bold','px-6','py-1','rounded-md','cursor-pointer','select-none','focus:border-4','focus:outline-none','border-2','border-white']
    const customSelectOptions = ['cutom-select-options','box-border','flex','flex-col','align-center','width-full','border-2','border-black','bg-red-400','rounded-b-md','max-h-24','overflow-auto','absolute/neveikia']
    const customSelectOption = ['custom-select-option','box-border','py-1','hover:bg-blue-300','cursor-pointer']
    const selected = ['bg-blue-600']
    select.customElement.classList.add(...customSelectContainer)
    select.customElement.tabIndex = 0
    //customselect konteineris ir jo kostumizacija
    select.labelElement.classList.add(...customSelectValue)
    select.labelElement.innerText = select.selectedOption.label
    select.customElement.append(select.labelElement)

    select.optionsCustomElement.classList.add(...customSelectOptions)
    select.options.forEach(option=>{
        const optionElement = document.createElement('li')
        optionElement.classList.add(...customSelectOption)
        optionElement.classList.toggle(...selected, option.selected)
        optionElement.innerText = option.label
        optionElement.dataset.value = option.value
        optionElement.addEventListener('click',()=>{
            select.selectValue(option.value)
            select.optionsCustomElement.classList.add('hidden')
        })
        select.optionsCustomElement.append(optionElement)
    })
    select.optionsCustomElement.classList.add('hidden')
    select.customElement.append(select.optionsCustomElement)

    select.labelElement.addEventListener('click',()=>{
        select.optionsCustomElement.classList.toggle('hidden')
    })

    select.customElement.addEventListener("blur",() => {
        select.optionsCustomElement.classList.add('hidden')
    })
    let debounceTimeout
    let searchTerm = ""
    select.customElement.addEventListener("keydown", e => {
        switch (e.code){
            case "Space":
                select.optionsCustomElement.classList.toggle('hidden')
                break
            case "ArrowUp":
                const prevOption = select.options[select.selectedOptionIndex - 1]
                if(prevOption){
                    select.selectValue(prevOption.value)
                }
                break
            case "ArrowDown":
                const nextOption = select.options[select.selectedOptionIndex + 1]
                if(nextOption){
                    select.selectValue(nextOption.value)
                }
                break
            case "Enter":
            case "Escape":
                select.optionsCustomElement.classList.add('hidden')
                break
            default:
                clearTimeout(debounceTimeout)
                searchTerm += e.key
                debounceTimeout = setTimeout(() => {
                    searchTerm = ""
                }, 500);

                const searchedOption = select.options.find(option =>{
                    return option.label.toLowerCase().startsWith(searchTerm)
                })

                if (searchedOption) select.selectValue(searchedOption.value)
        }
    })
}

function getFormattedOptions (optionElements) {
    return [...optionElements].map(optionElement => {
        return {
            value: optionElement.value,
            label: optionElement.label,
            selected: optionElement.selected,
            element: optionElement
        }
    })
}