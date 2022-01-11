const  UNCOMPLETED_LIST_BOOK_ID = "belumDiBaca";
const COMPLETED_LIST_BOOK_ID = "selesaiDiBaca";
const CARI_BUKU = "searchBook";
const BOOK_ID = "idBuku";

function makeList(title, author,year, isComplete){
    const txtTitle = document.createElement('h3');
    txtTitle.innerText = title;

    const txtAuthor = document.createElement('p');
    txtAuthor.innerText = author;

    const txtYear = document.createElement('p');
    txtYear.innerText = year;

    const txtArticle = document.createElement('article');
    txtArticle.classList.add('isi_buku');
    txtArticle.append(txtTitle,txtAuthor,txtYear);

    const txtContainer = document.createElement('div');
    txtContainer.classList.add("isi_rak");
    txtContainer.append(txtArticle);

    if(isComplete){
        txtContainer.append(createBelumSelesai(),
        createRemoveBook(),
        );
    } else {
        txtContainer.append(createSelesaiBaca(),
        createRemoveBook(),
        );
    }
    return txtContainer;

}

function createBelumSelesai(){
    return createButton("ijo", function (event){
        belumSelesaiBaca(event.target.parentElement);
    },"BELUM SELESAI");

}
function createRemoveBook(){
    return createButton("merah", function(event){
        hapusBuku(event.target.parentElement);
    }, "HAPUS");
}
function createSelesaiBaca(){
    return createButton("ijo", function(event){
        selesaiBaca(event.target.parentElement);
    },"SELESAI");
}
function createButton(buttonTypeClass, eventListener, text){
    const button = document.createElement('button');
    button.classList.add(buttonTypeClass);
    button.addEventListener('click', function(event){
        eventListener(event);
        event.stopPropagation();
    });
    let  content = text;
    button.textContent = content;
    return button;
}

function addBook(){
    const uncompletedListBook = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    const completedListBook = document.getElementById(COMPLETED_LIST_BOOK_ID);
    let title = document.getElementById("inputJudul").value;
    let author = document.getElementById("inputPenulis").value;
    const year = document.getElementById("inputTahun").value;
    const isCompleted = document.getElementById("inputSelesaiBaca").checked;
    const book = makeList(title, author, year, isCompleted);
    
    const bookObject = composeObject(title,author,year, isCompleted);
    book[BOOK_ID] = bookObject.id , bookObject.title;
    belumBaca.push(bookObject);
    if(isCompleted){
        completedListBook.append(book);    
    } else{
    uncompletedListBook.append(book);
    }
    updataLocalStorage();
}
function selesaiBaca(bookElement){
    
    const completedListBook = document.getElementById(COMPLETED_LIST_BOOK_ID);
    const judul = bookElement.querySelector(".isi_buku h3").innerText;
    const penulis = bookElement.querySelectorAll(".isi_buku p")[0].innerText;
    const tahun = bookElement.querySelectorAll(".isi_buku p")[1].innerText;
    const newBook = makeList(judul,penulis,tahun, true);
    const book = cariBuku(bookElement[BOOK_ID]);
    book.isCompleted = true;
    newBook[BOOK_ID] = book.id;
    completedListBook.append(newBook);
    bookElement.remove();
    updataLocalStorage();
    
}

function hapusBuku(bookElement){
    const whereBook = cariBukuKe(bookElement[BOOK_ID]);
    belumBaca.splice(whereBook, 1);
    bookElement.remove();
    updataLocalStorage();
}
function belumSelesaiBaca(bookElement){
    const uncompletedListBook = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    const judul = bookElement.querySelector(".isi_buku h3").innerText;
    const penulis = bookElement.querySelectorAll(".isi_buku p")[0].innerText;
    const tahun = bookElement.querySelectorAll(".isi_buku p")[1].innerText;
    const newBook = makeList(judul,penulis,tahun, false);

    const book = cariBuku(bookElement[BOOK_ID]);
    book.isCompleted = false;
    newBook[BOOK_ID] = book.id;

    uncompletedListBook.append(newBook);
    bookElement.remove();
    updataLocalStorage();
}


function refreshRak(){
    const uncompletedListBook =  document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    let completedListBook = document.getElementById(COMPLETED_LIST_BOOK_ID);

    for(book of belumBaca){
        const newBook = makeList(book.title,book.author,book.year,book.isCompleted);
        newBook[BOOK_ID] = book.id;
        if(book.isCompleted){
            completedListBook.append(newBook);
        } else {
            uncompletedListBook.append(newBook);
        }
    }
}