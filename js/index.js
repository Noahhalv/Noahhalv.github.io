sessionStorage.clear();

function sendTitle(title) {
    sessionStorage.setItem("MangaTitle", title);
    window.location.assign("manga.html");
}