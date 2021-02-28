var contactsArray = window.localStorage.getItem("contacts") ? JSON.parse(window.localStorage.getItem("contacts")) : [];


function addContact() {
    if(document.getElementById('name').value==" "|| document.getElementById('phone').value ==" " || document.getElementById('email').value ==" ")
    {
        return;
    }
    var flag = false;
    //debugger
    //console.log("inside the add Contact");
    contactsArray.forEach(contact => {
        if (contact.phone == document.getElementById('phone').value) {
            flag = true
            alert("phone number already exists")
            clearFields();
            window.location.href = "AddContact.html";
            console.log("after the redirect")
        }
    })
    if (flag == false) {
        addContactToStorage()
    }
    flag = false;
}

function addContactToStorage() {
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
    window.location.href = "MainPage.html";
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
    contactsArray.forEach(contact => drawContact(contact))
}

function drawContact(contact) {
    //debugger
    var li = document.createElement("li");
    var a = document.createElement("a");
    a.setAttribute("href", `ContactProfile.html?id=${contact.phone}`);
    a.setAttribute("target", "_self" );
    //a.setAttribute("onclick", `t(${contact.phone})`)
    var img = document.createElement("img");
    if (contact.gender == "male") {
        img.setAttribute("src", "../Images/male.png");

    } else {
        img.setAttribute("src", "../Images/female.png");
    }
    var label = document.createElement("label");
    label.innerHTML = contact.name;
    var div = document.createElement("div");
    div.setAttribute("data-role" ,"controlgroup");
    div.setAttribute("data-type" ,"horizontal");
    var a2 = document.createElement("a");
    a2.setAttribute("href" ,`tel:${contact.phone}`);
    a2.setAttribute("data-icon" ,"phone");
    a2.setAttribute("data-role" ,"button");
    div.appendChild(a2);
    a.appendChild(img);
    a.appendChild(label);
    a.appendChild(div);
    li.appendChild(a);
    $('#contactlist').append(li);
}

function addContactInfoToProfile(contactPhone){
    //debugger
    var foundContact = contactsArray.find(contact => contact.phone == contactPhone)
    console.log(foundContact.name);
    $('#contactNameHeader').html(foundContact.name)
    //var contactInfoDiv = document.getElementById('contactInfo');
    var img = document.createElement("img");
    if (foundContact.gender == "male") {
        img.setAttribute("src", "../Images/male.png");
        img.setAttribute("width" ,"130px")
        img.setAttribute("hight" ,"130px")
    } else {
        img.setAttribute("src", "../Images/female.png");
        img.setAttribute("width" ,"130px")
        img.setAttribute("hight" ,"130px")
    }
    $('#contactInfo').append(img);
}

// outside resource
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
    window.location.href = "MainPage.html";
}

function editContact(contactPhone, cname, cphone, cemail){

    var foundContact = contactsArray.find(contact => contact.phone == contactPhone)
    foundContact.phone = cphone;
    foundContact.email = cemail;
    foundContact.name = cname;
    window.localStorage.setItem("contacts", JSON.stringify(contactsArray));
    window.location.href = `ContactProfile.html?id=${cphone}`;
}

function getContactInfo(contactPhone){
    return contactsArray.find(contact => contact.phone == contactPhone)
}
