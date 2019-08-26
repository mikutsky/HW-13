const apiKey = "a483e3dbc3fd4ca5a460d940ec87a00a";
const apiUrl = "https://newsapi.org/v2";

//проверяет полученный ответ, выводит сообщение об ошибке
const checkResponse = (err, res) => {
  if (err) {
    alert(err);
    return Promise.reject(err);
  }
  if (!res.articles.length) {
    alert("Новостей не найдено");
    return;
  }
  return res.articles;
};

//отправляет запрос на сервер
const request = async url => {
  try {
    const response = await fetch(url)
      .then(response => {
        if (!response.ok) {
          return Promise.reject(response);
        }
        return response.json();
      })
      .catch(err => checkResponse(err));
    return response;
  } catch (err) {
    return checkResponse(err);
  }
};

//возвращает ТОП новостей
const topHeadlines = (country = "ua", category = "general") =>
  request(
    `${apiUrl}/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`
  )
    .then(value => checkResponse(null, value))
    .catch(err => checkResponse(err));

//возвращает новости по запросу, на любую тематику
const everything = text =>
  request(`${apiUrl}/everything?q=${text}&apiKey=${apiKey}`)
    .then(value => checkResponse(null, value))
    .catch(err => checkResponse(err));

export { checkResponse, topHeadlines, everything };
