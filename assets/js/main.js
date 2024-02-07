const app = document.querySelector('.app')
const textHome = document.querySelector('.home-header .text')
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
const archiveBtn = document.querySelector('archive')
const starBtn = document.querySelector('.star')
const downloadBtn = document.querySelector('.download')

let valueInputTitle = ''
let valueInputContent = ''
let id = 0
let idToRemove = null
let idToReplace = null
let idToRestore = null
let idToDownload = null
let NoteList = []
let ArchiveNotes = []
let TrashNotes = []
let StarredNotes = []
let titleNoteValue = ''
let contentNodeValue = ''

function pushNotes(id, title, content) {
    let noteNew = {
        'id': id,
        'title': title,
        'content': content
    }
    NoteList.push(noteNew)

}

function removeNotes(idToRemove) {
    NoteList = NoteList.filter(note => note.id !== idToRemove)
}

function removeNotesFromTrash(idToRemove) {
    TrashNotes = TrashNotes.filter(note => note.id !== idToRemove)
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
    no.classList.add('active')
    message.classList.add('active')
    textMessage.innerText = text
    yes.innerText = 'OK'

    no.addEventListener('click', () => {
        message.classList.remove('active')
        no.classList.remove('active')
        if (yes.classList.contains('delete')) {
            yes.classList.remove('delete')
        }
    })
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

function errorMessageWhenEditingNotesFromTrash(text) {
    no.classList.add('active')
    message.classList.add('active')
    textMessage.innerText = text
    yes.innerText = 'Khôi phục' 

    no.addEventListener('click', () => {
        message.classList.remove('active')
        no.classList.remove('active')
        if (yes.classList.contains('restore')) {
            yes.classList.remove('restore')
        }
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

    let isDuplicate = NoteList.some(note => {
        return note.title === valueInputTitle && note.content === valueInputContent
    })


    // nếu ghi chú không trùng
    if (!isDuplicate) {
        noteElement.setAttribute('data-index', `${id}`)
        pushNotes(id, valueInputTitle, valueInputContent)
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

function renderNotes(data, targetElement) {
    targetElement.innerHTML = '';

    const htmls = data.map(note => {
        return `
            <div class="note" data-index="${note.id}">
                <div class="note-block">
                    <div class="note__title">${note.title}</div>
                    <div class="note__content">${note.content}</div>
                </div>
                <div class="delete-btn">
                    <i class="fa-light fa-trash"></i>
                </div>
            </div>
        `;
    });

    targetElement.innerHTML = htmls.join('');
}

function handleNoteTypeSelection(text, storageElement, targetElement) {
    textHome.innerText = text
    
    if (storageElement.length === 0) {
        notesEmpty.classList.remove('active')
    } else {
        notesEmpty.classList.add('active')
    }
    
    renderNotes(storageElement, targetElement)
}

function handleTheNoteDeletionEvent(targetElement, storageElement, yesNode, className, noteNode, id) {
    if (targetElement.contains(noteNode)) {
        targetElement.removeChild(noteNode)
    }
    
    if (storageElement.length === 0) {
        console.log('empty')
        notesEmpty.classList.remove('active')
    } else {
        console.log('vao else')
        notesEmpty.classList.add('active')
    }
    
    if (app.classList.contains('search')) {
        searchInput.value = ''
        app.classList.remove('search')
        renderNotes(storageElement, targetElement)
    }
    
    console.log('dowm')
    message.classList.remove('active')
    yesNode.classList.remove(className)
    id = null
    
}

function handleTheNoteSearchEvent(storageElement, targetElement, value) {
    let searchResults = storageElement.filter(note => {
        const titleMacth = note.title.toLowerCase().includes(value.toLowerCase())
        const contentMacth = note.content.toLowerCase().includes(value.toLowerCase())
        return titleMacth || contentMacth
    })
    console.log(searchResults)

    renderNotes(searchResults, targetElement)
}

optionNotes.forEach((optionNote, index) => {
    optionNote.addEventListener('click', () => {
        if (optionNote) {
            document.querySelector('.note-type.active').classList.remove('active');
            document.querySelector('.option-note.active').classList.remove('active');
            optionNote.classList.add('active');
            noteTypes[index].classList.add('active');
            navContent.classList.remove('active');
            backgroundInner.classList.remove('active');
            
            if (index === 0) {
                
                if (app.classList.contains('trashNote') || app.classList.contains('starredNote') || app.classList.contains('archiveNote')) {
                    app.classList.remove('trashNote', 'starredNote', 'archiveNote');
                }
                
                handleNoteTypeSelection('Ghi chú', NoteList, notes)
            }
            
            if (index === 1) {
                
                app.classList.add('archiveNote');
                
                if (app.classList.contains('trashNote') || app.classList.contains('starredNote')) {
                    app.classList.remove('trashNote', 'starredNote');
                }

                handleNoteTypeSelection('Lưu trữ', ArchiveNotes, archiveNotes)
            }
            
            if (index === 2) {

                app.classList.add('trashNote');

                if (app.classList.contains('archiveNote') || app.classList.contains('starredNote')) {
                    app.classList.remove('archiveNote', 'starredNote');
                }

                handleNoteTypeSelection('Thùng rác', TrashNotes, trashNotes)
            }

            if (index === 3) {

                app.classList.add('starredNote');

                if (app.classList.contains('archiveNote') || app.classList.contains('trashNote')) {
                    app.classList.remove('archiveNote', 'trashNote');
                }

                handleNoteTypeSelection('Ghi chú gắn sao', StarredNotes, starredNotes)
            }
        }
    });
});


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

    if (message.classList.contains('active')) {
        message.classList.remove('active')
    }
})

backBtn.addEventListener('click', () => {
    app.classList.remove('search')
    searchInput.value = ''

    if (!app.classList.contains('archiveNote') && !app.classList.contains('trashNote') && !app.classList.contains('starredNote')) {
        renderNotes(NoteList, notes)
    }

    if (app.classList.contains('trashNote')) {
        renderNotes(TrashNotes, trashNotes)
    }

    if (message.classList.contains('active')) {
        message.classList.remove('active')
    }

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
            renderNotes(NoteList, notes)
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

noteTypes.forEach(note => {
    note.addEventListener('click', (e) => {
        const deteteNode = e.target.closest('.delete-btn')
        const noteNode = e.target.closest('.note')
        idToDownload = Number(noteNode.dataset.index)

        if (note) {
            if (noteNode && !deteteNode && !app.classList.contains('trashNote')) {

                noteNode.classList.add('active')

                titleNoteValue = noteNode.querySelector('.note__title').innerText.trim()
                contentNodeValue = noteNode.querySelector('.note__content').innerText.trim()

                idToReplace = Number(noteNode.dataset.index)

                console.log(idToReplace)

                app.classList.add('edit', 'write')
                app.classList.remove('search')

                setTimeout(() => {
                    inputTitle.focus()
                }, 400)

                assignValues(titleNoteValue, contentNodeValue)

                console.log(valueInputTitle, ':', valueInputContent)

                doneEditBtn.addEventListener('click', () => {
                    console.log('replace', NoteList)

                    if (!app.classList.contains('archiveNote') && !app.classList.contains('trashNote') && !app.classList.contains('starredNote')) {
                        console.log(valueInputTitle)
                        console.log(valueInputContent)
                        replaceNote(idToReplace, valueInputTitle, valueInputContent);

                        renderNotes(NoteList, notes)


                        app.classList.remove('write', 'edit');
                        notesEmpty.classList.add('active');

                        idToReplace = null
                    }

                });
            } else if (noteNode && !deteteNode && app.classList.contains('trashNote')) {
                titleNoteValue = noteNode.querySelector('.note__title').innerText.trim()
                contentNodeValue = noteNode.querySelector('.note__content').innerText.trim()

                idToRestore = Number(noteNode.dataset.index)
                errorMessageWhenEditingNotesFromTrash('Không thể chỉnh sửa ghi chú trong thùng rác!\nBạn có muốn khôi phục lại không?')

                yes.classList.add('restore')
                const yesRestore = document.querySelector('.yes.restore')
                console.log(idToRemove)

                yesRestore.addEventListener('click', () => {
                    if (yesRestore.classList.contains('restore')) {

                        pushNotes(idToRestore, titleNoteValue, contentNodeValue)
                        removeNotesFromTrash(idToRestore)
                        handleTheNoteDeletionEvent(trashNotes, TrashNotes, yesRestore, 'restore', noteNode, idToRestore)
                        console.log('push', NoteList)
                        renderNotes(TrashNotes, trashNotes)
                    }
                })

            }

            if (deteteNode) {

                idToRemove = Number(noteNode.dataset.index)
                console.log(id, ':', idToRemove)
                noteDeletionNotification('Bạn chắn chắn muốn xóa ghi chú này?')
                yes.classList.add('delete')
                const yesDelete = document.querySelector('.yes.delete')

                yesDelete.addEventListener('click', () => {
                    if (yesDelete.classList.contains('delete')) {

                        if (!app.classList.contains('archiveNote') && !app.classList.contains('trashNote') && !app.classList.contains('starredNote')) {
                           
                            getNote(idToRemove, TrashNotes)
                            removeNotes(idToRemove)
                            handleTheNoteDeletionEvent(notes, NoteList, yesDelete, 'delete', noteNode, idToRemove)
                            console.log('xoa', NoteList)
                            console.log('trash', TrashNotes)
                            renderNotes(NoteList, notes)
                        }

                        if (app.classList.contains('trashNote')) {
                           
                            removeNotesFromTrash(idToRemove)
                            console.log('trash', TrashNotes)
                            handleTheNoteDeletionEvent(trashNotes, TrashNotes, yesDelete, 'delete', noteNode, idToRemove)

                            renderNotes(TrashNotes, trashNotes)
                        }
                    }
                })
            } 
        }
    })
})

downloadBtn.addEventListener('click', () => {

    const noteDownload = document.querySelector('.note.active')
    titleNoteValue = noteDownload.querySelector('.note__title').innerText.trim()
    contentNodeValue = noteDownload.querySelector('.note__content').innerText.trim()
    console.log(noteDownload, ':', titleNoteValue, ':', contentNodeValue)
    
    const downloadNode = document.createElement('a')

    downloadNode.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(titleNoteValue + '\n' + contentNodeValue)
    downloadNode.setAttribute('download', `${titleNoteValue}.txt`)
    app.appendChild(downloadNode)
    downloadNode.click()
    
    setTimeout(() => {
        if (app.contains(downloadNode)) {
            app.removeChild(downloadNode)
        }
    }, 1000)

    app.classList.remove('write', 'edit')

    noteDownload.classList.remove('active')

})


searchInput.addEventListener('input', (e) => {

    const value = e.target.value

    if (!app.classList.contains('archiveNote') && !app.classList.contains('trashNote') && !app.classList.contains('starredNote')) {
        handleTheNoteSearchEvent(NoteList, notes, value)
    }

    if (app.classList.contains('trashNote')) {
        handleTheNoteSearchEvent(TrashNotes, trashNotes, value)
    }
})




