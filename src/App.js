import DocumentHeader from './components/document/DocumentHeader.js';
import DocumentList from './components/document/DocumentList.js';
import Editor from './components/editor/Editor.js';
import SubDocumentEditor from './components/editor/SubDocumentEditor.js';
import { request } from './api/api.js';
import { initRouter, push } from './router/router.js';
import { removeItem, setItem } from './utils/storage.js';
import Splitter from './components/ui/Splitter.js';
import DocumentFooter from './components/document/DocumentFooter.js';

export default function App({ $target }) {
  const $documentListContainer = document.createElement('div');
  $documentListContainer.className = 'document-list-container';

  const $editorContainer = document.createElement('div');
  $editorContainer.className = 'editor-container';

  let timer = null;

  this.state = {
    selectedDocument: null,
    subDocuments: null,
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = async () => {
    await getRootDocuments();
    const { selectedDocument } = this.state;
    if (selectedDocument) {
      $editorContainer.style.display = 'block';
    } else {
      $editorContainer.style.display = 'none';
    }
  };

  // Document Header Component
  const documentHeader = new DocumentHeader({
    $target: $documentListContainer,
    onClickPageAddButton: async () => {
      const addedDocument = await addDocument(null, '제목 없음');

      this.setState({
        ...this.state,
        selectedDocument: addedDocument,
      });

      editor.setState(addedDocument);
      push(`/${addedDocument.id}`);
    },
  });

  // Document List Component
  const documentList = new DocumentList({
    $target: $documentListContainer,
    initialState: [],
    onClickDocument: async (id) => {
      await getSelectedDocument(id);
      push(`/${id}`);
      subDocumentEditor.setState(this.state.subDocuments);
    },
    onClickAddButton: async (id) => {
      const addedDocument = await addDocument(id, '제목 없음');

      this.setState({
        ...this.state,
        selectedDocument: addedDocument,
      });

      editor.setState(addedDocument);
      push(`/${addedDocument.id}`);
    },
    onClickRemoveButton: async (id) => {
      await removeDocument(id);
      this.setState({
        ...this.state,
        selectedDocument: null,
      });
    },
  });

  // Document Footer Component
  const documentFooter = new DocumentFooter({
    $target: $documentListContainer,
  });
  $target.appendChild($documentListContainer);

  // Splitter Component
  const splitter = new Splitter({ $target });

  // Editor Component
  const editor = new Editor({
    $target: $editorContainer,
    initialState: this.state.selectedDocument,
    onEditing: (document) => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        setItem('temp-post', {
          ...document,
          tempSavedAt: new Date(),
        });

        await editDocument(document.id, document.title, document.content);

        removeItem('temp-post');
        // this.render();
      }, 1000);
    },
  });

  $target.appendChild($editorContainer);

  // Sub Document Footer Component
  const subDocumentEditor = new SubDocumentEditor({
    $target: $editorContainer,
    initialState: this.state.subDocuments ? this.state.subDocuments : [],
    onClick: async (id) => {
      await getSelectedDocument(id);
      push(`/${id}`);
    },
  });

  // API: Root Documents 가져오기
  const getRootDocuments = async () => {
    const rootDocuments = await request();
    documentList.setState(rootDocuments);
  };

  // API: 특정 Document의 content 조회하기
  const getSelectedDocument = async (id) => {
    const selectedDocument = await request(`/${id}`);

    this.setState({
      ...this.state,
      selectedDocument,
      subDocuments: selectedDocument.documents,
    });

    editor.setState(selectedDocument);
    subDocumentEditor.setState(selectedDocument.documents);
  };

  // API: Document 추가하기
  const addDocument = async (parentId, title) => {
    const newDocument = await request('', {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        parent: parentId,
      }),
    });
    return newDocument;
  };

  // API: 특정 Document 수정하기
  const editDocument = async (id, title, content) => {
    await request(`/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    });
  };
  // API: 특정 Document 삭제하기
  const removeDocument = async (id) => {
    await request(`/${id}`, {
      method: 'DELETE',
    });
  };

  // 라우팅
  this.route = async () => {
    await getRootDocuments();
    const { pathname } = window.location;
    if (pathname === '/') {
      this.setState({
        ...this.state,
        selectedDocument: null,
      });
    } else {
      const id = pathname.slice(1);
      await getSelectedDocument(id);
    }
  };

  // 뒤로가기, 앞으로가기 처리
  window.addEventListener('popstate', async () => {
    this.route();
  });

  this.route();
  initRouter(() => this.route());
}
