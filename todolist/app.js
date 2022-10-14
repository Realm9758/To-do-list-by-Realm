window.addEventListener("load", () => {
    const form = document.querySelector("#new-task-form")
    const input = document.querySelector("#new-task-input")
    const list_el = document.querySelector("#tasks")



    //For storage
    let arr = [];

    if (arr.length === 0 && localStorage.length) {
        arr = JSON.parse(localStorage.getItem("Tasks"));

        for (var item of arr) {
            const task_el_storage = document.createElement("div");
            task_el_storage.classList.add("task");

            const task_content_el_storage = document.createElement("div");
            task_content_el_storage.classList.add("content");

            //Input
            const task_input_el_storage = document.createElement("input");
            task_input_el_storage.classList.add("text");
            task_input_el_storage.type = "text";
            task_input_el_storage.value = item;
            task_input_el_storage.setAttribute("readonly", "readonly");

            task_el_storage.appendChild(task_content_el_storage);
            task_content_el_storage.appendChild(task_input_el_storage);

            //Actions
            const task_actions_el_storage = document.createElement("div");
            task_actions_el_storage.classList.add("actions");

            const task_edit_el_storage = document.createElement("button");
            task_edit_el_storage.classList.add("edit");
            task_edit_el_storage.innerHTML = "Edit";

            const task_delete_el_storage = document.createElement("button");
            task_delete_el_storage.classList.add("delete");
            task_delete_el_storage.innerHTML = "Delete";

            task_actions_el_storage.appendChild(task_edit_el_storage)
            task_actions_el_storage.appendChild(task_delete_el_storage)


            task_el_storage.appendChild(task_actions_el_storage)
            list_el.appendChild(task_el_storage)
        };
    };




    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const task = input.value;

        if (!task) {
            alert("Please fill out a task")
            return;
        }

        //Pushing new task to array
        arr.push(task);
        //Saving array in storage
        localStorage.setItem("Tasks", `${JSON.stringify(arr)}`);

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
        task_edit_el.classList.add("edit");
        task_edit_el.innerHTML = "Edit";

        const task_delete_el = document.createElement("button");
        task_delete_el.classList.add("delete");
        task_delete_el.innerHTML = "Delete";

        task_actions_el.appendChild(task_edit_el)
        task_actions_el.appendChild(task_delete_el)

        task_el.appendChild(task_actions_el)

        list_el.appendChild(task_el);

        input.value = "";

        task_edit_el.addEventListener("click", () => {
            if (task_edit_el.innerText.toLowerCase() == "edit") {
                task_input_el.removeAttribute("readonly");
                task_input_el.focus();
                task_edit_el.innerText = "save";
            }
            else {
                task_input_el.setAttribute("readonly", "readonly");
                task_edit_el.innerText = "Edit";
            }

        });

        task_edit_el.addEventListener('click', (e) => {
            if (task_edit_el.innerText.toLowerCase() == "edit") {
                task_edit_el.innerText = "Save";
                task_input_el.removeAttribute("readonly");
                task_input_el.focus();

            } else {
                task_edit_el.innerText = "Edit";
                task_input_el.setAttribute("readonly", "readonly");
            }
        });

        task_delete_el.addEventListener('click', (e) => {
            //Getting array from storage
            const tempArr = JSON.parse(localStorage.getItem("Tasks"));
            //Removing tasks
            const filter = tempArr.filter(e => e !== task_input_el.value);
            //Re-setting storage
            localStorage.setItem("Tasks", JSON.stringify(filter));
            //LocalStorage.clear();
            list_el.removeChild(task_el);
        });
    });

})
