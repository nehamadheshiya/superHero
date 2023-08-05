
let searchCharacter = document.querySelector('input[type="search"]');
let searchButton = document.querySelector('button[type="submit"]');

searchButton.addEventListener('click', async function(event) {
    event.preventDefault();
    let searchedItem = searchCharacter.value;
    
    let url = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${searchedItem}&apikey=c2595c6e10b8e75e6bd3b3c61b14547c&hash=77964d9b5c2bef6213992685d7c2dfd4&ts=1`

    /* fetch data from marvel api */
    await fetch(url)
    .then( (response) => response.json())
    .then( (data) => showCharacter(data))
    .catch ( (error) => console.log('error',error));


    /* alternate method to fetch api */
    // let xhrRequest = new XMLHttpRequest();
    // xhrRequest.open('get', url);
    // xhrRequest.send();

    // xhrRequest.onload = function() {
    //     let resultObject = JSON.parse(xhrRequest.response);
    //     console.log(resultObject);
    // }

});


let allSuperheroContainer = document.querySelector('#allSuperheroContainer');
let template = document.querySelector('#templates');

function showCharacter(object) {

    /* to show hero when homepage reload => preserve data*/
    let allHeroValue = JSON.stringify(object);
    localStorage.setItem('homeHero', allHeroValue);

    /* remove all previous serached result */
    allSuperheroContainer.innerHTML = "";

    let heroDetailsTemplate = template.content.querySelector('.singleHeroContainer');
    
    /* required information from json */
    let charactersArray = object.data.results;

    /* no result found */
    if(charactersArray.length == 0) {
        alertResult("Sorry, No result found.");
    }

    /* loop in charactersArray --------------- */
    for(let i = 0; i < charactersArray.length; i++) {
        let heroId =  charactersArray[i].id;
        // console.log(charactersArray[i]);
        
        /* adding template to DOM */
        let heroDetails = document.importNode(heroDetailsTemplate, true);
        heroDetails.querySelector('.name').innerHTML = charactersArray[i].name;
        let imgUrl = charactersArray[i].thumbnail.path + '.jpg';
        heroDetails.querySelector('.heroImg').src = imgUrl;

        allSuperheroContainer.appendChild(heroDetails);

        /* setting local storage for favourite page when favourite button is clicked-------- */
        heroDetails.querySelector('.favourite').addEventListener('click', function(e) {
            e.preventDefault();

            /* local storage key is id of searched character and value is "object.data.results"*/
            let value = JSON.stringify(charactersArray[i]);
            
            /* checking if already added to favourite page */
            let alertMessage;
            if(localStorage.getItem(heroId) === null) {
                alertMessage = "Succesfully! Added to Favourite";
            }else {
                alertMessage = "Already Added to Favourite";
            }
            
            localStorage.setItem(heroId, value);
            alertModal(alertMessage);

            /* when favourite button clicked */
            heroDetails.querySelector('.favourite').style.backgroundColor = '#00a06d';
            heroDetails.querySelector('.favourite').innerHTML = 'Added';
            
        })

        /* event listener for more info button ------------------- */
        heroDetails.querySelector('.info').addEventListener('click', function(e){
            e.preventDefault();

            localStorage.setItem('idKey', heroId);  /* key is idKey(string) and value heroId(e.g. 184728) */
            window.location.assign('./info.html');
        })
    }

}

/* wehen page reload preserve data */
let obj = localStorage.getItem('homeHero');
let actualObj = JSON.parse(obj);
showCharacter(actualObj);


/* alert notification for added to Favourite */
function alertModal(alertMessage) {
    let toggle = document.getElementById("alertBox");
    toggle.innerText = alertMessage;
    toggle.className = "show";
    setTimeout(function(){ toggle.className = toggle.className.replace("show", ""); }, 3000);
}

/* alert no result found */
function alertResult(alertMessage) {
    let toggle = document.getElementById("alertBox");
    toggle.innerText = alertMessage;

    toggle.style.backgroundColor = 'hsla(0, 100%, 58%, 0.9)';
    toggle.style.minWidth = '300px';
    toggle.style.padding = '20px';
    toggle.className = "show";
    toggle.style.bottom = '300px'

    setTimeout(function(){ toggle.className = toggle.className.replace("show", ""); }, 3000);
}
