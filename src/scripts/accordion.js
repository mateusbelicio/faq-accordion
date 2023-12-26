const ANIMATION_DURATION = 300; // miliseconds

/**
|--------------------------------------------------
| Selecting DOM Elements
|--------------------------------------------------
*/

const accordionList = document.querySelector('.accordion__list');
const accordionItems = [...document.querySelectorAll('.accordion__item')];

const accordions = accordionItems.map((item) => ({
  item,
  container: item.querySelector('.accordion__container'),
  trigger: item.querySelector('.accordion__trigger'),
  panel: item.querySelector('.accordion__panel'),
}));

/**
|--------------------------------------------------
| Event handlers
|--------------------------------------------------
*/

accordionList.addEventListener('click', (ev) => {
  const accordionTrigger = ev.target.closest('.accordion__trigger');
  if (!accordionTrigger) return;

  const accordion = accordions.find((item) => item.trigger === accordionTrigger);
  if (!accordion) return;

  if (accordion.trigger.ariaExpanded === 'true') {
    closeAllAccordions();
  } else {
    closeAllAccordions();
    openAccordion(accordion);
  }
});

window.addEventListener('resize', defineAccordionPanelHeightProperty);

/**
|--------------------------------------------------
| Functions
|--------------------------------------------------
*/

/**
 * Close all accordions
 */
function closeAllAccordions() {
  accordions.forEach((accordion) => {
    accordion.container.dataset.state = 'closed';
    accordion.panel.dataset.state = 'closed';
    accordion.panel.setAttribute('aria-hidden', 'true');
    accordion.trigger.setAttribute('aria-expanded', 'false');
  });
}

const [ACCORDION_OBJECT] = accordions;

/**
 * Opens the selected accordion and sets properties to make it accessible
 * @param {ACCORDION_OBJECT} accordion
 */
function openAccordion(accordion) {
  accordion.container.dataset.state = 'open';
  accordion.panel.dataset.state = 'open';
  accordion.panel.setAttribute('aria-hidden', 'false');
  accordion.trigger.setAttribute('aria-expanded', 'true');
}

/**
 * Defines the height of each accordion panel and saves the value in a CSS property to be used in
 * animations
 */
function defineAccordionPanelHeightProperty() {
  accordions.forEach((accordion) => {
    const panelHeight = accordion.panel.querySelector('p').getBoundingClientRect().height;
    accordion.panel.style.setProperty('--panel-height', `${panelHeight}px`);
  });
}

// Initializing
setTimeout(() => defineAccordionPanelHeightProperty(), ANIMATION_DURATION);
