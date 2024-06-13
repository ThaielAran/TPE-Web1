"use strict"

const BASE_URL = "https://6667717ea2f8516ff7a77eff.mockapi.io/products"
show_products();

let createForm = document.querySelector("#create")
document.querySelector("#new").addEventListener("click", () => {
    createForm.classList.toggle("hidden")   //form is shown when new is clicked
    createForm.classList.toggle("show")
    createForm.addEventListener('submit', create_product);
})
async function create_product(e) {                         //turns form data into a JSON and it POSTs it into endpoint
    e.preventDefault();
    let data = new FormData(createForm);
    let product = {
        "type": data.get("type"),
        "name": data.get("name"),
        "mainColor": data.get("color"),
        "size": data.get("size")
    }
    try {
        let response = await fetch(BASE_URL, {
            'method': 'POST',
            "headers": {
                'Content-Type': 'application/json'
            },
            'body': JSON.stringify(product)
        })
        if (response.ok) {
            createForm.classList.toggle("hidden")
            createForm.classList.toggle("show")
            alert("Item has been added (" + product.name + ")")
        }
    } catch (error) {
        alert("Error, item could not be created" + error)
    }
    show_products()
}

async function show_products() {                        //GETs data from endpoint and presents it in a table
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
    deleteBtns.forEach(button => {                      //also creates delete and edit buttons for each item
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

async function update_product(num) {                    //
    let response = await fetch(BASE_URL + "/" + num)
    let data = await response.json()
    let itemTr = document.querySelector("#p" + num)
    itemTr.innerHTML = `<td><input id="type" type="text" value=${data.type} required> </td> 
                        <td><input id="name" type="text" value=${data.name} required> </td> 
                        <td><input id="color" type="text" value=${data.mainColor} required></td> 
                        <td><input id="size" type="text" value=${data.size} required></td> <td>
                        <button id="submit">Submit</button></td>`

    let editForm = document.querySelector("#submit")
    editForm.addEventListener('click', async () => {
        let product = {
            "type": document.querySelector("#type").value,
            "name": document.querySelector("#name").value,
            "mainColor": document.querySelector("#color").value,
            "size": document.querySelector("#size").value
        }
        try {
            let response = await fetch(BASE_URL+ "/" + num, {
                'method': 'PUT',
                "headers": {
                    'Content-Type': 'application/json'
                },
                'body': JSON.stringify(product)
            })
            if (response.ok) {
                alert("Item has been modified (" + product.name + ")")
            }
        } catch (error) {
            alert("Error, item could not be modified" + error)
        }
        show_products()
    })    
}


async function delete_product(num) {
    try {
        let response = await fetch(BASE_URL + "/" + num, {
            'method': 'DELETE',
            "headers": {
                'Content-Type': 'application/json'
            }
        })
        if (response.ok) {
            let data = await response.json()
            alert("Se eliminó el producto " + data.id + " " + data.name)
        }
    } catch (error) {
        alert("Error, item no existente" + error)
    }
    show_products()
}

