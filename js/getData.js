
var server = "http://daas.marconirovereto.it/QROggetti/";

/*function addRow(label, value) {
    return "<tr><td class='td_sx'>" + label + "</td><td class='td_dx'>" + value + "</td></tr>"
}*/

/*function createIndex() {

    //var s = "<table border=1 class='idxtable'>";

    for (var i in DB) {
        cnt = eval(i) + 1;
        tag = "<a href='#" + DB[i].id_oggetto + "'>" + cnt + ' - ' + DB[i].id_oggetto + "</a>"
        s += addRow(tag, DB[i].gruppo_made + " - " + DB[i].modello.ITA);
    }
    s += "</table>";
    s += "<br />";

    return s;
}*/

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

/**
 * 
 * <div class="third container margin-bottom">
    <img src="./assets/images/lights.jpg" alt="Norway" style="width:100%" class="hover-opacity">
    <div class="container white">
      <p><b>Lorem Ipsum</b></p>
      <p>Praesent tincidunt sed tellus ut rutrum. Sed vitae justo condimentum, porta lectus vitae, ultricies congue gravida diam non fringilla.</p>
    </div>
    </div>
 */

function creaOggetto(ogg)
{
    
    var oggetto = document.createElement('div');
    //var link = document.createElement('a');
    var img = document.createElement('img');
    var contenuto = document.createElement('div');
    var testo = document.createElement('p');
    
   console.log(ogg);
   //console.log(MakeImgOggPath(ogg.id_oggetto, ogg.url));
    
    $(oggetto).attr('class', 'object third container margin-bottom');

    /*$(img).attr({
        'src': 'http://daas.marconirovereto.it/QROggetti/' +ogg.id_oggetto +'/' +ogg.immagini[0],
        //'src': MakeImgOggPath(ogg.id_oggetto, all.url),
        'style': 'width:100%;height:350px;object-fit: cover' 
    }).appendTo(link);*/

    $(img).attr({
        'src': 'http://daas.marconirovereto.it/QROggetti/' +ogg.id_oggetto +'/' +ogg.immagini[0],
        //'src': MakeImgOggPath(ogg.id_oggetto, all.url),
        'style': 'width:100%;height:350px;object-fit: cover' 
    }).appendTo(oggetto);

    $(testo).text(ogg.modello.ITA).appendTo(contenuto);

    //$(contenuto).attr('class', 'container white').appendTo(link);
    $(contenuto).attr('class', 'container white').appendTo(oggetto);
    
    /*$(link).attr({
        'href':'http://daas.marconirovereto.it/QROggetti/' +ogg.id_oggetto +'/' +ogg.immagini[0], //Link pagina dettaglio oggetto
    }).appendTo(oggetto)*/

    $('#griglia .row-padding:last').append(oggetto);

}

function popolaGriglia()
{
    var riga = document.createElement('div');
    $(riga).attr({
        'class': 'row-padding',
    });
    $('#griglia').append(riga);


    //console.log('funzia');
    for(i = 0; i < DB.length; i++)
    {
        //console.log(i);
        if(i % 3 == 0 && i > 0)
        {
            var secondoLivello = document.createElement('div');
            $(secondoLivello).attr({
                'class': 'row-padding',
                'style': 'background-color:black; height: 200px; visible:false',
            }).hide();
            $('#griglia').append(secondoLivello);

            var riga = document.createElement('div');
            $(riga).attr({
                'class': 'row-padding',
            });
            $('#griglia').append(riga);


        }
        creaOggetto(DB[i]);

    }

    $(".object").click(function() {
        //Mostra row

        popolaSecondoLivello($(this));

      });
}

function popolaSecondoLivello(ogg)
{
    var newOgg = ogg;
    $('#secondoLivello').append(newOgg);
}

function grigliaConSala(id_sala)
{
    for(i = 0; i < DB.length; i++)
    {
        //console.log(i);
        if(DB[i].id_sala == id_sala)
        {
            if(i % 3 == 0 || i == 0)
            {
                var riga = document.createElement('div');
                $(riga).attr({
                    'class': 'row-padding',
                });
                $('#griglia').append(riga);
            }
            creaOggetto(DB[i]);
        }
    }
}

function grigliaConCollezione(id_collezione)
{
    for(i = 0; i < DB.length; i++)
    {
        //console.log(i);
        if(DB[i].id_collezione == id_collezione)
        {
            if(i % 3 == 0 || i == 0)
            {
                var riga = document.createElement('div');
                $(riga).attr({
                    'class': 'row-padding',
                });
                $('#griglia').append(riga);
            }
            creaOggetto(DB[i]);
        }
    }
}

/*function createTable() {

    var s = "";

    for (var i in DB) {
        ogg = DB[i];
        cnt = eval(i) + 1;
        if (ogg.id_oggetto != "QR_00xx") {
            s += "<h3>Oggetto n° " + cnt + "</h3>";
            s += "<table id='" + ogg.id_oggetto + "' border=1>";
            s += addRow("ID Oggetto", "<strong>" + ogg.id_oggetto + "</strong>");
            s += addRow("ID Collezione", ogg.id_collezione);
            s += addRow("ID Sala", ogg.id_sala);
            s += addRow("Gruppo", ogg.gruppo_made);
            s += addRow("Modello (ITA)", ogg.modello.ITA);
            s += addRow("Modello (ENG)", ogg.modello.ENG);
            s += addRow("Descrizione (ITA)", ogg.descrizione.ITA);
            s += addRow("Descrizione (ENG)", ogg.descrizione.ENG);
            s += addRow("Nazioni", ogg.nazione);
            s += addRow("Calibro", ogg.calibro);
            s += addRow("Misure (ITA)", ogg.misure.ITA);
            s += addRow("Misure (ENG)", ogg.misure.ENG);
            s += addRow("Data Prod", ogg.data_prod);
            s += addRow("Autore", ogg.autore);
            s += addRow("Provenienza", ogg.provenienza);
            s += addRow("Note", ogg.note);
            s += addRow("img1", "<img src='" + MakeImgOggPath(ogg.id_oggetto, ogg.immagini[0]) + "' width='128px' />");
            s += addRow("img2", "<img src='" + MakeImgOggPath(ogg.id_oggetto, ogg.immagini[1]) + "' width='128px' />");
            s += addRow("img3", "<img src='" + MakeImgOggPath(ogg.id_oggetto, ogg.immagini[2]) + "' width='128px' />");
            s += "</table>";
            s += "<br />";
            s += "<h4>Allegati</h4>";
            s += "<table border=1>"
            s += "<tr><th>Tipo</th><th>URL</th><th>Des ITA</th><th>Des ENG</th></tr>";
            for (var k in ogg.allegati) {
                var all = ogg.allegati[k];
                s += "<tr><td>" + all.tipo + "</td><td>"
                s += MakeAllegatiURL(ogg.id_oggetto,all) + "</td><td>"
                s += all.descrizione_breve.ITA + "</td><td>"
                s += all.descrizione_breve.ENG + "</td></tr>";
            }
            s += "</table>"
        }
        else {
            s += "<h3>Oggetto n° " + cnt + " --  da fare!</h3>";
        }
    }
    return s;
}*/