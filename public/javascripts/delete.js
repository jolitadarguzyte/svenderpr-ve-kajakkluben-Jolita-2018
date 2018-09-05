document.addEventListener("DOMContentLoaded", (event) => {
    let id;
    let deleteprodukt = document.querySelectorAll(".delete");
    deleteprodukt.forEach((element) => {
        element.addEventListener("click", (event) => {
            event.preventDefault();
            fetch("http://localhost:4500/deletprodukt/" + element.dataset.id, {
                'method': 'delete',
                'headers': {
                    'Content-Type': 'application/json'
                },
                'mode': 'cors',
                'cache': 'default'
            })
            .then(() => window.location.reload())
        })
    })
})