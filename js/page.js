let title = sessionStorage.getItem("MangaTitle");
console.log(title);
getPage(title)

let currPage = 1;
let chapter = 1

// let pageFile = "page" + pages[currPage-1] + ".png";

// console.log(pageFile);

function chapterJump() {
    
}

function home() {
    window.location.assign("index.html");
}

async function getPage(title) {
    try {
        const response = await fetch('../json/' + title + ".json");

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // console.log(data);

        const paper = document.getElementById("paper");
        const docTitle = document.getElementById("chapter");
        const docPage = document.getElementById("page");


        if (currPage > data[chapter].pages) {
            // console.warn('No more pages in chapter');
            currPage = 1;
            chapter++;
        }

        docTitle.innerHTML = "Chapter " + chapter + ": " + data[chapter].title;
        docPage.innerHTML = currPage;
        document.title = data[0].title + " Chapter " + chapter;

        //! If there is anything wrong, It's not my fault because I didn't make it
        if (data[chapter] && data[chapter].pages && currPage > 0) {
            let type = encodeURIComponent(data[0].type);
            let genre = encodeURIComponent(data[0].genre);
            let title = encodeURIComponent(data[0].title);
            // let pageNum = data[chapter].pages[currPage - 1];
            if (currPage < 10) {pageNum = String(currPage).padStart(2, '0');}
            else {pageNum = currPage.toString();}
            console.log(pageNum);
            let pageLoc = `../${type}/${genre}/${title}/chapter${chapter}/${pageNum}.jpg`;
            // console.log("Loading image from:", pageLoc);
            paper.style.backgroundImage = "url(" + pageLoc + ")";
            // Then load it into your image element
        } else {
            console.error("Invalid chapter/page data");
        }
        
    } catch (error) {
        console.error('Error fetching JSON:', error);
    }
}