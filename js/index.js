import { lorem_ipsum_template, words, paragraphs } from './lorem-ipsum.js';

(() => {
  const display = document.querySelector('.lorem-ipsum-display');
  const countInput = document.querySelector('.count-input');
  const unitButtons = Array.from(document.querySelectorAll('[name="unit-button"'));
  const generateButton = document.querySelector('.generate-button');
  const copyButton = document.querySelector('.copy-button');
  const message = document.querySelector('.message');
  let lorem_ipsum;

  // * functions
  const getUnit = () => unitButtons.find(btn => btn.checked).dataset.unit;

  const generateParagraphs = paragraphsCount => {
    let currParagraphIdx = 0;
    lorem_ipsum = [];

    for (let i = 0; i < paragraphsCount; i++) {
      const paragraph = document.createElement('p');

      paragraph.innerText = paragraphs[currParagraphIdx];
      display.appendChild(paragraph);
      lorem_ipsum.push(paragraphs[currParagraphIdx]);
      currParagraphIdx++;

      if (currParagraphIdx === paragraphs.length) currParagraphIdx = 0;
    }
  };

  const generateWords = wordsCount => {
    const paragraph = document.createElement('p');
    let currWordIdx = 0;
    lorem_ipsum = '';

    for (let i = 0; i < wordsCount; i++) {
      const isLastWord = i === wordsCount - 1;
      lorem_ipsum += words[currWordIdx];
      if (!isLastWord) lorem_ipsum += ' ';
      currWordIdx++;

      if (currWordIdx === words.length) currWordIdx = 0;
    }

    if (!lorem_ipsum.endsWith('.')) lorem_ipsum += '.';

    paragraph.innerText = lorem_ipsum;
    display.appendChild(paragraph);
  };

  const generateBytes = bytesCount => {
    const paragraph = document.createElement('p');
    let currCharIdx = 0;
    lorem_ipsum = '';

    for (let i = 0; i < bytesCount; i++) {
      lorem_ipsum += lorem_ipsum_template[currCharIdx];
      currCharIdx++;

      if (currCharIdx === lorem_ipsum_template.length) currCharIdx = 0;
    }

    if (lorem_ipsum.endsWith(' ')) lorem_ipsum = lorem_ipsum.slice(0, -1) + '.';

    paragraph.innerText = lorem_ipsum;
    display.appendChild(paragraph);
  };

  const generateSentences = [];

  const generateLoremIpsum = () => {
    const count = +countInput.value;
    const unit = getUnit();

    if (!count) return;
    display.innerHTML = '';

    switch (unit) {
      case 'byte':
        return generateBytes(count);
      case 'word':
        return generateWords(count);
      case 'paragraph':
        return generateParagraphs(count);
    }
  };

  // * event-handlers
  copyButton.onclick = () => {
    if (!lorem_ipsum || !'clipboard' in navigator) return;

    if (Array.isArray(lorem_ipsum)) lorem_ipsum = lorem_ipsum.join('\n');

    navigator.clipboard
      .writeText(lorem_ipsum)
      .then(() => {
        message.classList.add('slide-in');
        copyButton.setAttribute('disabled', true);

        setTimeout(() => {
          message.classList.remove('slide-in');
          copyButton.removeAttribute('disabled');
        }, 1000);
      })
      .catch(err => console.error(err));
  };

  countInput.oninput = e => {
    const { value } = e.target;

    if (!/^\d*$/g.test(value)) {
      e.target.value = value.slice(0, -1);
    }
  };

  generateButton.onclick = generateLoremIpsum;
})();
