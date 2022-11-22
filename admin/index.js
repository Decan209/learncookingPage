let listCourses = document.getElementById('list-courses')
let backBtn = document.getElementById('back') 




backBtn.addEventListener('click',(e)=>{
  window.location.replace('../index.html')
})

let courseApi = 'https://6367c751edc85dbc84db8620.mockapi.io/user'

function start(){
    getCourse(renderCourses)
    handle()
    // editCourses()
    clear()
}
start()

function getCourse(callback){
    fetch(courseApi)
    .then((response) => response.json())
    .then(callback)
}

function createCourse(data, callback){
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)
    }
    fetch(courseApi, options)
    .then((response) => response.json())
    .then(callback)
}

function deleteCourse(id){
    let options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify()
    }
    fetch(courseApi + '/' + id, options)
    .then((response) => response.json())
    .then(function() {
      let courseItem =  document.querySelector('.course-item-' + id)
      if (courseItem){
            courseItem.remove()
      }
    })
}

function renderCourses(courses){
    let htmls = courses.map(function(course){
        return ` 
            <li class="course-item-${course.id}">
                <h4>${course.title}</h4>
                <div class="formula">${course.formula}</div>
                <div class="content">${course.content}</div>
                <img src="${course.avatar}" alt="">
                <button onclick="deleteCourse(${course.id})" >Delete</button>
                <button  class="edit-btn">Edit</button>
            </li>`
    })
    listCourses.innerHTML = htmls.join('')

    let editBtn = document.getElementsByClassName('edit-btn')
      for (let i = 0; i < editBtn.length; i++){
      editBtn[i].addEventListener('click', (e)=>{
        let currentNode = e.target.parentNode.children
        let currentEditableValue = currentNode[0].getAttribute("contenteditable");
        if (currentEditableValue) {
          currentNode[0].removeAttribute("contenteditable");
          currentNode[1].removeAttribute("contenteditable");
          currentNode[2].removeAttribute("contenteditable");
  
          // Cập nhật dữ liệu lại - PUT
          console.log(currentNode[0].value)
          console.log(currentNode[1].value);
          console.log(currentNode[2].value);
          let updatedProduct = {
            title: currentNode[0].innerText,
            formula: currentNode[1].innerText,
            content: currentNode[2].innerText,
          };
          fetch(courseApi + `/${i + 1}`, {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
          });
        } else {
          currentNode[0].setAttribute("contenteditable", true);
          currentNode[1].setAttribute("contenteditable", true);
          currentNode[2].setAttribute("contenteditable", true);
        }
      });
    }
  }

function handle(){
    let addBtn = document.getElementById('add-btn')
    
    addBtn.addEventListener('click',(e)=>{
        let title =  document.querySelector('input[name = "title"]').value
        let formula =  document.querySelector('input[name = "formula"]').value
        let content =  document.querySelector('input[name = "content"]').value
        let fileUpload = document.getElementById("upload")

        const reader = new FileReader();
          // const { files } = e.target;
          // Encode the file using the FileReader API
          // const reader = new FileReader();
          reader.onloadend = () => {
            // Use a regex to remove data url part
            const base64String = reader.result
              // .replace("data:", "")
              // .replace(/^.+,/, "");
        
            // console.log(base64String);

            let formData ={
              title: title,
              formula: formula,
              content: content,
              avatar: base64String
          }
          createCourse(formData, function(){
              getCourse(renderCourses);
          })
          };
          reader.readAsDataURL(fileUpload.files[0]);
        });
}


function clear(){
  let til = document.getElementById('title').value
  let con = document.getElementById('content').value
  let formu = document.getElementById('formula').value
  til =""
  con=""
  formu=""

}

