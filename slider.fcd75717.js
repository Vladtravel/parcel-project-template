parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"Nwn9":[function(require,module,exports) {
var e=1;function l(l){t(e+=l)}function s(l){t(e=l)}function t(l){var s,t=document.getElementsByClassName("sliderbox"),a=document.getElementsByClassName("slider-dots_item");for(l>t.length&&(e=1),l<1&&(e=t.length),s=0;s<t.length;s++)t[s].style.display="none";for(s=0;s<a.length;s++)a[s].className=a[s].className.replace(" active","");t[e-1].style.display="block",a[e-1].className+=" active"}t(e);
},{}]},{},["Nwn9"], null)
//# sourceMappingURL=/parcel-project-template/slider.fcd75717.js.map