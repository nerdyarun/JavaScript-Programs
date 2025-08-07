// find range betwenn two integers
function range(x, y) {
    let arr = [];
    for(i= x+1; i < y; i++) {
        arr.push(i);
    }
    return arr;
}

console.log(range(10,20));


