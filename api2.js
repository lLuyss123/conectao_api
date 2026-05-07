const url_api = "https://rickandmortyapi.com/api/character"

async function requestData(url_api) {
    const response = await fetch(url_api);
    let data = await response.json();
    console.log(data);
    renderHtml(data);

    setAttributeCustom(data.info);
}

const response = requestData(url_api)

function renderHtml(data) {
    let lista = document.getElementById("character")
    lista.innerHTML = ""
    for (let index = 0; index < data.results.length; index++) {
        const result = data.results[index]
        let name = result.name
        let image = data.results[index].image
        let gender = data.results[index].gender
        lista.innerHTML += `<li>

            <img src="${image}">
            <h2>${name}</h2>
            <h3>${gender}</h3>

            </li>`
    }
}


function setAttributeCustom(info) {
    const buttonNext = document.getElementById("loadNextId");
    const buttonPrev = document.getElementById("loadPrevId");
    buttonNext.setAttribute("data-next", (info.next != null) ? info.next : "")
    buttonPrev.setAttribute("data-prev", (info.prev != null) ? info.prev : "")
}

/* function getAttributeCustom() {
    const buttonNext = document.getElementById("loadNextId");
    const buttonPrev = document.getElementById("loadPrevId");
    const next = buttonNext.getAttribute("data-next")
    const prev = buttonPrev.getAttribute("data-prev")
    const returnInfo = { next, prev }
    return returnInfo
}

function loadNext() {
    const infoNextPrev = getAttributeCustom();
    if (infoNextPrev.next != "") {
        requestData(infoNextPrev.next);
    }
}

function loadPrev() {
    const infoNextPrev = getAttributeCustom();
    if (infoNextPrev.prev != "") {
        requestData(infoNextPrev.prev);
    }
} */