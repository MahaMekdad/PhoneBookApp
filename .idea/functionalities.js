var contactsArray;

function addContact() {
   // debugger
    //  contactsArray = window.localStorage.getItem("contacts") ? JSON.parse(window.localStorage.getItem("contacts")) : [];
    console.log("inside the add Contact");
    // console.log(document.getElementById('male').checked == true + "LALALALA");
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
    contactsArray = window.localStorage.getItem("contacts") ? JSON.parse(window.localStorage.getItem("contacts")) : [];
    contactsArray.forEach(contact => drawContact(contact))


}

function drawContact(contact) {
    var li = document.createElement("li");
    var a = document.createElement("a");
    a.setAttribute("href" , "try.html");
    var img = document.createElement("img");
    if (contact.gender == "male") {
        img.setAttribute("src", "male.png");
    } else {
        img.setAttribute("src", "female.png");
    }
    var label = document.createElement("label");
    label.innerHTML=contact.name;
    //var callBtn = document.createElement("button");
    //callBtn.setAttribute("type", "tel");
  //  callBtn.setAttribute("name", "call");
  //   callBtn.name = "call";
  //   callBtn.value="call";

    var btn=document.createElement("input");
    btn.type="button";
    btn.name="call";
    btn.value="call";
    btn.onclick= function moveToTest2(){ window.location.href = "Test2.html";};
    a.appendChild(img);
    a.appendChild(label);
    a.appendChild(btn);
    li.appendChild(a);
    $('#contactlist').append(li);


}