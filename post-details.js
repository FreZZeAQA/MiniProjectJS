const locationUrl = new URL(location.href);
const postId = locationUrl.searchParams.get('id');
const infoContainer = document.getElementById('infoContainer');
const commentsContainer = document.getElementById('commentsContainer');
const postUrl = `https://jsonplaceholder.typicode.com/posts/${postId}`;
const commentsUrl = `https://jsonplaceholder.typicode.com/posts/${postId}/comments`;
const bckButton = document.getElementById('bck-to-usr');

Promise.all([fetchData(postUrl), fetchData(commentsUrl)])
    .then(([post, comments]) => {
        bckButton.onclick = ()=> {window.location=`user-details.html?id=${post.userId}`}

        flatter(post);
        createCommentBlock(comments)
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

function fetchData(url) {
    return fetch(url)
        .then(response => response.json());
}

function flatter(obj) {
    for (const key in obj) {
        const p = document.createElement('p');
        p.classList.add('postInfo');
        if (typeof obj[key] === 'object') {
            flatter(obj[key]);
        } else {
            p.innerText = `${key}: ${obj[key]}`;
            infoContainer.appendChild(p);
        }
    }
}

function createCommentBlock(comments) {
    comments.forEach(comment => {
        const commentBody = document.createElement('div');
        commentBody.classList.add('box')
        commentBody.innerHTML = '';
        commentBody.innerText = comment.body;
        commentsContainer.appendChild(commentBody);
    });
}

