import axios from 'axios';

export class ApiPixabay {
  url = 'https://pixabay.com/api/';
  key = '36838300-77c7aeea1adf4ea7a8fafc62b';
  q = null;
  image_type = 'photo';
  orientation = 'horizontal';
  safesearch = true;
  page = 1;
  per_page = 40;
  search = null;

  async fetchPixabay(search) {
    this.search = search;
    const searchQuery = await axios.get(`${this.url}?`, {
      params: {
        key: this.key,
        q: this.q,
        image_type: this.image_type,
        orientation: this.orientation,
        orientation: this.orientation,
        page: this.page,
        per_page: this.per_page,
      },
    });
    return searchQuery.data;
  }
}
