const themes = document.querySelector('.themes')
const App = document.querySelector('.app')

themes.addEventListener('click', (e) => {
    const theme = e.target.closest('.theme')

    if (theme) {
        document.querySelector('.theme.active').classList.remove('active')
        theme.classList.add('active')
        const selectedTheme = theme.getAttribute('data-theme')
        console.log(selectedTheme)
        localStorage.setItem('selectedTheme', selectedTheme)
        applyTheme(selectedTheme)
    }
})

function applyTheme(theme) {
    App.classList.toggle('theme-dark', theme === 'dark')
    document.querySelectorAll('.theme').forEach( themeBtn => {
        const dataTheme = themeBtn.getAttribute('data-theme')
        console.log(dataTheme)
        themeBtn.classList.toggle('active', dataTheme === theme)
    })
}

function loadTheme() {
    const currenTheme = localStorage.getItem('selectedTheme')
    console.log(currenTheme)
    if (currenTheme) {
        applyTheme(currenTheme)
    }
}

loadTheme()