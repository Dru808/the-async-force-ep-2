/*jshint esversion: 6*/




const requestResourceButton = document.querySelector('#requestResourceButton');
requestResourceButton.addEventListener('click', function() {
  const printInThisBox = document.getElementById('contentContainer');
  printInThisBox.innerHTML = '';
  const resourceTypeSelectEl = document.querySelector('#resourceType');
  const resourceId = document.querySelector('#resourceId');

  function reqInfo() {
  const requestData = JSON.parse(this.responseText);
  console.log('what this do? ', requestData);

    if(resourceTypeSelectEl.value === 'people') {

      function reqPeople() {

        function reqSpecies() {
          const requestData = JSON.parse(this.responseText);
          const species = document.createElement('p');
          printInThisBox.appendChild(species);
          species.innerHTML = requestData.name;
        }


        const requestPeopleData = JSON.parse(this.responseText);
        const nameOfPerson = document.createElement('h2');
        printInThisBox.appendChild(nameOfPerson);
        nameOfPerson.innerHTML = requestPeopleData.results[resourceId.value - 1].name;

        const gender = document.createElement('p');
        printInThisBox.appendChild(gender);
        gender.innerHTML = requestPeopleData.results[resourceId.value - 1].gender;

        const oReqSpecies = new XMLHttpRequest();
        const goToSpecies = requestPeopleData.results[resourceId.value - 1].species;
        oReqSpecies.addEventListener('load', reqSpecies);
        oReqSpecies.open('GET' , goToSpecies);
        oReqSpecies.send();
      }

      const oReqPeople = new XMLHttpRequest();
      oReqPeople.addEventListener('load', reqPeople);
      oReqPeople.open('GET' , 'http://swapi.co/api/people/');
      oReqPeople.send();

    } else if(resourceTypeSelectEl.value === 'planets') {

        function reqPlanets() {

          const requestData = JSON.parse(this.responseText);
          const nameOfPlanet = document.createElement('h2');
          const planetName = requestData.results[resourceId.value - 1].name;
          nameOfPlanet.innerHTML = planetName;
          printInThisBox.appendChild(nameOfPlanet);

          const terrain = document.createElement('p');
          const planetTerrain = requestData.results[resourceId.value - 1].terrain;
          terrain.innerHTML = planetTerrain;
          printInThisBox.appendChild(terrain);


          const population = document.createElement('p');
          const planetPopulation = requestData.results[resourceId.value - 1].population;
          population.innerHTML = planetPopulation;
          printInThisBox.appendChild(population);

          const createUl = document.createElement('ul');
          printInThisBox.appendChild(createUl);

          const howManyFilms = requestData.results[resourceId.value - 1].films;

          for(let i = 0; i < howManyFilms.length; i++) {

            function reqFilms() {
              const requestFilmData = JSON.parse(this.responseText);
              const createLi = document.createElement('li');
              createLi.innerHTML = requestFilmData.title;
              createUl.appendChild(createLi);


            }

            const oReqFilms = new XMLHttpRequest();
            const filmsPlanetWasIn = requestData.results[resourceId.value - 1].films[i];
            oReqFilms.addEventListener('load', reqFilms);
            oReqFilms.open('GET' , filmsPlanetWasIn);
            oReqFilms.send();
          }

        }

        const oReqPlanets = new XMLHttpRequest();
        oReqPlanets.addEventListener('load', reqPlanets);
        oReqPlanets.open('GET' , 'http://swapi.co/api/planets/');
        oReqPlanets.send();


    } else if(resourceTypeSelectEl.value === 'starships') {

        function reqStarships() {
          const requestStarshipData = JSON.parse(this.responseText);
          console.log('yes!! it is starship', requestStarshipData);

          const nameOfStarship = document.createElement('h2');
          nameOfStarship.innerHTML = requestStarshipData.results[resourceId.value - 1].name;
          printInThisBox.appendChild(nameOfStarship);

          const manufacturer = document.createElement('p');
          manufacturer.innerHTML = requestStarshipData.results[resourceId.value - 1].manufacturer;
          printInThisBox.appendChild(manufacturer);

          const starshipClass = document.createElement('p');
          starshipClass.innerHTML = requestStarshipData.results[resourceId.value - 1].starship_class;
          printInThisBox.appendChild(starshipClass);

          const createUl = document.createElement('ul');
          printInThisBox.appendChild(createUl);

          const howManyFilms = requestStarshipData.results[resourceId.value - 1].films.length;
            console.log('howManyFilms ', howManyFilms);
          for(let j = 0; j < howManyFilms; j++) {
            function reqFilmsOfStarships() {
              const requestFilmOfStarshipData = JSON.parse(this.responseText);
              console.log('starship films ', requestFilmOfStarshipData);
              const newLi = document.createElement('li');
              newLi.innerHTML = requestFilmOfStarshipData.title;
              createUl.appendChild(newLi);
              //put names of films here; there could be multiple film names**

            }

              const oReqFilmOfStarship = new XMLHttpRequest();
              oReqFilmOfStarship.addEventListener('load', reqFilmsOfStarships);
              oReqFilmOfStarship.open('GET' , requestStarshipData.results[resourceId.value - 1].films[j]);
              oReqFilmOfStarship.send();


          }


        }

        const oReqStarship = new XMLHttpRequest();
        oReqStarship.addEventListener('load', reqStarships);
        oReqStarship.open('GET' , requestData.starships);
        console.log('oReqStarship ', oReqStarship);
        oReqStarship.send();


    }

  }

  const oReq1 = new XMLHttpRequest();
  oReq1.addEventListener('load', reqInfo);
  oReq1.open('GET' , 'http://swapi.co/api/');
  oReq1.send();

  console.log('resourceId ', resourceId.value);
  console.log(resourceTypeSelectEl.value);
});