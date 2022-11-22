let courseApi = 'https://6367c751edc85dbc84db8620.mockapi.io/user'


function getParameter(parameterName){
    let parameters = new URLSearchParams(window.location.search)
        return parameters.get(parameterName)
}

fetch(courseApi + `/${getParameter("id")}`)
  .then(response => response.json())
  .then(data => renderData(data))
  .catch(err => console.log(err))


function renderData(data){
  console.log(data);
  let dataHtml = ""
  dataHtml +=`
  <div class="head"></div>
  <div class="title">${data.title}</div>
  <div class="info">
      <img class="info-img" src="${data.avatar}" alt="">
      <div class="formula">
          <h2>Nguyên liệu</h2>
          <div class="ingredient">${data.formula}</div>
      </div>
  </div>
  <div class="guide">
      <h2>Hướng dẫn cách nấu</h2>
      <div class="guide-content">${data.content}</div>
  </div>
</div>`

let row = document.querySelector('.content')
row.innerHTML += dataHtml
}
