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

        // Recommended Start
        let cat = document.getElementById('categories'), div = document.createElement('div'), h2 = document.createElement('h2'),
        ul = document.createElement('ul');
        ul.id = 'item-list';
        for (let i = 0; i < data[0].items.length && i < 3; i++) {
            let h2 = document.createElement('h2'), li = document.createElement('li'), img = document.createElement('img');
            h2.textContent = '';
            let node = document.createTextNode(data[0].title[i]);
            h2.append(node);
            li.append(img);
            img.src = '../' + data[0].links[i] + '/chapter1/01.jpg';
            li.append(h2);
            li.className = 'item';
            li.onclick = function() {sessionStorage.setItem("MangaTitle", data[0].items[i]); window.location.assign("manga.html");}
            ul.append(li);
        }
        h2.textContent = '';
        let node = document.createTextNode(data[0].group);
        h2.append(node);
        div.append(h2);
        div.append(ul);
        div.id = data[0].group;
        cat.append(div);
        // Recommended End

        // Others Start
        for (let l = 1; l < data.length; l++) {
            let cat = document.getElementById('categories'), div = document.createElement('div'), h2 = document.createElement('h2'),
            ul = document.createElement('ul'), node = document.createTextNode(data[l].group);

            ul.id = 'item-list'
            // let itList = document.getElementById('item-list');

            for (let i = 0; i < data[l].items.length && i < 3; i++) {
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

createItem(0);