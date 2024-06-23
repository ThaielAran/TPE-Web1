"use strict"
const BASE_URL = "https://6667717ea2f8516ff7a77eff.mockapi.io/products"

let container = document.querySelector("#use-ajax")

async function show_products() {                                     //GETs data from endpoint and presents it in a table
    let tabla = document.querySelector(".productsT")
    let response = await fetch(BASE_URL)
    let data = await response.json()
    tabla.innerHTML = ""
    for (let item of data) {
        console.log(item.type)
        tabla.innerHTML += `<tr id=p${item.id}> <td> ${item.type} </td> <td>${item.name}</td> 
        <td>${item.mainColor}</td> <td>${item.size}</td> <td>
        <button class="delete" id=${item.id}>Delete</button> <button class="edit" id=${item.id}>Edit</button></td> </tr>`
    }
    const deleteBtns = document.querySelectorAll(".delete")
    deleteBtns.forEach(button => {                                  //also adds delete and edit buttons for each item
        button.addEventListener("click", () => {
            delete_product(button.id)
        })
    })
    const editBtns = document.querySelectorAll(".edit")
    editBtns.forEach(button => {
        button.addEventListener("click", () => {
            update_product(button.id)
        })
    })
}

async function create_product(e) {                                  //turns form data into a JSON and it POSTs it into endpoint
    e.preventDefault();
    let message = container.querySelector("#message")
    let data = new FormData(createForm);
    let product = {                                                 //creates product object from form
        "type": data.get("type"),
        "name": data.get("name"),
        "mainColor": data.get("color"),
        "size": data.get("size")
    }
    try {
        let response = await fetch(BASE_URL, {                      //pushes it into the endpoint through POST method
            'method': 'POST',
            "headers": {
                'Content-Type': 'application/json'
            },
            'body': JSON.stringify(product)
        })
        if (response.ok) {
            createForm.classList.toggle("hidden")                   //form is hidden when creation is done
            createForm.classList.toggle("show")
            message.innerHTML = "Item has been added (" + product.name + ")";
        }
    } catch (error) {
        message.innerHTML = "Error, item could not be added" + error
    }
    show_products()
}

async function update_product(num) {                                //brings product endpiont and modifies (PUT) according to input
    let response = await fetch(BASE_URL + "/" + num)
    let data = await response.json()
    let updateForm = container.querySelector("#update")
    updateForm.classList.toggle("hidden")                           //form is shown when update is clicked
    updateForm.classList.toggle("show")
    let message = container.querySelector("#message")

    document.querySelector("#type").value = data.type               //values from endpoint are assigned as standard to inputs
    document.querySelector("#name").value = data.name
    document.querySelector("#color").value = data.mainColor
    document.querySelector("#size").value = data.size
    let fData = new FormData(updateForm);
    console.log(fData)
    updateForm.addEventListener('submit', async (e) => {            //when submit is clicked, inputs turn into object
        e.preventDefault();                                         //which is pushed to the respective product endpoint
        let product = {
            "type": document.querySelector("#type").value,
            "name": document.querySelector("#name").value,
            "mainColor": document.querySelector("#color").value,
            "size": document.querySelector("#size").value
        }
        try {
            let response = await fetch(BASE_URL + "/" + num, {
                'method': 'PUT',
                "headers": {
                    'Content-Type': 'application/json'
                },
                'body': JSON.stringify(product)
            })
            if (response.ok) {
                message.innerHTML = " "
                message.innerHTML = "Item has been modified (" + product.name + ")";
                updateForm.classList.toggle("hidden")               //form is hidden when update is done
                updateForm.classList.toggle("show")
            }
        } catch (error) {
            message.innerHTML = " "
            message.innerHTML = "Error, item could not be modified" + error
        }

        show_products()
    })
}

async function delete_product(num) {                                //brings product endpoint and DELETE's it
    let message = container.querySelector("#message")
    try {
        let response = await fetch(BASE_URL + "/" + num, {
            'method': 'DELETE',
            "headers": {
                'Content-Type': 'application/json'
            }
        })
        if (response.ok) {
            let data = await response.json()
            message.innerHTML = "Item has been deleted " + data.id + " " + data.name
        }
    } catch (error) {
        message.innerHTML = "Error, item does not exist" + error
    }
    show_products()
}
