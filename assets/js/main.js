const app = document.querySelector('.app')
const homeHeader = document.querySelector('.home-header')
const barBtn = document.querySelector('.bar-btn')
const backBtn = document.querySelector('.back-btn')
const inputSearch = document.querySelector('.search-input')
const searchBtn = document.querySelector('.search-btn')
const navContent = document.querySelector('.nav__content')
const searchHeader = document.querySelector('.search-header')
const backgroundInner = document.querySelector('.background-inner')
const addNoteBtn = document.querySelector('.addNote-btn')
const content = document.querySelector('.content')
const Close = document.querySelector('.close')
const inputTitle = document.querySelector('.input-title')
const inputContent = document.querySelector('.input-content')
const notes = document.querySelector('.notes')
const doneNoteBtn = document.querySelector('.doneNote-btn')
const notesEmpty = document.querySelector('.notes-empty')
const deteteBtn = document.querySelector('.detete-btn')
const no = document.querySelector('.no')
const yes = document.querySelector('.yes')
const messageDeteleNote = document.querySelector('.message')
const textMessage = document.querySelector('.message > .text')

let valueInputTitle = ''
let valueInputContent = ''

function createNote() {

    const noteElement = document.createElement('div')
    noteElement.classList.add('note')
    noteElement.innerHTML = `
        <div class="note-block">
            <div class="note__title">${valueInputTitle}</div>
            <div class="note__content">${valueInputContent}</div>
        </div>
        <div class="detete-btn">
            <i class="fa-light fa-trash"></i>
        </div>
    `

    notes.appendChild(noteElement)
    inputTitle.value = ''
    inputContent.value = ''
    valueInputTitle = ''
    valueInputContent = ''

    app.classList.remove('write')
    notesEmpty.classList.add('active')
}


function toggleClass(element, className) {
    element.classList.toggle(className)
}

function noteDeletionNotification(text) {
    messageDeteleNote.classList.add('active')
    textMessage.innerText = text
}

function errorMessageWhenCreatingANote(text) {
    messageDeteleNote.classList.add('active')
    textMessage.innerText = text
    no.style.display = 'none'
    yes.innerText = 'OK'

    yes.addEventListener('click', () => {
        messageDeteleNote.classList.remove('active')
    })
}


barBtn.addEventListener('click', () => {
    navContent.classList.add('active')
    backgroundInner.classList.add('active')

    if (messageDeteleNote.classList.contains('active')) {
        messageDeteleNote.classList.remove('active')
    }
})

backgroundInner.addEventListener('click', () => {
    navContent.classList.remove('active')
    backgroundInner.classList.remove('active')
})

searchBtn.addEventListener('click', () => {
    app.classList.add('search')
    inputSearch.focus()
})

backBtn.addEventListener('click', () => {
    app.classList.remove('search')
})

addNoteBtn.addEventListener('click', () => {
    if (app.classList.contains('search')) {
        app.classList.remove('search')
    }
    notesEmpty.classList.add('active')
    app.classList.add('write')
    setTimeout(() => {
        inputTitle.focus()
    }, 500)
})

Close.addEventListener('click', () => {
    app.classList.remove('write')
    notesEmpty.classList.remove('active')
    inputTitle.value = ''
    inputContent.value = ''

    if (notes.innerText.trim() !== '') {
        notesEmpty.classList.add('active')
    }
})

content.addEventListener('click', () => {
    app.classList.remove('search')
})

inputTitle.addEventListener('change', (e) => {
    valueInputTitle = e.target.value
})

inputContent.addEventListener('change', (e) => {
    valueInputContent = e.target.value
})

doneNoteBtn.addEventListener('click', () => {

    if (valueInputTitle === '' && valueInputContent === '') {
        errorMessageWhenCreatingANote('Please enter the information!')
    } else if (valueInputTitle !== '' || valueInputContent !== '') {
        createNote()
    }
})

notes.addEventListener('click', (e) => {
    const deteteNode = e.target.closest('.detete-btn')

    if (deteteNode) {
        const noteNode = deteteNode.closest('.note')

        noteDeletionNotification('Sure you want to delete this note?')

        yes.addEventListener('click', () => {
            if (notes.contains(noteNode)) {

                notes.removeChild(noteNode)
                messageDeteleNote.classList.remove('active')

                if (notes.innerText.trim() === '') {
                    notesEmpty.classList.remove('active')
                }
            }
        })

        no.addEventListener('click', () => {
            messageDeteleNote.classList.remove('active')
        })
    }
})