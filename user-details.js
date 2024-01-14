const locationUrl = new URL(location.href);
const userId = locationUrl.searchParams.get('id');
const userInfoUrl = `https://jsonplaceholder.typicode.com/users/${userId}`;
const userPostsUrl = `${userInfoUrl}/posts`;
const button = document.getElementById('goToPostsButton');
const infoContainer = document.getElementById('infoContainer');
const postsContainer = document.getElementById('postsContainer');
const h2 = document.createElement("h2");


fetch(userInfoUrl)
    .then(response => response.json())
    .then(user => {
        function flatter(obj) {
            for (const key in obj) {
                const p = document.createElement('p');
                p.classList.add('userInfo')
                if (typeof obj[key] === 'object') {
                    flatter(obj[key]);
                } else {
                    p.innerText = `${key}: ${obj[key]}`;
                    infoContainer.appendChild(p);
                }
            }
        }

        flatter(user);
    })
    .catch(error => {
        console.error('Error fetching user info:', error);
    });

function getUserPosts() {
    fetch(userPostsUrl)
        .then(r => r.json())
        .then(posts => {
            postsContainer.innerHTML = '';
            h2.innerHTML = `User's ${userId} Posts`
            infoContainer.after(h2)
            posts.forEach(post => {

                const postBlock = document.createElement('div');
                const a = document.createElement('a');

                postBlock.classList.add('box');
                postBlock.innerText = post.title;
                a.href = 'post-details.html?id='+post.id

                a.appendChild(postBlock)
                postsContainer.appendChild(a);
            });
            postsContainer.scrollIntoView({behavior: 'smooth'});
        })
        .catch(error => {
            console.error('Error fetching user posts:', error);
        });
}

button.addEventListener('click', getUserPosts);














