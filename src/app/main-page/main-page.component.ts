import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IImageResponse, IHits } from '../../assets/interfaces/ImageResponseInterface'

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent{
  public Images: IHits[];
  public url: string;

  public inputValue: string = '';

  public isSearching: boolean = false;
  public isSearchingFinished: boolean = false;
  public isNoResults: boolean = false;

  constructor(private _router:Router, private _http:HttpClient){}

  SetInputValue(e:HTMLInputElement):void{
    this.inputValue = e.value;
  }

  Search():void{
    if(!this.inputValue){
      alert('Enter something!');return;
    }

    this.isSearching = true;
    this.url = encodeURI(`https://pixabay.com/api/?key=18601823-36af0fdddc3ba24537f0e57fc&q=${this.inputValue}&per_page=${this.CountTheNumberOfPictures()}`);

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
      this.isSearching = false;
      this.isSearchingFinished = true;
      this.CheckAndTogglePictures(data.hits);
      this.Images = data.hits;
    },
      err => {
        this.isSearching = false;
        alert(`Ops, something went wrong: ${err.statusText}`);
    })
  }

  CheckAndTogglePictures(el:IHits[]):void{
    if(!el.length){
      this.isNoResults = true;
  }
    else{ 
      this.isNoResults = false;
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
