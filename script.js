const divID = document.getElementById('city')
const selector = document.getElementById('select-city')
const selectLocate = document.querySelector('select')
let result = document.querySelector('option')
result = selector.value
let selectValues;
divID.style.display = 'none'
const divStreetID = document.getElementById('street')
divStreetID.style.display = 'none'

let queryLocate

let adress = document.getElementById('adress')

let cityCode = ""

function btn_postalCodeGET() {
  selectLocate.innerHTML=""
  queryLocate = document.getElementById('postalCode').value
  const url = "https://api-adresse.data.gouv.fr/search/?q=postcode=" + queryLocate + "&type=municipality"
  $.get(url, postalCode).done(function() {
    //alert( "second success" );
  })
    .fail(function() {
      alert("erreur lors de la requête");
    })
    .always(function() {
      //alert( "finished" );
    });
}

const postalCode = function(data) {
  console.log(data)
  console.log(divID) //<= Regarde ce que donne ça ;), Alex : Merci Jérémy //
  divID.style.display = ''
  data.features.forEach(e => {
    selector.innerHTML += `<option class="city" value="` + e.properties.citycode + `" id="` +  e.properties.city + `">` + e.properties.city + "</option>"
  })

}


// Construction du bouton onclick VILLE //
function select_cityGET() {
  console.log(selectLocate)

  // TEST //
  selectLocate.addEventListener('change', (event) => {
    const paraID = document.getElementById('cityResult')
    result = `${event.target.value}`
    divStreetID.style.display = ''
    console.log(result)
    cityCode = result
    paraID.setAttribute("id",`${event.target.value}`)
    console.log(cityCode)
    paraID.innerHTML = result
    
    //fin test//
  });
}

function select_adresseGET() {
  adress = adress.value
  adress = adress.trim()
  adress = adress.split(" ")
  adress = adress.join("+")
  console.log(adress)
  queryLocate = document.getElementById('postalCode').value
  const url = "https://api-adresse.data.gouv.fr/search/?q=" + adress +"&citycode=" + cityCode + "&city=" + selector.value
  console.log(url)
    $.get(url, adressMatch).done(function() {
    //alert( "second success" );
  })
    .fail(function() {
      alert("erreur lors de la requête");
    })
    .always(function() {
      //alert( "finished" );
    });
}

const adressMatch = function adressMatch(data) {
  console.log(data)
  data.features.forEach(e => {
    divStreetID.innerHTML += `<div class="block"> <button>` + e.properties.name + `</button></div>`
  }) // test du ForEACH
  console.log(adress)
}
  // TESTER UN INPUT ONCHANGE
  // let queryLocateCity = queryLocate.querySelector('main > div > p > button').value //
  //console.log(queryLocateCity)  CONSOLE LOG QUE LEVES (Code postal : 28 300)








  // A UTILISER POUR PLUS TARD ? REQUETE VILLE + CODE POSTAL //
/*  const url = "https://api-adresse.data.gouv.fr/search/?q=city=" + queryLocateCity
  $.get(url).done(function() {
    //alert( "second success" );
  })
    .fail(function() {
      alert("error");
    })
    .always(function() {
      //alert( "finished" );
    }); */