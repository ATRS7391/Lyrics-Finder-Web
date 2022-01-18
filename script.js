window.onload = function () {
    let elem = document.getElementById("query");
    elem.addEventListener("keydown", function (e) {
        if (e.code === "Enter" || e.code === "NumpadEnter") {  //checks whether the pressed key is "Enter"
            getQ();
        }
    });
}

function getQuery() {
    return (String(document.getElementById("query").value));
}

function getLyrics(query) {
    let url = "https://atrs7391.herokuapp.com/api/v2/lyrics?api_key=public&query=" + encodeURIComponent(query);
    fetch(url).then((response) => {
        return response.json();
    }).then((data) => {
        // console.log(data);
        if (data.status === 200 && data.success === true) {
            document.getElementById('mainBody').innerHTML = `
            <div class="mainContainer">
            <div id="title"></div>
            <div id="artist"></div>
            <div id="lyrics"></div>
            <div id="source"></div>
            `
            document.getElementById('title').innerHTML = (data.results.title).replaceAll("\n", "<br>");
            document.getElementById('artist').innerHTML = (data.results.main_artist).replaceAll("\n", "<br>");
            document.getElementById('lyrics').innerHTML = (data.results.lyrics).replaceAll("\n", "<br>");
            document.getElementById('source').innerHTML = 'Lyrics provided by ' + (data.results.source).replaceAll("\n", "<br>");
        } else {
            document.getElementById('mainBody').innerHTML = `
            <div class="mainContainer">
            <div id="title"></div>
            <div id="artist"></div>
            <div id="lyrics"></div>
            <div id="source"></div>
            `
            document.getElementById('title').innerHTML = 'Sadly, no lyrics found. ';
            document.getElementById('artist').innerHTML = 'Make sure it has lyrics or try to be more specific. ';
        }

    }).catch((error) => {
        document.getElementById('mainBody').innerHTML = `
        <div class="mainContainer">
        <div id="title"></div>
        <div id="artist"></div>
        <div id="lyrics"></div>
        <div id="source"></div>
        `
        document.getElementById('title').innerHTML = 'Oh no, something went wrong. Please try later. ';
        document.getElementById('artist').innerHTML = 'Try checking internet, or it might be internal system error. Sorry!';
    });
}

function getQ() {
    let q = getQuery();
    if (q.replace(/\s/g, '').length === 0) {
        document.getElementById('mainBody').innerHTML = `
        <div class="mainContainer">
        <div id="title"></div>
        <div id="artist"></div>
        <div id="lyrics"></div>
        <div id="source"></div>
        `
        document.getElementById('title').innerHTML = 'Search for something... ';
        document.getElementById('artist').innerHTML = 'Your query is empty... ';
        return;
    }
    document.getElementById('mainBody').innerHTML = `
            <div class="loadersss">
            <div class="loader"></div>
            </div>
            `
    getLyrics(q);
}
