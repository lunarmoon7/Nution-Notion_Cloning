export default function Modal() {
  const $modalOverlay = document.querySelector('.modal-overlay');

  const $modal = document.createElement('div');
  $modal.className = 'modal';

  const $modalTitle = document.createElement('h3');
  $modalTitle.className = 'modal-title';
  $modalTitle.textContent = '도움말';

  const $modalContent = document.createElement('div');
  $modalContent.className = 'modal-content';

  $modalContent.innerHTML = `
  <ul>
    <li>페이지 추가로 새로운 문서를 추가할 수 있어요!</li>
    <li>문서 리스트와 에디터 사이에 <strong>스플리터</strong>가 있어요!</li>
    <li>에디터에서 한글은 <strong>자소분리</strong>가 발생해요.😭</li>
    <li>자소분리는 브라우저 문제에요.</li>
    <li>문서를 접었다 폈다 할 수 있어요!</li>
  </ul>
  `

  const $closeButton = document.createElement('button');
  $closeButton.className = 'close-button';
  $closeButton.innerHTML = `
  <i class="fa-solid fa-xmark"></i>
  `;

  $modal.appendChild($closeButton);
  $modal.appendChild($modalTitle);
  $modal.appendChild($modalContent);
  
  $modalOverlay.appendChild($modal);
  
  this.render = () => {
    $modalOverlay.style.display = 'block';
  }

  $closeButton.addEventListener('click', () => {
    $modalOverlay.style.display = 'none';
    $modalOverlay.removeChild($modal);
  });

  window.addEventListener('click', (e) => {
    if(e.target === $modalOverlay){
      $modalOverlay.style.display = 'none';
      $modalOverlay.removeChild($modal);
    }
  });

  this.render();
}
