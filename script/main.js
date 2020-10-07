const searchContainer = document.querySelector('.search-container');
const button          = document.querySelector('.search-button');
const imagesContainer = document.querySelector('.images-container-offset');
const TextDidntFind   = document.querySelector('.images-no_result');

window.onload = function(){
    button.addEventListener('click', function(e){
        let inputValue = e.target.parentNode.children[0];
        let Image      = document.querySelectorAll('.images-item');
        let imageCount = function(){
            let heightOrWidth = (window.innerWidth >= 1000)?window.innerHeight:window.innerWidth;
            for(let i=15;i>=0;i=i-3){
                if((i/3) * (42*(heightOrWidth / 100)) <= window.innerHeight - (10*(window.innerHeight / 100))){
                    return i;
                }
            }
        }

        if(inputValue.value){
            searchContainer.classList.add('search-container-after_search');
            e.target.innerText = 'Searching';
            let xhr     = new XMLHttpRequest();

            xhr.open('GET', encodeURI(`https://pixabay.com/api/?key=18601823-36af0fdddc3ba24537f0e57fc&q=${inputValue.value}&per_page=${imageCount()}`));
            xhr.send();

            xhr.onerror = function(){
                alert('Oppss:(');
                e.target.innerText = 'Search';
            }

            xhr.onload = function(){
                e.target.innerText = 'Search';
                if(Image.length){
                    for(let i=0;i<Image.length;i++){
                        Image[i].remove();
                    }
                }
                if(!JSON.parse(xhr.response).hits.length){
                    if(TextDidntFind.classList.contains('hidden')){
                        TextDidntFind.classList.remove('hidden');
                    }
                }
                else{
                    if(!TextDidntFind.classList.contains('hidden')){
                        TextDidntFind.classList.add('hidden');
                    }
                }
                for(let el of JSON.parse(xhr.response).hits){
                    let img = document.createElement('img');

                    img.src = el.webformatURL;
                    img.classList.add('images-item');
                    AddImageEvent(img, el, inputValue.value, imageCount())

                    imagesContainer.append(img);
                }
            }
        }
        else{
            alert('Please enter something');return;
        }
    })
    function AddImageEvent(el, responseObject, inputValue, count){
        el.addEventListener('click', function(){
            document.location.href = encodeURI(`./imageDetail.html?search=${inputValue}&id=${responseObject.id}&count=${count}`)
        })
    }
}