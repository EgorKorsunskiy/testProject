import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IHits, IImageResponse } from 'src/assets/interfaces/ImageResponseInterface';


@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.css']
})
export class ImageDetailComponent implements OnInit {
  @ViewChild('ImageContainer') ImageContainerEl:ElementRef;

  url:URL;

  imageUrl:string;
  author:string;
  downloads:number;
  favorites:number;
  likes:number;

  constructor(private _http:HttpClient) { }

  ngOnInit(): void {
    this.url = this.GetUrl();

    this.MakeRequest(this.url.searchParams.get('image'));
  }

  GetUrl(): URL{
    return new URL(decodeURI(window.location.href));
  }

  MakeRequest(Requesturl:string):void{
     this._http.get<IImageResponse>(Requesturl)
     .subscribe(data => {
      let obj: IHits = data.hits.find(el => el.id == parseInt(this.url.searchParams.get('id'), 10));
      this.imageUrl = obj.webformatURL;
      this.author = obj.user;
      this.downloads = obj.downloads;
      this.favorites = obj.favorites;
      this.likes = obj.likes;

      if(window.innerWidth < obj.webformatWidth){
        this.ImageContainerEl.nativeElement.classList.add('scroll');
      }
    })
  }

}
