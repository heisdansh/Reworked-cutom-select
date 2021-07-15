class Select {
    constructor(element) {
        document.addEventListener("keydown", (e) => { return console.log(e) });
        this.element = element;
        this.randomIdentifier = Math.random().toString(36).substring(7);
        this.options = [];
        for (var i = 0; i <= element.options.length - 1; i++) {
            var liElement = document.createElement("li");
            this.options[i] = { 
                label: element.options[i].text, value: element.options[i].value, element: liElement, selected: element.options[i].selected };
        }

        let selectedOption = this.options.find(item => item.selected === true);
        let nameBox = document.createElement("div");
        nameBox.innerHTML = selectedOption.label

        nameBox.setAttribute("id", "nameBox__"+this.randomIdentifier);
        nameBox.setAttribute(
            "class",
            "h-14 w-64 bg-blue-800 rounded text-2xl text-white overflow-auto text-center"
        );
        nameBox.setAttribute(
            "onclick",
            "document.getElementById('"+"generatedList__"+this.randomIdentifier+"').style.visibility = 'visible'; document.getElementById('"+"generatedList__"+this.randomIdentifier+"').setAttribute('value','active'); this.innerHTML = '';  isOn=true;"
        );
        let selectionBox = document.createElement("ul");
        selectionBox.setAttribute("id","generatedList__"+ this.randomIdentifier);
        selectionBox.setAttribute("value", "inactive");
        selectionBox.setAttribute(
            "class",
            "h-16 w-64 bg-red-400 rounded text-xl text-center text-white overflow-auto"
        );
        selectionBox.setAttribute("style", "visibility:hidden");
        //ul.setAttribute("onclick", "isOn=true;");
        this.options.forEach((option) => {
            var li = document.createElement("li");
            li.setAttribute(
                "onclick",
                "document.getElementById('"+"nameBox__"+this.randomIdentifier+"').innerHTML=this.innerHTML; document.getElementById('"+"generatedList__"+this.randomIdentifier+"').style.visibility = 'hidden'; document.getElementById('"+"generatedList__"+this.randomIdentifier+"').setAttribute('value','inactive'); alert(document.getElementById('"+"generatedList__"+this.randomIdentifier+"').getAttribute('value')+'and'+optionCache); isOn=false;"
            );
            li.setAttribute("class", "hover:bg-red-600");
            li.appendChild(document.createTextNode(option.label));
            selectionBox.appendChild(li);
            //offerTable.style.visibility = "visible";
        });
        this.element.parentNode.insertBefore(nameBox, this.element);
        this.element.parentNode.insertBefore(selectionBox, this.element);
    }

    static greet() {
        console.log("Zdare");
    }
}

Select.greet();

let customSelectElements = document.querySelectorAll(
    'select[data-behaviour="custom"]'
);
customSelectElements.forEach((selectElement) => {
    let customSelect = new Select(selectElement);
    selectElement.remove();
});

//raidziu handleris
let isOn = false;
let getActive;
let getOptions;
let textCache;

document.addEventListener("keydown", postMatching);

function postMatching(e) {
    if (isOn == true) {
        getActive = document.querySelector("ul[value='active']");
        getOptions = getActive.querySelectorAll("li");
        if (e.code.startsWith("Key") == true) {
            textCache = ` ${e.code}`.charAt(` ${e.code}`.length - 1);
            for(var i=0; i<=getOptions.length-1; i++)
            {
                if(getOptions[i].innerHTML.startsWith(textCache) === true)
                {
                    getOptions[i].scrollIntoView(true);
                    break;
                }
            }
            //getOptions.find(option => option.innerHTML.startsWith(textCache))
        }
    }
}