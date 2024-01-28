document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('github-form');
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const searchInput = document.getElementById('search').value;
        fetch(`https://api.github.com/search/users?q=${searchInput}`)
        .then(response => response.json())
        .then(data => {
            const userList = document.getElementById('user-list');
            userList.innerHTML = ''
            data.items.forEach(user => {
                const userItem = document.createElement('li');

                const profileLink = document.createElement('a');
                profileLink.href = user.html_url;
                profileLink.target = '_blank';
                profileLink.textContent = user.login;

                const avatar = document.createElement('img');
                avatar.src = user.avatar_url
                avatar.alt = `${user.log}'s avatar`;

                userItem.appendChild(profileLink);
                userItem.appendChild(avatar);

                const reposList = document.createElement('ul')

                userItem.addEventListener('click', () => {
                    fetch(user.repos_url)
                    .then(response => response.json())
                    .then(reposData => {
                        reposList.innerHTML = '';

                        reposData.forEach(repo => {
                            const repoItem = document.createElement('li');
                            const repoLink = document.createElement('a');
                            repoLink.href = repo.html_url;
                            repoLink.target = '_blank';
                            repoLink.textContent = repo.name;

                            repoItem.appendChild(repoLink);
                            reposList.appendChild(repoItem);
                        })
                    });
                    userItem.appendChild(reposList);
                });

                userList.appendChild(userItem);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        })
    })
})