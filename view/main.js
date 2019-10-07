let display = document.querySelector('.display');
let displayLi = document.querySelector('.displayLi');
let car = document.querySelector('.car');
let model = document.querySelector('.model');
let update = document.querySelector('.update');
let del = document.querySelector('.delete');
let addCar = document.querySelector('#addCar');


fetch('http://localhost:3000/showData')
.then(response => {
	return response.json();
})
.then(data => {
	let li = document.createElement('TABLE');
	li.className = "table table-bordered table-info table-hover col-md-8 offset-md-2"
	li.innerHTML += `<tr><th>Car</th><th>Model</th><th>Edit</th></tr>`

	data.forEach(e => {
		li.innerHTML += 
			`<tr class='displayLi'>
				<td class='car'>${e.car}</td>
				<td class='model'>${e.model}</td>
				<td> <button class=' btn btn-danger btn-sm delete' id='${e._id}'>delete</button>
				<button class='btn btn-primary btn-sm update' name='${e._id}'>update</button>
				</td>
			</tr>`;
		display.appendChild(li);

		//create

		$('#addCar').click(function() {
			$('#formUpdate').attr('action', 'postData?_method=POST');
			location.reload();
		})


		// update
		$(".update").click(function(){
			var idUpdate = $(this).attr('name');
			var car = $(this).closest("td").prev().prev().text();
			var model = $(this).closest("td").prev().text();

			$("#car").val(car);
			$("#model").val(model);
			$("#car").attr('title',idUpdate);
		});

		$("#updateCar").click(function(){
			var id = $("#car").attr("title");
			$("#formUpdate").attr("action", "/update/" + id + "?_method=PUT");
			location.reload();
		});

		// delete

		$(".delete").click(function(){
			var id = $(this).attr('id');
			var tableRow = $(this).closest("tr");
			$.ajax({
				url: "/delete/" + id,
				type: "DELETE",
				success: function(result) {					
					// alert('You delete id ' + id);
					tableRow.remove();
				}
			})
		})

	})
})