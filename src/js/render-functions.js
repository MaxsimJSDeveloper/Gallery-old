import SimpleLightbox from 'simplelightbox';

export const galleryElement = document.querySelector('.gallery');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

lightbox.refresh();

export function renderGallery(images) {
  images.forEach(image => {
    const cardHTML = `
      <li class="card">
        <a href="${image.largeImageURL}" class="link">
          <img src="${image.webformatURL}" alt="${image.tags}">
          <ul class="list-container">
          <li class="item-description"><h3 class="item-title">Likes</h3> <p class="item-text">${image.likes}</p></li>
          <li class="item-description"><h3 class="item-title">Views</h3> <p class="item-text">${image.views}</p></li>
          <li class="item-description"><h3 class="item-title">Comments</h3> <p class="item-text">${image.comments}</p></li>
          <li class="item-description"><h3 class="item-title">Downloads</h3> <p class="item-text">${image.downloads}</p></li>
        </ul>
        </a>
        
      </li>
    `;
    galleryElement.insertAdjacentHTML('beforeend', cardHTML);
  });
  lightbox.refresh();
}
