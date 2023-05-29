import { ApiPixabay } from './apikey.js';
import { createCards } from './createCards.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// let gallery = new simpleLightbox('.gallery a', {
//   widthRatio: 0.8,
//   heightRatio: 0.8,
//   animationSpeed: 250,
//   // scaleImageToRatio: true,
// });

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const pixabay = new ApiPixabay();

export const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

function addHTML(cards) {
  const cardsElements = createCards(cards);
  refs.gallery.insertAdjacentHTML('beforeend', cardsElements);
}

function clearTheGallery() {
  refs.gallery.innerHTML = '';
}

export async function onSubmitForm(e) {
  e.preventDefault();
  clearTheGallery();
  refs.loadMoreBtn.classList.add('is-hidden');

  const inputValue = e.currentTarget
    .querySelector('input[name="searchQuery"]')
    .value.trim();
  pixabay.q = inputValue;

  if (!inputValue) {
    Notify.failure('Please enter something in the search.');
    return;
  }
  searchGalleryForm();
}

async function searchGalleryForm() {
  try {
    const data = await pixabay.fetchPixabay();
    if (data.totalHits === 0) {
      Notify.failure(
        'Sorry, there are no images matching your request. Please try again.'
      );
      return;
    }

    addHTML(data.hits);

    Notify.success(`Hooray! We found ${data.totalHits} images.`);
    lightbox.refresh();

    if (data.totalHits > pixabay.per_page) {
      refs.loadMoreBtn.classList.remove('is-hidden');
    }
  } catch (error) {
    console.log(error);
  }
}

export function loadMore() {
  pixabay.page += 1;
  searchMoreImages();
}

async function searchMoreImages() {
  try {
    const data = await pixabay.fetchPixabay();

    addHTML(data.hits);
    lightbox.refresh();
    if (
      data.hits.length < pixabay.per_page ||
      pixabay.per_page * pixabay.page >= 500
    ) {
      refs.loadMoreBtn.classList.add('is-hidden');
      Notify.info("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    console.log(error);
  }
}
