
const readCards = () => JSON.parse(localStorage.getItem('cards')) || [];
const writeCards = data => localStorage.setItem('cards', JSON.stringify([...readCards(), data]));
const removeCard = data => {
	const newLst = readCards().filter(elem => JSON.stringify(elem) !== JSON.stringify(data));
	localStorage.setItem('cards', JSON.stringify(newLst));
}

function changeCard (data, state){
	const cardIndex = readCards().findIndex(element =>	element.id === data.id);
	let newList = readCards();
	newList[cardIndex].state = state;
	localStorage.setItem('cards', JSON.stringify(newList));
}

const formElem = document.forms[0];
const seaechRoot = document.querySelector('#search');
const searchElem = seaechRoot.querySelector('input');

//from stackoverflow
const generateUUID = () => {
  let
    d = new Date().getTime(),
    d2 = (performance && performance.now && (performance.now() * 1000)) || 0;
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    let r = Math.random() * 16;
    if (d > 0) {
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
  });
};

function render(list){
	const blockElem = document.querySelector('#blocks');
	blockElem.innerText = '';
	blockElem.append(
		...list.map(card => {
			const {cardName, cardTranslate, cardColor, state} = card;
			const cardElem = document.createElement('div');
			cardElem.classList.add('card');
			cardElem.style.backgroundColor = cardColor; 
			cardElem.innerText = (state === 1) ? cardTranslate : cardName; 

	  		const crossElem = document.createElement('div');
	  		crossElem.classList.add('cross');

	  		cardElem.appendChild(crossElem);
	  		
	  		crossElem.addEventListener('click', ()=>{
	  			removeCard(card);
	  			render(readCards());
	  		});

	  		cardElem.addEventListener('dblclick', event => {
	  			if (card.state === 1){
	  				//console.log(card);
	  				//console.log(readCards());
	  				//card.state = 0;	
	  				changeCard(card, 0);
	  				//console.log(readCards());
	  				render(readCards());
	  			}else{
	  				//card.state = 1;
	  				//console.log(card);
	  				//console.log(readCards());
	  				changeCard(card, 1);
	  				//console.log(readCards());
	  				render(readCards());
	  			}
	  			render(readCards());
	  		});
	  		return cardElem
	  	}));	
}

formElem.addEventListener('submit', event=>{
	event.preventDefault();

	const cardName = event.target.cardName.value;
	const cardTranslate = event.target.cardTranslate.value;
	const cardColor = event.target.cardColor.value;

	if (cardName === '' || cardTranslate === '' || cardColor === '' ){
		alert('Необходимо заполнить все поля');
	}else{

		writeCards({'id': generateUUID(), cardName, cardTranslate, cardColor, 'state' : 0});
	}	
	event.target.cardName.value = '';
	event.target.cardTranslate.value = '';
	event.target.cardColor.value = '';
	render(readCards());
	searchElem.value = '';
})

searchElem.addEventListener('input', event=>{
	event.preventDefault();
	
	const searchText = event.target;
	if (searchText.value === ''){
		render(readCards());
	}else{
		render(readCards().filter(elem => 
			(elem.state === 0) ? elem.cardName.startsWith(searchText.value) : elem.cardTranslate.startsWith(searchText.value)));
	}
})

render(readCards());
