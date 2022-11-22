//DOM- truy cập lấy thẻ html
//id ,class


//cách lấy thẻ trong html
let loginForm = document.getElementById('login-form')
let loginBtn = document.getElementById('login-btn')
let errorMessage = document.getElementsByClassName('error-messager')
let back = document.querySelector('.back')

back.addEventListener('click', ()=>
{
    window.location.replace('../index.html')
})


loginBtn.addEventListener('click', (e) =>{
    //reset
    e.preventDefault()
    
    for(let i=0 ; i<errorMessage.length; i++)
        errorMessage[i].innerText = '';
    let user = "admin03"
    let userName = loginForm.userName.value
    let password = loginForm.password.value

    if(userName != user ){
        errorMessage[0].innerText = 'Tên tài khoản không chính xác'
        return;
    }
    if(password != 99999999){
        errorMessage[1].innerText = 'Mật khẩu không chính xác'
        return;
    }
    localStorage.userName = userName;
    window.location.replace('../admin/index.html')
    
})