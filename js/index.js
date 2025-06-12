sessionStorage.clear();

function sendTitle(title) {
    sessionStorage.setItem("MangaTitle", title);
    window.location.assign("manga.html");
}

async function createItem() {
    try {
        const response = await fetch('../json/homePageList.json');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let data = await response.json();

        for (let l = 0; l < data.length; l++) {
            let cat = document.getElementById('categories'), div = document.createElement('div'), h2 = document.createElement('h2'),
            ul = document.createElement('ul'), node = document.createTextNode(data[l].group);

            ul.id = 'item-list'
            // let itList = document.getElementById('item-list');

            for (let i = 0; i < data[l].items.length; i++) {
                let h2 = document.createElement('h2');
                let li = document.createElement('li');
                let img = document.createElement('img');
                h2.textContent = '';
                let node = document.createTextNode(data[l].title[i]);
                h2.append(node);
                li.append(img);
                img.src = '../' + data[l].links[i] + '/chapter1/01.jpg';
                li.append(h2);
                li.className = 'item';
                li.onclick = function() {sessionStorage.setItem("MangaTitle", data[l].items[i]); window.location.assign("manga.html");}
                ul.append(li);
            }
            h2.textContent = '';
            node = document.createTextNode(data[l].group);
            h2.append(node);
            div.append(h2);
            div.append(ul);
            
            div.id = data[l].group;
            cat.append(div);
        }
        // return data;
    } catch (error) {
        console.error('Error fetching JSON:', error);
    }
}

// function createItem(currList) {
//     getShit();
//     let list = document.getElementById('item-list');
//     let div1 = document.createElement('div');
//     let div2 = document.createElement('div').id(data[currList].items[0]);
//     let h2 = document.createElement('h2');
//     let node = document.createTextNode(data[currList].items[0]);
//     console.log(div2);

//     for (let i = 0; i < data[currList].items.length; i++) {
//         node = document.createTextNode(data[currList].items[i]);
//         h2.append(node);
        
//         list.append(div1);
//     }
// }

createItem(0);