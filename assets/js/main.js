const app = document.querySelector('.app')
const optionNotes = document.querySelectorAll('.option-note')
const noteTypes = document.querySelectorAll('.note-type')
const barBtn = document.querySelector('.bar-btn')
const backBtn = document.querySelector('.back-btn')
const searchBtn = document.querySelector('.search-btn')
const navContent = document.querySelector('.nav__content')
const searchHeader = document.querySelector('.search-header')
const backgroundInner = document.querySelector('.background-inner')
const addNoteBtn = document.querySelector('.addNote-btn')
const content = document.querySelector('.content')
const Closes = document.querySelectorAll('.close')
const inputTitle = document.querySelector('.input-title')
const inputContent = document.querySelector('.input-content')
const notes = document.querySelector('.notes')
const archiveNotes = document.querySelector('.archive-notes')
const trashNotes = document.querySelector('.trash-notes')
const starredNotes = document.querySelector('.starred-notes')
const doneNoteBtn = document.querySelector('.doneNote-btn')
const notesEmpty = document.querySelector('.notes-empty')
const doneEditBtn = document.querySelector('.doneEditNote-btn')
const message = document.querySelector('.message')
const textMessage = document.querySelector('.message > .text')
const searchInput = document.querySelector('.search-input')
const showSearch = document.querySelector('.show-search')
const no = document.querySelector('.no')
const yes = document.querySelector('.yes')

let valueInputTitle = ''
let valueInputContent = ''
let id = 0
let idToRemove = null
let idToReplace = null
let NoteList = []
let ArchiveNotes = []
let TrashNotes = []
let StarredNotes = [] 

function pushNotesToTheNoteArchive(id, title, content) {
    let noteNew = {
        'id': id,
        'title': title,
        'content': content
    }
    NoteList.push(noteNew)
}

function removeNotesFromTheNotesArchive(idToRemove) {
    NoteList = NoteList.filter(note => note.id !== idToRemove)
}

function replaceNote(idToReplace, newTitle, newContent) {
    const indexToReplace = NoteList.findIndex(note => note.id === idToReplace);

    if (indexToReplace !== -1) {
        NoteList[indexToReplace].title = newTitle;
        NoteList[indexToReplace].content = newContent;
    }
}

function getNote(idToGet, elementToGet) {
    let titleToGet = ''
    let contentToGet = ''

    const indexToGet = NoteList.findIndex(note => note.id === idToGet);

    if (indexToGet !== -1) {
        titleToGet = NoteList[indexToGet].title
        contentToGet = NoteList[indexToGet].content
    }

    let notesTaken = {
        'id': idToGet,
        'title': titleToGet,
        'content': contentToGet
    }
    elementToGet.push(notesTaken)

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

    const noteElement = document.createElement('a')

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

    let isDuplicate = NoteList.some(note => {
        return note.title === valueInputTitle && note.content === valueInputContent
    })


    // nếu ghi chú không trùng
    if (!isDuplicate) {
        noteElement.setAttribute('data-index', `${id}`)
        pushNotesToTheNoteArchive(id, valueInputTitle, valueInputContent)
        notes.appendChild(noteElement)

        app.classList.remove('write')
        notesEmpty.classList.add('active')
        assignValues('', '')
        id++
    } else {

        duplicateNotes('Ghi chú đã tồn tại!')
        app.classList.add('write')
    }
    console.log('them', NoteList, 'id', id)


}

function renderAllNotes() {
    notes.innerHTML = '';

    const htmls = NoteList.map(note => {
        return `
            <a class="note" data-index="${note.id}">
                <div class="note-block">
                <div class="note__title">${note.title}</div>
                <div class="note__content">${note.content}</div>
                </div>
                <div class="delete-btn">
                <i class="fa-light fa-trash"></i>
                </div>
            </a>
        `
    });
    notes.innerHTML = htmls.join('')
}

function renderAllDeteleNotes() {
    trashNotes.innerHTML = ''

    const htmls = TrashNotes.map(trashNote => {
        return `
        <a class="note" data-index="${trashNote.id}">
            <div class="note-block">
            <div class="note__title">${trashNote.title}</div>
            <div class="note__content">${trashNote.content}</div>
            </div>
            <div class="delete-btn">
            <i class="fa-light fa-trash"></i>
            </div>
        </a>
        `
    })

    trashNotes.innerHTML = htmls.join('')
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

optionNotes.forEach((optionNote, index) => {
    optionNote.addEventListener('click', () => {
        if (optionNote) {
           document.querySelector('.note-type.active').classList.remove('active')
           document.querySelector('.option-note.active').classList.remove('active')
           optionNote.classList.add('active')
           noteTypes[index].classList.add('active')
           navContent.classList.remove('active')
           backgroundInner.classList.remove('active')
        }

        if (optionNotes[2]) {

            if (TrashNotes.length !== 0) {
                notesEmpty.classList.add('active')
            }
            renderAllDeteleNotes()
        }
    })
})

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
    searchInput.focus()
})

backBtn.addEventListener('click', () => {
    app.classList.remove('search')
    searchInput.value = ''
    renderAllNotes()


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

    assignValues('', '')
})


Closes.forEach(Close => {
    Close.addEventListener('click', () => {
        if (Close) {
            if (message.classList.contains('active')) {
                message.classList.remove('active')
            }
        
            if (NoteList.length === 0) {
                notesEmpty.classList.remove('active')
            }
        
            app.classList.remove('write', 'active', 'edit')
        
            searchInput.value = ''
            inputTitle.value = ''
            inputContent.value = ''
            renderAllNotes()
        }
    })
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
        
        idToReplace = Number(noteNode.dataset.index)

        console.log(idToReplace)

        app.classList.add('edit', 'write')
        app.classList.remove('search')

        setTimeout(() => {
            inputTitle.focus()
        }, 400)

        // assignValues(titleNoteValue, contentNodeValue)
        inputTitle.value = titleNoteValue
        inputContent.value = contentNodeValue

        console.log(valueInputTitle, ':', valueInputContent)

        doneEditBtn.addEventListener('click', () => {
            console.log('replace', NoteList)

            replaceNote(idToReplace, valueInputTitle, valueInputContent);

            // Cập nhật lại toàn bộ danh sách ghi chú
            renderAllNotes();

            app.classList.remove('write', 'edit');
            notesEmpty.classList.add('active');

            idToReplace = null
        });

    }

    if (deteteNode) {
        idToRemove = Number(noteNode.dataset.index)
        console.log(id, ':', idToRemove)
        noteDeletionNotification('Bạn chắn chắn muốn xóa ghi chú này?')

        const yesDelete = document.querySelector('.yes.delete')

        yesDelete.addEventListener('click', () => {
            if (yes.classList.contains('delete')) {

                getNote(idToRemove, TrashNotes)
                removeNotesFromTheNotesArchive(idToRemove)
                console.log('xoa', NoteList)
                console.log('trash', TrashNotes)
            }

            if (notes.contains(noteNode)) {
                notes.removeChild(noteNode)
            }

            if (NoteList.length === 0) {
                console.log('empty')
                notesEmpty.classList.remove('active')
                
            }

            if (app.classList.contains('search')) {
                searchInput.value = ''
                app.classList.remove('search')
                renderAllNotes()
            }

            idToRemove = null
            console.log(idToRemove)
            message.classList.remove('active')
            yesDelete.classList.remove('delete')
        })

    }
})

searchInput.addEventListener('input', (e) => {

    const value = e.target.value

    let searchResults = NoteList.filter(note => {
        const titleMacth = note.title.toLowerCase().includes(value.toLowerCase())
        const contentMacth = note.content.toLowerCase().includes(value.toLowerCase())
        return titleMacth || contentMacth
    })
    console.log(searchResults)

    renderSearch(searchResults)
})




