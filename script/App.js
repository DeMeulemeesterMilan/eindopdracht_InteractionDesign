let htmlAnimals;

window.addEventListener('load', function () {
  setTimeout(function open(event) {
    document.querySelector('.popup').style.display = 'block';
  }, 1000);
});

const popUpChoise = function () {
  const oneAnimalButton = document.querySelector('.js-oneAnimal');
  const multipleAnimalsButton = document.querySelector('.js-multipleAnimals');
  const totalAnimals = document.querySelector('.js-totalAnimals');

  oneAnimalButton.addEventListener('click', function () {
    document.querySelector('.popup').style.display = 'none';
    init(1);
  });

  multipleAnimalsButton.addEventListener('click', function () {
    document.querySelector('.popup').style.display = 'none';
    init(totalAnimals.value);
  });
};

function openForm(chosenanimal) {
  document.getElementById('myForm').style.display = 'block';
  console.log(chosenanimal);
}

function closeForm() {
  document.getElementById('myForm').style.display = 'none';
}

const ShowAnimals = function (jsonObject) {
  console.log(jsonObject);
  try {
    let html = '';
    for (let Animal of jsonObject) {
      html += `<div class="o-grid-item-animalcard">
            <div class="o-layout o-layout--justify-center o-layout--align-center">
                <div class="o-layout__item">
                    <a class="o-box-link js-animal" data-animal-id="${Animal.id}">
                        <div class="o-box">
                              <h3>${Animal.animal_type}</h3>
                        </div>
                        <div class="o-inner-box">
                            <div><img class="image-animal" src="${Animal.image_link}"
                                    alt="${Animal.name}" />
                            </div>
                            <p class="o-inner-box-title o-inner-box-mdtext">${Animal.name}</p>
                            <p class="o-inner-box-text o-inner-box-normaltext">${Animal.latin_name}</p>
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

const getData = (endpoint) => {
  return fetch(endpoint)
    .then((r) => r.json())
    .catch((e) => console.error(e));
};

const init = function (total) {
  const endpoint = `https://zoo-animal-api.herokuapp.com/animals/rand/${total}`;

  htmlAnimals = document.querySelector('.js-animals');

  getData(endpoint).then(ShowAnimals);
};

document.addEventListener('DOMContentLoaded', async function () {
  popUpChoise();
});
