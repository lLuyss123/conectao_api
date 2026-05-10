const url_api = "https://rickandmortyapi.com/api/character";
let page_number = 1;
const pagehtml = document.getElementById("paginacion");
let data2;
async function requestData(url_api) {
  const response = await fetch(url_api);
  let data = await response.json();

  renderHtml(data);
  setAttributeCustom(data.info);
  gender(data.results);

  pagehtml.innerText = `Estás en la página: ${page_number}`;
  data2 = data;
}


const response = requestData(url_api);


const selecionar = document.getElementById("opciones");
selecionar.addEventListener("click", () => {
  if (selecionar.value == "none") {
    renderHtml(data2);
  } else {
    renderHtml(data2, selecionar.value);
  }
});

function renderHtml(data, genero = null) {
  let lista = document.getElementById("character");
  lista.innerHTML = "";
  for (let index = 0; index < data.results.length; index++) {
    if (genero == null) {
      const result = data.results[index];
      let name = result.name;
      let image = data.results[index].image;
      let gender = data.results[index].gender;
      lista.innerHTML += `<li>

            <img src="${image}">
            <h2>${name}</h2>
            <h3>${gender}</h3>

            </li>`;
    } else if (data.results[index].gender == genero) {
      const result = data.results[index];
      let name = result.name;
      let image = data.results[index].image;
      let gender = data.results[index].gender;
      lista.innerHTML += `<li>

            <img src="${image}">
            <h2>${name}</h2>
            <h3>${gender}</h3>

            </li>`;
    }
  }
}

function setAttributeCustom(info) {
  const buttonNext = document.getElementById("loadNextId");
  const buttonPrev = document.getElementById("loadPrevId");
  buttonNext.setAttribute("data-next", info.next != null ? info.next : "");
  buttonPrev.setAttribute("data-prev", info.prev != null ? info.prev : "");
}

function getAttributeCustom() {
  const buttonNext = document.getElementById("loadNextId");
  const buttonPrev = document.getElementById("loadPrevId");
  const next = buttonNext.getAttribute("data-next");
  const prev = buttonPrev.getAttribute("data-prev");
  const returnInfo = { next, prev };
  return returnInfo;
}

function loadNext() {
  const infoNextPrev = getAttributeCustom();
  if (infoNextPrev.next != "") {
    requestData(infoNextPrev.next);
    page_number += 1;
  }
}

function loadPrev() {
  const infoNextPrev = getAttributeCustom();
  if (infoNextPrev.prev != "") {
    requestData(infoNextPrev.prev);
    page_number -= 1;
  }
}

function gender(result) {
  const generos = [];
  for (const element of result) {
    generos.push(element.gender);
  }
  const set = new Set(generos);
  const generoshtml = document.getElementById("opciones");
  generoshtml.innerHTML = `<option value="none" id="none">All</option>`;
  let i = 1;
  for (const element of set) {
    generoshtml.innerHTML += `<option value="${element}" id="option${i}"> ${element}</option>`;
    i = i + 1;
  }
}
