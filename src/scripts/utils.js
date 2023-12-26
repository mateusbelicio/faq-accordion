import { ACCORDION_OBJECT } from './accordion.js';

/**
 *
 * @param {ACCORDION_OBJECT} accordion
 */
export function defineAccordionPanelEstimatedHeight(accordion) {
  const CHARACTER_LENGTH = _getCharacterLength(accordion.panel);

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
}

function _getCharacterLength(element) {
  return Number.parseInt(getComputedStyle(element).fontSize.replace('px', '')) / 2;
}
