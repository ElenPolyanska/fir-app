export function isValid(value) {
    return value.length >= 10
}

export function createModal(title, content) {
    const modalEl = document.createElement('div')
    modalEl.classList.add('modal')
    const markup = `
    <h1>${title}</h1>
    <div class='modal-content'>${content}</div>
`
    modalEl.innerHTML = markup
    mui.overlay('on', modalEl)
}