class NoteForm extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this._isOpen = false;
    }
  
    connectedCallback() {
      this.render();
      
      // Dengarkan event dari floating button
      document.addEventListener('open-form', () => this.toggleForm());
    }
  
    toggleForm() {
      this._isOpen = !this._isOpen;
      this.render();
    }
  
    render() {
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
            backdrop-filter: blur(5px);
            display: ${this._isOpen ? 'flex' : 'none'};
            justify-content: center;
            align-items: center;
            z-index: 2000;
            animation: fadeIn 0.3s;
          }
          
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          .form-container {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            width: 90%;
            max-width: 500px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            transform: ${this._isOpen ? 'translateY(0)' : 'translateY(-20px)'};
            transition: transform 0.3s ease;
          }
          
          h2 {
            margin-top: 0;
            color: #00879E;
          }
          
          input, textarea {
            width: 100%;
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-family: inherit;
          }
          
          textarea {
            min-height: 150px;
            resize: vertical;
          }
          
          .form-actions {
            display: flex;
            justify-content: flex-end;
            gap: 10px;
          }
          
          button {
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            transition: background 0.2s;
          }
          
          .cancel-btn {
            background: #f5f5f5;
            border: 1px solid #ddd;
          }
          
          .save-btn {
            background: #00879E;
            color: white;
            border: none;
          }
          
          button:hover {
            opacity: 0.9;
          }
        </style>
        
        <div class="form-container">
          <h2>Tambah Catatan Baru</h2>
          <form id="noteForm">
            <input 
              type="text" 
              id="noteTitle" 
              placeholder="Judul Catatan" 
              required
              maxlength="50"
            >
            <textarea 
              id="noteBody" 
              placeholder="Isi catatan..." 
              required
              maxlength="1000"
            ></textarea>
            <div class="form-actions">
              <button type="button" class="cancel-btn" id="cancelBtn">Batal</button>
              <button type="submit" class="save-btn">Simpan</button>
            </div>
          </form>
        </div>
      `;
  
      const form = this.shadowRoot.getElementById('noteForm');
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = this.shadowRoot.getElementById('noteTitle').value;
        const body = this.shadowRoot.getElementById('noteBody').value;
        
        this.dispatchEvent(new CustomEvent('submit-note', {
          detail: { title, body },
          bubbles: true,
          composed: true
        }));
        
        this.toggleForm();
        form.reset();
      });
  
      this.shadowRoot.getElementById('cancelBtn').addEventListener('click', () => {
        this.toggleForm();
      });
    }
  }
  
  customElements.define('note-form', NoteForm);
  export default NoteForm;