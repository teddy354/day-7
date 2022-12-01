function submitdata() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let subject = document.getElementById("subject").value;
    let message = document.getElementById("message").value;

    if (name == "") {
        return alert("NAME NOT FOUND");
    } else if (email == "") {
        return alert("EMAIL NOT FOUND");
    } else if (phone == "") {
        return alert("PHONE NUMBER NOT FOUND");
    } else if (subject == "") {
        return alert("SUBJECT NOT FOUND");
    } else if (message == "") {
        return alert("MESSAGE NOT FOUND");
    }

    let link = document.createElement("a");
    link.href = `mailto:${email}?subject=${subject}&body=Hallo my name is ${name}, ${message}, contact me on ${phone}`;
    link.click();
}
