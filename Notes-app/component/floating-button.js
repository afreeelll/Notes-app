class FloatingButton extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            position: fixed;
            bottom: 30px;
            right: 30px;
            z-index: 1000;
          }
          
          button {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background-color: #00879E;
            color: white;
            border: none;
            font-size: 24px;
            cursor: pointer;
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
            transition: all 0.3s;
          }
          
          button:hover {
            transform: scale(1.1);
            background-color: #00667E;
          }
        </style>
        
        <button id="addBtn">+</button>
      `;
  
      // Kirim event saat tombol diklik
      this.shadowRoot.getElementById('addBtn').addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('open-form', {
          bubbles: true,
          composed: true
        }));
      });
    }
  }
  
  customElements.define('floating-button', FloatingButton);