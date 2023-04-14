import ipads from '../data/ipads.js'
import navigations from '../data/navigations.js';

// 장바구니!
const basketStarterEl =document.querySelector('header .basket-starter');
const basketEl = basketStarterEl.querySelector('.basket');

basketStarterEl.addEventListener('click',function(event){
  event.stopPropagation();
  if(basketEl.classList.contains('show')){
    //hide
    hideBasket();
  }else{
    //show
    showBasket();
  }
});
basketEl.addEventListener('click',function(event){
  event.stopPropagation();
});
window.addEventListener('click',function(){
  hideBasket();
});

function showBasket(){
  basketEl.classList.add('show');
}
function hideBasket(){
  basketEl.classList.remove('show');
}

//검색!!
const headerEl =document.querySelector('header');
const headerMenuEls = [...headerEl.querySelectorAll('ul.menu > li')]//찾아낸 내용을 배열 형태로 만들어주는 것
const searchWraplEl = headerEl.querySelector('.search-wrap');
const searchStarEl =headerEl.querySelector('.search-starter');
const searchCloserEl = searchWraplEl.querySelector('.search-closer');
const searchShadowEl = searchWraplEl.querySelector('.shadow');
const searchInputEl = searchWraplEl.querySelector('input');
const searchDelayEls =[...searchWraplEl.querySelectorAll('li')]
searchStarEl.addEventListener('click',function(){
  showSearch();
});
searchCloserEl.addEventListener('click',function(){
  hideSearch();
});
searchShadowEl.addEventListener('click',function(){
  hideSearch();
});

function showSearch(){
  headerEl.classList.add('searching');
  document.documentElement.classList.add('fixed'); //최상위 -> html
  headerMenuEls.reverse().forEach(function(el,index){
    el.style.transitionDelay = index * .4/ headerMenuEls.length + 's'
    //headerMenuEls의 젤 끝부터 점차 없어지는거
  })
  setTimeout(function(){
    searchInputEl.focus();
  },600)
  searchDelayEls.forEach(function(el,index){
    el.style.transitionDelay = index * .4/ searchDelayEls.length + 's'
  })
}

function hideSearch(){
  headerEl.classList.remove('searching');
  document.documentElement.classList.remove('fixed');
  headerMenuEls.reverse().forEach(function(el,index){
    el.style.transitionDelay = index * .4/ headerMenuEls.length + 's'
  })
  searchDelayEls.reverse().forEach(function(el,index){
    el.style.transitionDelay = index * .4/ searchDelayEls.length + 's'
  })
  searchDelayEls.reverse();
  searchInputEl.value='';
}

//요소의 가시성 관찰
const io = new IntersectionObserver(function(entries){
  entries.forEach(function(entry){
    if(!entry.isIntersecting){
      //isIntersecting->!보이면->보이지 않으면
      entry.target.classList.remove('show')
      return; //함수 종료
    }
    else{
      entry.target.classList.add('show');
      //보이는 요소에
    }
  })
})
const infoEls = document.querySelectorAll('.info')
infoEls.forEach(function(el){
  io.observe(el); //관찰 대상 넣어줌
})

//비디오 재생!
const video = document.querySelector('.stage video');
const playBtn = document.querySelector('.stage .controller--play');
const pauseBtn = document.querySelector('.stage .controller--pause');

playBtn.addEventListener('click',function(){
  video.play();
  pauseBtn.classList.remove('hide')
  playBtn.classList.add('hide')
})
pauseBtn.addEventListener('click',function(){
  video.pause();
  pauseBtn.classList.add('hide')
  playBtn.classList.remove('hide')
})

// 당신에게 맞는 ipad는 ? 랜더링
const itemsEl =document.querySelector('.compare .items')
ipads.forEach(function(ipad){
  const itemEl = document.createElement('div')
  itemEl.classList.add('item')

  let colorList = ''
  ipad.colors.forEach(function(color){
    colorList +=`<li style="background-color:${color};"></li>`
  })

  itemEl.innerHTML = /*html*/`
    <div class="thumbnail">
      <img src="${ipad.thumbnail}" alt="${ipad.name}">
    </div>
    <ul class="colors">
      ${colorList}
    </ul>
    <h3 class="name">${ipad.name}</h3>
    <p class="tagline">${ipad.tagline}</p>
    <p class="price">${ipad.price.toLocaleString('en-US')}부터</p>
    <button class="btn">구입하기</button>
    <a href="${ipad.url}" class="link">더 알아보기</a>
  `

  itemsEl.append(itemEl)
})

const navigationEl = document.querySelector('footer .navigation')
navigations.forEach(function(nav){
  const mapEl = document.createElement('div')
  
  let mapList ='';
  nav.maps.forEach(function(map){
    mapList+=`<li><a href="${map.url}">${map.name}</a></li>`
  })

  mapEl.classList.add('map')
  mapEl.innerHTML = /*html*/`
    <h3>
      <span class="text">${nav.title}</span>
    </h3>
    <ul>
      ${mapList}
    </ul>
  `

  navigationEl.append(mapEl)
})

const year = document.querySelector('footer .this-year');
year.textContent = new Date().getFullYear();