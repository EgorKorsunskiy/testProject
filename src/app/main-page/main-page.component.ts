import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { stringify } from 'querystring';

import { IImageResponse, IHits } from '../../assets/interfaces/ImageResponseInterface'

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent{
  @ViewChild('searchContainer') searchContainerEl:ElementRef;
  @ViewChild('imagesContainer') imagesContainer:ElementRef;
  @ViewChild('searchButton') searchButtonEl:ElementRef;
  @ViewChild('noResults') noResultsEl:ElementRef;
  public Images: IHits[];
  public url: string;

  constructor(private _router:Router, private _http:HttpClient){}

  Search(e:HTMLInputElement){
    if(!e.value){
      alert('Enter something!');return;
    }

    this.searchButtonEl.nativeElement.innerText = 'Searching';
    this.url = encodeURI(`https://pixabay.com/api/?key=18601823-36af0fdddc3ba24537f0e57fc&q=${e.value}&per_page=${this.CountTheNumberOfPictures()}`);

    this.MakeRequest(this.url);
  }

  NavigateToImageDetail(obj: IHits):void{
    let currentUrl:string = this._router.serializeUrl(
      this._router.createUrlTree(['/', 'detail', '/'], {queryParams: {id: obj.id, image: this.url}})
    )

    window.open(currentUrl, '_blank');
  }
  
  MakeRequest(RequestUrl:string):void{
    this._http.get<IImageResponse>(RequestUrl)
    .subscribe(data => {
      this.searchButtonEl.nativeElement.innerText = 'Search';
      this.searchContainerEl.nativeElement.classList.add('search-container-after_search');
      if(this.ISTherePictures(data.hits)){
        return;
      }
      else{
      this.Images = data.hits;
      }
    },
      err => {
        this.searchButtonEl.nativeElement.innerText = 'Search';
        alert(`Ops, something went wrong: ${err.statusText}`);
    })
  }

  ISTherePictures(el:IHits[]):boolean{
    if(!el.length){
      if(this.noResultsEl.nativeElement.classList.contains('hidden')){
          this.noResultsEl.nativeElement.classList.remove('hidden');
          this.imagesContainer.nativeElement.children[0].classList.add('hidden');
          return false;
      }
  }
  else{
      if(!this.noResultsEl.nativeElement.classList.contains('hidden')){
        this.noResultsEl.nativeElement.classList.add('hidden');
        this.imagesContainer.nativeElement.children[0].classList.remove('hidden');
        return true;
      }
  }
  }

  CountTheNumberOfPictures():Number{
    let heightOrWidth = (window.innerWidth >= 1000)?window.innerHeight:window.innerWidth;
    for(let i=15;i>=0;i=i-3){
        if((i/3) * (42*(heightOrWidth / 100)) <= window.innerHeight - (10*(window.innerHeight / 100))){
            return i;
        }
    }
  }

}
