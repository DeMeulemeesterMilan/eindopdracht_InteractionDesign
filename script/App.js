let htmlAnimals,
  animalName,
  animalLatinName,
  animelType,
  animalDiet,
  animalHabitat,
  animalActive,
  animalGeo,
  animalPhoto,
  animalLifespan,
  animalMinLength,
  animalMaxLength,
  animalMinWeight,
  animalMaxWeight,
  previousAnimal,
  continet;

window.addEventListener('load', function () {
  setTimeout(function open(event) {
    document.querySelector('.popup').style.display = 'block';
  }, 1000);
});

const loadingAnimals = function (amount) {
  const background = document.querySelector('.js-logo-background');
  document.querySelector('.popup-loading').style.display = 'block';

  background.style.setProperty('fill', '#0F3557');
  setTimeout(init, 2300, amount);
};

const popUpChoise = function () {
  const oneAnimalButton = document.querySelector('.js-oneAnimal');
  const multipleAnimalsButton = document.querySelector('.js-multipleAnimals');
  const totalAnimals = document.querySelector('.js-totalAnimals');

  oneAnimalButton.addEventListener('click', function () {
    document.querySelector('.popup-choise').style.display = 'none';
    loadingAnimals(1);
  });

  multipleAnimalsButton.addEventListener('click', function () {
    document.querySelector('.popup-choise').style.display = 'none';
    loadingAnimals(totalAnimals.value);
  });
};

function openForm(chosenanimal) {
  document.getElementById('myForm').style.display = 'block';
  document.getElementById('myFormBackground').style.display = 'block';
  console.log(chosenanimal);
  document.querySelector('.js-body').style.setProperty('overflow-y', 'hidden');
  ShowAnimalData(chosenanimal);
  ListenToCloseButton();
}

function closeForm() {
  document.getElementById('myForm').style.display = 'none';
  document.getElementById('myFormBackground').style.display = 'none';
  continet.style.setProperty('fill', 'none');
  document.querySelector('.js-body').style.setProperty('overflow-y', 'auto');
}

const ShowAnimalData = function (chosenanimal) {
  console.log(chosenanimal);
  const length = document.querySelector('.js-Length');
  const weight = document.querySelector('.js-Weight');
  continet = document.querySelector(
    `.js-${chosenanimal.continent.replace(/\s+/g, '')}`
  );
  let weigthPercentage,
    lengthPercentage = 0;

  try {
    animalPhoto.src = chosenanimal.image;
    animalPhoto.alt = chosenanimal.name;
    animalName.innerHTML = chosenanimal.name;
    animalLatinName.innerHTML = chosenanimal.latinName;
    animelType.innerHTML = chosenanimal.type;
    animalGeo.innerHTML = chosenanimal.continent;
    animalMinLength.innerHTML = chosenanimal.minLength;
    animalMaxLength.innerHTML = chosenanimal.maxLength;
    animalMinWeight.innerHTML = chosenanimal.minWeight;
    animalMaxWeight.innerHTML = chosenanimal.maxWeight;
    continet.style.setProperty('fill', 'Red');

    weigthPercentage =
      ((chosenanimal.maxWeight - chosenanimal.minWeight) /
        chosenanimal.commonWeight) *
      100;
    lengthPercentage =
      ((chosenanimal.maxLength - chosenanimal.minLength) /
        chosenanimal.commonLength) *
      100;
    console.log(Math.round(weigthPercentage));
    console.log(Math.round(lengthPercentage));
    length.style.setProperty('width', `${Math.round(lengthPercentage)}%`);
    weight.style.setProperty('width', `${Math.round(weigthPercentage)}%`);
    previousAnimal = continet;
  } catch (error) {
    console.info(error);
  }
};

const ShowAnimals = function (jsonObject) {
  console.log(jsonObject);
  try {
    let html = '';
    for (let Animal of jsonObject) {
      html += `<div class="o-grid-item-animalcard" >
            <div class="o-layout o-layout--justify-center o-layout--align-center">
                <div class="o-layout__item">
                    <a class="o-box-link js-animal" data-animal-id="${Animal.id}">
                        <div class="o-box">
                              <h3>${Animal.type}</h3>
                        </div>
                        <div class="o-inner-box">
                            <div><img class="image-animal" src="${Animal.image}"
                                    alt="${Animal.name}" />
                            </div>
                            <p class="o-inner-box-title o-inner-box-mdtext">${Animal.name}</p>
                            <p class="o-inner-box-text o-inner-box-normaltext">${Animal.latinName}</p>
                        </div>
                    </a>
                </div>
            </div>
        </div>`;
    }
    htmlAnimals.innerHTML = html;
  } catch (ex) {
    console.info(ex);
  }
  ListenToAnimalsCard(jsonObject);
  ListenToHomeButton();
};

const ListenToAnimalsCard = function (listAnimals) {
  const htmlAnimalCards = document.querySelectorAll('.js-animal');
  for (let animals of htmlAnimalCards) {
    animals.addEventListener('click', function () {
      console.log(animals);
      const ChosenAnimal = this.getAttribute('data-animal-id');
      for (let animal of listAnimals) {
        if (animal.id == ChosenAnimal) {
          openForm(animal);
        }
      }
    });
  }
};

const ListenToHomeButton = function () {
  const htmlHome = document.querySelector('.js-home-btn');
  htmlHome.addEventListener('click', function () {
    location.reload();
  });
};

const ListenToCloseButton = function () {
  const htmlClose = document.querySelector('.js-close');
  htmlClose.addEventListener('click', function () {
    closeForm();
  });
};

const getData = (endpoint) => {
  return fetch(endpoint)
    .then((r) => r.json())
    .catch((e) => console.error(e));
};

const init = function (total) {
  const endpoint = `https://zoo-animals.azurewebsites.net/api/RandomAnimals/${total}`;

  htmlAnimals = document.querySelector('.js-animals');
  animalName = document.querySelector('.js-AnimalData-Name');
  animalLatinName = document.querySelector('.js-AnimalData-LName');
  animelType = document.querySelector('.js-AnimalData-Type');
  animalDiet = document.querySelector('.js-AnimalData-Diet');
  animalHabitat = document.querySelector('.js-AnimalData-Habitat');
  animalActive = document.querySelector('.js-AnimalData-Active');
  animalGeo = document.querySelector('.js-AnimalData-Geo');
  animalPhoto = document.querySelector('.js-AnimalData-Img');
  animalLifespan = document.querySelector('.js-AnimalData-Life');
  animalMinLength = document.querySelector('.js-AnimalData-MinL');
  animalMaxLength = document.querySelector('.js-AnimalData-MaxL');
  animalMinWeight = document.querySelector('.js-AnimalData-MinW');
  animalMaxWeight = document.querySelector('.js-AnimalData-MaxW');

  getData(endpoint).then(ShowAnimals);
  document.querySelector('.popup').style.display = 'none';
};

document.addEventListener('DOMContentLoaded', async function () {
  popUpChoise();
});
