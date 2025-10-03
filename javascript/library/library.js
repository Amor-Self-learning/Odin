let library = []
const container = document.querySelector('.container')
// Open dialog box on add new book click
const addNewBook = document.getElementById('add-new-book')
const dialog = document.querySelector('dialog')
addNewBook.addEventListener('click',() =>{
    dialog.show()
})
class Book{

    constructor (title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages; 
    this.read = read;
}
    toggle(){
            if(this.read)
                this.read = false
            else
                this.read = true
    }
    showRead(){
        if(this.read)
            return 'Completed'
        return 'Not Yet'
    }
}
// Create new Book and push it to the library
function addNewBookToLibrary(title, author, pages, read){
    const newBook = new Book(title, author, pages, Boolean(read))
    Object.defineProperty(newBook, 'id', {
        value: crypto.randomUUID()
    })
    library.push(newBook)
    displayLibrary();
}
function displayLibrary(){
  while(container.firstChild) {
    container.firstChild.remove()
  }
  for (let book of library) {
    const newBook = createBookCard(book);
      container.appendChild(newBook);
  }
  return 0;
}

const form = document.querySelector('form')
form.addEventListener('submit', (event) =>{
    event.preventDefault()

    const form = document.querySelector('form')
    const formData = new FormData(form)
    
    addNewBookToLibrary(formData.get('title'), formData.get('author'), formData.get('pages'), formData.get('read'))
    form.reset()
    dialog.close()
})


container.addEventListener('click', (e) =>{
    if(e.target.classList.contains('read-status')){
        const bookToToggle = library.filter(item => item.id === e.target.dataset.bookId)
        bookToToggle[0].toggle()
        displayLibrary() 
    }
    else if(e.target.classList.contains('del')){
        const indexOfBook = library.findIndex(item => item.id === e.target.dataset.bookId)
        library.splice(indexOfBook, 1)
        displayLibrary();
    }
})

function createBookCard(bookData) {
  const {title, author, pages, read, id} = bookData;
  const titleCard = createCard('Title : ', title);
  const authorCard = createCard('Author : ', author);
  const pageesCard = createCard('Pages : ', pages);
  const readCard = createStatus(read);

  const bookCard = document.createElement('div');
  bookCard.className = 'card bookCard'
  const readButton = document.createElement('button');
  readButton.textContent = 'Change Status';
  readButton.classList.add('read-status')
  readButton.dataset.bookId = id;
  const delButton = document.createElement('button');
  delButton.textContent = 'Remove Book';
  delButton.classList.add('del')
  delButton.dataset.bookId = id;
  const buttons = document.createElement('div');
  buttons.classList.add('buttons-holder');
  buttons.append(readButton, delButton)
  bookCard.append(titleCard, authorCard, pageesCard, readCard, buttons)
  return bookCard;
}

function createCard(title, value) {
  const card = document.createElement('div');
  card.classList.add('card');
  const label = document.createElement('span');
  label.classList.add('label');
  label.textContent = title;
  const text = document.createElement('sapn');
  text.textContent = value;
  text.classList.add('value');
  card.append(label, text)
  return card;
}

function createStatus(status) {
  if (status === true) {
    return createCard('Read : ', 'Completed')
  }
  return createCard('Read : ', 'Not Yet')
}