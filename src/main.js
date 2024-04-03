import { fetchImages } from './js/pixabay-api';
import iziToast from 'izitoast';

import { showEndOfCollectionMessage } from './js/showEnd';
import { renderGallery } from './js/render-functions';
import { refs } from './js/refs';
import { showLoader } from './js/showLoader';
import { hideLoader } from './js/hideLoader';

import 'izitoast/dist/css/iziToast.min.css';
import './css/loader-styles.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

hideLoader();

let searchTerm = '';
let pageCounter = 1;
const perPage = 15;

refs.searchForm.addEventListener('submit', submitHandle);
async function submitHandle(event) {
  event.preventDefault();
  searchTerm = refs.inputElement.value.trim();
  pageCounter = 1;

  refs.galleryElement.innerHTML = '';

  if (searchTerm === '') {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search term.',
      position: 'topRight',
    });
    hideLoadMoreBtn();

    return;
  }

  hideEndOfCollectionMessage();

  showLoader();
  try {
    const images = await fetchImages(searchTerm, pageCounter, perPage);
    const totalHits = images.totalHits;

    if (images.hits.length === 0) {
      refs.galleryElement.innerHTML = '';
      iziToast.info({
        title: 'Info',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      hideLoadMoreBtn();
      return;
    } else {
      renderGallery(images.hits);
      refs.inputElement.value = '';
      showLoadMoreBtn();
    }
    if (perPage * pageCounter >= totalHits) {
      hideLoadMoreBtn();
      showEndOfCollectionMessage();
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}

refs.loadMoreBtn.addEventListener('click', async () => {
  try {
    if (refs.loadMoreBtn) {
      pageCounter += 1;
    }
    const images = await fetchImages(searchTerm, pageCounter, perPage);
    const totalHits = images.totalHits;

    renderGallery(images.hits);
    showLoader();
    if (perPage * pageCounter >= totalHits) {
      hideLoadMoreBtn();
      showEndOfCollectionMessage();
    }

    const galleryCardHeight =
      refs.galleryElement.firstElementChild.getBoundingClientRect().height;
    window.scrollBy({ top: galleryCardHeight * 3, behavior: 'smooth' });
  } catch (error) {
    console.error('Error fetching more images:', error);
    iziToast.error({
      title: 'Error',
      message: `Error fetching more images: ${error}`,
    });
  } finally {
    hideLoader();
  }
});

// * button load more images
function showLoadMoreBtn() {
  refs.loadMoreBtn.style.display = 'block';
}

function hideLoadMoreBtn() {
  refs.loadMoreBtn.style.display = 'none';
}

function hideEndOfCollectionMessage() {
  const endMessage = document.querySelector('.end-message');
  if (endMessage) {
    endMessage.remove();
  }
}

window.addEventListener('scroll', () => {
  if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
    refs.scrollToTopBtn.style.display = 'flex';
  } else {
    refs.scrollToTopBtn.style.display = 'none';
  }
});

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

refs.scrollToTopBtn.addEventListener('click', scrollToTop);
