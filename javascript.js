document.addEventListener("DOMContentLoaded", function () {

    const sumbitForm = document.getElementById('inputBook');

    sumbitForm.addEventListener("submit", function(event){
        event.preventDefault();
        addBook();
    
    });
    if(checkLS()){
        koneksiLS();
    }
});

document.addEventListener("ondatasaved", () => {
    console.log("data berhasil disimpan");
});
document.addEventListener("ondataloaded", () => {
    refreshRak();
});