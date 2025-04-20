import { formatDate } from '../data/date.js';

class NoteCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open'});
    }

    connectedCallback() {
        const title = this.getAttribute('title') || 'No Title';
        const body = this.getAttribute('body') || 'No Content';
        const date = new Date(this.getAttribute('created-at'));
        const formattedDate = date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short'
        });


        this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: block;
                background-color: #fff;
                border-radius: 9px;
                boc-shadow: 0 2px 5px rgba(0,0,0,0.1);
                padding: 15px;
                height: 150px;
                transition: transform 0.3s ease;
                cursor: pointer;
                overflow: hidden;
                border: 1px solid #00879E;
            }
                
            :host(:hover) {
                transform: translateY(-3px);
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            }
                
            .card-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 10px;
            }
                
            .card-date {
                background: #00879e;
                color: white;
                padding: 5px 8px;
                border-radius: 12px;
                font-size: 0.8em;
                font-weight: bold;
            }
                
            .card-title {
                font-weight: bold;
                margin: 0;
                font-size: 1em;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
                
            .card-body {
                font-size: 0.9em;
                color: #555;
                display: -webkit-box;
                -webkit-line-clamp: 4;
                -webkit-box-orient: vertical;
                overflow: hidden;
                height: 80px;
            }
        </style>
        
        <div class="card">
                <div class="card-header">
                    <h3 class="card-title">${title}</h3>
                    <div class="card-date">${formattedDate}</div>
                </div>
                <div class="card-body">${body}</div>
            </div>
        `;

        const cardElement = this.shadowRoot.querySelector('.card');
        cardElement.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('show-note-detail', {
        detail: {
            title: title,
            body: body,
            createdAt: this.getAttribute('created-at'),
        },
        bubbles: true,
        composed: true
    }));
});
}
}
customElements.define('note-card', NoteCard);