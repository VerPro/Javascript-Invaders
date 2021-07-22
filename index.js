'use strict';

console.log('%c JavaScript funguje!', 'background-color: #000; color: #ff0');
/*
var regEx = /ahoj$/;
console.log(regEx.test('ahoj svete'));

for (var i = 0; i < 5; i++) {
  var btn = document.body.appendChild(document.createElement('button'));

  btn.addEventListener(
    'click',
    function () {
      alert(i);
    },
    false,
  );
}
*/

var foo = !!'0';

console.log(foo);

console.log(1);
setTimeout(function () {
  console.log(2);
}, 0);
console.log(3);
