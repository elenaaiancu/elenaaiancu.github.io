

function fetchAndInsertFooter() {
    fetch('footercontent.html')
        .then(resp => {
            if (!resp.ok) {
                throw new Error('Network response was not ok');
            }
            return resp.text();
        })
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        })
        .catch(error => {
            console.error('Error fetching footer content:', error);
        });
}

document.addEventListener('DOMContentLoaded', () => {
  
    fetchAndInsertFooter();
});
