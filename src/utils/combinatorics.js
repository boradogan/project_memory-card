export function getRandomPermutationSizeK(list, k){
    // Given a list of length n >= k returns a randomly chosen subarray of length k
    const listCopy = [...list];
    if(list.length < k) {
        throw new Error('The size of the list must be larger than k.');
    }
    const newList = [];

    for (let i = 0; i < k; i++) {
        const chosenElement = listCopy.splice(randomInteger(listCopy.length), 1)[0];
        newList.push(chosenElement);
    }
    return newList;



}

function randomInteger(n){
    //Returns a random integer from 0 to n-1
    const randNumber = Math.floor(Math.random() * n);

    return randNumber

}