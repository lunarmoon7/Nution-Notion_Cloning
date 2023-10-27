import { push } from '../../router/router.js'

export default function DocumentHeader({ $target, onClickPageAddButton }) {
  const $documentHeader = document.createElement('div');
  $documentHeader.className = 'document-header';

  const $mainHeader = document.createElement('div');
  $mainHeader.className = 'main-header';

  const $logo = document.createElement('div');
  $logo.className = 'logo';
  $logo.innerHTML = `
    <img src="./images/notion-logo.svg" alt="Nution" class="logo-img" />
  `
  
  const $logoTitle = document.createElement('div');
  $logoTitle.className = 'logo-title';  
  $logoTitle.textContent = `휘식's Nution`

  $mainHeader.appendChild($logo);
  $mainHeader.appendChild($logoTitle);

  const $subHeader = document.createElement('div');
  $subHeader.className = 'sub-header';

  const $pageName = document.createElement('div');
  $pageName.className = 'page-name';
  $pageName.textContent = '개인 페이지';

  const $group = document.createElement('div');
  $group.className = 'group';
  
  const $addButton = document.createElement('button');
  $addButton.innerHTML = `<i class="fa-solid fa-plus"></i>`
  $addButton.className = 'page-add-button';

  const $span = document.createElement('span');
  $span.textContent = '페이지 추가';

  $group.appendChild($addButton);
  $group.appendChild($span);

  $subHeader.appendChild($pageName);
  $subHeader.appendChild($group);

  $documentHeader.appendChild($mainHeader);
  $documentHeader.appendChild($subHeader);

  $target.appendChild($documentHeader);

  $documentHeader.addEventListener('click', (e) => {
    const { target } = e;
    if (target.className === 'page-add-button' || target.className === 'fa-solid fa-plus') {
      if (onClickPageAddButton) {
        onClickPageAddButton();
      }
    } else if (target.className === 'logo' || target.className === 'logo-img') {
      push('/');
    }
  });
}
