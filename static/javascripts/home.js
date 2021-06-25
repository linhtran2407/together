document.addEventListener('DOMContentLoaded', () => {
    const contents = [...document.querySelectorAll('#content > div')]

    const select = (position) => {
        contents.forEach((d) => {
            d.className = 'hidden'
        })

        contents[position - 1].className = ''
    }

    fetch('/api/couples').then(res => res.json()).then((couple) => {
        console.log(couple)

        window.username_1.innerHTML = couple.users[0].userName
        window.username_2.innerHTML = couple.users[1].userName

        window.start_date.innerHTML = moment.utc(couple.createdAt).local().format(' HH:mm DD/MM/YYYY')
        window.counter_relative.innerHTML = Math.floor((Date.now() - new Date(couple.createdAt)) / 86400000) +  ' Days'
    })

    // const 

    window.tabs.addEventListener('click', ({ target }) => {

        if (target.name === 'tab') {
            select(+target.id.slice(4))
        }
    })
})