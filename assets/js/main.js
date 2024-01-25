const app = document.querySelector('.app')
const homeHeader = document.querySelector('.home-header')
const barBtn = document.querySelector('.bar-btn')
const backBtn = document.querySelector('.back-btn')
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
const deteteBtn = document.querySelector('.delete-btn')
const no = document.querySelector('.no')
const yes = document.querySelector('.yes')
const messageDeteleNote = document.querySelector('.message')
const textMessage = document.querySelector('.message > .text')
const searchInput = document.querySelector('.search-input')
const showSearch = document.querySelector('.show-search')
const showSearchResult = document.querySelector('.show-search__result')

let valueInputTitle = ''
let valueInputContent = ''
let id = 0
const ArchiveNotes = []



function archiveNotes(id, title, content) {
    var noteNew = {
        'id': id,
        'title': title,
        'content': content
    }

    console.log(noteNew.title)
    console.log(noteNew.content)

    const isDuplicate = ArchiveNotes.some(note => {
        note.title === noteNew.title && note.content === noteNew.content
    })

    if (!isDuplicate) {
        console.log('done')
        ArchiveNotes.push(noteNew)
    }
    
    console.log(ArchiveNotes)
}

function assignValues(value_1, value_2) {
    inputTitle.value = value_1
    inputContent.value = value_2
    valueInputTitle = value_1
    valueInputContent = value_2
}

function renderSearch(data) {
    const htmls = data.map(childData => {
        return `
        <div class="note" data-index = ${childData.id}>
            <div class="note-block">
            <div class="note__title">${childData.title}</div>
            <div class="note__content">${childData.content}</div>
            </div>
            <div class="delete-btn">
            <i class="fa-light fa-trash"></i>
            </div>
        </div>
        
        `
    })
    showSearchResult.innerHTML = htmls.join('')
}

function createNote() {

    const noteElement = document.createElement('div')

    noteElement.classList.add('note')

    noteElement.innerHTML = `
    <div class="note-block">
    <div class="note__title">${valueInputTitle}</div>
    <div class="note__content">${valueInputContent}</div>
    </div>
    <div class="delete-btn">
    <i class="fa-light fa-trash"></i>
    </div>
    `
    notes.appendChild(noteElement)

    noteElement.setAttribute('data-index', `${id}`)
    archiveNotes(id, valueInputTitle, valueInputContent)
    id++

    assignValues('', '')

    notesEmpty.classList.add('active')

    app.classList.remove('write')
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
    searchInput.focus()
})

backBtn.addEventListener('click', () => {
    app.classList.remove('search')
    content.style.display = searchInput.value === '' ? 'block' : 'none'
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
    const deteteNode = e.target.closest('.delete-btn')
    const noteNode = e.target.closest('.note')


    if (noteNode && !deteteNode) {
        const titleNoteValue = noteNode.querySelector('.note__title').innerText.trim()
        const contentNodeValue = noteNode.querySelector('.note__content').innerText.trim()

        app.classList.add('write')
        setTimeout(() => {
            inputTitle.focus()
        }, 500)

        assignValues(titleNoteValue, contentNodeValue)

        doneNoteBtn.addEventListener('click', () => {
           console.log(ArchiveNotes.id)

            if (notes.contains(noteNode)) {
                
                notes.removeChild(noteNode)
            }
        })

    }

    if (deteteNode && noteNode) {

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

searchInput.addEventListener('input', (e) => {
    
    const value = e.target.value

    showSearch.style.display = value !== '' ? 'flex' : 'none'
    content.style.display = value === '' ? 'block' : 'none'
    let searchResults  = ArchiveNotes.filter(note => {
        const titleMacth = note.title.toLowerCase().includes(value.toLowerCase())
        const contentMacth = note.content.toLowerCase().includes(value.toLowerCase())
        return titleMacth || contentMacth
    })
    
    renderSearch(searchResults)
    console.log(searchResults)


    
})