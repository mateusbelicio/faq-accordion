/**
|--------------------------------------------------
| Constants
|--------------------------------------------------
*/
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

window.addEventListener('resize', defineHeightProperty);

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

    setTimeout(() => {
      if (accordion.container.dataset.state === 'closed')
        accordion.panel.style.setProperty('display', 'none');
    }, ANIMATION_DURATION);
  });
}

/**
 * Opens the selected accordion and sets properties to make it accessible
 * @param {typeof accordions[0]} accordion
 */
function openAccordion(accordion) {
  accordion.container.dataset.state = 'open';
  accordion.panel.dataset.state = 'open';
  accordion.trigger.setAttribute('aria-expanded', 'true');
  accordion.panel.style.removeProperty('display');
}

function defineHeightProperty() {
  const CHARACTER_LENGTH =
    Number.parseInt(getComputedStyle(accordions[0].panel).fontSize.replace('px', '')) / 2;

  accordions.forEach((accordion) => {
    const panelWords = accordion.panel.textContent.trim().split(' ');
    const panelWidth = accordion.item.getBoundingClientRect().width;

    let panelLines = 1;
    let count = 0;
    const lines = [[]];
    panelWords.forEach((word) => {
      count += word.length + 1;

      if (count >= panelWidth / CHARACTER_LENGTH) {
        count = 0;
        panelLines += 1;
        lines.push([word]);
      } else {
        lines[panelLines - 1].push(word);
      }
    }, 0);

    const lineHeight = Number.parseInt(
      getComputedStyle(accordion.panel).lineHeight.replace('px', '')
    );
    accordion.panel.style.setProperty('--panel-height', `${lineHeight * panelLines}px`);
  });
}

defineHeightProperty();
