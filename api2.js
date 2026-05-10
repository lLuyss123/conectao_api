const url_api = "https://rickandmortyapi.com/api/character";
let page_number = 1;
const pagehtml = document.getElementById("paginacion");
let data2;
const btnLoadNext = document.getElementById("loadNextId");
const btnLoadPrev = document.getElementById("loadPrevId");
async function requestData(url_api) {
  const response = await fetch(url_api);
  let data = await response.json();

  renderHtml(data);
  setAttributeCustom(data.info);
  gender(data.results);
  console.log(data);

  pagehtml.innerText = `Estás en la página: ${page_number}`;
  data2 = data;
  if (page_number == 1) {
    btnLoadPrev.disabled = true;
    btnLoadNext.disabled = false;
  } else if (page_number == data.info.pages) {
    btnLoadPrev.disabled = false;
    btnLoadNext.disabled = true;
  } else {
    btnLoadPrev.disabled = false;
    btnLoadNext.disabled = false;
  }
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
    const result = data.results[index];
    let name = result.name;
    let image = data.results[index].image;
    let gender = data.results[index].gender;
    let specie = data.results[index].species;
    if (genero == null) {
      lista.innerHTML += `<li>
            <img src="${image}">
            <h2>${name}</h2>
            <h3>${specie}</h3>
            <spam> ${specie == "Human" ? "🌍" : "🪐"} </spam
            </li>`;
    } else if (data.results[index].gender == genero) {
      lista.innerHTML += `<li>
            <img src="${image}">
            <h2>${name}</h2>
            <h3>${gender}</h3>
            <spam> ${specie == "Human" ? "🌍" : "🪐"} </spam
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

function throttle(func, limit = 2000) {
  let inThrottle = true;
  return function () {
    if (inThrottle) {
      func.apply(this, arguments);
      inThrottle = false;
      setTimeout(() => (inThrottle = true), limit);
    }
  };
}

const loadNext = throttle(() => {
  const infoNextPrev = getAttributeCustom();
  if (infoNextPrev.next != "") {
    requestData(infoNextPrev.next);
    page_number += 1;
  }
}, 2000);

const loadPrev = throttle(() => {
  const infoNextPrev = getAttributeCustom();
  if (infoNextPrev.prev != "") {
    requestData(infoNextPrev.prev);
    page_number -= 1;
  }
}, 2000);

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
