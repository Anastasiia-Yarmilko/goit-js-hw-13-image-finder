export default class ApiService {
  constructor() {
    this.resultsPerPage = 12;
    this.page = 1;
    this.key = '20808921-1f06a7735b40cece4e6350a25';
    this.searchQuery = '';
    };
    
  async fetchImages() {
    const searchURL = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=${this.resultsPerPage}&key=${this.key}`;
    const serverResponse = await fetch(searchURL);
    return serverResponse.json().then(({ hits }) => {
      this.incrementPage();
      return hits;
    });
    };
    
  resetPage() {
    this.page = 1;
    };
    
  incrementPage() {
    this.page += 1;
    };
    
  get query() {
    return this.searchQuery;
    };
    
  set query(newQuery) {
    this.searchQuery = newQuery;
    };
};