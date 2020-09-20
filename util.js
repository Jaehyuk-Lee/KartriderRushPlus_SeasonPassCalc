function setCookie(name, value, day) {
    var date = new Date();
    date.setTime(date.getTime() + day * 60 * 60 * 24 * 1000);
    document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
}

function getCookie(name) {
    var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value? value[2] : null;
}

function maxLengthCheck(object) {
    if (object.value.length > object.maxLength) {
        object.value = object.value.slice(0, object.maxLength);
    }
}

function dateObjToDateStr(date) {
    return date.toISOString().substr(0, 10).replace(/-/g, '.');
}

function errorAlert(text) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: text,
    });
}