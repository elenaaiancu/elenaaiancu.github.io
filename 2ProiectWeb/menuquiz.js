function fetchAndInsertMenu() {
    fetch('menu.html')
        .then(resp => {
            if (!resp.ok) {
                throw new Error('Network response was not ok');
            }
            return resp.text();
        })
        .then(data => {
            document.getElementById('menuContent').innerHTML = data;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

document.addEventListener('DOMContentLoaded', () => {
    fetchAndInsertMenu();
});