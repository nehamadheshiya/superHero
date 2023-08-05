
( async function () {

    let heroId = localStorage.getItem('idKey');

    let url = `https://gateway.marvel.com/v1/public/characters/${heroId}?apikey=c2595c6e10b8e75e6bd3b3c61b14547c&hash=77964d9b5c2bef6213992685d7c2dfd4&ts=1`

    /* fetch data from marvel api */
    await fetch(url)
        .then((response) => response.json())
        .then((data) => showMoreInfo(data))
        .catch((error) => console.log('error', error));

})();

function showMoreInfo(object) {
    let characterDetails = object.data.results;
    console.log(characterDetails[0]);

    let imgUrl = characterDetails[0].thumbnail.path + '.jpg';
    document.querySelector('.heroImg').src = imgUrl;
    

    document.querySelector('.name').innerHTML = characterDetails[0].name;

    if(characterDetails[0].description == "") {
        document.querySelector('.desc').innerHTML = 'Sorry description not available for this character';
    }else {
        document.querySelector('.desc').innerHTML = characterDetails[0].description;
    }

    document.querySelector('.charID').innerHTML = characterDetails[0].id;
    document.querySelector('.comicNo').innerHTML = characterDetails[0].comics.available;
    document.querySelector('.seriesNo').innerHTML = characterDetails[0].series.available;
    document.querySelector('.storiesNo').innerHTML = characterDetails[0].stories.available;

}