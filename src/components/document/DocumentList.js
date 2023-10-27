export default function DocumentList({
  $target,
  initialState,
  onClickDocument,
  onClickAddButton,
  onClickRemoveButton,
}) {
  const $documentList = document.createElement('div');
  $documentList.className = 'document-list';

  $target.appendChild($documentList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const renderDocumentsTree = (documents) => {
    return `
      <ul>
        ${documents
          .map(
            (document) => `
          <li data-id="${document.id}" class="document-item">
            <div class='main-document-item'>
              <button class='fold-button'>
              ${
                document.documents && document.documents.length > 0
                  ? '<i class="fa-solid fa-chevron-down"></i>'
                  : '<i class="fa-solid fa-chevron-right"></i>'
              }
              </button>
              <span class="title">${document.title}</span>
              <div class='button-group'>
                <button class='remove-button'>
                  <i class="fa-solid fa-trash-can"></i>
                </button>
                <button class='add-button'>
                  <i class="fa-solid fa-plus"></i>
                </button>
              </div>
            </div>
            
            ${
              document.documents && document.documents.length > 0
                ? renderDocumentsTree(document.documents)
                : ''
            }
          </li>
        `,
          )
          .join('')}
      </ul>
    `;
  };

  this.render = () => {
    $documentList.innerHTML = renderDocumentsTree(this.state);
  };

  $documentList.addEventListener('click', (e) => {
    const $li = e.target.closest('li');

    if ($li) {
      const { id } = $li.dataset;
      const { className } = e.target;

      if (className === 'add-button' || className === 'fa-solid fa-plus') {
        onClickAddButton(id);
      } else if (className === 'title') {
        onClickDocument(id);
      } else if (
        className === 'remove-button' ||
        className === 'fa-solid fa-trash-can'
      ) {
        onClickRemoveButton(id);
      } else if (
        className === 'fold-button' ||
        className === 'fa-solid fa-chevron-right' ||
        className === 'fa-solid fa-chevron-down'
      ) {
        const $ul = $li.querySelector('ul');
        const $foldButton = $li.querySelector('.fold-button');
        if ($ul) {
          if ($ul.style.display === 'none') {
            $ul.style.display = 'block';
            $foldButton.innerHTML = '<i class="fa-solid fa-chevron-down"></i>';
          } else {
            $ul.style.display = 'none';
            $foldButton.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
          }
        }
      }
    }
  });

  this.render();
}
