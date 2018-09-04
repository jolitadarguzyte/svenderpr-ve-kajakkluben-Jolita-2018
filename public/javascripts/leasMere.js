document.addEventListener("DOMContentLoaded", () => {
    let shortText = document.querySelectorAll('.shortText')
    shortText.forEach((element) => {
        let text = element.textContent;
        element.textContent = element.textContent.slice(0, 200)
        let a = document.createElement("a");
        a.className = "knapLæs"
        a.textContent = "Læs mere...";
        let a2 = document.createElement("a");
        a2.textContent = "Læs mindre";
        a2.className ="knapLæs"
        let dots = document.createTextNode("...");
        element.appendChild(dots);
        element.appendChild(a);
        //shows the #more
    a.addEventListener("click", () => {
        element.textContent = text;
        element.appendChild(a2);

    })
    a2.addEventListener("click", () => {
        element.textContent = text.slice(0, 200)
        element.appendChild(dots);
        element.appendChild(a);
    })
    })
    // let text = shortText.textContent;

    // shortText.textContent = text.slice(0, 148);

    
})
