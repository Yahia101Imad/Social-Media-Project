const profileCard = document.getElementById('profileCard')
const userId = localStorage.getItem('userId')

axios.get(`https://tarmeezacademy.com/api/v1/users/${userId}`)
.then(response => {
  let content = `
    <div class="d-flex align-items-center p-4 bg-white rounded shadow-sm">
        <img src="../images/Profile-img.jpg" 
        class="rounded-circle border" 
        style="width: 120px; height: 120px; object-fit: cover;">
        <div class="ms-4">
            <p class="mb-1 text-muted">${response.data.data.email}</p>
            <p class="mb-1 fw-bold fs-5">${response.data.data.name}</p>
            <p class="mb-0 text-secondary">${response.data.data.username}</p>
        </div>
        <div class="d-flex ms-auto">
            <div class="text-center me-4 p-2 bg-light rounded" style="cursor: pointer" onclick="getUserPosts()">
                <h5 class="mb-1">${response.data.data.posts_count}</h5>
                <small class="text-muted">Posts</small>
            </div>
            <div class="text-center p-2 bg-light rounded">
                <h5 class="mb-1">${response.data.data.comments_count}</h5>
                <small class="text-muted">Comments</small>
            </div>
        </div>
    </div>
  `

  profileCard.innerHTML += content
})
.catch(error => {
  console.log(error)
})

function getUserPosts() {
    axios.get(`https://tarmeezacademy.com/api/v1/users/${userId}/posts`)
    .then(response => {
        let profileUserPosts = document.getElementById('profileUserPosts')
        profileUserPosts.innerHTML = ''
        let postsCount = response.data.data.length - 1
        for (let i = 0; i <= postsCount; i++) {
            let content = `
                <div class="card my-5">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <div>
                            <a class="navbar-brand" href="#">
                                <img class="rounded-circle mx-2" style="width: 30px" 
                                    src="${response.data.data[i].author.profile_image}">
                            </a>
                            <b>${response.data.data[i].author.username}</b>
                        </div>
                        <div>
                            <button class="btn btn-sm btn-outline-primary me-2" data-bs-toggle="modal" data-bs-target="#postModal" onclick="editPostModal(${response.data.data[i].id})">
                                <i class="bi bi-pencil">Edit</i>
                            </button>

                            <button class="btn btn-sm btn-outline-danger" onclick="deletePost(${response.data.data[i].id})">
                                <i class="bi bi-trash">Delete</i>
                            </button>
                        </div>

                    </div>
                    <div class="card-body" onclick="openPost(${response.data.data[i].id})" style="cursor: pointer">
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
            profileUserPosts.innerHTML += content
      }
    })
    .catch(error => console.log(error))
}

// ⚠ This code Does not work

// let currentPostId = null

// function editPostModal(postId) {
//     currentPostId = postId
//     axios.get(`https://tarmeezacademy.com/api/v1/posts/${postId}`)
//     .then(response => {
//         const post = response.data.data
        
//         document.getElementById('post-title').value = post.title
//         document.getElementById('post-body').value = post.body
//         document.getElementById('current-post-image').src = post.image
//     })
//     .catch(error => console.log(error))
// }


// function editPost() {
//     let title = document.getElementById("post-title").value
//     let body = document.getElementById("post-body").value
//     let image = document.getElementById("current-post-image").files[0]

//     let formData = new FormData()
//     formData.append("title", title)
//     formData.append("body", body)

//     if (image) {
//         formData.append("image", image)
//     }

//     formData.append("_method", "put")

//     let headers = {
//         headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//             "Content-Type": "multipart/form-data"
//         }
//     }

//     axios.post(`https://tarmeezacademy.com/api/v1/posts/${currentPostId}`, formData, headers)
//     .then(() => {
//         alert("Post Updated Successfully!")
//         const myModal = bootstrap.Modal.getInstance(document.getElementById("postModal"));
//         myModal.hide()
//         getUserPosts()
//     })
//     .catch(err => {
//         console.log(err)
//     })
// }

function deletePost(postId) {
    console.log(postId)
    axios.delete(`https://tarmeezacademy.com/api/v1/posts/${postId}`, {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
    })
    .then(response => {
        getUserPosts()
    })
    .catch(error => {
        console.log(error)
    })
}