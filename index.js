const searchInput = document.querySelector('#search');
const container = document.querySelector('.container');
const body = document.querySelector('.main');
const loader = document.querySelector('.loader');
const formContainer = document.querySelector('.form-container');
const title = document.querySelector('.title');
const section = document.querySelectorAll('.countries-list');
let countries = [];


const getCountries = async () => {
  // Llamo a la API Rest Countries
  const response = await (await fetch ("https://restcountries.com/v3.1/all",{method:"GET"})).json()
  // Transformo la respuesta a JSON.
  
  // Guardo el array de los paises recibido dentro de contries
  countries = response
  console.log(countries);
  
} 
const getClimates = async (nombre) => {

  const respuesta = await (await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${nombre}&lang=sp, es&appid=1edc98fb7e8f3a770811db98d816e1fc`,{method:"GET"})).json()
  return respuesta
  
}
getCountries();


searchInput.addEventListener('keyup', async e => {

const filteredCountries = countries.filter(element => element.name.common.toLowerCase().startsWith(e.target.value.toLowerCase()));
container.innerHTML= ""

console.log(filteredCountries.name);
if (filteredCountries.length > 10) {
  container.innerHTML =  `<p class="not-found"> Demasiados paises especifica mejor tu busqueda </p>`
}

if (filteredCountries.length !== 0) {
  title.classList.add("quit-title")
  formContainer.classList.add("margin")
  }
  if (filteredCountries.length < 10 && filteredCountries.length > 1 ) {
    filteredCountries.forEach(element => {
      const CountryName = element.name.common;
      const Countryflag = element.flags.png;

      const CreateCountries = document.createElement("li") 
      CreateCountries.classList.add("list-item")
      console.log(CreateCountries);
      CreateCountries.innerHTML = `
     
      <div class="country-img">
      <img  class="flag" src="${Countryflag}">
      </div>
      <div class="countries-info">
      <p class="course-title">  ${CountryName} </p>
  ` ;
      container.append(CreateCountries)
    }); }


     if (filteredCountries.length === 1) {
    const clima =  await getClimates(filteredCountries[0].name.common)
    console.log(clima);
    const info = document.createElement("div")
    info.classList.add("list-item2")
    container.innerHTML =""
    info.innerHTML = `
    <div class="flag2">
    <img src="${filteredCountries[0].flags.png}" >
  </div>
  <div class="countries-info">
    <h1>Nombre: ${filteredCountries[0].name.common}</h1>
    <p>Capital: ${filteredCountries[0].capital}</p>
    <p>Población: ${filteredCountries[0].population}</p>
    <p>Continente: ${filteredCountries[0].region}</p>
    <p Zona-horaria:>${filteredCountries[0].timezones}</p>
    <p>Clima, Celcuis: ${clima.main.temp}</p>
    <p >${clima.weather[0].description}</p>
    <img  class="clima-icon" src="https://openweathermap.org/img/wn/${clima.weather[0].icon}@2x.png"${clima.weather.icon}>
  `
  container.append (info)
  };

});
 

