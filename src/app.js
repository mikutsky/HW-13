import * as news from "./newsAPI";
import * as render from "./renderUI";
import "./style.css";

//Функция формирует и отправляет запрос на сервер
function loadNews() {
  const selectCountry = document.querySelector("#country").value;
  const selectCategory = document.querySelector("#category").value;
  const inputQuery = document.querySelector("#query").value;

  if (inputQuery === "")
    news
      .topHeadlines(selectCountry, selectCategory)
      .then(value => render.renderNews(value))
      .catch(err => news.checkResponse(err));
  else
    news
      .everything(inputQuery)
      .then(value => render.renderNews(value))
      .catch(err => news.checkResponse(err));
}

//На элементы инициализируем скрипты,
document.addEventListener("DOMContentLoaded", function() {
  M.AutoInit();
  render.setContainer();
  loadNews();
});

//Устанавливаем событие на submit формы
document.forms[0].addEventListener("submit", el => {
  el.preventDefault();
  loadNews();
});
