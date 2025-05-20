// import { languageState } from './language-state.js';
export const languageState = { 
  current: 'ua',
  subscribers: [],
  
  subscribe(callback) {
    this.subscribers.push(callback);
  },
  
  setLanguage(lang) {
    this.current = lang;
    this.subscribers.forEach(cb => cb(lang));
    localStorage.setItem('selectedLanguage', lang);
  }
};

function initTranslation() {
  const arrLang = {
    eng: {
      assortMenu: 'ASSORTMENT',
      contactsMenu: 'CONTACTS',
      heroTitle: 'Dry gypsum mixtures',
      heroDescription: 'of Turkish production',
      about1Title: 'Brand',
      about1Description: 'VipGips is a brand of gypsum mixtures of Turkish production that has been successfully operating in the Ukrainian market since 2008.',
      about2Title: 'Production',
      about2Description: 'The products are manufactured at a modern factory owned by Fernas Alçı Sanayi A.Ş. located in Ankara, Republic of Turkey.',
      about3Title: 'Distribution',
      about3Description: 'The distribution network consists of official partners and distributors, ensuring product availability across various regions of Ukraine.',
      aboutMainText_intro: 'VipGips gypsum mixtures for interior finishing work offer:',
      aboutMainText_1elem: 'Easy application',
      aboutMainText_2elem: 'Cost efficiency',
      aboutMainText_3elem: 'Odorless composition',
      aboutMainText_4elem: 'Vapor permeability',
      aboutMainText_5elem: 'White color after drying, which helps reduce paint consumption during future painting works.',
      aboutMainText_perlit: 'A number of VipGips products incorporate perlite. Due to its structure, perlite makes the mixture lighter, reducing the load on structures and enhancing the mixture’s plasticity, making it easier to apply. Perlite is also a non-combustible material, increasing the fire resistance of gypsum plasters.',
      aboutMainText_end: 'Thanks to these qualities, VipGips has become a reliable choice for Ukrainian craftsmen and companies across the country. By choosing VipGips, you receive a time-tested product.',
      sectionTitleAssort: 'Assortment',
      sectionTitleContacts: 'Contacts',
    },
    ua: {
      assortMenu: 'АСОРТИМЕНТ',
      contactsMenu: 'КОНТАКТИ',
      heroTitle: 'Сухі гіпсові суміші',
      heroDescription: 'турецького виробництва',
      about1Title: 'Торгівельна марка',
      about1Description: 'ТМ vipgips - це торгова марка гіпсових сумішей турецького виробництва, яка з 2008 року успішно представлена на ринку України.',
      about2Title: 'Виготовлення продукції',
      about2Description: 'відбувається на сучасному заводі компанії Fernas Alçı Sanayi A.Ş. в місті Анкара, Турецька Республіка.',
      about3Title: 'Поширення продукції',
      about3Description: 'здійснюється через систему офіційних партнерів та дистриб’юторів, що дозволяє забезпечити її доступність у різних регіонах України.',
      aboutMainText_intro: 'Гіпсові суміші ТМ vipgips для внутрішніх оздоблювальних робіт це:',
      aboutMainText_1elem: 'Легкість у застосуванні',
      aboutMainText_2elem: 'Економічність',
      aboutMainText_3elem: 'Відсутність запаху',
      aboutMainText_4elem: 'Паропроникність',
      aboutMainText_5elem: 'Білий колір після висихання, що сприяє економії фарби при майбутніх малярних роботах.',
      aboutMainText_perlit: 'У ряді продуктів ТМ vipgips використовується перліт. Завдяки своїй структурі, він робить суміш легшою, що знижує навантаження на конструкції, покращує пластичність суміші, що забезпечує зручність у нанесенні. Перліт є негорючим матеріалом, тому підвищує вогнестійкість гіпсових штукатурок.',
      aboutMainText_end: 'Завдяки цим властивостям VipGips став надійним вибором для українських майстрів і компаній по всій країні. Обираючи товар ТМ VipGips, ви отримуєте перевірений часом продукт.',
      sectionTitleAssort: 'Асортимент',
      sectionTitleContacts: 'Контакти',
    }
  };

  function translate(lang) {
    const langElements = document.querySelectorAll('.leng');
    langElements.forEach((element) => {
      const classes = element.classList;
      for (let i = 0; i < classes.length; i++) {
        const className = classes[i];
        if (arrLang[lang] && arrLang[lang][className]) {
          element.textContent = arrLang[lang][className];
          break;
        }
      }
    });

    const dataElements = document.querySelectorAll('[data-lang-key]');
    dataElements.forEach((element) => {
      const key = element.getAttribute('data-lang-key');
      if (arrLang[lang] && arrLang[lang][key]) {
        element.textContent = arrLang[lang][key];
      }
    });
  }

  function setupLanguageToggle() {
    const languageButtons = document.querySelectorAll('.ua');

    if (languageButtons.length > 0) {
        // Добавляем обработчик клика для всех кнопок
        languageButtons.forEach(button => {
            button.addEventListener('click', function() {
                const newLang = languageState.current === 'ua' ? 'eng' : 'ua';
                languageState.setLanguage(newLang);
            });

            // Подписываем каждую кнопку на изменения языка
            languageState.subscribe((lang) => {
                button.setAttribute('data-lang', lang);
                button.textContent = lang === 'ua' ? 'UA' : 'ENG';
                translate(lang);
            });
        });

        // Устанавливаем язык из localStorage или по умолчанию
        const savedLanguage = localStorage.getItem('selectedLanguage');
        languageState.setLanguage(savedLanguage || 'ua');
    }
}

  // Инициализация при загрузке DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupLanguageToggle);
  } else {
    setupLanguageToggle();
  }
}

export default initTranslation;

