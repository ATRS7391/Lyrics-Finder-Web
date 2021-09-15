function processQuery(query) {
    urlQuery = encodeURIComponent(String(query).replace(/[^a-zA-Z ]/g, " ").replace(/  +/g, ' '));
    return String(urlQuery);
}

window.onload=function(){
var elem = document.getElementById("query");
elem.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
        getq();
    }
});}

function getQuery() {
    return (String(document.getElementById("query").value));
}

function getLyrics(query){
    url = "https://webAPIs.badasslover.repl.co/API/searchLyrics/freeLyrics/" + processQuery(query);
    fetch(url).then((response)=>{
        return response.json();
    }).then((data)=>{
        if (data.status == "success"){
            document.getElementById('mainBody').innerHTML = `
            <div class="mainContainer">
            <div id="title"></div>
            <div id="artist"></div>
            <div id="lyrics"></div>
            <div id="source"></div>
            `
            document.getElementById('title').innerHTML = (data.title).replaceAll("\n", "<br>");
            document.getElementById('artist').innerHTML = (data.mainArtist).replaceAll("\n", "<br>");
            document.getElementById('lyrics').innerHTML = (data.lyrics).replaceAll("\n", "<br>");
            document.getElementById('source').innerHTML = 'Lyrics provided by ' + (data.source).replaceAll("\n", "<br>");
        }
        else {
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

function getq() {
    var q = getQuery();
    if (q.replace(/\s/g, '').length == 0) {
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
