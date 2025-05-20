import mobileNav from './modules/mobile-nav.js';
import initTranslation from './modules/translate.js'
import renderProductCards from './modules/create-cards.js'
import { languageState } from './modules/translate.js';

document.addEventListener('DOMContentLoaded', () => {
    initTranslation();  
    renderProductCards(languageState);
    mobileNav();
});
