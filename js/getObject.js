
var server = "http://daas.marconirovereto.it/QROggetti/";

function addRow(label, value) {
    return "<tr><td class='td_sx'>" + label + "</td><td class='td_dx'>" + value + "</td></tr>"
}

function createIndex() {

    var s = "<table border=1 class='idxtable'>";

    for (var i in DB) {
        cnt = eval(i) + 1;
        tag = "<a href='#" + DB[i].id_oggetto + "'>" + cnt + ' - ' + DB[i].id_oggetto + "</a>"
        s += addRow(tag, DB[i].gruppo_made + " - " + DB[i].modello.ITA);
    }
    s += "</table>";
    s += "<br />";

    return s;
}

function MakeImgOggPath2(id, img) {
    return server + id + "/" + id + "-" + img + ".jpg";
}

function MakeImgOggPath(id, img) {
    return server + id + "/" + img;
}

function MakeAllegatiPath(id, allegato) {
    return server + id + "/" + allegato;
}

function MakeAllegatiURL(id_oggetto, all) {
    switch (all.tipo) {
        case 0:
            return "<audio controls><source src='" + MakeAllegatiPath(id_oggetto, all.url) + "' type='audio/mpeg'></audio>";;
        case 1:
            return '<video width="320" height="240" controls><source src="' + MakeAllegatiPath(id_oggetto, all.url) +'" type="video/mp4"></video>'; 
        case 2:
            return "<img src='" + MakeImgOggPath(id_oggetto, all.url) + "' width='128px' />"; 
        case 3:
            return '<a href="' + all.url + '">' + all.url +'</a>';
        default:
            return "???" + url;
    }
    return;
}

function creaInfoLivello3(ogg) {
    var s = "";

    document.getElementById("header").innerHTML = "<h2>" + ogg.modello.ITA + "</h2>";
    s += "<table style='text-align:left'>";
    if (ogg.nazione.length > 0) {
         s += "<tr><th width=110px><p><i>Nazione:</i></p></th><td><p>" + ogg.nazione + "</p></td></tr>";
    }
    if (ogg.data_prod.length > 0) s += "<tr><th><p><i>Data produzione:</i></p></th><td><p>" + ogg.data_prod + "</p></td></tr>";
    if (ogg.autore.length > 0) s += "<tr><th><p><i>Autore:</i></p></th><td><p>" + ogg.autore + "</p></td></tr>";
    if (ogg.provenienza.length > 0) s += "<tr><th><p><i>Provenienza:</i></p></th><td><p>" + ogg.provenienza + "</p></td></tr>";
    if (ogg.calibro.length > 0) s += "<tr><th><p><i>Calibro:</i></p></th><td><p>" + ogg.calibro + "</p></td></tr>";
    if (ogg.note.length > 0) s += "<tr><th><p><i>Note:</i></p></th><td><p>" + ogg.note + "</p></td></tr>";
    if (ogg.descrizione.ITA.length > 0) s += "<tr><th style='vertical-align:top'><p><i>Descrizione:</i></p></th><td><p>" + ogg.descrizione.ITA + "</p></td></tr>";
    if (ogg.misure.ITA.length > 0) s += "<tr><th style='vertical-align:top'><p><i>Misure:</i></p></th><td><p>" + ogg.misure.ITA + "</p></td></tr>";
    s += "</table>";


    /*var testFolder = server + ogg.id;
    var fs = require('fs');
    
    fs.readdirSync(testFolder).forEach(file => {
      console.log(file);
    });*/

    s += "<h3 style='text-align:center'>Immagini</h3>";
    var type;
    if (ogg.immagini.length >= 4) {
        type = "quarter";
    } else if (ogg.immagini.length == 3) {
        type = "third";
    } else {
        type = "half";
    }
    for (var i = 0; i < ogg.immagini.length; i++) {
        s += "<div  class='" + type + " container margin-bottom' onclick='openModal()' ><img src=" + MakeImgOggPath2(ogg.id_oggetto, i+1) + " style='width:100%;height:100%;object-fit: cover'" + " class='hover-opacity'>" + "</div>";
    }

    if (ogg.allegati.length > 0) {
        s += "<h3 style='text-align:center'>Allegati</h3>";
        for (var i = 0; i < ogg.allegati.length; i++) {
            //console.log(ogg.allegati[i].tipo);
            //console.log(ogg.allegati[i].url);
            //console.log(ogg.allegati[i].descrizione_breve.ITA);
        }
    }
    
    return s;
}


function getJsonFromUrl() {
    var query = location.search.substr(1);
    var result = {};
    query.split("&").forEach(function(part) {
      var item = part.split("=");
      result[item[0]] = decodeURIComponent(item[1]);
      
    });
    return result;
  }

$(function() {
    //per la ricerca c'è il metodo Trova, gli si passa la string della barra di ricerca con quel che vogliono cercare e lu la cerca in giro nei determinati campi
    var result = getJsonFromUrl();    
    var id = parseInt(result.code.split("_")[1]); 

    $('#info').append(creaInfoLivello3(DB[id-1])); //togliere il numero e lasciare result.id per usare il qr
});


// When the user clicks on the button, open the modal 
function openModal() {
    console.log("OPEN");
    document.getElementById('myModal').style.display = "block";
}

// When the user clicks on <span> (x), close the modal
function closeModal () {
    console.log("CLOSE");
    document.getElementById('myModal').style.display = "none";
}
