class AppFooter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open'});
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                footer {
                    color: #00879E;
                    text-align: center;
                    padding: 10px;
                    font-size: 0.8em;
                    margin-top: auto;
                    width: 100%;
                    }
            </style>
            <footer>&copy; 2025 Dicoding Indonesia - Afriliza.</footer>
        `;
    }
}

customElements.define('app-footer', AppFooter);
export default AppFooter;