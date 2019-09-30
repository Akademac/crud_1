let display = document.querySelector('.display');
let displayLi = document.querySelector('.displayLi');
let car = document.querySelector('.car');
let model = document.querySelector('.model');
let update = document.querySelector('.update');
let del = document.querySelector('.delete');


fetch('http://localhost:3000/showData')
.then(response => {
	return response.json();
})
.then(data => {
	let li = document.createElement('DIV');
	data.forEach(e => {
		li.innerHTML += 
			`<div class='displayLi'>
				<span class='car'>${e.car}</span>
				<span class='model'>${e.model}</span>
				<span class='delete'>delete</span>
				<span class='update'>update</span>
			</div>`;
		display.appendChild(li);

	})
})