function maxLengthCheck(object) {
    if (object.value.length > object.maxLength) {
        object.value = object.value.slice(0, object.maxLength);
    }
}

function dateObjToDateStr(date){
    return date.toISOString().substr(0, 10).replace(/-/g, '.');
}