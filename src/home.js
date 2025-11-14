let currentPage = 1
let isLoading = false

function getPosts() {
  if (isLoading) return 
  isLoading = true
  axios.get(`https://tarmeezacademy.com/api/v1/posts?limit=5&page=${currentPage}`)
  .then(response => {
      let posts = document.getElementById('posts')
      let postsCount = response.data.data.length - 1
      for (let i = 0; i <= postsCount; i++) {
          let content = `
              <div class="card my-5">
                  <div class="card-header">
                      <a class="navbar-brand" href="#"><img class="rounded-circle mx-2" style="width: 30px" src="${response.data.data[i].author.profile_image}"></a>
                      <b>${response.data.data[i].author.username}</b>
                  </div>
                  <div class="card-body" onclick="openPost()" style="cursor: pointer">
                      <img class="w-100" src="${response.data.data[i].image}">
                      <p class="text-secondary">${response.data.data[i].created_at}</p>
                      <h5 class="card-title">${response.data.data[i].title}</h5>
                      <p class="card-text">${response.data.data[i].body}</p>
                      <hr>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-right" viewBox="0 0 16 16"><path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z"/></svg>
                      <span class="mx-2">(${response.data.data[i].comments_count}) Comments</span>
                  </div>
              </div>        
          `
          posts.innerHTML += content
      }
  })
  .catch(error => {
    console.log(error)
  })
  .finally(() => {
    isLoading = false
  })
}
getPosts()

window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
    currentPage++
    getPosts(currentPage)
  }
})

const loginBtn = document.getElementById('login-btn')
const registerBtn = document.getElementById('register-btn')
const logoutBtn = document.getElementById('logout-btn')

const addPostBtn = document.getElementById('add-post-btn')

const loginModal = document.getElementById('loginModal')
const registerModal = document.getElementById('registerModal')

const loginSucceed =document.getElementById('login-succeed')
const loginFailed =document.getElementById('login-failed')
const registerSucceed =document.getElementById('register-succeed')
const registerFailed =document.getElementById('register-failed')

const navProfileImg = document.getElementById('nav-profile-img')
const navLogo = document.getElementById('nav-logo')

function loginUser() {
  const loginUsername = document.getElementById('login-username').value
  const loginPassword = document.getElementById('login-password').value

  axios.post('https://tarmeezacademy.com/api/v1/login', {
    "username": loginUsername,
    "password": loginPassword
  })
  .then(response => {
    localStorage.setItem('token', response.data.token)

    loginBtn.classList.add('d-none')
    registerBtn.classList.add('d-none')
    logoutBtn.classList.remove('d-none')
    logoutBtn.classList.add('d-block')

    addPostBtn.classList.remove('d-none')
    addPostBtn.classList.remove('d-block')

    navLogo.classList.add('d-none')
    navProfileImg.classList.remove('d-none')
    navProfileImg.classList.add('d-block')

    const modal = bootstrap.Modal.getInstance(loginModal)
    modal.hide()
    
    loginSucceed.classList.remove('d-none')
    loginSucceed.classList.add('d-block')
    setTimeout(function(){
      loginSucceed.classList.remove('d-block')
      loginSucceed.classList.add('d-none')
    }, 2000)
  })
  .catch(error => {
    console.log(error)
    const modal = bootstrap.Modal.getInstance(loginModal)
    modal.hide()
    loginFailed.classList.remove('d-none')
    loginFailed.classList.add('d-block')
    setTimeout(function(){
      loginFailed.classList.remove('d-block')
      loginFailed.classList.add('d-none')
    }, 2000)
  })
}

function registerUser() {
  const registerName = document.getElementById('register-name').value
  const registerUsername = document.getElementById('register-username').value
  const registerPassword = document.getElementById('register-password').value

  const params = {
    "name": registerName,
    "username": registerUsername,
    "password": registerPassword
  }
  axios.post('https://tarmeezacademy.com/api/v1/register', params)
  .then(response => {
    localStorage.setItem('token', response.data.token)

    loginBtn.classList.add('d-none')
    registerBtn.classList.add('d-none')
    logoutBtn.classList.remove('d-none')
    logoutBtn.classList.add('d-block')

    addPostBtn.classList.remove('d-none')
    addPostBtn.classList.remove('d-block')

    navLogo.classList.add('d-none')
    navProfileImg.classList.remove('d-none')
    navProfileImg.classList.add('d-block')

    const modal = bootstrap.Modal.getInstance(registerModal)
    modal.hide()

    registerSucceed.classList.remove('d-none')
    registerSucceed.classList.add('d-block')
    setTimeout(function(){
      registerSucceed.classList.remove('d-block')
      registerSucceed.classList.add('d-none')
    }, 2000)
  })
  .catch(error => {
    const modal = bootstrap.Modal.getInstance(registerModal)
    modal.hide()

    registerFailed.classList.remove('d-none')
    registerFailed.classList.add('d-block')
    
    const registerFailedAlert = document.getElementById('register-failed')
    registerFailedAlert.textContent = error.response.data.message

    setTimeout(function(){
      registerFailed.classList.remove('d-block')
      registerFailed.classList.add('d-none')
    }, 2000)
  })
}

logoutBtn.addEventListener('click', function() {
  loginBtn.classList.remove('d-none')
  loginBtn.classList.add('d-block')
  registerBtn.classList.remove('d-none')
  registerBtn.classList.add('d-block')
  logoutBtn.classList.remove('d-block')
  logoutBtn.classList.add('d-none')

  addPostBtn.classList.remove('d-block')
  addPostBtn.classList.add('d-none')

  navLogo.classList.remove('d-none')
  navLogo.classList.add('d-block')
  navProfileImg.classList.remove('d-block')
  navProfileImg.classList.add('d-none')
})

const createPostSucceed = document.getElementById('createPost-succeed')
const createPostFailed = document.getElementById('createPost-failed')

const postModal = document.getElementById('postModal')

function createPost() {
  const postTitle = document.getElementById('post-title').value
  const postBody = document.getElementById('post-body').value
  const postImage = document.getElementById('post-image').files[0]
  const token = localStorage.getItem('token')
  
  const formData = new FormData()
  formData.append("title" ,postTitle)
  formData.append("body" ,postBody)
  formData.append("image" ,postImage)

  const header = {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }

  axios.post('https://tarmeezacademy.com/api/v1/posts', formData, header)
  .then(function (response) {
    console.log(response)
    createPostSucceed.classList.remove('d-none')
    createPostSucceed.classList.add('d-block')

    setTimeout(function(){
      createPostSucceed.classList.remove('d-block')
      createPostSucceed.classList.add('d-none')
    }, 2000)

    const modal = bootstrap.Modal.getInstance(postModal)
    modal.hide()

    posts.innerHTML = ""
    getPosts()
  })
  .catch(function (error) {
      createPostFailed.textContent = error.response.data.message
      createPostFailed.classList.remove('d-none')
      createPostFailed.classList.add('d-block')

      setTimeout(function(){
        createPostFailed.classList.remove('d-block')
        createPostFailed.classList.add('d-none')
      }, 2000)

      const modal = bootstrap.Modal.getInstance(postModal)
      modal.hide()
  })
}

function openPost() {
  window.location.href = "./postPage.html"
}