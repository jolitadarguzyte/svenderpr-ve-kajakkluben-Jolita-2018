document.addEventListener("DOMContentLoaded", (event) => {
    document.querySelector("#opretProdukt").addEventListener("click", (event) => {
        event.preventDefault();
        let formdata = new FormData(document.querySelector("#form-opret"));
        // let obj = JSON.stringify({
        //     url : document.querySelector("#url").value, 
        //     type : document.querySelector("#type").value,
        //     navn : document.querySelector("#navn").value,
        //     sværgrad : document.querySelector("#sværgrad").value,
        //     antal : document.querySelector("#antal").value,
        //     pris : document.querySelector("#pris").value
            
        // })
        fetch("http://localhost:4500/opretprodukter/", {
            'method': 'post',
            "body": formdata,
            'mode': 'cors',
            'cache': 'default'
        })
        .then(()=>{
            alert("tak");
            document.querySelector("#url").value="";
            document.querySelector("#type").value="";
            document.querySelector("#navn").value="";
            document.querySelector("#sværgrad").value="";
            document.querySelector("#antal").value="";
            document.querySelector("#pris").value="";
           
        })
    })
})

