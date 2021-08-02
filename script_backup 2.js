class Select {
    constructor(element) {
        document.addEventListener("keydown", (e) => { return console.log(e) });
        this.element = element;
        this.options = [];
        for (var i = 0; i <= element.options.length - 1; i++) {
            var liElement = document.createElement("li");
            this.options[i] = { 
                label: element.options[i].text, value: element.options[i].value, element: liElement, selected: element.options[i].selected };
        }
        this.eventlistener = {}

        let selectedOption = this.options.find(item => item.selected === true);
        let nameBox = document.createElement("div");
        nameBox.innerHTML = selectedOption.label
        nameBox.setAttribute("id", "nameBox");
        nameBox.setAttribute(
            "class",
            "h-14 w-64 bg-blue-800 rounded text-2xl text-white overflow-auto text-center"
        );
        nameBox.setAttribute(
            "onclick",
            "document.getElementById('generatedList').style.visibility = 'visible'; document.getElementById('generatedList').setAttribute('value','active'); this.innerHTML = '';  isOn=true;"
        );
        let selectionBox = document.createElement("ul");
        selectionBox.setAttribute("id", "generatedList");
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
                "document.getElementById('nameBox').innerHTML=this.innerHTML; document.getElementById('generatedList').style.visibility = 'hidden'; document.getElementById('generatedList').setAttribute('value','inactive'); alert(document.getElementById('generatedList').getAttribute('value')+'and'+optionCache); isOn=false;"
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
            //const result = getOptions.filter(element => element.innerHTML.toString().startsWith(textCache) === true);
            //getOptions.forEach(element => element.value.startsWith(textCache) === true);
            alert(textCache);
            //getOptions.forEach(element => {alert(element.innerHTML); if(element.innerHTML.startsWith(textCache) === true){alert('yay'); element.scrollIntoView(true);}});
            for(var i=0; i<=getOptions.length-1; i++)
            {
                alert(getOptions[i].innerHTML);
                if(getOptions[i].innerHTML.startsWith(textCache) === true)
                {
                    alert('yay'); 
                    getOptions[i].scrollIntoView(true);
                    break;
                }
            }
        }
    }
}

   //priimu selecta, gaunu raide is keyb, palyginu raide su
   //visais masyvo nariais, prafiltruoju ir atskrolinu i ta vieta

/*function stringStartComparer(element) {
    alert(optionCache);
    if (element.innerHTML.toString().startsWith(textCache) == true) {
        var li = document.createElement("li");
        li.setAttribute(
            "onclick",
            "document.getElementById('nameBox').innerHTML=this.innerHTML; document.getElementById('generatedList').style.visibility = 'hidden'; document.getElementById('generatedList').setAttribute('value','inactive'); alert(document.getElementById('generatedList').getAttribute('value')+'and'+optionCache); getActive.innerHTML = ''; optionCache.forEach(rebuildList); isOn=false;"
        );
        li.setAttribute("class", "hover:bg-red-600");
        li.appendChild(document.createTextNode(element.innerHTML.toString()));
        getActive.appendChild(li);
    }
}*/
