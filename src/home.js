axios.get('https://tarmeezacademy.com/api/v1/posts')
  .then(response => {
    let posts = document.getElementById('posts')
    let postsCount = response.data.data.length - 1
    for (let i = 0; i <= postsCount; i++) {
        let content = `
            <div class="card my-5">
                <div class="card-header">
                    <a class="navbar-brand" href="#"><img class="rounded-circle mx-2" style="width: 30px" src="${response.data.data[1].author.profile_image}"></a>
                    <b>${response.data.data[i].author.name}</b>
                </div>
                <div class="card-body">
                    <img class="w-100" src="${response.data.data[i].image}">
                    <p class="text-secondary">${response.data.data[i].created_at}</p>
                    <h5 class="card-title">${response.data.data[1].title}</h5>
                    <p class="card-text">${response.data.data[1].body}</p>
                    <hr>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-right" viewBox="0 0 16 16"><path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z"/></svg>
                    <span class="mx-2">(${response.data.data[1].comments_count}) Comments</span>
                </div>
            </div>        
        `
        posts.innerHTML += content
    }

  })
  .catch(error => {
    console.log(error)
  })