const apiKey = 'jt6ghXYH0KYWTi1e52qfZYbB8pc5zjZ40i4k475n5Ho';
const apiUrl = 'https://api.unsplash.com/search/photos';

document.addEventListener('DOMContentLoaded', () => {
    const searchbtn = document.querySelector('.searchbtn');
    searchbtn.addEventListener('click', () => {
        const query = document.getElementById('searchbar').value;
        searchImages(query);
    });

    let page = 1;

    async function searchImages(query) {
        const imageGallery = document.querySelector('.imageGallery');
        let showmoreContainer;

        const url = `${apiUrl}?query=${query}&client_id=${apiKey}&page=${page}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            const parsedResponse = data;
            displayImages(parsedResponse.results);
            page++;
        } catch (error) {
            console.error('Error Occurred when fetching images:', error);
        }
    }

    function displayImages(images) {
        const imageGallery = document.querySelector('.imageGallery');

        images.forEach(image => {
            const divElement = document.createElement('div');
            divElement.classList.add('image-container');

            const imgElement = document.createElement('img');
            imgElement.classList.add('image');
            imgElement.src = image.urls.small;
            imgElement.alt = image.alt_description;

            imgElement.setAttribute('data-description', image.alt_description);
            imgElement.setAttribute('data-url', image.links.html);

            divElement.appendChild(imgElement);
            imageGallery.appendChild(divElement);
        });

        const showmoreContainer = document.createElement('div');
        showmoreContainer.classList.add('showmore-container');

        const showmorebtn = document.createElement('button');
        showmorebtn.textContent = 'Show More';
        showmoreContainer.appendChild(showmorebtn);
        imageGallery.appendChild(showmoreContainer);

        showmorebtn.addEventListener('click', () => {
            const query = document.getElementById('searchbar').value;
            searchImages(query);
        });

        document.querySelectorAll('.image').forEach(img => {
            img.addEventListener('click', openLightbox);
        });
    }

    function openLightbox(event) {
        if (event.target.classList.contains('image')) {
            const lightbox = document.createElement('div');
            lightbox.classList.add('lightbox');

            const closeBtn = document.createElement('span');
            closeBtn.classList.add('close-btn');
            closeBtn.innerHTML = '&times;';
            closeBtn.addEventListener('click', () => {
                document.body.removeChild(lightbox);
            });

            const lightboxImg = document.createElement('img');
            lightboxImg.classList.add('lightbox-content');
            lightboxImg.src = event.target.src;

            lightbox.appendChild(closeBtn);
            lightbox.appendChild(lightboxImg);

            document.body.appendChild(lightbox);
        }
    }
});
