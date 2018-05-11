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

function creaOggetto(ogg, penultimo)
{
    
    var oggetto = document.createElement('div');
    //var link = document.createElement('a');
    var img = document.createElement('img');
    var contenuto = document.createElement('div');
    var testo = document.createElement('p');
    
   console.log(ogg);
   //console.log(MakeImgOggPath(ogg.id_oggetto, ogg.url));
    
    $(oggetto).attr({
        'class': 'object quarter container margin-bottom',
        'id': ogg.id_oggetto
    });

    /*$(img).attr({
        'src': 'http://daas.marconirovereto.it/QROggetti/' +ogg.id_oggetto +'/' +ogg.immagini[0],
        //'src': MakeImgOggPath(ogg.id_oggetto, all.url),
        'style': 'width:100%;height:350px;object-fit: cover' 
    }).appendTo(link);*/

    $(img).attr({
        'src': 'http://daas.marconirovereto.it/QROggetti/' +ogg.id_oggetto +'/' +ogg.immagini[0],
        //'src': MakeImgOggPath(ogg.id_oggetto, all.url),
        'style': 'width:100%;height:33.33333%;object-fit: cover' 
    }).appendTo(oggetto);

    $(testo).text(ogg.modello.ITA).appendTo(contenuto);

    //$(contenuto).attr('class', 'container white').appendTo(link);
    $(contenuto).attr('class', 'container white').appendTo(oggetto);
    
    /*$(link).attr({
        'href':'http://daas.marconirovereto.it/QROggetti/' +ogg.id_oggetto +'/' +ogg.immagini[0], //Link pagina dettaglio oggetto
    }).appendTo(oggetto)*/
    console.log("Penultimo:"+penultimo + "  Oggetto:"+oggetto);
    $(penultimo).append(oggetto); //Penultimo serve per selezionare la row corretta in cui mettere l'immagine e la didascalia di ogni oggetto

}

function popolaGriglia()
{
    //console.log(DB);

    for(i = 0; i < DB.length; i++)                                  //Ciclo per scorrere tutti gli oggetti
    {
        if(i % 4 == 0)
        {
            var riga = document.createElement('div');               //Crea la riga per contenere gli oggetti
            $(riga).attr({                                          //                                  
                'class': 'row-padding',                             //  
            });                                                     //
            $('#griglia').append(riga);                             //

            var secondoLivello = document.createElement('div');     //Crea la riga per la visualizzazione di secondo livello
            $(secondoLivello).attr({                                //
                'class': 'row-padding',                             //
                'style': 'height: 30%;',                            //
                'id' : 'row' + i/4                                  //
            }).hide();                                              //
            $('#griglia').append(secondoLivello);                   //
        }

        creaOggetto(DB[i],riga);                                    //Chiamata al metodo che aggiunge un oggetto alla volta nella prima riga

    }

    $(".object").click(function(e) {                                //Metodo per gestire il comportamento della visualizzazione di secondo livello

        var item = $(this); 
        console.log(item.parent());

        if(!item.hasClass('visualized'))                            //Se la visualizzazione di secondo livello non è visualizzata per un elemento
        {
            closeActive();                                          //Si chiude la visualizzazione di secondo livello 

            item.parent().next().attr({'class':'row-padding active'}).show();           //Si mostra la riga per la visualizzazione di secondo livello 
            item.attr({'class':'object quarter container margin-bottom visualized'});   //L'oggetto visualizzato riceve una class con l'aggiunta di visualized

            popolaSecondoLivello(item); //Si popola la visualizzazione di secondo livello
        }
        else
        {
            closeActive();  //Se invece la visualizzazione di secondo livello è già visualizzata per un elemento, allora si chiude la visualizzazione di secondo livello e basta
        }
      });
}

function closeActive()
{
    $('.active').attr({'class':'row padding'}).hide(); //Si nasconde la riga per la visualizzazione di secondo livello
    $('.visualized').attr({'class':'object quarter container margin-bottom'}) //Si fa tornare la class dell'oggetto precedentemente visualizzato al suo stato originale 

}

function popolaSecondoLivello(item)
{
    var id = parseInt(item.context.id.split("_")[1]);
    var ogg = DB[id-1];

    var lvl2 = item.parent().next().empty();
    
    var div = document.createElement('div');
    var img = document.createElement('img');
    var contenuto = document.createElement('div');
    var titolo = document.createElement('h2');
    var descrizione = document.createElement('p'); 
    var link = document.createElement('a');



    //Popola il primo div all'interno della visualizzazione di secondo livello
    $(img).attr({
        'src': 'http://daas.marconirovereto.it/QROggetti/' +ogg.id_oggetto +'/' +ogg.immagini[0],
        'style': 'width:100%;height:350px;object-fit: cover' 
    }).appendTo(div);
    $(div).attr({
        'class': 'third container margin-bottom',
    }).appendTo(lvl2);

    
    //Popola il secondo div all'interno della visualizzazione di secondo livello    
    $(titolo).text(ogg.modello.ITA).appendTo(contenuto);
    $(descrizione).html(ogg.descrizione.ITA).appendTo(contenuto);
    //<a href="#portfolio" onclick="close()" class="bar-item button padding text-teal"><i class="fa fa-th-large fa-fw margin-right"></i>PORTFOLIO</a> 
    $(link).attr({
        'class':'bar-item button padding text-teal keep-reading',
        'href': './object.html' +'?code='+ogg.id_oggetto
    }).text('Continua a leggere...').appendTo(contenuto);
    $(contenuto).attr({'class':'twothird container'}).appendTo(lvl2);
}

function grigliaConSala(id_sala)
{
    for(i = 0; i < DB.length; i++)
    {        
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
