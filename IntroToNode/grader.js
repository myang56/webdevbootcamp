function average (scores) {
    
    var result = 0;
    
    for (var i = 0; i < scores.length; i++) {
        result += scores[i] 
    }
    
    var average = result / scores.length;
    
    
    return Math.round(average);
}

var scores = [90, 98, 89, 100, 100, 86, 94];
console.log(average (scores));
