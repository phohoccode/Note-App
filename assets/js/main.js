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
const archiveBtn = document.querySelector('.archive')
const starBtn = document.querySelector('.star')
const downloadBtn = document.querySelector('.download')
const editingOptions = document.querySelector('.editing-options')
const addNoteHeader = document.querySelector('.addNote-header')
const editNoteHeader = document.querySelector('.editNote-header')
const optionInfo = document.querySelector('.option--info')
const themes = document.querySelector('.themes')

let NoteList = []
let ArchiveNotes = []
let TrashNotes = []
let StarredNotes = []
let valueInputTitle = ''
let valueInputContent = ''
let titleNoteValue = ''
let contentNodeValue = ''
let id = 0
let idToRemove = null
let idToReplace = null
let idToRestore = null
let idToArchive = null
let idToStarred = null

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

function removeNotesFromArchive(idToRemove) {
    ArchiveNotes = ArchiveNotes.filter(note => note.id !== idToRemove)
}

function removeNotesFromStarred(idToRemove) {
    StarredNotes = StarredNotes.filter(note => note.id !== idToRemove)
}

function replaceNote(idToReplace, storageElement, newTitle, newContent) {
    const indexToReplace = storageElement.findIndex(note => note.id === idToReplace);
    if (indexToReplace !== -1) {
        storageElement[indexToReplace].title = newTitle;
        storageElement[indexToReplace].content = newContent;
    }
}

function getNote(idToGet, elementToGet, storageElement) {
    let titleToGet = ''
    let contentToGet = ''

    const indexToGet = storageElement.findIndex(note => note.id === idToGet)

    if (indexToGet !== -1) {
        titleToGet = storageElement[indexToGet].title
        contentToGet = storageElement[indexToGet].content
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

function userWarningMessages(messageContent) {
    message.classList.add('active')
    app.classList.add('notification')
    textMessage.innerText = messageContent
    yes.innerText = 'OK'

    yes.addEventListener('click', () => {
        message.classList.remove('active')
        app.classList.remove('notification')
    })
}

function handleWhenTheCancelButtonIsPressed(nodeElement, className) {
    message.classList.remove('active')
    nodeElement.classList.remove('active')
    if (yes.classList.contains(className)) {
        yes.classList.remove(className)
        app.classList.remove('notification')
    }
}

function userActionNotifications(messageContent, nodeContent, className) {
    no.classList.add('active')
    message.classList.add('active')
    app.classList.add('notification')
    textMessage.innerText = messageContent
    yes.innerText = nodeContent

    no.addEventListener('click', () => {
        handleWhenTheCancelButtonIsPressed(no, className)
    })

    yes.addEventListener('click', () => {
        no.classList.remove('active')
        app.classList.remove('notification')
    })
}

function noteStatusToggleNotification(textAdd, textRemove, className, idCheckExist, storageElement) {
    no.classList.add('active')
    message.classList.add('active')
    app.classList.add('notification')

    const isExist = storageElement.find(note => note.id === idCheckExist)

    if (!isExist) {
        textMessage.innerText = textAdd
    } else {
        textMessage.innerText = textRemove
    }

    yes.innerText = 'OK'

    no.addEventListener('click', () => {
        handleWhenTheCancelButtonIsPressed(no, className)
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
    if (!isDuplicate) {
        noteElement.setAttribute('data-index', `${id}`)
        pushNotes(id, valueInputTitle, valueInputContent)
        notes.appendChild(noteElement)

        app.classList.remove('write')
        notesEmpty.classList.add('active')
        assignValues('', '')
        id++
    } else {
        userWarningMessages('Ghi chú đã tồn tại!')
        app.classList.add('write')
    }
    console.log('them', NoteList, 'id', id)
}

function renderNotes(data, targetElement) {
    targetElement.innerHTML = ''
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
        `
    })
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

function handleNoteEditing(targetElement, storageElement, valueTitle, valueContent, id) {
    replaceNote(id, storageElement, valueTitle, valueContent);

    renderNotes(storageElement, targetElement)

    app.classList.remove('write', 'edit');
    notesEmpty.classList.add('active');

    id = null
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
    })
})

optionInfo.addEventListener('click', () => {
    optionInfo.classList.toggle('active')
})

themes.addEventListener('click', (e) => {
    const theme = e.target.closest('.theme')

    if (theme) {
        document.querySelector('.theme.active').classList.remove('active')
        theme.classList.add('active')

        if (theme.classList.contains('theme--dark')) {
            app.classList.add('theme-dark')
        } else if (theme.classList.contains('theme--light')) {
            app.classList.remove('theme-dark')
        }

    }
})


barBtn.addEventListener('click', () => {
    navContent.classList.add('active')
    backgroundInner.classList.add('active')
})

backgroundInner.addEventListener('click', () => {
    navContent.classList.remove('active')
    backgroundInner.classList.remove('active')

    if (optionInfo.classList.contains('active')) {
        optionInfo.classList.remove('active')
    }
})

searchBtn.addEventListener('click', () => {
    app.classList.add('search')
    searchInput.focus()
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

    if (app.classList.contains('archiveNote')) {
        renderNotes(ArchiveNotes, archiveNotes)
    }

    if (app.classList.contains('starredNote')) {
        renderNotes(StarredNotes, starredNotes)
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

            if (NoteList.length === 0 && ArchiveNotes.length === 0 && StarredNotes.length === 0) {
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
        userWarningMessages('Vui lòng nhập nội dung!')
    } else if (valueInputTitle !== '' || valueInputContent !== '' && !doneNoteBtn.classList.contains('edit')) {
        createNote()
    }
})

searchInput.addEventListener('input', (e) => {

    const value = e.target.value

    if (!app.classList.contains('archiveNote') && !app.classList.contains('trashNote') && !app.classList.contains('starredNote')) {
        handleTheNoteSearchEvent(NoteList, notes, value)
    }

    if (app.classList.contains('trashNote')) {
        handleTheNoteSearchEvent(TrashNotes, trashNotes, value)
    }

    if (app.classList.contains('archiveNote')) {
        handleTheNoteSearchEvent(ArchiveNotes, archiveNotes, value)
    }


    if (app.classList.contains('starredNote')) {
        handleTheNoteSearchEvent(StarredNotes, starredNotes, value)
    }
})

noteTypes.forEach(note => {
    note.addEventListener('click', (e) => {
        const deteteNode = e.target.closest('.delete-btn')
        const noteNode = e.target.closest('.note')

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

                        handleNoteEditing(notes, NoteList, valueInputTitle, valueInputContent, idToReplace)
                    }

                    if (app.classList.contains('archiveNote')) {
                        console.log(valueInputTitle)
                        console.log(valueInputContent)

                        handleNoteEditing(archiveNotes, ArchiveNotes, valueInputTitle, valueInputContent, idToReplace)
                    }

                    if (app.classList.contains('starredNote')) {
                        console.log(valueInputTitle)
                        console.log(valueInputContent)

                        handleNoteEditing(starredNotes, StarredNotes, valueInputTitle, valueInputContent, idToReplace)
                    }

                });
            } else if (noteNode && !deteteNode && app.classList.contains('trashNote')) {
                titleNoteValue = noteNode.querySelector('.note__title').innerText.trim()
                contentNodeValue = noteNode.querySelector('.note__content').innerText.trim()

                idToRestore = Number(noteNode.dataset.index)

                userActionNotifications('Không thể chỉnh sửa ghi chú trong thùng rác!\nBạn có muốn khôi phục ghi chú này không?', 'Khôi phục', 'restore')

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

                userActionNotifications('Bạn chắn chắn muốn xóa ghi chú này?', 'OK', 'delete')
                yes.classList.add('delete')
                const yesDelete = document.querySelector('.yes.delete')

                yesDelete.addEventListener('click', () => {
                    if (yesDelete.classList.contains('delete')) {

                        if (!app.classList.contains('archiveNote') && !app.classList.contains('trashNote') && !app.classList.contains('starredNote')) {

                            getNote(idToRemove, TrashNotes, NoteList)
                            removeNotes(idToRemove)
                            handleTheNoteDeletionEvent(notes, NoteList, yesDelete, 'delete', noteNode, idToRemove)
                            console.log('xoa', NoteList)
                            console.log('trash', TrashNotes)
                            renderNotes(NoteList, notes)
                        }

                        if (app.classList.contains('archiveNote')) {

                            removeNotesFromArchive(idToRemove)
                            console.log('archive', ArchiveNotes)
                            handleTheNoteDeletionEvent(archiveNotes, ArchiveNotes, yesDelete, 'detele', noteNode, idToRemove)
                            renderNotes(ArchiveNotes, archiveNotes)
                        }


                        if (app.classList.contains('trashNote')) {

                            removeNotesFromTrash(idToRemove)
                            console.log('trash', TrashNotes)
                            handleTheNoteDeletionEvent(trashNotes, TrashNotes, yesDelete, 'delete', noteNode, idToRemove)
                            renderNotes(TrashNotes, trashNotes)
                        }

                        if (app.classList.contains('starredNote')) {

                            removeNotesFromStarred(idToRemove)
                            console.log('starred', StarredNotes)
                            handleTheNoteDeletionEvent(starredNotes, StarredNotes, yesDelete, 'detele', noteNode, idToRemove)
                            renderNotes(StarredNotes, starredNotes)
                        }
                    }
                })
            }
        }
    })
})

editingOptions.addEventListener('click', (e) => {
    const archiveNote = e.target.closest('.archive')
    const starredNote = e.target.closest('.star')
    const downloadNode = e.target.closest('.download')
    const noteActive = document.querySelector('.note.active')

    if (noteActive) {

        if (archiveNote) {
            
            idToArchive = Number(noteActive.dataset.index)
            noteStatusToggleNotification('Ghi chú sẽ thêm vào mục lưu trữ!', 'Ghi chú sẽ xóa khỏi mục lưu trữ!', 'archive', idToArchive, ArchiveNotes)
            yes.classList.add('archive')
            const yesArchive = document.querySelector('.yes.archive')
            
            yesArchive.addEventListener('click', () => {
                if (yesArchive.classList.contains('archive')) {

                    if (!app.classList.contains('archiveNote') && !app.classList.contains('trashNote') && !app.classList.contains('starredNote')) {

                        getNote(idToArchive, ArchiveNotes, NoteList)
                        removeNotes(idToArchive)
                        handleTheNoteDeletionEvent(notes, NoteList, yesArchive, 'archive', noteActive, idToArchive)
                        renderNotes(NoteList, notes)
                        app.classList.remove('write', 'edit')
                        console.log('archiveNote', ArchiveNotes)
                        console.log('noteList', NoteList)
                    }

                    if (app.classList.contains('archiveNote')) {
                        
                        getNote(idToArchive, NoteList, ArchiveNotes)
                        removeNotesFromArchive(idToArchive)
                        handleTheNoteDeletionEvent(archiveNotes, ArchiveNotes, yesArchive, 'archive', noteActive, idToArchive)
                        renderNotes(ArchiveNotes, archiveNotes)
                        app.classList.remove('write', 'edit')
                        console.log('archiveNote', ArchiveNotes)
                        console.log('noteList', NoteList)
                    }

                    if (app.classList.contains('starredNote')) {

                        getNote(idToArchive, ArchiveNotes, StarredNotes)
                        removeNotesFromStarred(idToArchive)
                        handleTheNoteDeletionEvent(starredNotes, StarredNotes, yesArchive, 'archive', noteActive, idToArchive)
                        renderNotes(StarredNotes, starredNotes)
                        app.classList.remove('write', 'edit')
                        console.log('archiveNote', ArchiveNotes)
                        console.log('starred', StarredNotes)
                    }
                }

            })
        }

        if (starredNote) {
            idToStarred = Number(noteActive.dataset.index)
            noteStatusToggleNotification('Ghi chú sẽ thêm vào mục ghi chú có gắn sao!', 'Ghi chú sẽ xóa khỏi mục ghi chú có gắn sao!', 'starred', idToStarred, StarredNotes)
            yes.classList.add('starred')
            const yesStarred = document.querySelector('.yes.starred')
            yesStarred.addEventListener('click', () => {
                if (yesStarred.classList.contains('starred')) {

                    if (!app.classList.contains('archiveNote') && !app.classList.contains('trashNote') && !app.classList.contains('starredNote')) {

                        getNote(idToStarred, StarredNotes, NoteList)
                        removeNotes(idToStarred)
                        handleTheNoteDeletionEvent(notes, NoteList, yesStarred, 'starred', noteActive, idToStarred)
                        renderNotes(NoteList, notes)
                        console.log('starredNote', StarredNotes)
                        console.log('noteList', NoteList)
                        app.classList.remove('write', 'edit')
                    }

                    if (app.classList.contains('archiveNote')) {
                        
                        getNote(idToStarred, StarredNotes, ArchiveNotes)
                        removeNotesFromArchive(idToStarred)
                        handleTheNoteDeletionEvent(archiveNotes, ArchiveNotes, yesStarred, 'starred', noteActive, idToStarred)
                        renderNotes(ArchiveNotes, archiveNotes)
                        app.classList.remove('write', 'edit')
                        console.log('archiveNote', ArchiveNotes)
                        console.log('noteList', NoteList)
                    }

                    if (app.classList.contains('starredNote')) {

                        getNote(idToArchive, NoteList, StarredNotes)
                        removeNotesFromStarred(idToArchive)
                        handleTheNoteDeletionEvent(starredNotes, StarredNotes, yesStarred, 'starred', noteActive, idToStarred)
                        renderNotes(StarredNotes, starredNotes)
                        app.classList.remove('write', 'edit')
                        console.log('archiveNote', ArchiveNotes)
                        console.log('starred', StarredNotes)
                    }
                }
            })
        }

        if (downloadNode) {
            titleNoteValue = noteActive.querySelector('.note__title').innerText.trim()
            contentNodeValue = noteActive.querySelector('.note__content').innerText.trim()

            console.log(noteActive, ':', titleNoteValue, ':', contentNodeValue)

            const downloadElement = document.createElement('a')

            downloadElement.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(titleNoteValue + '\n' + contentNodeValue) 
            downloadElement.setAttribute('download', `${titleNoteValue}.txt`)
            app.appendChild(downloadElement)
            downloadElement.click()

            setTimeout(() => {
                if (app.contains(downloadElement)) {
                    app.removeChild(downloadElement)
                }
            }, 1000)

            app.classList.remove('write', 'edit')

            noteActive.classList.remove('active')
        }
    }
})




