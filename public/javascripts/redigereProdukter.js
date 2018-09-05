document.addEventListener("DOMContentLoaded", (event) => {
    let redigerprodukt = document.querySelectorAll(".edit");
    redigerprodukt.forEach((element) => {
        element.addEventListener("click", (event) => {
            fetch("http://localhost:4500/produktinfo/" + element.dataset.id)
                .then((result) => { return result.json() })
                .then((data) => {
                    document.querySelector("#type1").value = data[0].type
                    document.querySelector("#navn1").value = data[0].navn
                    document.querySelector("#sværgrad1").value = data[0].sværhedsgrad
                    document.querySelector("#antal1").value = data[0].antal
                    document.querySelector("#pris1").value = data[0].pris
                    document.querySelector("#redigereProdukt").dataset.id = element.dataset.id

                })
        })
    })

    document.querySelector("#redigereProdukt").addEventListener("click", (event) => {
        event.preventDefault();
        let formdata = new FormData(document.querySelector("#form-redigere"));
        // let obj = JSON.stringify({
        //     url : document.querySelector("#url").value, 
        //     type : document.querySelector("#type").value,
        //     navn : document.querySelector("#navn").value,
        //     sværgrad : document.querySelector("#sværgrad").value,
        //     antal : document.querySelector("#antal").value,
        //     pris : document.querySelector("#pris").value

        // })
        fetch("http://localhost:4500/redigerprodukt/"+ event.target.dataset.id, {
            'method': 'put',
            "body": formdata,
            'mode': 'cors',
            'cache': 'default'
        })
            .then(() => {
                alert("tak");
                document.querySelector("#url").value = "";
                document.querySelector("#type").value = "";
                document.querySelector("#navn").value = "";
                document.querySelector("#sværgrad").value = "";
                document.querySelector("#antal").value = "";
                document.querySelector("#pris").value = "";

            })
    })
})
