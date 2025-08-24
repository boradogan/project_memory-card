import { preload } from "react-dom";
import { characterImages } from "./imageLoader.js";
import { originalCardList } from "./originalCardList.js";
//This file is going to serve as an api, which will give a random photo of a character 
export function getPhoto(name, isRandom = true){
    if(name in characterImages){
    const photoList = characterImages[name];
    const randomIndex = Math.floor(Math.random() * photoList.length);
    return photoList[randomIndex];

    } else {
        console.log(name);
        throw new Error('Folder not found with the given name')
    }
}
class PhotoApi{

    #characterImageQueue = {};
    constructor(originalCardList){
        for (const character of originalCardList) {
            this.#characterImageQueue[character.name] = [];
            // this.refillQueue(character.name, 2);
        }

    }
  
    firstQueueFill(){
        for (const character of originalCardList) {
            this.refillQueue(character.name, 2);
        }

    }
    refillQueue(name, limit){
        const currentQueueSize = this.#characterImageQueue[name].length;
        if(currentQueueSize >= limit){
            return
        }
        const numberOfRequests = limit - currentQueueSize;
        
        let requestQueue = [];
        for (let index = 0; index < numberOfRequests; index++) {
            const newImageUrl = this.#getNewPhotoUrl(name);
            preLoadImage(newImageUrl).then(image => {
                this.#characterImageQueue[name].push([image, image.src]);
                console.log('Pushed the image in queue, quee size is', this.#characterImageQueue[name].length);
            })
        }
        
    }
    getPhoto(name){
        //gets a photo from the queue, otherwise requests a new one.
        if(this.#characterImageQueue[name].length == 0){
            console.log(`Requesting new photo for ${name}`)
            const newPhoto = new Image();
            newPhoto.src = this.#getNewPhotoUrl(name);
            // return newPhoto;
            return newPhoto.src;
        }
        console.log(`Getting from the queue for ${name}`);
        const [fetchedImage, fetchedImageUrl] = this.#characterImageQueue[name].pop();
        this.refillQueue(name, 2);
        // return fetchedImage;
        return fetchedImageUrl;

    }
    #getNewPhotoUrl(name, isRandom=true){
        if(name in characterImages){
            const photoList = characterImages[name];
            const randomIndex = Math.floor(Math.random() * photoList.length);
            return photoList[randomIndex];

        } else {
            console.log(name);
            throw new Error('Folder not found with the given name')
        }

    }
}

function preLoadImage(src){
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = ()=>{
            resolve(img);
        }
        img.onerror = () => {
            reject(src);
        }
        img.src = src;
    })

}

export const photoApi = new PhotoApi(originalCardList);