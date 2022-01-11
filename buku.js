const STORAGE_KEY = "BOOKSHELF";

let belumBaca = [];

function checkLS(){
    if(typeof(Storage) === undefined){
        window.alert("Maaf Browser tidak Mendukung ini");
        return false
    }
    return true;
}
function simpan(){
    const kel = JSON.stringify(belumBaca);
    localStorage.setItem(STORAGE_KEY, kel);
    document.dispatchEvent(new Event("ondatasaved"));
}
function koneksiLS(){
    const containerBook = localStorage.getItem(STORAGE_KEY);
    let hasil = JSON.parse(containerBook);
    if(hasil !== null)
        belumBaca = hasil;
    
    document.dispatchEvent(new Event("ondataloaded"));
}
function updataLocalStorage(){
    if(checkLS())
        simpan();
    
}
function composeObject(title, author, year, isCompleted){
    return {
        id: +new Date(),
        title,
        author,
        year,
        isCompleted
    };
}
function cariBuku(idBuku){
    for(book of belumBaca){
        if(book.id === idBuku)
            return book;
        
    }
}
function cariBukuKe(idBuku){
    let index = 0
    for(book of belumBaca){
        if(book.id === idBuku)
            return index;
        
        index++;
    }
    return -1;
}
