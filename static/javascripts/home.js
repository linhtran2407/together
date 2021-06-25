document.addEventListener('DOMContentLoaded', () => {
    const contents = [...document.querySelectorAll('#content > div')]

    const select = (position) => {
        contents.forEach((d) => {
            d.className = 'hidden'
        })

        contents[position - 1].className = ''
    }

    window.tabs.addEventListener('click', ({ target }) => {

        if (target.name === 'tab') {
            select(+target.id.slice(4))
        }
    })
})