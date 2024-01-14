
    const url = new URL('https://jsonplaceholder.typicode.com/users')

    fetch(url)
        .then(r => r.json())
        .then(users => {
            for (const user of users) {

                const userBlock = document.createElement("div");
                const htmlAnchorElement = document.createElement("a");
                const button = document.createElement("button");
                userBlock.classList.add('box');
                userBlock.innerHTML = `${user.id}) ${user.name}`;
                button.innerHTML = "User Info";
                htmlAnchorElement.href = 'user-details.html?id=' + `${user.id}`
                document.querySelector('.container').append(userBlock);
                userBlock.append(htmlAnchorElement)
                htmlAnchorElement.appendChild(button)
            }
        })
        .catch(error => {
            console.error('Error fetching users:', error);
        });


