let title = sessionStorage.getItem("MangaTitle");
console.log(title);
getPage(title)
let data;

let currPage = 1;
let chapter = 1

// let pageFile = "page" + pages[currPage-1] + ".png";

// console.log(pageFile);

function chapterJump() {
    
}

function home() {
    window.location.assign("index.html");
}

function parseHash() {
    const hash = window.location.hash.substring(1); // Remove '#'
    const params = new URLSearchParams(hash);
    const ch = parseInt(params.get("chapter"));
    const pg = parseInt(params.get("page"));

    // Set your global chapter and currPage
    if (!isNaN(ch)) chapter = ch;
    if (!isNaN(pg)) currPage = pg;
}

async function getPage(title) {
    try {
        const response = await fetch('../json/' + title + ".json");

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        data = await response.json();
        // console.log(data);

        const paper = document.getElementById("paper");
        const docTitle = document.getElementById("chapter");
        const docPage = document.getElementById("page");


        if (currPage > data[chapter].pages) {
            currPage = 1;
            chapter++;
            if (chapter >= data.length) {console.warn("No more chapters, wait for further updates."); return;}
        }

        docTitle.innerHTML = "Chapter " + chapter + ": " + data[chapter].title;
        docPage.innerHTML = currPage;
        document.title = data[0].title + " Chapter " + chapter;
        let list = document.getElementById("chapter-list");
        let ls = document.createElement("li");
        console.log(data.length, list)
        // if (list.children >= 1) {list.removeChild();}
        chapJump = document.getElementById('ch_ju');
        chapJump.className = '';
        for (let i = 1; i < data.length; i++) {
            console.log(list.children.length, data.length)
            if (list.children.length+1 == data.length) {
                while (list.hasChildNodes()) {
                    list.removeChild(list.firstChild);
                }
            }
            list = document.getElementById("chapter-list");
            ls = document.createElement("li");
            let node = document.createTextNode("Chapter " + i + ": " + data[i].title);
            let p = document.createElement("p");
            p.append(node);
            ls.appendChild(p);
            ls.onclick = function() {
                while (list.hasChildNodes()) {
                    list.removeChild(list.firstChild);
                }
                currPage = 1;
                window.location.hash = `${title}&chapter=${i}`;
            }
            list.appendChild(ls);
            console.log(list, ls, node, i, data[i], data.length)
        }

        //! If there is anything wrong, It's not my fault because I didn't make it
        if (data[chapter] && data[chapter].pages && currPage > 0) {
            let type = encodeURIComponent(data[0].type);
            let title = encodeURIComponent(data[0].title);
            // let pageNum = data[chapter].pages[currPage - 1];
            if (currPage < 10) {pageNum = String(currPage).padStart(2, '0');}
            else {pageNum = currPage.toString();}
            // console.log(pageNum);
            let pageLoc = `../${type}/${title}/chapter${chapter}/${pageNum}.jpg`;
            // console.log("Loading image from:", pageLoc);
            paper.style.backgroundImage = "url(" + pageLoc + ")";
            paper.style.backgroundColor = "rgba(0,0,0,0)";
            window.location.hash = `${title}&chapter=${chapter}`;
            // Then load it into your image element
        }else {
            console.error("Invalid chapter/page data");
        }
        
    } catch (error) {
        console.error('Error fetching JSON:', error);
    }
}

window.addEventListener("hashchange", () => {
    parseHash();
    getPage(title);
});

// document.addEventListener("DOMContentLoaded", () => {
//     parseHash();
//     getPage("jujutsuKaisen");
// });