export function getRandomPermutationSizeK(list, k){
    // Given a list of length n >= k returns a randomly chosen subarray of length k
    const listCopy = [...list];

    if(list.length < k) {
        throw new Error('The size of the list must be larger than k.');
    }
    const newList = [];
    //Make sure that there is at least one unselected element
    const unSelectedElementsIndices = getNonSelectedElementsIndex(listCopy);
    console.log({unSelectedElementsIndices})
    const randomIndex = unSelectedElementsIndices[randomInteger(unSelectedElementsIndices.length)];
    console.log({randomIndex})
    //Do the i=0 iteration of the following for loop here for the randomly chosen unselected element
    const chosenElement = listCopy.splice(randomIndex, 1)[0];
    newList.push(chosenElement);


    for (let i = 1; i < k; i++) {
        const chosenElement = listCopy.splice(randomInteger(listCopy.length), 1)[0];
        newList.push(chosenElement);
    }
    shuffle(newList)
    return (newList);

}
function getNonSelectedElements(list){
    const nonSelectedIndices = getNonSelectedElementsIndex(list);
    return nonSelectedIndices.map((index) => list[index]);
}

function getNonSelectedElementsIndex(list){
    // console.log({list})
    return list.map((item, index) => (item.isClicked==false)? index: -1).filter(index => index != -1);
}
function randomInteger(n){
    //Returns a random integer from 0 to n-1
    const randNumber = Math.floor(Math.random() * n);

    return randNumber

}

function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}
