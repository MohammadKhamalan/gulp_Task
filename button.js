
fetch('footer.html')
    .then(response => response.text())
    .then(footerContent => {
        document.getElementById('footerContainer').innerHTML = footerContent;

        const backButton = document.getElementById('backButton');
        backButton.style.backgroundColor='yellow';
        backButton.addEventListener('click', function () {
            window.location.href = 'index.html'; 
        });
        backButton.addEventListener('mouseover', function () {
            backButton.style.backgroundColor = 'orange';
        });
        backButton.addEventListener('mouseout', function () {
            backButton.style.backgroundColor = 'yellow';
        });
    });
