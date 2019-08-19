// import request from './newHTTP';
import * as http from "./newHTTP";

// console.log(http.apiKey)

//Модуль для работы с новостным API
const newsService = (function() {
  return {
    topHeadlines(country = "ua", category = "general", cb) {
      http.request(
        `${
          http.apiUrl
        }/top-headlines?country=${country}&category=${category}&apiKey=${
          http.apiKey
        }`,
        cb
      );
    },
    everything(text, cb) {
      http.request(
        `${http.apiUrl}/everything?q=${text}&apiKey=${http.apiKey}`,
        cb
      );
    }
  };
})();

//Функция формирует и отправляет запрос на сервер, по параметрам указанным
//пользователем в форме
function loadNews() {
  const selectCountry = document.querySelector("#country").value;
  const selectCategory = document.querySelector("#category").value;
  const inputQuery = document.querySelector("#query").value;

  if (inputQuery === "")
    newsService.topHeadlines(selectCountry, selectCategory, onGetResponse);
  else newsService.everything(inputQuery, onGetResponse);
}

//Функция-обработчик полученного ответа от сервера
function onGetResponse(err, res) {
  if (err) {
    alert(err);
    return;
  }

  if (!res.articles.length) {
    alert("Новостей не найдено");
    return;
  }

  renderNews(res.articles);
}

//Функция выводит полученный список новостей
function renderNews(newsItems) {
  let fragment = "";

  newsItems.forEach(item => {
    const el = newsTemplate(item);
    fragment += el;
  });

  newsContainer.insertAdjacentHTML("afterbegin", fragment);
}

//Функция подготавливает полученную новость, оборачивает в шаблон
function newsTemplate({ url, title, description, urlToImage } = {}) {
  return `
    <div class="col s12">
      <div class="card">
        <div class="card-image">
          <img src="${urlToImage}">
          <span class="card-title">${title || ""}</span>
        </div>
        <div class="card-content">
          <p>${description || ""}</p>
        </div>
        <div class="card-action">
          <a href="${url}">Read more</a>
        </div>
      </div>
    </div>
  `;
}

//Получаем указатели на элементы инициализируем скрипты,
//загружаем стартовые новости
const newsContainer = document.querySelector(".news-container .row");
document.addEventListener("DOMContentLoaded", function() {
  M.AutoInit();
  loadNews();
});

//Устанавливаем событие на submit формы
document.forms[0].addEventListener("submit", el => {
  el.preventDefault();

  newsContainer.innerHTML = "";
  loadNews();
});
