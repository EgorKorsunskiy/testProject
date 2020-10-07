const url         = new URL(decodeURI(document.location));
const id          = url.searchParams.get('id');
const inputValue  = url.searchParams.get('search');
const count       = url.searchParams.get('count');

window.onload = function(){
    let xhr       = new XMLHttpRequest();
    let imageSize = (window.innerWidth <= 640)?'webformatURL':'largeImageURL';
    xhr.open('GET', encodeURI(`https://pixabay.com/api/?key=18601823-36af0fdddc3ba24537f0e57fc&q=${inputValue}&per_page=${count}`));
    xhr.send();

    xhr.onerror = function(){
        alert('Oppss :(');
    }
    xhr.onload = function(){
        let src = JSON.parse(xhr.response).hits.find((el) => el.id == id)[imageSize];
        let img = document.createElement('img');
        img.src = src;

        document.body.append(img);
    }
}