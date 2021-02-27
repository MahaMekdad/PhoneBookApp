var contactsArray = window.localStorage.getItem("contacts") ? JSON.parse(window.localStorage.getItem("contacts")) : [];

function addContact() {
    var flag = false;
    debugger
    console.log("inside the add Contact");
    contactsArray.forEach(contact => {
        if (contact.phone == document.getElementById('phone').value) {
            flag = true
            alert("phone number already exists")
            clearFields();
            window.location.href = "Test2.html";
            console.log("after the redirect")
        }
    })
    if (flag == false) {
        addContact2()
    }
    flag = false;
}

function addContact2() {
    var contactObj = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        gender: document.getElementById('male').checked == true ? "male" : "female"
    }
    console.log(contactObj.name + "Name")
    console.log(contactsArray)
    contactsArray.push(contactObj);
    window.localStorage.setItem("contacts", JSON.stringify(contactsArray));
    clearFields();
    window.location.href = "Test.html";
}

function clearFields() {
    document.getElementById('name').value = "";
    document.getElementById('phone').value = "";
    document.getElementById('email').value = "";
    document.getElementById('male').checked = false;
    document.getElementById('female').checked = false;
}

function loadContacts() {
    //debugger
    contactsArray = window.localStorage.getItem("contacts") ? JSON.parse(window.localStorage.getItem("contacts")) : [];
    //console.log(contactsArray + " <--")
    //contactsArray.forEach(contact => console.log(contact.name + " , " + contact.phone))
    contactsArray.forEach(contact => drawContact(contact))


}

function drawContact(contact) {
    debugger
    //console.log(contact.name + " , " + contact.phone + " inside draw")
    var li = document.createElement("li");
    var a = document.createElement("a");
    a.setAttribute("href", "try.html");
    //a.setAttribute("onclick", "t(contact.phone)")
    var img = document.createElement("img");
    if (contact.gender == "male") {
        img.setAttribute("src", "male.png");
    } else {
        img.setAttribute("src", "female.png");
    }
    var label = document.createElement("label");
    label.innerHTML = contact.name;

    var btn = document.createElement("input");
    btn.type = "button";
    btn.name = "call";
    btn.value = "call";
    btn.onclick = function moveToTest2() {
        window.location.href = "Test2.html";
    };
    a.appendChild(img);
    a.appendChild(label);
    a.appendChild(btn);
    li.appendChild(a);
    $('#contactlist').append(li);
}

function t(contactPhone){
    var foundContact = contactsArray.find(contact => contact.phone == contactPhone)
    //document.getElementById("contactName").value = foundContact.name;
    //$('#contactName').innerHTML = foundContact.name;
    $('#contactName').html(foundContact.name)
    //var contactInfoDiv = document.getElementById('contactInfo');
    var img = document.createElement("img");
    if (contact.gender == "male") {
        img.setAttribute("src", "male.png");
    } else {
        img.setAttribute("src", "female.png");
    }
    var deleteBtn = document.createElement("input");
    deleteBtn.type = "button";
    deleteBtn.name = "delete";
    deleteBtn.value = "delete";
    deleteBtn.setAttribute("onclick", "deleteContact(foundContact.phone)")
    var editBtn = document.createElement("input");
    editBtn.type = "button";
    editBtn.name = "edit";
    editBtn.value = "edit";
    editBtn.setAttribute("onclick", "editContact(foundContact)")
    var callBtn = document.createElement("input");
    callBtn.type = "button";
    callBtn.name = "call";
    callBtn.value = "call";
    $('#contactInfo').append(img, deleteBtn, editBtn, callBtn);
}