const accordionList = document.querySelector('.accordion__list');
const accordions = document.querySelectorAll('.accordion__item > div');

accordionList.addEventListener('click', (ev) => {
  const accordionTrigger = ev.target.closest('.accordion__trigger');
  if (!accordionTrigger) return;

  if (accordionTrigger.ariaExpanded === 'true') {
    closeAllAccordions();
  } else {
    closeAllAccordions();
    openAccordion(accordionTrigger);
  }
});

function closeAllAccordions() {
  accordions.forEach((item) => {
    item.dataset.state = 'closed';
    item.querySelector('h2').dataset.state = 'closed';
    item.querySelector('.accordion__trigger').dataset.state = 'closed';
    item.querySelector('.accordion__trigger').setAttribute('aria-expanded', 'false');
    item.querySelector('.accordion__content').dataset.state = 'closed';
  });
}

function openAccordion(accordionTrigger) {
  accordionTrigger.parentElement.dataset.state = 'open';
  accordionTrigger.closest('.accordion__item > div').dataset.state = 'open';
  accordionTrigger.dataset.state = 'open';
  accordionTrigger.closest('.accordion__item').querySelector('.accordion__content').dataset.state =
    'open';

  accordionTrigger.setAttribute('aria-expanded', 'true');
}
