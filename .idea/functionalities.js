var contactsArray = window.localStorage.getItem("contacts") ? JSON.parse(window.localStorage.getItem("contacts")) : [];
var userPhone;

function addContact() {
    var flag = false;
    //debugger
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
    //debugger
    //console.log(contact.name + " , " + contact.phone + " inside draw")
    var li = document.createElement("li");
    var a = document.createElement("a");
    a.setAttribute("href", `try.html?x=${contact.phone}`);
    a.setAttribute("target", "_self" );
    //a.setAttribute("onclick", `t(${contact.phone})`)
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
    //debugger
    //window.location.href = "try.html";
    var foundContact = contactsArray.find(contact => contact.phone == contactPhone)
    //document.getElementById("contactName").value = foundContact.name;
    //$('#contactName').innerHTML = foundContact.name;
    $('#contactName').html(foundContact.name)
    //var contactInfoDiv = document.getElementById('contactInfo');
    var img = document.createElement("img");
    if (foundContact.gender == "male") {
        img.setAttribute("src", "male.png");
    } else {
        img.setAttribute("src", "female.png");
    }
    var deleteBtn = document.createElement("input");
    deleteBtn.type = "button";
    deleteBtn.name = "delete";
    deleteBtn.value = "delete";
    deleteBtn.setAttribute("onclick", `deleteContact(${foundContact.phone})`)
    var editBtn = document.createElement("input");
    editBtn.setAttribute("class", "ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b")
    editBtn.type = "button";
    editBtn.name = "edit";
    editBtn.value = "edit";
    editBtn.setAttribute("onclick", `editContact(${foundContact})`)
    var callBtn = document.createElement("input");
    callBtn.setAttribute("class", "ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b")
    callBtn.type = "button";
    callBtn.name = "call";
    callBtn.value = "call";
    $('#contactInfo').append(img, deleteBtn, editBtn, callBtn);
}

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function deleteContact(contactPhone){
    var contactIndex = contactsArray.findIndex(contact => contact.phone == contactPhone)
    contactsArray.splice(contactIndex, 1);
    window.localStorage.setItem("contacts", JSON.stringify(contactsArray));
    window.location.href = "Test.html";
}

function editContact(contactPhone, cname, cphone, cemail){
    debugger
    var foundContact = contactsArray.find(contact => contact.phone == contactPhone)
    foundContact.phone = cphone;
    foundContact.email = cemail;
    foundContact.name = cname;
    window.localStorage.setItem("contacts", JSON.stringify(contactsArray));
    //window.location.href = "Test.html";
}
