const url = new URL('https://jsonplaceholder.typicode.com/users')

fetch(url)
    .then(r => r.json())
    .then(users => {
        for (const user of users) {
            createUserBlock(user)
        }
    })
    .catch(error => {
        console.error('Error fetching users:', error);
    });

function createUserBlock(user) {
    const userBlock = document.createElement("div");
    const button = document.createElement("button");
    userBlock.classList.add('box');
    userBlock.innerHTML = `${user.id}) ${user.name}`;
    button.innerHTML = "User Info";
    button.onclick = ()=>{
        window.location = 'user-details.html?id=' + `${user.id}`
    }
    document.querySelector('.container').append(userBlock);
    userBlock.append(button)
}
