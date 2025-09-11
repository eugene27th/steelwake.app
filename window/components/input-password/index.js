export function init(host) {
    const nativeInput = host.querySelector(`input`);

    const name = host.getAttribute(`name`);
    const placeholder = host.getAttribute(`placeholder`);
    const value = host.getAttribute(`value`);

    if (name) {
        host.querySelector(`.name`).innerText = name;
    };

    if (placeholder) {
        nativeInput.placeholder = placeholder;
    };

    if (value) {
        nativeInput.value = value;
        host.value = value;
    };

    nativeInput.addEventListener(`input`, function() {
        host.value = nativeInput.value;
    });
};