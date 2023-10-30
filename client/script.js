// run the script after the page is loaded

window.onload = load;

let displayTerm = "";

function load() {
    document.querySelector("#search").onclick = searchButtonClick;
}

// give the url based on the user's search
function searchButtonClick() {
    let url = "/getCardList?"
    document.querySelector("#content").innerHTML = `<p><i>No card found</i></p>`;

    if (document.querySelector("#searchterm").value == "") {
        document.querySelector("#searchterm").value = document.querySelector("#searchterm").placeholder;
    }
    let term = document.querySelector("#searchterm").value;

    // store the term the user entered
    localStorage.setItem('term', document.querySelector("#searchterm").value);
    displayTerm = term;

    term = term.trim();

    term = encodeURIComponent(term);

    if (term.length < 1) return;

    url += "fname=" + term;

    let type = document.querySelector('input[name="type"]:checked').value;
    url += "&type=" + type;

    // console.log(url);

    getListData(url);
}

// get data from the api
function getListData(url) {
    let xhr = new XMLHttpRequest();
    xhr.onload = dataLoaded;
    xhr.onerror = dataError;
    xhr.open("GET", url);
    xhr.setRequestHeader('Accept', 'application/json;charset=UTF-8');
    xhr.send();
}

function getDetailData(id) {
    let url = "/getCardInfo"
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Accept', 'application/json;charset=UTF-8');

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 400) {
            // console.log(xhr.responseText);
            showDetail(JSON.parse(xhr.responseText))
        } else {
            console.error('Request failed: ' + xhr.status);
        }
    };

    xhr.onerror = function () {
        console.error('Network error');
    };

    var data = {
        id: id
    };

    xhr.send(JSON.stringify(data));
}

function showDetail(card) {
    //show the detail of the card
    let bigstring = `
    <div class="card-detail">
        <div class="card-detail__left">
            <img src="${card.card_images[0].image_url}" alt="${card.name}" />
        </div>
        <div class="card-detail__right">
            <div class="card-detail__right__name"><strong>NAME:</strong> ${card.name}</div>
            <div class="card-detail__right__type"><strong>TYPE:</strong> ${card.type}</div>
            <div class="card-detail__right__desc"><strong>LEVEL:</strong> ${card.level}</div>
        </div>
    </div>
    `;
    document.querySelector('#detail').innerHTML = bigstring;
}

// load the data and show it to the user 
function dataLoaded(e) {
    let xhr = e.target;

    // console.log(xhr.responseText);

    let obj = JSON.parse(xhr.responseText);

    let results = obj.data;
    window.cardResults = results;

    let bigstring = results.length === 0 ? "<p><i>No card found</i></p>" : "<p><i>Here are " + results.length + " results for '" + displayTerm + "'</i></p>";

    for (let i = 0; i < results.length; i++) {
        let result = results[i];

        let smallURL = result.card_images[0].image_url_small;

        let line = `<div class='result' onclick='getDetailData(${result.id})'><img src='${smallURL}' title= '${result.name}' /><span id='name'>${result.name}</span></div>`;

        bigstring += line;
    }

    document.querySelector('#content').innerHTML = bigstring;
}

// error handler 
function dataError(e) {
    console.log("An error occurred");
}
