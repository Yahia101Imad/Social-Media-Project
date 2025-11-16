const postId = localStorage.getItem('postId')
function showPost(postId) {
    axios.get(`https://tarmeezacademy.com/api/v1/posts/${postId}`)
    .then(response => {
        let currentPost = document.getElementById('currentPost')

        let comments = response.data.data.comments
        let commentsContent = ""

        if (comments.length > 0) {
            for (let i = 0; i < comments.length; i++) {
                commentsContent += `
                    <div class="mb-3">
                        <div class="d-flex">
                            <a class="navbar-brand" href="#">
                                <img class="rounded-circle mx-2" style="width: 20px" src="${comments[i].author.profile_image}">
                            </a>
                            <b>${comments[i].author.username}</b>
                        </div>
                        <p class="m-2">${comments[i].body}</p>
                    </div>
                `
            }
        } else {
            commentsContent = `<p class="text-center text-secondary">No comments yet</p>`
        }

        let content = `
            <div class="card my-5">
                <div class="card-header">
                    <a class="navbar-brand" href="#"><img class="rounded-circle mx-2" style="width: 30px" src="${response.data.data.author.profile_image}"></a>
                    <b>${response.data.data.author.username}</b>
                </div>
                <div class="card-body">
                    <img class="w-100" src="${response.data.data.image}">
                    <p class="text-secondary">${response.data.data.created_at}</p>
                    <h5 class="card-title">${response.data.data.title}</h5>
                    <p class="card-text">${response.data.data.body}</p>
                    <hr>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-right" viewBox="0 0 16 16"><path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z"/></svg>
                    <span class="mx-2">(${response.data.data.comments_count}) Comments</span>
                    <hr>
                    <div class="card p-2">
                        ${commentsContent}
                    </div>
                    <div class="card p-2 d-flex flex-row align-items-center gap-2 mt-2 border-0">
                        <input id="commentText" class="form-control" type="text">
                        <button class="btn btn-primary" onclick="sendComment()">Send</button>
                    </div>
                </div>
            </div>        
        `
        currentPost.innerHTML += content
    })
    .catch(error => {
    console.log(error)
    })
}
showPost(postId)

function sendComment() {
    let commentText = document.getElementById('commentText').value
    if (!commentText) return
    let commentAdded = {
        "body": commentText
    }

    axios.post(`https://tarmeezacademy.com/api/v1/posts/${postId}/comments`, commentAdded, {
    headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
    })
    .then(response => {
        location.reload()
        console.log(response.data)
    })
    .catch(error => {
        console.log(error)
    })
}
