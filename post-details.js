const locationUrl = new URL(location.href);
const postId = locationUrl.searchParams.get('id');
const infoContainer = document.getElementById('infoContainer');
const commentsContainer = document.getElementById('commentsContainer');
const postUrl = `https://jsonplaceholder.typicode.com/posts/${postId}`;
const commentsUrl = `https://jsonplaceholder.typicode.com/posts/${postId}/comments`;
const bckButton = document.getElementById('bck-to-usr');

function fetchData(url) {

    return fetch(url)
        .then(response => response.json());
}

Promise.all([fetchData(postUrl), fetchData(commentsUrl)])
    .then(([post, comments]) => {
        function flatter(obj, container, className) {
            for (const key in obj) {
                const p = document.createElement('p');
                p.classList.add(className);
                if (typeof obj[key] === 'object') {
                    flatter(obj[key], container, className);
                } else {
                    p.innerText = `${key}: ${obj[key]}`;
                    container.appendChild(p);
                }
            }
        }
        bckButton.href = 'user-details.html?id='+post.userId

        flatter(post, infoContainer, 'postInfo');

        comments.forEach(comment => {
            const commentBody = document.createElement('div');
            commentBody.classList.add('box')
            commentBody.innerHTML = '';
            commentBody.innerText = comment.body;

            commentsContainer.appendChild(commentBody);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });




