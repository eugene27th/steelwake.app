export function init(host) {
    // set name
    const name = host.getAttribute(`name`);

    if (name) {
        host.querySelector(`.name`).innerText = name;
    };

    // set options
    const optionsContainer = host.querySelector(`.options`);

    for (const originalChildren of host.originalChilds) {
        if (originalChildren.nodeType !== Node.ELEMENT_NODE || originalChildren.tagName !== `OPTION`) {
            continue;
        };

        const option = document.createElement(`div`);

        option.classList.add(`option`);
        option.setAttribute(`value`, originalChildren.value);
        option.innerHTML = originalChildren.innerText;

        if (originalChildren.hasAttribute(`selected`)) {
            option.setAttribute(`selected`, ``);
        };

        optionsContainer.appendChild(option);
    };

    // set selected option
    const selectedOption = host.querySelector(`.options .option[selected]`) || optionsContainer.firstElementChild;

    if (!selectedOption) {
        return false;
    };

    if (!selectedOption.hasAttribute(`selected`)) {
        selectedOption.setAttribute(`selected`, ``);
    };

    // set value
    const value = selectedOption.getAttribute(`value`);

    if (value) {
        host.value = value;
    };

    // set prev and next buttons
    host.querySelector(`.prev`).addEventListener(`click`, function() {
        const selectedOption = host.querySelector(`.options .option[selected]`);
        const prevOption = selectedOption.previousElementSibling || optionsContainer.lastElementChild;

        selectedOption.removeAttribute(`selected`);
        prevOption.setAttribute(`selected`, ``);

        host.value = prevOption.getAttribute(`value`);
    });

    host.querySelector(`.next`).addEventListener(`click`, function() {
        const selectedOption = host.querySelector(`.options .option[selected]`);
        const nextOption = selectedOption.nextElementSibling || optionsContainer.firstElementChild;

        selectedOption.removeAttribute(`selected`);
        nextOption.setAttribute(`selected`, ``);

        host.value = nextOption.getAttribute(`value`);
    });
};