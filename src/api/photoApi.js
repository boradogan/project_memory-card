import { characterImages } from "./imageLoader.js";
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
