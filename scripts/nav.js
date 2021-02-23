// nav.js

    const hamburger = document.querySelector('.hamburger'),
        nav = document.querySelector('.nav__links-wrapper'),
        navLink = document.querySelectorAll('.nav__link'),
        lang = document.querySelector('.lang'),
        lang2 = document.querySelector('.lang2'),
        cn = document.querySelector('#cn'),
        cn_2 = document.querySelector('#cn2')

    const links = Array.from(navLink)
    hamburger.onclick = () => {
        nav.classList.toggle('shows');
        nav.classList.toggle('hide');
        console.log('nav')
        links.map(link => link.classList.toggle('fade'))
        hamburger.classList.toggle('fixed')
    }
    lang.onmouseover = () => {
        cn.classList.remove('hide-lang')
    }

    lang.onmouseout = () => {
        cn.classList.add('hide-lang')
    }

    lang2.onmouseover = () => {
        cn_2.classList.remove('hide-lang')
    }

    lang2.onmouseout = () => {
        cn_2.classList.add('hide-lang')
    }

    // dynamic footer date
    document.querySelector('#date').innerHTML = new Date().getFullYear()
