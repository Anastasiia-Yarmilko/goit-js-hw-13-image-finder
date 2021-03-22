import * as basicLightbox from 'basiclightbox';
import { alert, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
defaultModules.set(PNotifyMobile, {});
import '@pnotify/core/dist/BrightTheme.css';
import { Stack } from '@pnotify/core';
import ApiService from './apiService';
import imageCardTemplate from '../imageCards.hbs';

const refs = {
    galleryContainer: document.querySelector('.gallery'),
    anchor: document.querySelector('.anchor'),
    searchForm: document.querySelector('.search-form'),
};

const intersectionObserver = new IntersectionObserver(observerCallback, {
    rootMargin: '0px',
    threshold: 0,
});

const newApiServise = new ApiService();

const instance = basicLightbox.create('<img src="" alt="" class="modal-image"/>');

intersectionObserver.observe(refs.anchor);
refs.searchForm.addEventListener('submit', search);
refs.galleryContainer.addEventListener('click', openModal);

function search(event) {
  event.preventDefault();
  newApiServise.query = event.currentTarget.elements.query.value;
  refs.galleryContainer.innerHTML = '';
  newApiServise.resetPage();
  fetchingImg();
};

function fetchingImg() {
  newApiServise.fetchImages().then(data => {
    if (data.length === 0) {
      alert({
        text: 'No matches found. Please, customize your search query!',
        type: 'error',
        delay: 1500,
        stack: new Stack({
          dir1: 'up',
        }),
      });
    }
    refs.galleryContainer.insertAdjacentHTML('beforeend', imageCardTemplate(data));
  });
};

function observerCallback([entrie]) {
    if (refs.galleryContainer.innerHTML !== '' && entrie.isIntersecting) {
        fetchingImg()
    };
};

function openModal(event) {
  if (event.target.nodeName !== 'IMG') return;
    
    instance.show();
    const modalImage = document.querySelector('.modal-image');
    modalImage.src = event.target.dataset.source;
    modalImage.alt = event.target.alt;
};


