const selHytter = document.querySelectorAll("select"); // Lagerer alle select-elementene i en array
const resultat = document.querySelector("#resultat");
const btnRegn = document.querySelector("#btnRegn");

class Hytte{
  constructor(navn,avstander){
    this.navn = navn; // navn på hytten
    this.avstander = avstander; // Objekt med hytter som nøkler og tilhørende avstander
  }
  genererOptions(){
    let options = `<option>Velg hytte</option>`; // Oppretter en variabel options for valgene i dropdown-menyen, og legger til et option som skal stå først
    for(let key of Object.keys(this.avstander)){
      // En for-løkke som går gjennom alle nøklene i objektet this.avstander
      options += `<option ${key}>${key}</option>`; // legger til alle nøklene som valg i variablen options
    }
    return options; // returnerer options
  }
  avstand(hyttenavn){
    return this.avstander[hyttenavn]; // returnerer avstanden til et hyttenavn
  }
}

const hytter = [
  // En array som inneholder alle instansene av hyttene
  new Hytte("Gjendesheim",{"Glitterheim":22,"Memurubu":14}),
  new Hytte("Glitterheim",{"Gjendesheim":22,"Memurubu":18,"Spiterstulen":17}),
  new Hytte("Memurubu",{"Gjendesheim":14,"Glitterheim":18,"Gjendebu":10}),
  new Hytte("Gjendebu",{"Memurubu":19,"Leirvassbu":19,"Spiterstulen":24,"Olavsbu":16}),
  new Hytte("Leirvassbu",{"Gjendebu":19,"Spiterstulen":15,"Olavsbu":11}),
  new Hytte("Spiterstulen",{"Glitterheim":17,"Gjendebu":24,"Leirvassbu":15}),
  new Hytte("Olavsbu",{"Gjendebu":16,"Leirvassbu":11})
];

for(let hytte of hytter){
  // en for-løkke som skriver ut alle hyttene som options
  hytte1.innerHTML +=`
  <option value=${hytte.navn}>${hytte.navn}</option>`
}

for(let i = 0; i<selHytter.length-1; i++){
  // En for-løkke som legger til onclick på alle select-elementene utenom det siste.
  selHytter[i].onchange = function(){
    for(let hytte of hytter){ // For hver hytte i arrayen hytter:
      if(hytte.navn === selHytter[i].value){ // Hvis hytte sitt navn er lik verdien i input-feltet:
        selHytter[i+1].disabled = false; // Gjør den neste dropdown-menyen tilgjengelig
        selHytter[i+1].innerHTML = hytte.genererOptions(); // Generer options til den valgte hytten på den neste dropdown-menyen
      }
    }
  }
}

function skrivOppsummering(){
  // En funksjon som finner avstander og skriver ut en oppsummering av turen.
  resultat.innerHTML = ``; // Slett innholdet i resultat-listen
  let totalAvstand = 0; // en variabel til totalavstanden
  for(let i = 0; i<selHytter.length-1; i++){
    // en for-løkke som teller opp til en mindre enn antall select elementer
    for(let hytte of hytter){
      // En for-løkke som looper gjennom hyttene og finner den valgte hytten
      if(selHytter[i].value === hytte.navn){
        let avstand = hytte.avstand(selHytter[i+1].value) // finner avstanden til hytten som er valgt i neste dropdown.
        totalAvstand += avstand; // legger til på totalavstanden.
        resultat.innerHTML += `<li>Dag ${i+1}: ${selHytter[i].value} til ${selHytter[i+1].value}, lengde: ${avstand} km</li>`; // Lager et nytt listepunkt med en dagstur
      }
    }
  }
  resultat.innerHTML += `<li>Total lengde på turen er ${totalAvstand} km.</li>`; // Legger til et nytt listepunkt med oppsummering av hele turen.
}


btnRegn.onclick = skrivOppsummering; // Knytter funksjonen skrivOppsummering til knappen btnRegn