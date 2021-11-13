var editButton = document.getElementById("edit")
editButton.addEventListener('click', () =>  {
  var elems = document.getElementById('modal1');
  var instances = M.Modal.init(elems,{dismissible: false});
  instances.open()

  
});

var editButton = document.getElementById("editButton")
var logoutButton = document.getElementById("logout")

editButton.addEventListener('click', async()=> {
    var name = document.getElementById('Name').value
    var mobileNumber = document.getElementById('MobileNumber').value
    var email = document.getElementById('Email').value
    await fetch('/api/editprofile', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
        credentials: "include",
        body : JSON.stringify({
            name,email,mobileNumber
        })
    }).then((res) => {
        check = res.json()
        console.log(check)
        return check
    }).then((check)=>{
        console.log(check.success)
        if(check.success){
            alert(check.msg)
            document.location.href = '/api/logout',true;
            //window.location = ("localhost:5000");
        }else{
            alert(check.msg)
        }
    })
})

var deleteButtons = document.getElementsByClassName('red lighten-1 waves-effect waves-light btn-small')
console.log(deleteButtons)

Array.from(deleteButtons).forEach(button => {

    button.addEventListener('click', async(e)=>{
        console.log(e.target.getAttribute('id'))
        var rideID = e.target.getAttribute('id')
        await fetch('/api/deleteride', {
            method: 'POST' ,
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            credentials: "include",
            body : JSON.stringify({
                rideID
            })
        }).then((res) => {
            check = res.json()
            console.log(check)
            return check
        }).then((check)=>{
            console.log(check.success)
            if(check.success){
                alert(check.msg)
                document.location.href = '/profile',true;
            }else{
                alert(check.msg)
            }
        })
    })
})