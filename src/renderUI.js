//Получаем указатель на контейнер
let newsContainer = document.querySelector(".news-container .row");

//Устанавливаем указатель на контейнер
const setContainer = (cssString = ".news-container .row") => {
  newsContainer = document.querySelector(cssString);
  return newsContainer;
};

//выводит полученный список новостей
function renderNews(newsItems) {
  newsContainer.innerHTML = "";
  let fragment = "";
  
  newsItems.forEach(item => {
    const el = newsTemplate(item);
    fragment += el;
  });

  newsContainer.insertAdjacentHTML("afterbegin", fragment);
}

//подготавливает новость, оборачивает в шаблон
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

export { setContainer, renderNews };
