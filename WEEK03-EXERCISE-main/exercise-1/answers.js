function sayHello () {
    // TODO: return คำว่า "Hello world!"

    return "Hello world!"
}

function isString (input) {
    // input อาจจะเป็น String, Array, Number, Object หรือ Function ก็ได้
    // TODO: ถ้า input เป็น String ให้ return true, ถ้าไม่ใช่ return false

    return typeof(input) === 'string' ? true : false;
    // return console.log(typeof(input))
}

function isNumber (input) {
    // input อาจจะเป็น String, Array, Number, Object หรือ Function ก็ได้
    // TODO: ถ้า input เป็น Number ให้ return true, ถ้าไม่ใช่ return false

    return typeof(input) === 'number' ? true : false;
    // return console.log(typeof(input))


}

function isArray (input) {
    // input อาจจะเป็น String, Array, Number, Object หรือ Function ก็ได้
    // TODO: ถ้า input เป็น Array ให้ return true, ถ้าไม่ใช่ return false

    return Array.isArray(input) ? true : false;
}

function isObject (input) {
    // input อาจจะเป็น String, Array, Number, Object หรือ Function ก็ได้
    // TODO: ถ้า input เป็น Object ให้ return true, ถ้าไม่ใช่ return false

    return typeof(input) === 'object' && !Array.isArray(input) && input != null ? true : false;
}

function isFunction (input) {
    // input อาจจะเป็น String, Array, Number, Object หรือ Function ก็ได้
    // TODO: ถ้า input เป็น Function ให้ return true, ถ้าไม่ใช่ return false
    
    return typeof(input) ===  'function' ? true : false;
}

// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof