import { refs } from './js/gallery.js';
import { onSubmitForm, loadMore } from './js/gallery.js';

refs.searchForm.addEventListener('submit', onSubmitForm);
refs.loadMoreBtn.addEventListener('click', loadMore);
