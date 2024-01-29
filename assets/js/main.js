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
const doneEditBtn = document.querySelector('.doneEditNote-btn')
const deteteBtn = document.querySelector('.delete-btn')
const message = document.querySelector('.message')
const textMessage = document.querySelector('.message > .text')
const searchInput = document.querySelector('.search-input')
const showSearch = document.querySelector('.show-search')
const showSearchResult = document.querySelector('.show-search__result')
const messageOptions = document.querySelector('.message__options')
const no = document.querySelector('.no')
const yes = document.querySelector('.yes')



let valueInputTitle = ''
let valueInputContent = ''
let renderNote = ``
let id = 0
let ArchiveNotes = []


function pushNotesToTheNoteArchive(id, title, content) {
    var noteNew = {
        'id': id,
        'title': title,
        'content': content
    }
    ArchiveNotes.push(noteNew)
}


function removeNotesFromTheNotesArchive(idRemove) {
    ArchiveNotes = ArchiveNotes.filter(note => note.id !== idRemove)
}

function replaceNote(idReplace, newTitle, newContent) {
    ArchiveNotes[idReplace].title = newTitle
    ArchiveNotes[idReplace].content = newContent
}


function assignValues(value_1, value_2) {
    inputTitle.value = value_1
    inputContent.value = value_2
    valueInputTitle = value_1
    valueInputContent = value_2
}

function noteDeletionNotification(text) {
    message.classList.add('active')
    textMessage.innerText = text
    yes.classList.add('delete')
}

function duplicateNotes(text) {
    message.classList.add('active')
    textMessage.innerText = text
    yes.innerText = 'OK'
    yes.addEventListener('click', () => {
        message.classList.remove('active')
    })
}

function errorMessageWhenCreatingANote(text) {
    message.classList.add('active')
    textMessage.innerText = text
    yes.innerText = 'OK'

    yes.addEventListener('click', () => {
        message.classList.remove('active')
    })
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

    let isDuplicate = ArchiveNotes.some(note => {
        return note.title === valueInputTitle && note.content === valueInputContent
    })
   

    // nếu ghi chú không trùng
    if (!isDuplicate) {
        noteElement.setAttribute('data-index', `${id}`)
        pushNotesToTheNoteArchive(id, valueInputTitle, valueInputContent)
        notes.appendChild(noteElement)
        renderNote = notes.innerHTML
        app.classList.remove('write')
        assignValues('', '')
        notesEmpty.classList.add('active')
        id++
    } else {

        duplicateNotes('Ghi chú đã tồn tại!')
        app.classList.add('write')
    }
    console.log('them', ArchiveNotes, 'id', id)

    
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
    notes.innerHTML = htmls.join('')
}

barBtn.addEventListener('click', () => {
    navContent.classList.add('active')
    backgroundInner.classList.add('active')

    if (message.classList.contains('active')) {
        message.classList.remove('active')
    }
})

backgroundInner.addEventListener('click', () => {
    navContent.classList.remove('active')
    backgroundInner.classList.remove('active')
})

searchBtn.addEventListener('click', () => {
    app.classList.add('search')
    renderNote = notes.innerHTML
    searchInput.focus()
    console.log(renderNote)
    
})

backBtn.addEventListener('click', () => {
    app.classList.remove('search')
    searchInput.value = ''
    notes.innerHTML = renderNote
   
})

addNoteBtn.addEventListener('click', () => {
    if (app.classList.contains('search')) {
        app.classList.remove('search')
    }
    notesEmpty.classList.add('active')
    app.classList.add('write')
   
    setTimeout(() => {
        inputTitle.focus()
    }, 400)
})

Close.addEventListener('click', () => {
    app.classList.remove('write', 'active', 'edit')
    notes.innerHTML = renderNote
    searchInput.value = ''
    inputTitle.value = ''
    inputContent.value = ''

    if (notes.innerText.trim() !== '') {
        notesEmpty.classList.add('active')
    }
})

inputTitle.addEventListener('change', (e) => {
    valueInputTitle = e.target.value
})

inputContent.addEventListener('change', (e) => {
    valueInputContent = e.target.value
})

doneNoteBtn.addEventListener('click', () => {
    if (valueInputTitle === '' && valueInputContent === '') {
        errorMessageWhenCreatingANote('Vui lòng nhập nội dung!')
    } else if (valueInputTitle !== '' || valueInputContent !== '' && !doneNoteBtn.classList.contains('edit')) {
        createNote()
    } 
})


notes.addEventListener('click', (e) => {
    const deteteNode = e.target.closest('.delete-btn')
    const noteNode = e.target.closest('.note') 


    if (noteNode && !deteteNode) {
        let titleNoteValue = noteNode.querySelector('.note__title').innerText.trim()
        let contentNodeValue = noteNode.querySelector('.note__content').innerText.trim()
        id = Number(noteNode.dataset.index)
        console.log(id)

        app.classList.add('edit', 'write')
        app.classList.remove('search')
        
        setTimeout(() => {
            inputTitle.focus()
        }, 400)

        assignValues(titleNoteValue, contentNodeValue)

        doneEditBtn.addEventListener('click', () => {

            if (notes.contains(noteNode) && !message.classList.contains('active')) {

                replaceNote(id, valueInputTitle, valueInputContent)
                console.log('replace', ArchiveNotes)
                noteNode.querySelector('.note__title').innerText = valueInputTitle
                noteNode.querySelector('.note__content').innerText = valueInputContent
                app.classList.remove('write', 'edit')
                notesEmpty.classList.add('active')

                renderNote = notes.innerHTML
            }

        })

    }

    if (deteteNode) {
        id = Number(noteNode.dataset.index)
        console.log(id)
        
        noteDeletionNotification('Bạn chắn chắn muốn xóa ghi chú này?')
        
        const yesDelete = document.querySelector('.yes.delete')
        
        yesDelete.addEventListener('click', () => {
            if (yes.classList.contains('delete')) {
            
                removeNotesFromTheNotesArchive(id)
                console.log('xoa', ArchiveNotes)
                
            }
            if (notes.contains(noteNode)) {
                
                notes.removeChild(noteNode)
                renderNote = notes.innerHTML
                message.classList.remove('active')
                
                if (notes.innerText === '') {
                    notesEmpty.classList.remove('active')
                }
            }
            yesDelete.classList.remove('delete')
        })

    }
})

searchInput.addEventListener('input', (e) => {

    const value = e.target.value
    console.log(renderNote)

    let searchResults = ArchiveNotes.filter(note => {
        const titleMacth = note.title.toLowerCase().includes(value.toLowerCase())
        const contentMacth = note.content.toLowerCase().includes(value.toLowerCase())
        return titleMacth || contentMacth
    })
    console.log(searchResults)

    renderSearch(searchResults)

})




