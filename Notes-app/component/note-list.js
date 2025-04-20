import notesData from '../data/dataDummy.js';
import "./note-card.js";

class NoteList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open'});
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                .notes-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
                    gap: 20px;
                    padding: 10px;
                    background: #fff;
                }

                .empty-state {
                    text-align: center;
                    color: #888;
                    padding: 20px;
                }
            </style>
            <div class="notes-grid"></div>
        `;

        document.addEventListener('show-note-detail', (event) => {
            const { title, body, createdAt } = event.detail;
            this.showDetailModal(title, body, createdAt);
        });

        this.renderNotes();
    }

    renderNotes() {
        const gridContainer = this.shadowRoot.querySelector('.notes-grid');
        if (!gridContainer) return;

        gridContainer.innerHTML = '';

        const activeNotes = notesData.filter(note => !note.archived);

        if (activeNotes.length === 0) {
            gridContainer.innerHTML = `
                <div class="empty-state">
                    <p>Tidak ada catatan. Mulai buat catatan baru!</p>
                </div>
            `;
            return;
        }

        activeNotes.forEach(note => {
            const noteCard = document.createElement('note-card');
            noteCard.setAttribute('id', note.id);
            noteCard.setAttribute('title', note.title);
            noteCard.setAttribute('body', note.body);
            noteCard.setAttribute('created-at', note.createdAt);
            gridContainer.appendChild(noteCard);
        });
    }

    showDetailModal(title, body, createdAt) {
        const existingModal = document.querySelector('.note-detail-modal');
        if (existingModal) existingModal.remove();

        const modal = document.createElement('div');
        modal.className = 'note-detail-modal';
        modal.innerHTML = `
            <style>
                .note-detail-modal {
                    position: fixed;
                    top: 0; left: 0;
                    width: 100%; height: 100%;
                    background: rgba(0,0,0,0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 9999;
                }
                .modal-content {
                    background: white;
                    padding: 2rem;
                    border-radius: 8px;
                    max-width: 600px;
                    width: 90%;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
                    animation: fadeIn 0.3s;
                }
                .modal-content h3 {
                    margin-top: 0;
                    color: #00879E;
                }
                .modal-content p {
                    white-space: pre-wrap;
                }
                .close-btn {
                    margin-top: 20px;
                    padding: 8px 16px;
                    background: #ccc;
                    border: none;
                    cursor: pointer;
                    border-radius: 4px;
                }
            </style>
            <div class="modal-content">
                <h3>${title}</h3>
                <p>${body}</p>
                <small><i>Dibuat: ${new Date(createdAt).toLocaleString('id-ID')}</i></small>
                <br><button class="close-btn">Tutup</button>
            </div>
        `;

        modal.querySelector('.close-btn').addEventListener('click', () => {
            modal.remove();
        });

        document.body.appendChild(modal);
    }
}

customElements.define('note-list', NoteList);
