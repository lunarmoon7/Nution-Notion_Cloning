import Modal from '../ui/Modal.js';

export default function DocumentFooter({ $target, onOpen }) {
  const $documentFooter = document.createElement('div');
  $documentFooter.className = 'document-footer';

  const $helpButton = document.createElement('button');
  $helpButton.className = 'help-button';
  $helpButton.innerHTML = `
  <i class="fa-regular fa-circle-question"></i>
  `;

  const $socialGroup = document.createElement('div');
  $socialGroup.className = 'social-group';

  const $githubButton = document.createElement('button');
  $githubButton.className = 'github-button';
  $githubButton.innerHTML = `
    <a href="https://github.com/lunarmoon7" target="_blank">
      <i class="fa-brands fa-github"></i>
    </a>
  `;

  const $velogButton = document.createElement('button');
  $velogButton.className = 'velog-button';
  $velogButton.innerHTML = `
    <a href="https://velog.io/@49crehbgr" target="_blank">
      <i class="fa-brands fa-vimeo"></i>
    </a>
  `;

  $socialGroup.appendChild($githubButton);
  $socialGroup.appendChild($velogButton);

  $documentFooter.appendChild($helpButton);
  $documentFooter.appendChild($socialGroup);
  $target.appendChild($documentFooter);

  $helpButton.addEventListener('click', () => {
    new Modal();
  });
}
