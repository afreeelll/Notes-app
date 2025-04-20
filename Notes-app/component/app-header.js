class AppHeader extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      this.shadowRoot.innerHTML = `
        <style>
          header {
            background-color: #00879E;
            color: white;
            padding: 1rem;
            position: sticky;
            top: 0;
            z-index: 100;
          }
          
          .header-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            max-width: 1200px;
            margin: 0 auto;
          }
          
          .search-bar {
            padding: 8px 12px;
            border-radius: 20px;
            border: none;
            width: 300px;
          }
        </style>
        
        <header>
          <div class="header-container">
            <h1>Notes App</h1>
            <input 
              type="search" 
              class="search-bar" 
              placeholder="Cari catatan..."
              id="searchInput"
            >
          </div>
        </header>
      `;
  
      // Search functionality
      this.shadowRoot.getElementById('searchInput').addEventListener('input', (e) => {
        this.dispatchEvent(new CustomEvent('search', {
          detail: { query: e.target.value },
          bubbles: true,
          composed: true
        }));
      });
    }
  }
  
  customElements.define('app-header', AppHeader);