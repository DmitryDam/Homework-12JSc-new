// Task 1

const out1GetUsers = document.querySelector("#out1GetUsers");
const out2AddUser = document.querySelector("#out2AddUser");
const out3RemoveUser = document.querySelector("#out3RemoveUser");
const out4UpdateUser = document.querySelector("#out4UpdateUser");

const htmlTpl = document.querySelector("#table-row").textContent.trim();
const compiled = _.template(htmlTpl);
const mainUrl = 'http://fecore.net.ua/rest/';
// Получает массив объектов user и используя LoDash шаблон рендерит результат
// источник: http://fecore.net.ua/advanced/theory/module-11.html#lodash
const renderResult = users => {
  let htmlString = "";
  users.map(user => {
    htmlString += compiled(user);
  });

  tBody.innerHTML = htmlString;
};
// Метод «arr.map(callback[, thisArg])» используется для трансформации массива.
// Он создаёт новый массив, который будет состоять из результатов вызова callback
// (item, i, arr) для каждого элемента arr.
// item – очередной элемент массива.
// i – его номер.
// arr – массив, который перебирается.
const getUser = () => 
	fetch(mainUrl)
		.then(response => {
			if (response.ok) return response.json();
			throw new Error("Error");
		})
		// и после того как обещание выполнятся, внутри then отрендерим результат по шаблону
		.then(data => {
			renderResult(data);
		})
		.catch(error => {
			console.error("Error: ", error);
		});


out1GetUsers.addEventListener("click", getUser);


const AddUser = () => {

	let addUrl = `${mainUrl}?action=1&name=${document.querySelector("#userName").value}&score=${document.querySelector("#userScore").value}`;
	fetch(addUrl)
		.catch(error => {
			console.error("Error: ", error);
		}
	);
	document.querySelector("#user").reset();
};	
// reset() - сбрасывает из инпутов введенную инфу
// привязан к форме
// JavaScript reset() method
// In JavaScript there are two ways to reset the given form as follows :
// By using Reset button of HTML
// By using reset() method of JavaScript
// Example of Reset button :
// <input type="reset" value="Reset" />
// Example of reset() method :
//  document.getElementById('formname').reset();
// Syntax : Syntax for using reset() method is as given below :
//  form_object.reset();
// Where form_object is the reference to any form and method reset() will be applied on this form.
out2AddUser.addEventListener("click", AddUser);
out2AddUser.addEventListener("click", getUser);


const removeUser = () => {

	let removeUrl = `${mainUrl}?action=3&id=${document.querySelector("#removeId").value}`;
	fetch(removeUrl)
		.catch(error => {
			console.error("Error: ", error);
		}
	);
	document.querySelector("#remove").reset();	

};

out3RemoveUser.addEventListener("click", removeUser);
out3RemoveUser.addEventListener("click", getUser);


const updateUser = () => {

	let updateUrl = `${mainUrl}?action=2&id=${document.querySelector("#changeUserId").value}&name=${document.querySelector("#changeUserName").value}&score=${document.querySelector("#changeUserScore").value}`;
	fetch(updateUrl)
		.catch(error => {
			console.error("Error: ", error);
		}
	);
	document.querySelector("#change").reset();	

};

out4UpdateUser.addEventListener("click", updateUser);
out4UpdateUser.addEventListener("click", getUser);
// getUser в каждом addEventListener , что бы обновлялась таблица при внесении правок. 