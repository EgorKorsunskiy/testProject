export interface IHits{
    id: number
    pageURL: string
    type: string
    tags: string
    previewURL: string
    previewWidth: number
    previewHeight: number
    webformatURL: string
    webformatWidth: number
    webformatHeight: number
    largeImageURL: string
    fullHDURL: string
    imageURL: string
    imageWidth: number
    imageHeight: number
    imageSize: number
    views: number
    downloads: number
    favorites: number
    likes: number
    comments: number
    user_id: number
    user:string
    userImageURL:string
}
export interface IImageResponse{
    total:number
    totalHits: number
    hits: IHits[]
}