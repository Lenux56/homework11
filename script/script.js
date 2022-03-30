const blockElem = document.querySelector('#blocks');
const cardList = [];

const formElem = document.forms[0];
const seaechRoot = document.querySelector('#search');
const searchElem = seaechRoot.querySelector('input');

function translate(event) {
	console.log(event)
}

function render(list){
	blockElem.innerText = '';
	list.forEach((element, index, object) => {
		const cardElem = document.createElement('div');

		cardElem.classList.add('card');
		cardElem.style.backgroundColor = element.cardColor; 
		cardElem.innerText = (element.state === 1) ? element.cardTranslate : element.cardName; 

  		const crossElem = document.createElement('div');
  		crossElem.classList.add('cross');

  		cardElem.appendChild(crossElem);
  		blockElem.appendChild(cardElem);

  		crossElem.addEventListener('click', ()=>{
  			object.splice(index, 1);
  			render(cardList);
  		});

  		cardElem.addEventListener('dblclick', event => {
  			if (element.state === 1){
  				element.state = 0;	
  			}else{
  				element.state = 1;
  			}
  			render(cardList);
  		});
  	});
  	console.log(cardList);	
}

formElem.addEventListener('submit', event=>{
	event.preventDefault();

	const cardName = event.target.cardName;
	const cardTranslate = event.target.cardTranslate;
	const cardColor = event.target.cardColor;

	if (cardName.value === '' || cardTranslate.value === '' || cardColor.value === '' ){
		alert('Необходимо заполнить все поля');
	}else{
		const objELem = {
			[cardName.name]: cardName.value,
			[cardTranslate.name]: cardTranslate.value,
			[cardColor.name]: cardColor.value,
			'state' : 0
		};
		cardList.push(objELem);

	}	
	
	cardName.value = '';
	cardTranslate.value = '';
	cardColor.value = '';
	render(cardList);
	searchElem.value = '';
})

searchElem.addEventListener('input', event=>{
	event.preventDefault();
	
	const searchText = event.target;
	if (searchText.value === ''){
		render(cardList);
	}else{

	render(cardList.filter(elem => 
		(elem.state === 0) ? elem.cardName.startsWith(searchText.value) : elem.cardTranslate.startsWith(searchText.value)));
	}
})

render(cardList);
