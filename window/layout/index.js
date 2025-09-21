const registerComponent = async function(name) {
    if (customElements.get(name)) {
        return;
    };

    const path = `../components/${name}`;
    const html = await (await fetch(`${path}/index.html`)).text();

    const link = document.createElement(`link`);

    link.rel = `stylesheet`;
    link.href = `${path}/index.css`;

    document.head.appendChild(link);

    const { init } = await import(`${path}/index.js`);

    customElements.define(name,
        class extends HTMLElement {
            constructor() {
                super();
            };

            async connectedCallback() {
                this.originalChilds = [...this.childNodes];
                this.innerHTML = html;

                console.log(`debug: component "${name}" connected`);

                await init(this);
            };
        }
    );

    console.log(`debug: component "${name}" loaded`);
};

const renderPage = async function(name) {
    await registerComponent(`page-${name}`);

    document.querySelector(`.layout.page .container`).innerHTML = `<page-${name}></page-${name}>`;

    for (const button of document.querySelectorAll(`.layout.header button[page]`)) {
        button.classList.remove(`active`);
    };

    const navButton = document.querySelector(`.layout.header button[page=${name}]`);

    if (navButton) {
        navButton.classList.add(`active`);
    };
};


document.addEventListener(`click`, async function(event) {
    const page = event.target.closest(`[page]`);

    if (page) {
        return await renderPage(page.getAttribute(`page`));
    };
});


await registerComponent(`input-select`);
await registerComponent(`input-text`);
await registerComponent(`input-password`);

await renderPage(`home`);