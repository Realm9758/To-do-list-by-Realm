window.addEventListener("load", () => {
	const form = document.querySelector("#new-task-form");
	const input = document.querySelector("#new-task-input");
	const list_el = document.querySelector("#tasks");
	let arr = [];

	const displayStoragedTasks = function () {

		arr = JSON.parse(localStorage.getItem("Tasks"));
		if (arr === null) {
			arr = [];
		} else {
			for (var item of arr) {
				const task_el_storage = document.createElement("div");
				task_el_storage.classList.add("task");

				const task_content_el_storage = document.createElement("div");
				task_content_el_storage.classList.add("content");

				//Input
				const task_input_el_storage = document.createElement("input");
				task_input_el_storage.classList.add("text");
				task_input_el_storage.type = "text";
				task_input_el_storage.value = item.taskName;
				task_input_el_storage.setAttribute("readonly", "readonly");

				task_el_storage.appendChild(task_content_el_storage);
				task_content_el_storage.appendChild(task_input_el_storage);

				//Actions
				const task_actions_el_storage = document.createElement("div");
				task_actions_el_storage.classList.add("actions");

				const task_edit_el_storage = document.createElement("button");
				task_edit_el_storage.id = item.id // For having edit button id for finding object id
				task_edit_el_storage.classList.add("edit");
				task_edit_el_storage.innerHTML = "Edit";

				const task_delete_el_storage = document.createElement("button");
				task_delete_el_storage.classList.add("delete");
				task_delete_el_storage.innerHTML = "Delete";

				task_actions_el_storage.appendChild(task_edit_el_storage);
				task_actions_el_storage.appendChild(task_delete_el_storage);

				task_el_storage.appendChild(task_actions_el_storage);
				list_el.appendChild(task_el_storage);

				task_delete_el_storage.addEventListener("click", (e) => {
					// Getting array from storage
					const tempArr = JSON.parse(localStorage.getItem("Tasks"));
					// Removing tasks
					const filter = tempArr.filter((e) => e.taskName !== task_input_el_storage.value);
					// Re-setting storage
					localStorage.setItem("Tasks", JSON.stringify(filter));
					list_el.removeChild(task_el_storage);
				});

				task_edit_el_storage.addEventListener('click', (e) => {
					task_edit_el_storage.removeAttribute('readonly');
					task_input_el_storage.setAttribute('readonly', true);

					let index = arr.findIndex(function (item) { // Gettting object id
						return parseInt(e.target.id) === item.id
					})

					if (task_edit_el_storage.innerText.toLowerCase() == "edit") {
						task_input_el_storage.removeAttribute("readonly");
						task_input_el_storage.focus();
						task_edit_el_storage.innerText = "save";
					} else {
						task_input_el_storage.setAttribute("readonly", "readonly");
						task_edit_el_storage.innerText = "Edit";

						if (index !== -1) { // If object id is true(exists)
							arr[index].taskName = task_input_el_storage.value; // Updating its value
							localStorage.setItem('Tasks', JSON.stringify(arr)); // Re-setting storage
						};
					};
				});
			};
		}
	};
	displayStoragedTasks();

	form.addEventListener("submit", (e) => {
		e.preventDefault();

		arr = JSON.parse(localStorage.getItem("Tasks"));
		if (arr === null) {
			arr = [];
		};

		const task = input.value;

		if (!task) {
			alert("Please fill out a task");
			return;
		}


		const task_el = document.createElement("div");
		task_el.classList.add("task");

		const task_content_el = document.createElement("div");
		task_content_el.classList.add("content");

		task_el.appendChild(task_content_el);
		const task_input_el = document.createElement("input");

		task_input_el.classList.add("text");
		task_input_el.type = "text";
		task_input_el.value = task;
		task_input_el.setAttribute("readonly", "readonly");

		task_content_el.appendChild(task_input_el);

		const task_actions_el = document.createElement("div");
		task_actions_el.classList.add("actions");

		const task_edit_el = document.createElement("button");
		task_edit_el.id = arr.length // For having edit button id for finding object id
		task_edit_el.classList.add("edit");
		task_edit_el.innerHTML = "Edit";

		const task_delete_el = document.createElement("button");
		task_delete_el.classList.add("delete");
		task_delete_el.innerHTML = "Delete";

		task_actions_el.appendChild(task_edit_el);
		task_actions_el.appendChild(task_delete_el);

		task_el.appendChild(task_actions_el);

		list_el.appendChild(task_el);

		input.value = "";

		let newTask = {
			id: arr.length,
			taskName: task
		};

		arr.push(newTask);
		localStorage.setItem("Tasks", JSON.stringify(arr)); // Updating array state

		task_edit_el.addEventListener("click", (e) => {
			const tempArr = JSON.parse(localStorage.getItem("Tasks"));

			let index = tempArr.findIndex(function (item) { // Gettting object id
				return parseInt(e.target.id) === item.id
			})

			if (task_edit_el.innerText.toLowerCase() == "edit") {
				task_input_el.removeAttribute("readonly");
				task_input_el.focus();
				task_edit_el.innerText = "save";
			} else {
				task_input_el.setAttribute("readonly", "readonly");
				task_edit_el.innerText = "Edit";

				if (index !== -1) { // If object id is true(exists)
					tempArr[index].taskName = task_input_el.value; // Updating its value
					localStorage.setItem('Tasks', JSON.stringify(tempArr));  // Re-setting storage
				};
			};
		});

		// task_edit_el.addEventListener("click", (e) => {
		// 	if (task_edit_el.innerText.toLowerCase() == "edit") {
		// 		task_edit_el.innerText = "Save";
		// 		task_input_el.removeAttribute("readonly");
		// 		task_input_el.focus();
		// 	} else {
		// 		task_edit_el.innerText = "Edit";
		// 		task_input_el.setAttribute("readonly", "readonly");
		// 	}
		// });

		task_delete_el.addEventListener("click", (e) => {
			const tempArr = JSON.parse(localStorage.getItem("Tasks"));
			// Removing tasks
			const filter = tempArr.filter((e) => e.taskName !== task_input_el.value);
			// Re-setting storage
			localStorage.setItem("Tasks", JSON.stringify(filter));
			list_el.removeChild(task_el);
		});


	});
	var i = 0;
	var txt = "What do you have planned today?";

	function typeWriter() {
		if (i < txt.length) {
			document.getElementsByClassName("js-typewrite")[0].innerHTML +=
				txt.charAt(i);
			i++;
			setTimeout(typeWriter, 100);
		}
	}

	setTimeout(typeWriter, 2000);
});
