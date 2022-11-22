const menu = document.querySelector('.menu')
const itemMenu = document.querySelector('.item-menu')
const content = document.querySelector('.content')
let courseApi = 'https://6367c751edc85dbc84db8620.mockapi.io/user'
let loginBtn = document.getElementById('login')






function openSearch(){
    const searchBtn = document.getElementById('search-btn')
    
    searchBtn.addEventListener('click', function(){
        this.parentElement.children[0].classList.toggle('open')
        this.parentElement.parentElement.classList.toggle('open')
        this.parentElement.children[1].classList.remove('open')
    })

    const searchInput = document.getElementById('search_input')
      searchInput.addEventListener('keydown',function(){
        this.parentElement.children[1].classList.add('open')
    })

    const heartBtn = document.getElementById("heart-btn")

    heartBtn.addEventListener('click',function(){
        this.parentElement.children[0].classList.toggle('open')
    })
}
openSearch()


function addFunction() {
    let popup = document.getElementById("add");
    popup.classList.toggle("show");
  }



itemMenu.addEventListener('click', ()=>{
    menu.classList.toggle('hide')
    content.classList.toggle('expand')
})

loginBtn.addEventListener('click',(e)=>{
    window.location.replace('./login/login.html')
})


fetch(courseApi)
  .then(response => response.json())
  .then(data => renderData(data))
  .catch(err => console.log(err))

function renderData(list) {
    let dataHTML=""
    for(let i =0; i < list.length ; i++){
        const {id, title, content, avatar} = list[i]    
        dataHTML+=`<div class="kho-trung">
        <img class="img" src="${avatar}" alt="">
        <div class="title">${title}</div>
        <div class="option">
            <div class="detail"><a href="./content/index.html?id=${id}">Chi tiết</a></div>
            <div class="favourite"><i class="fa-solid fa-heart"></i></div>
        </div>
    </div>`
    function addcart(productImg, productName){
        let addDiv = document.createElement("div")
        let divContent = `<img src="${productImg}" alt="">
        <div class="name-heart-item">${productName}</div>
        <div class="detail-heart"><a href="./content/index.html?id=${id}">Chi tiết</a></div>`
        addDiv.innerHTML =divContent
        let heartTable = document.querySelector(".heart-table")
        heartTable.append(addDiv)
    }
    }

    let row = document.querySelector('.stew')
    row.innerHTML += dataHTML

    let favourite = document.getElementsByClassName('favourite')

    for(let i=0; i < favourite.length; i++){
        favourite[i].addEventListener('click',function(){
            this.parentElement.children[1].classList.toggle('rate')
            let products = this.parentElement.parentElement
            let productImg = products.querySelector('img').src
            let productName = products.querySelector('.title').innerText
            addcart(productImg, productName)
        })
    }

}

fetch(courseApi)
  .then(response => response.json())
  .then(data => searchData(data))
  .catch(err => console.log(err))


function searchData(list){
    let products = document.querySelector('.search-content')
    products.innerHTML=""
    for(let i =0; i < list.length ; i++){
        const {id, title, content, avatar} = list[i]
        let newProduct = document.createElement('div')
        newProduct.classList.add('search-iteam')
        newProduct.innerHTML +=`
        <img src="${avatar}" alt="">
        <div class="name-item">${title}</div>
        <div class="detail"><a href="./content/index.html?id=${id}">Chi tiết</a></div>
        `

        products.appendChild(newProduct)
    }
}

let searchInput = document.getElementById('search_input')

searchInput.addEventListener('input',function(e){
    let txtSerach = e.target.value.trim().toLowerCase()
    let listProductDOM = document.querySelectorAll('.name-item')

    listProductDOM.forEach(list =>{
        
        if(list.innerText.toLowerCase().includes(txtSerach)){
            list.parentElement.classList.add('hide')
        }else{
            list.parentElement.classList.remove('hide')
        }
    })
})


document.addEventListener("DOMContentLoaded", function () {
    const carousels = document.querySelectorAll(".carousel");
    carousels.forEach(function (carousel) {
      const ele = carousel.querySelector("ul");
      const amountvisible = Math.round(
        ele.offsetWidth / ele.querySelector("li:nth-child(1)").offsetWidth
      );
      const bullets = carousel.querySelectorAll("ol li");
      const slides = carousel.querySelectorAll("ul li");
      const nextarrow = carousel.querySelector(".next");
      const prevarrow = carousel.querySelector(".prev");
  
      // Initialize the carousel
      nextarrow.style.display = "block";
      prevarrow.style.display = "block";
      ele.scrollLeft = 0;
      bullets[0].classList.add("selected");
      slides[0].classList.add("selected");
      if (amountvisible > 1) {
        var removeels = carousel.querySelectorAll(
          "ol li:nth-last-child(-n + " + (amountvisible - 1) + ")"
        );
        removeels.forEach(function (removeel) {
          removeel.remove();
        });
      }
  
      const setSelected = function () {
        bullets.forEach(function (bullet) {
          bullet.classList.remove("selected");
        });
        slides.forEach(function (slide) {
          slide.classList.remove("selected");
        });
        const scrolllength =
          carousel.querySelector("ul li:nth-child(2)").offsetLeft -
          carousel.querySelector("ul li:nth-child(1)").offsetLeft;
        const nthchild = Math.round(ele.scrollLeft / scrolllength + 1);
        carousel
          .querySelector("ol li:nth-child(" + nthchild + ")")
          .classList.add("selected");
        carousel
          .querySelector("ul li:nth-child(" + nthchild + ")")
          .classList.add("selected");
        if (carousel.parentElement.parentElement.querySelector(".dynamictitle")) {
          const title = carousel
            .querySelector("ul li:nth-child(" + nthchild + ") img")
            .getAttribute("title");
          if (title)
            carousel.parentElement.parentElement.querySelector(
              ".dynamictitle"
            ).innerHTML = title;
        }
      };
  
      const scrollTo = function (event) {
        event.preventDefault();
        ele.scrollLeft = ele.querySelector(this.getAttribute("href")).offsetLeft;
      };
  
      const nextSlide = function () {
        if (
          !carousel
            .querySelector("ol li:last-child")
            .classList.contains("selected")
        ) {
          carousel
            .querySelector("ol li.selected")
            .nextElementSibling.querySelector("a")
            .click();
        } else {
          carousel.querySelector("ol li:first-child a").click();
        }
      };
  
      const prevSlide = function () {
        if (
          !carousel
            .querySelector("ol li:first-child")
            .classList.contains("selected")
        ) {
          carousel
            .querySelector("ol li.selected")
            .previousElementSibling.querySelector("a")
            .click();
        } else {
          carousel.querySelector("ol li:last-child a").click();
        }
      };
  
      const setInteracted = function () {
        ele.classList.add("interacted");
      };
  
      // Attach the handlers
      ele.addEventListener("scroll", debounce(setSelected));
      ele.addEventListener("touchstart", setInteracted);
      ele.addEventListener("keydown", function (e) {
        if (e.key == "ArrowLeft") ele.classList.add("interacted");
        if (e.key == "ArrowRight") ele.classList.add("interacted");
      });
  
      nextarrow.addEventListener("click", nextSlide);
      nextarrow.addEventListener("mousedown", setInteracted);
      nextarrow.addEventListener("touchstart", setInteracted);
  
      prevarrow.addEventListener("click", prevSlide);
      prevarrow.addEventListener("mousedown", setInteracted);
      prevarrow.addEventListener("touchstart", setInteracted);
  
      bullets.forEach(function (bullet) {
        bullet.querySelector("a").addEventListener("click", scrollTo);
        bullet.addEventListener("mousedown", setInteracted);
        bullet.addEventListener("touchstart", setInteracted);
      });
  
      //setInterval for autoplay
      if (carousel.getAttribute("duration")) {
        setInterval(function () {
          if (
            ele != document.querySelector(".carousel:hover ul") &&
            ele.classList.contains("interacted") == false
          ) {
            nextarrow.click();
          }
        }, carousel.getAttribute("duration"));
      }
    }); //end foreach
  }); //end onload
  
  /**
   * Debounce functions for better performance
   * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
   * @param  {Function} fn The function to debounce
   */
  function debounce(fn) {
    // Setup a timer
    let timeout;
    // Return a function to run debounced
    return function () {
      // Setup the arguments
      let context = this;
      let args = arguments;
      // If there's a timer, cancel it
      if (timeout) {
        window.cancelAnimationFrame(timeout);
      }
      // Setup the new requestAnimationFrame()
      timeout = window.requestAnimationFrame(function () {
        fn.apply(context, args);
      });
    };
  }
  

