'use strict';

let parent = document.getElementById('images-parent');
let FirstImageElement = document.getElementById('first-image');
let SecondImageElement = document.getElementById('second-image');
let ThirdImageElement = document.getElementById('third-image');


let maxAttempts = 25;
let userAttemptsCounter = 0;

// the random number index for the first image
let FirstImageIndex;

// the random number index for the second image
let SecondImageIndex;

// the random number index for the third image
let ThirdImageIndex;

let previusPicOne;
let previusPicTow;
let previusPicThree;


let imgNames = [];
let votes = [];
let shows = [];

function Bus_mall(name, file) {
  this.name = name;
  this.file = file;
  this.votes = 0;
  this.show = 0;
  imgNames.push(this.name);
  Bus_mall.allpic.push(this);

}
// will contain all of the pic that will be created

Bus_mall.allpic = [];

function updateStorage() {
  console.log(Bus_mall.allpic);

  let arrayString = JSON.stringify(Bus_mall.allpic);

  localStorage.setItem('Images', arrayString);

}

function getImages() {
  // get the data from the local storage
  let data = localStorage.getItem('Images');

  // convert them back to a normal array of objects
  let ImageData = JSON.parse(data);
  if(ImageData){
    Bus_mall.allpic = ImageData;

  }

}


new Bus_mall('bag', 'img/bag.jpg');
new Bus_mall('banana', 'img/banana.jpg');
new Bus_mall('bathroom', 'img/bathroom.jpg');
new Bus_mall('boots', 'img/boots.jpg');
new Bus_mall('breakfast', 'img/breakfast.jpg');
new Bus_mall('bubblegum', 'img/bubblegum.jpg');
new Bus_mall('chair', 'img/chair.jpg');
new Bus_mall('cthulhu', 'img/cthulhu.jpg');
new Bus_mall('dog-duck', 'img/dog-duck.jpg');
new Bus_mall('dragon', 'img/dragon.jpg');
new Bus_mall('pen', 'img/pen.jpg');
new Bus_mall('pet-sweep', 'img/pet-sweep.jpg');
new Bus_mall('scissors', 'img/scissors.jpg');
new Bus_mall('shark', 'img/shark.jpg');
new Bus_mall('sweep', 'img/sweep.png');
new Bus_mall('tauntaun', 'img/tauntaun.jpg');
new Bus_mall('unicorn', 'img/unicorn.jpg');
new Bus_mall('usb', 'img/usb.gif');
new Bus_mall('water-can', 'img/water-can.jpg');
new Bus_mall('wine-glass', 'img/wine-glass.jpg');



function generateRandomIndex() {
  return Math.floor(Math.random() * Bus_mall.allpic.length);
}


function renderThreeImages() {
  FirstImageIndex = generateRandomIndex();
  SecondImageIndex = generateRandomIndex();
  ThirdImageIndex = generateRandomIndex();

  while (FirstImageIndex === SecondImageIndex || SecondImageIndex === ThirdImageIndex || FirstImageIndex === ThirdImageIndex
    || FirstImageIndex === previusPicOne || FirstImageIndex === previusPicTow || FirstImageIndex === previusPicThree
    || SecondImageIndex === previusPicOne || SecondImageIndex === previusPicTow || SecondImageIndex === previusPicThree
    || ThirdImageIndex === previusPicOne || ThirdImageIndex === previusPicTow || ThirdImageIndex === previusPicThree) {
    FirstImageIndex = generateRandomIndex();
    SecondImageIndex = generateRandomIndex();
    ThirdImageIndex = generateRandomIndex();

  }
  previusPicOne = FirstImageIndex;
  previusPicTow = SecondImageIndex;
  previusPicThree = ThirdImageIndex;

  // make the source for the first, second ,third image equal to the random pic source

  FirstImageElement.src = Bus_mall.allpic[FirstImageIndex].file;
  SecondImageElement.src = Bus_mall.allpic[SecondImageIndex].file;
  ThirdImageElement.src = Bus_mall.allpic[ThirdImageIndex].file;

  if (userAttemptsCounter <= maxAttempts) {

    Bus_mall.allpic[FirstImageIndex].show++;
    Bus_mall.allpic[SecondImageIndex].show++;
    Bus_mall.allpic[ThirdImageIndex].show++;

  }
  // console.log(Bus_mall.allpic[ThirdImageIndex].show);

}
renderThreeImages();



let button = document.getElementById('btn');
parent.addEventListener('click', handleUserClick);


function handleUserClick(event) {
  // adding attempts
  userAttemptsCounter++;
  // console.log(userAttemptsCounter);

  if (userAttemptsCounter <= maxAttempts) {

    if (event.target.id === 'first-image') {
      Bus_mall.allpic[FirstImageIndex].votes++;

    } else if (event.target.id === 'second-image') {
      Bus_mall.allpic[FirstImageIndex].votes++;

    }

    else if (event.target.id === 'third-image') {
      Bus_mall.allpic[FirstImageIndex].votes++;

    }
    // console.log(Bus_mall.allpic);
    renderThreeImages();


  } else {
    // // stop the clicking
    parent.removeEventListener('click', handleUserClick);
    button.addEventListener('click', show);

    for (let i = 0; i < Bus_mall.allpic.length; i++) {

      votes.push(Bus_mall.allpic[i].votes);
      shows.push(Bus_mall.allpic[i].show);
    }
    updateStorage();
    chart();


  }

}

function show() {

  let list = document.getElementById('listResult');
  for (let i = 0; i < Bus_mall.allpic.length; i++) {
    let picResult = document.createElement('li');

    list.append(picResult);

    picResult.textContent = `${Bus_mall.allpic[i].name} has ${Bus_mall.allpic[i].votes} votes and ${Bus_mall.allpic[i].show} shows`;
  }
  button.removeEventListener('click', show);

}


function chart() {
  let ctx = document.getElementById('myChart');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: imgNames,
      datasets: [{
        label: '# of Votes',
        data: votes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      },
      {
        label: '# of Shows',
        data: shows,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

}
getImages();
