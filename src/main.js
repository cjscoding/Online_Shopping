//items 불러오는 함수
function loadItems() {
    //JSON file에서 아이템들 fetch하기
    return fetch('data/data.json')
        //fetch한 data를 promise형태로 반환해야 data사용이 가능하다
        //.json() : data를 promise 형태로 반환해주는 res 객체의 method
        .then(response => response.json())
        .then(json => json.items);
}

//loadItem함수를 통해 받아온 인자값들을(items) 
//html 페이지에 보이도록 구현하는 함수
function displayItems(items) {
    //items를 넣어줄 부모 요소 불러오기
    const container = document.querySelector('.items');
    //map으로 배열 내에 모든 요소에 대해 htmlString형식으로 만들어주고
    //join으로 모든 아이템 html 합쳐서 부모 요소에 넣기
    container.innerHTML = items.map(item => createHTMLString(item)).join('');
}

//items html에 넣을 String 형태로 바꿔주는 함수
function createHTMLString(item) {
    return `
    <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item__thumbnail">
        <span class="item_desc">${item.gender}, ${item.size} size</span>
    </li>
    `;
}

//버튼이 클릭되었을 때 실행되는 함수
function onButtonClick(event, items) {
    //버튼에 지정해 둔 키와 벨류값 가져오기
    const dataset = event.target.dataset;
    console.log(dataset);
    const key = dataset.key;
    const value = dataset.value;

    //만약 이벤트를 실행한 버튼의 키나 벨류가 없다면
    if (key == null || value == null) {
        return;//함수 끝내기
    }

    //키와 벨류값 모두 있다면
    //아이템의 현재 키에 해당하는 값이 벨류일 경우만 걸러서 디스플레이
    displayItems(items.filter(item => item[key] === value));
}

function setEventListeners(items) {
    const logo = document.querySelector('.logo');
    const btns = document.querySelector('.btns');
    //logo눌렀을 때는 모든 목록 보여주기
    logo.addEventListener('click', () => displayItems(items));
    //각 버튼 눌렀을 때 해당하는 아이템들만 보여주기
    btns.addEventListener('click', event => onButtonClick(event, items));
}

//main
loadItems()//아이템을 불러와서
    .then(items => {//resolve 되었을 경우
        displayItems(items);//보여주고
        setEventListeners(items);//이벤트 적용시키기
    })
    .catch(console.log);//reject 되었을 경우