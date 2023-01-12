// ==UserScript==
// @name         Ekşimeh
// @namespace    https://github.com/mortyobnoxious/EksiTime
// @version      0.1
// @description  some eksisozluk improvements
// @author       Morty
// @match        https://eksisozluk.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=eksisozluk.com
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// @grant        GM.addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM.xmlHttpRequest
// @connect      *
// ==/UserScript==

(function() {
    'use strict';

GM.addStyle(`
.flex-item {display: flex;flex-direction: column;position: fixed;background: #0f1622!important;padding: 5px 10px;border-radius: 6px;z-index: 9999999;box-shadow: 2px 2px 3px -1px rgba(2, 2, 2, 0.33);color: #8798A5!important;font-size: 16px!important;max-width: 400px!important;word-break: break-word;white-space: break-spaces;}
.flex-image {width: 100%;max-height: 200px;object-fit:cover;border-radius: 6px;}
.flex-title {font-size: 16px; color:#81C14B;padding:0!important;margin:0!important;}
.flex-item small {display: flex;gap: 5px;}
.flex-item small span {font-size:11px;opacity:.7;overflow: hidden;white-space: nowrap;word-break: break-all;text-overflow: ellipsis;}
.flex-description {font-size: 13px;line-height:1.3rem;}
.flex-item.loadingpr {background: transparent!important;display: inline-block;width: 50px;height: 50px;border: 3px solid rgba(255,255,255,.3);border-radius: 50%;border-top-color: #fff;animation: spin 1s ease-in-out infinite;-webkit-animation: spin 1s ease-in-out infinite;}

.popupMeh { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: #141D26; border-radius: 5px; box-shadow: 2px 3px 3px rgba(0,0,0,0.52); width: 95vw; max-width: 600px;overflow: hidden;z-index: 9999;}
.popup-header { display: flex; align-items: center; justify-content: space-between;background: #243447;}
.popup-header h3 { margin: 0; font-size: 1.5em;padding: 3px 10px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
.popup-header .close-button { font-size: 1.5em; font-weight: bold; border: none; background: transparent; cursor: pointer;color: #8798A5;padding: 3px 10px;transition: all .3s !important;user-select: none;}
.popup-header .close-button:hover {background: #BE1E2D;}
.popup-content { display: flex; flex-wrap: wrap;padding: 15px;max-height: 400px;overflow-y: auto;}

.noteklediv {display: flex;flex-direction: column;gap: 10px;flex: 1;}
.noteklediv > div {display: flex;gap: 10px;align-items: center;}
.noteklediv > div > label {min-width: 60px;}
.noteklediv > div > input, .noteklediv > div > textarea {flex: 1;max-width: 100%;}
.noteklediv .delnote {margin-left: auto;}
.noteklediv button {display: flex;justify-content: center;align-items: center;}
.noteklediv .buttons {display: none;margin-left: auto;gap: 4px;}
.noteklediv .allnotes:hover .buttons {display: flex;}
.noteklediv .allnotes {border-bottom: 1px dashed #243447;padding: 5px;}
.notes {gap:0}
.allnotes:hover {background: #243447;transition: all .3s;border-radius: 5px;}
.formatButs button {display: flex;justify-content: center;align-items: center;padding: 5px 10px !important;}
.formattedText {display: block !important;word-wrap: anywhere;word-break: break-word;overflow-y: auto;max-height: 80px;border: 1px solid #1b2836 !important;border-radius: 8px;padding: .2rem .7rem;}
.formattedText[data-c="0"] {display:none!important;}
.noteklediv input[name="yazar"][disabled] {background: #1b283652;}


.notdiv {position: absolute;background: #141d269e;padding: 5px 5px !important;border-radius: 5px;top: 5px;right: 0;font-size: 12px;cursor:pointer;display: flex !important;gap: 2px;}

.popupMeh input, .popupMeh select, .popupMeh button, .popupMeh textarea {background: transparent;color: #8798A5;border: 1px solid #1b2836!important;border-radius: 8px;padding: .7rem 1rem;resize: none;}
.popupMeh button:hover {background: #1b2836;cursor: pointer;transition: all .3s;}

.mehbuttons {display: flex!important;text-align: center;flex-wrap: wrap;}
.mehbuttons a {width: 25% !important;display: flex !important;padding: 10px !important;justify-content: center;align-content: center;}

.spoilit {display: inline-flex;align-items: center;gap: 4px;}
.sporotate {transform: rotate(180deg);transition: all .3s;}

@keyframes spin {to { -webkit-transform: rotate(360deg); }}
@-webkit-keyframes spin {to { -webkit-transform: rotate(360deg); }}
`)

// svgs from Bootstrap
const SVGs = {
"telegram": `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telegram" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z"/>
</svg>`,
"entryleri": `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-bar-down" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z"/>
</svg>`,
"baslik": `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-video" viewBox="0 0 16 16">
  <path d="M8 9.05a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
  <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2Zm10.798 11c-.453-1.27-1.76-3-4.798-3-3.037 0-4.345 1.73-4.798 3H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-1.202Z"/>
</svg>`,
"notekle": `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-journal-plus" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5z"/>
  <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
  <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
</svg>`,
"html": `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-filetype-html" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M14 4.5V11h-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5Zm-9.736 7.35v3.999h-.791v-1.714H1.79v1.714H1V11.85h.791v1.626h1.682V11.85h.79Zm2.251.662v3.337h-.794v-3.337H4.588v-.662h3.064v.662H6.515Zm2.176 3.337v-2.66h.038l.952 2.159h.516l.946-2.16h.038v2.661h.715V11.85h-.8l-1.14 2.596H9.93L8.79 11.85h-.805v3.999h.706Zm4.71-.674h1.696v.674H12.61V11.85h.79v3.325Z"/>
</svg>`,
"edit": `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg>`,
"delete": `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg>`,
"save": `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
</svg>`,
"notesall": `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-journal-bookmark-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M6 1h6v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8V1z"/>
  <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
  <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
</svg>`,
"spoiler": `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hourglass-top" viewBox="0 0 16 16">
  <path d="M2 14.5a.5.5 0 0 0 .5.5h11a.5.5 0 1 0 0-1h-1v-1a4.5 4.5 0 0 0-2.557-4.06c-.29-.139-.443-.377-.443-.59v-.7c0-.213.154-.451.443-.59A4.5 4.5 0 0 0 12.5 3V2h1a.5.5 0 0 0 0-1h-11a.5.5 0 0 0 0 1h1v1a4.5 4.5 0 0 0 2.557 4.06c.29.139.443.377.443.59v.7c0 .213-.154.451-.443.59A4.5 4.5 0 0 0 3.5 13v1h-1a.5.5 0 0 0-.5.5zm2.5-.5v-1a3.5 3.5 0 0 1 1.989-3.158c.533-.256 1.011-.79 1.011-1.491v-.702s.18.101.5.101.5-.1.5-.1v.7c0 .701.478 1.236 1.011 1.492A3.5 3.5 0 0 1 11.5 13v1h-7z"/>
</svg>`,
}


class TampermonkeyStorage {
    constructor(key) {this.key = key;}
    modify(index, value) {
        let values = this.values;
        index === -1
        ? values.push(value)
        : value
        ? (values[index] = value)
        : values.splice(index, 1);
        GM_setValue(this.key, values);
    }
    removeAll() {GM_deleteValue(this.key);}
    findIndex(key, value) {return this.values.findIndex(key && value ? obj => obj[key] === value : item => item === key);}
    move(index, direction) {
        const values = this.values;
        const newIndex = (index + direction + values.length) % values.length;
        const [item] = values.splice(index, 1);
        values.splice(newIndex, 0, item);
        GM_setValue(this.key, values);
    }
    get values() {return GM_getValue(this.key) || []}
}

const notlarGM = new TampermonkeyStorage('notlar');


function createPopup(title, div) {
  document.querySelector('.popupMeh')?.remove();
  const popup = document.createElement('div');
  popup.classList.add('popupMeh');
  popup.innerHTML = `<div class="popup-header"><h3>${title}</h3><span class="close-button">&times;</span></div><div class="popup-content">${div}</div>`;
  document.body.appendChild(popup);
  const closeButton = popup.querySelector('.close-button');
  document.addEventListener('click', event => {
    if (!popup.contains(event.target) || event.target === closeButton) {
      popup.remove();
    }
  });
}

// get link preview function
function getLinkPreview(url) {
  return new Promise((resolve, reject) => {
    GM.xmlHttpRequest({
      method: "GET",
      url: url,
      onload: function(response) {
        try {
          const html = response.responseText;
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          const title = doc.querySelector('meta[property="og:title"]')?.content || doc.querySelector('title')?.innerText;
          const description = doc.querySelector('meta[property="og:description"]')?.content || doc.querySelector('meta[name="description"]')?.content;
          const image = doc.querySelector('meta[property="og:image"]')?.content;
          let link = doc.querySelector('link[rel="canonical"]')?.href;
		  let forimdb = doc.querySelector('script[type="application/ld+json"]')?.innerText;
		  if (doc.querySelector('meta[property="og:site_name"]')?.content == "IMDb") {
			  forimdb = JSON.parse(forimdb)
			  let ar = forimdb.aggregateRating?.ratingValue?.toFixed(1) || "";
			  let rc = forimdb.aggregateRating?.ratingCount?.toLocaleString('tr') || "";
			  let dircre = forimdb.director?.filter(item => item.name) || forimdb.creator?.filter(item => item.name)
			  link = `★ ${ar} (${rc})${forimdb.duration ? " | ⏲ " + forimdb.duration.replace('PT','').toLowerCase().trim() : ""} | ${forimdb.genre?.join(', ') || ""}
			  ${dircre ? "<br>📽 " + dircre.map(person => person.name).join(', ') : ""}`;
		  }
          resolve({title, description, image, link});
        } catch (error) {
          reject(error);
        }
      },
      onerror: function(error) {
        reject(error);
      }
    });
  });
}

// function to trim and replace given string
function trimReplace(str, len=150) {
	str = str ? (str.trim().length > len) ? str.trim().substring(0, len) + "..." : str.trim() : "";
	str = str.replace(/Key, tempo of | \| Musicstax| - IMDb/gi, '')
	if (str.includes('Find the key and tempo for')) {str = ""}
	return str
}

// create div usig title, description etc.
function createDiv(title, description, image, link) {
	let isTweet = link?.includes('twitter.com')
	$('.flex-item').remove();
	var div = `<div class="flex-item">
               <img src="${image || ""}" class="flex-image">
               <h3 class="flex-title">${trimReplace(title)}</h3>
			   <small>${link?.includes('http') ? '<img src="https://www.google.com/s2/favicons?domain='+(new URL(link))?.hostname+'">' : ""}${link ? '<span>'+link+'</span>' : ""}</small>
               <span class="flex-description">${isTweet ? description : trimReplace(description, 250)}</span>
             </div>`;
	$('body').append(div);
	if (!title && !description && !image && !link) {
		$('.flex-item').empty().text('Önizleme bulunamadı!');
	}
}

// return top and left position for popup
function rTL(x, y) {
	var elementHeight = $('body').find(".flex-item").outerHeight(true);
	var elementWidth = $('body').find(".flex-item").outerWidth(true);
	var viewportWidth = $(window).width();
	var viewportHeight = $(window).height();
	var left = x - elementWidth - 10;
	if (left < 0) {left = x + 10;}
	if (left + elementWidth > viewportWidth) {left = viewportWidth - elementWidth;}
	var top = y - elementHeight - 10;
	if (top < 0) {top = y + 10;}
	if (top + elementHeight > viewportHeight) {top = viewportHeight - elementHeight;}
	return {top, left};
}

// create link preview on mouseover
$(document).on('mouseover', '.url:not(.formata)', function(e){
	let href = $(this).attr('href');
	if (href.includes('twitter.com') && href.includes('/status/') ) {href = 'https://nitter.lacontrevoie.fr/i/status/' + href.split('status/').pop()}
	if (href.includes('open.spotify.com/track')) {href = 'https://musicstax.com/track/' + href.split('track/').pop()}
	$('body').append('<div class="flex-item loadingpr"></div>')
	if (!$(this).hasClass('dataadded') || $(this).attr('data-title') == "Error | nitter") {
		$(this).addClass('dataadded');

		getLinkPreview(href).then(preview => {
			let {title, description, image, link} = preview
			$(this).attr({
				'data-title': title,
				'data-description': description,
				'data-image': image,
				'data-link': link
			});
			createDiv(title, description, image, link)
			let {top, left} = rTL(e.clientX, e.clientY)
			$(".flex-item").css({top, left});
		});
		return
	}
	createDiv($(this).attr("data-title"), $(this).attr("data-description"), $(this).attr("data-image"), $(this).attr("data-link"))
}).mousemove(function(e) {
	let {top, left} = rTL(e.clientX, e.clientY)
	$(".flex-item").css({top, left});
}).mouseout(function(e) {
	$('.flex-item').remove();
});


// time since function
const dD = (date, od=false) => {
    const units={yıl:31536e3,ay:2592e3,gün:86400,sa:3600,dk:60,sn:1};
    let nd=new Date;od&&(nd=new Date(od));
    let distance = Math.abs(new Date(date) - nd) / 1000;
    let count = 0, retMinus = false, span = "";
    Object.keys(units).forEach((unit) => {
		if (count >= 2 || (count == 1 && unit == "sn")) {return;}
		const interval = Math.floor(distance / units[unit]);
		let sign = new Date() > new Date(date) && retMinus && count === 0 ? "-" : "";
		if (interval > 0) {span += `${sign}${interval} ${unit} `;count++;}
		distance %= units[unit];
    });
    return span.trim();
};

// date parser from string
const parseDate = str => {
  const tsn = str.replace(' ~', '').split(/\W/g)
  const [d, m, y, h = "00", mi = "00", d1, m1, y1, h1, mi1] = tsn
  return [
    `${y}/${m}/${d} ${h}:${mi}`,
    `${tsn.length === 7 ? y : y1}/${tsn.length === 7 ? m : m1}/${tsn.length === 7 ? d : d1} ${tsn.length === 7 ? d1 : h1}:${tsn.length === 7 ? m1 : mi1}`
  ]
}

const formattedDate = (d) => {
	// date variables for config
	let dconfig = {year: 'numeric', month: 'short', day: 'numeric'}
	let tconfig = {hour: '2-digit', minute: '2-digit'}
	let wconfig = {weekday: 'long'}
	return `${d.toLocaleDateString('tr', dconfig)},  ${d.toLocaleDateString('tr', wconfig)} ${d.toLocaleTimeString('tr', tconfig)}`
}

// nekadaronce function to add timesince and formatted date as title
const howLongAgo = () => {
	$('.entry-date, .matter-date, #message-thread time').each(function(){
		let hrefen = $(this).attr('href');
		let [date, date1] = parseDate($(this).text())
		let editDate = dD(date1)?" ~ "+(dD(date1)).replace(dD(date), `<span style="color:#8798A5;opacity:.5;">${dD(date, date1)}<span>`):"";
		let vdistance = `${dD(date)}${editDate}`
		let rdate = new Date(date);
		let rdate1 = new Date(date1);
		let titleReadable1 = false;
		if (rdate1 instanceof Date && !isNaN(rdate1.valueOf())) {
			titleReadable1 = formattedDate(rdate1)
		}
		let els = $(this).closest('li, #quote-entry, .outgoing, .incoming');
		$(els).find('.nekadaronce').remove();
		$(els).prepend(`<div class="nekadaronce" style="margin: 0 0 5px 0;">
<a href="${hrefen}" title="${formattedDate(rdate)}${titleReadable1 || ""}">
<small style="padding: 2px 3px;font-size: 11px;">${vdistance}</small>
</a>
</div>`);

		$('.nekadaronce a[href="undefined"]').attr('href','javascript:void(0)');
	});
}
howLongAgo();

// add hostname to urls if url text doesn't contain hostname, fix http://https// links
const sourceURL = () => {
$('.url:not(.formata)').each(function(){
	let newat = $(this).attr('href').replace('http://https//', 'https://');
	$(this).attr('href', newat);
	let hostname = $(this).prop('hostname').replace('www.','');
	if (!$(this).next().is('.sourceurl')) {
		if (!$(this).text().match(hostname)) {
			$(this).after(`<sup class="sourceurl">(${hostname})</sup>`);
		}
	}
});
};
sourceURL();

function checkElExist(el, callback) {
	let elCheck = setInterval(function() {
		if ($(el).length) {
			clearInterval(elCheck);
			callback();
		}
	}, 100);
}

const addButtons = () => {
	$('#entry-item-list li').each(function() {
		let { author, id } = $(this).data();
		let title = $('link[rel="canonical"]').attr('href') || $(this).closest('.topic-item, #topic').find('#title a').attr('href');
		let el = $(this).find('.feedback-container');
		checkElExist(el, function() {
			if (el.find('.entry-share .dropdown-menu .mehbuttons').length) {return}
			el.find('.entry-share .dropdown-menu').prepend(`<li class="mehbuttons">
<a href="https://eksisozluk.com/biri/${author}/usertopic" class="flat-button wtfbutton addnosk" title="yazarın başlığı">${SVGs.baslik}</a>
<a href="${title}?a=search&author=${author}" class="flat-button wtfbutton addnosk" title="başlıktaki entryleri">${SVGs.entryleri}</a>
<a href="#" class="flat-button wtfbutton addnosk" title="html olarak kaydet">${SVGs.html}</a>
<a href="tg://msg_url?url=https://eksisozluk.com/entry/${id}" class="flat-button wtfbutton addnosk" title="telegram'da paylaş">${SVGs.telegram}</a>
<a href="#" class="addnote flat-button wtfbutton addnosk" title="not ekle" data-author="${author}">${SVGs.notekle}</a>
<a href="#" class="shownotes flat-button wtfbutton addnosk" title="tüm notlara bak">${SVGs.notesall}</a>
</li>`);
		});
	});
}
addButtons();

function retYazarIndex(yazar) {
	return notlarGM.findIndex("yazar", yazar)
}

function formatText(text) {
return text.replace(/\#(\d+)/gi, '<a class="b formata" href="/entry/$1">#$1</a>').replace(/(\`(.*?)\`)/gi, '<a class="b formata" href="/?q=$2">$2</a>').replace(/(\[(\S+) (.*?)\])/gi, '<a class="url formata" href="$2" target="_blank">$3</a>')
}

function allNotes(ret=false) {
	if (ret) {return}
	let divs = "";
	$.each(notlarGM.values, function(index, value) {
		let {yazar, not} = value;
		divs += `<div class="allnotes">
<div>
<div><a href="/biri/${yazar}">${yazar}</a></div>
<div>${formatText(not)}</div>
</div>
<div class="buttons">
<button class="delnote" data-author="${yazar}" data-tf="false" title="sil">${SVGs.delete}</button>
<button class="addnote" data-author="${yazar}" title="düzenle">${SVGs.edit}</button>
</div>
</div>`;
	});
	let notes = `<div class="noteklediv notes">${divs}</div>`
	createPopup(`Notlar (${notlarGM.values.length})`, notes)

}

$(document).on('click', '.shownotes', function(e){
	e.preventDefault();
	allNotes()
});


$(document).on('click', '.addnote', function(e){
	if ($(e.target).hasClass('formata')) {return}
	e.preventDefault();
	let author = $(this).attr('data-author');
	let ind = retYazarIndex(author)
	let not = notlarGM.values[ind]?.not || "";
	let inputs = `<div class="noteklediv"><div><label for="yazar">yazar</label><input value="${author}" name="yazar" type="text" disabled/></div>
<div><label for="not">not</label><textarea id="nottextarea" name="not" rows="3">${not}</textarea></div>
<div>
<label>önizleme</label><div class="formattedText" data-c="0">${formatText(not)}</div></div>
<div class="formatButs">
<button title="bkz" data-g="\`\`">hede</button>
<button title="link" data-g="[url text]">http://</button>
<button title="raptiye" data-g="📌">📌</button>
<button title="kaka" data-g="💩">💩</button>
<button title="baş aşağı yüz" data-g="🙃">🙃</button>
<button title="düşünen yüz" data-g="🤔">🤔</button>
<button title="futbol topu" data-g="⚽">⚽</button>
</div>
<div>
<button class="shownotes" title="tüm notlar">${SVGs.notesall}</button>
<button class="delnote" data-author="${author}" data-tf="true" title="sil">${SVGs.delete}</button>
<button class="savenote" title="kaydet">${SVGs.save}</button></div></div>`
	createPopup("Not Ekle", inputs)
	$('#nottextarea').focus().val('').val(not).trigger('input');
});

$(document).on('input', '#nottextarea', function(e){
	var text = formatText($(this).val())
	$('.formattedText').html(text).attr('data-c',text.length)
});

$(document).on('click', '.formatButs button', function(e){
	e.preventDefault();
	var g = $(this).attr('data-g');
	var ae = $('#nottextarea').val();
	if (ae.length>0) {ae = ae + " "}
	$('#nottextarea').val(ae + g).trigger('input').focus();

});

$(document).on('click', '.savenote', function(e){
	e.preventDefault();
	let data = {
		yazar: $("input[name='yazar']").val(),
		not: $("textarea[name='not']").val()
	};
	let ind = retYazarIndex(data.yazar);
	notlarGM.modify(ind, data);
	appendNotes(true);
});

$(document).on('click', '.delnote', function(e){
	e.preventDefault();
	let author = $(this).attr('data-author');
	let tf = $(this).attr('data-tf');
	tf = tf=="true"?true:false;
	let ind = retYazarIndex(author);
	if (ind != -1) {
		notlarGM.modify(ind);
		appendNotes(true);
		allNotes(tf);
	}
});

function appendNotes(update=false) {
	$('.entry-author').each(function(){
		if ($(this).hasClass('added') && !update) {return}
		if (update) {$(this).prev('.notdiv').remove()}
		let author = $(this).text().trim();
		let not = notlarGM.values[retYazarIndex(author)]?.not
		if (not) {
			$(this).addClass('added');
			$(this).before(`<div class="notdiv addnote" data-author="${author}">${formatText(not)}</div>`)
		}
	});
}
appendNotes();



$.fn.nextUntilWithTextNodes = function (until) {
    var matched = $.map(this, function (elem, i, until) {
        var matched = [];
        while ((elem = elem.nextSibling) && elem.nodeType !== 9) {
            if (elem.nodeType === 1 || elem.nodeType === 3) {
                if (until && jQuery(elem).is(until)) {
                    break;
                }
                matched.push(elem);
            }
        }
        return matched;
    }, until);

    return this.pushStack(matched);
};

const spoilerOp = () => {
		$('#entry-item-list li .content, #icerik li .content').each(function(){
			var _this = $(this);
			var as = $(this).find('a.b[href*="spoiler"], a.b[href*="al%c4%b1nt%c4%b1"]');
			var asd = $(this).find('.spoiler');
			if ($(as).length && !$(asd).length) {
				$(as).eq(0).addClass('spoilit spf').append(SVGs.spoiler);
				$(as).eq(-1).addClass('spl').css('display', 'none');
				$(_this).each(function(){
					$(this).find('.spf').nextUntilWithTextNodes(".spl").wrapAll('<span class="spoiler" style="display:none;"></span>');
				});
			}
		});
}

spoilerOp();

$(document).on('click', '.spoilit', function(e){
	e.preventDefault();
	$(this).next('.spoiler').toggle();
	$(this).closest(".content").css({"overflow": "visible", "max-height": "none"});
	$(this).find('.bi-hourglass-top').toggleClass('sporotate');
	$(this).closest('li').find('.read-more-link-wrapper a')[0]?.click();
	$(this).closest('li').find('.spl').toggle();
});

// Mutation Observer
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    $(mutation.addedNodes).find(".entry-date, .entry-share").each(function() {
		howLongAgo();
		sourceURL();
		addButtons();
		appendNotes();
		spoilerOp();
    });
  });
});

observer.observe(document.body, { childList: true, subtree: true });
})();
