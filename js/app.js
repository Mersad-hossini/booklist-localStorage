let $ = document
let titleBook = $.getElementById("title")
let authorBook = $.getElementById("author")
let bookReleased = $.getElementById("year")
let addBookBtn = $.getElementById("add-book")
let deleteBookBtn = $.getElementById("delete-all")
let tbodyBook = $.getElementById("book-list")
let bookArry = []

function addBook(event) {
    event.preventDefault()

    let titleValue = titleBook.value        
    let authorValue = authorBook.value    
    let releasedValue = bookReleased.value   

    if (titleValue.trim() && authorValue.trim() && releasedValue.trim()) {
        let bookObj = {
            id: bookArry.length + 1,
            title: titleValue,
            author: authorValue,
            year: releasedValue
        }

        bookArry.push(bookObj)
    
        titleBook.value = ""
        authorBook.value = ""    
        bookReleased.value = ""
    
        setToLocalStorage(bookArry)
        bookGenerator(bookArry)
    } else {
        alert ("Please Fill all blank!!!")
    }
}

function setToLocalStorage(bookList) {
    localStorage.setItem("books" , JSON.stringify(bookList))
}

function bookGenerator(bookList) {
    let tr,thTitle,thAuthor,thYear
    tbodyBook.innerHTML = ""
    bookList.forEach(book => {
        tr = $.createElement("tr")

        thTitle = $.createElement("th")
        thTitle.innerHTML = book.title
        
        thAuthor = $.createElement("th")
        thAuthor.innerHTML = book.author
        
        thYear = $.createElement("th")
        thYear.innerHTML = book.year

        tr.append(thTitle, thAuthor, thYear)
        tbodyBook.append(tr)
    });
}

function deleteAll() {
    bookArry = []
    bookGenerator(bookArry)
    localStorage.removeItem("books")
}

function loadData() {
    let getBookData = JSON.parse(localStorage.getItem("books"))
    if(getBookData) {
        bookArry = getBookData
    } else {
        bookArry = []
    }
    bookGenerator(bookArry)
}

addBookBtn.addEventListener("click" , addBook)
deleteBookBtn.addEventListener("click" , deleteAll)
window.addEventListener("load" , loadData)