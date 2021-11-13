const loginButton = document.getElementById('loginButton')
const registerButton = document.getElementById('signupButton')

//Login Route
loginButton.addEventListener('click', async (e)=>{
    e.preventDefault()
    const email = document.getElementById('loginEmail').value
    const password = document.getElementById('loginPassword').value
    if(!email || !password ){
        alert("Please fill in all fields!")
        return;
    }
    try{
    await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
        credentials: "include",
        body : JSON.stringify({
            email, password
        })
    }).then((res)=>{
        check = res.json()
        return check
    }).then((check)=> {
        if(check.success){
            window.location.replace('/profile')
        }else{
            alert(check.msg)
        }
    }).catch((err)=>{
        console.log(err)
    })
}catch(err){
        console.log(err)
    }

})

//Signup route
registerButton.addEventListener('click', async (e)=>{
    e.preventDefault()
    const name = document.getElementById('signupName').value
    const email = document.getElementById('signupEmail').value
    const age =document.getElementById('age').value
    const password = document.getElementById('signupPassword').value
    const repassword = document.getElementById('rePassword').value
    const mobileNumber =document.getElementById('mobile').value
    const gender =document.getElementById('signupGender').value
    if(!email || !name || !password || !repassword || !age || !gender){
        alert("Please fill in all fields!")
        return;
    }
    if(password!=repassword){
        alert("Passwords dont match.")
        return
    }
    //add more checks
    
    await fetch('/api/signup', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
        credentials: "include",
        body : JSON.stringify({
            name, email,age, password, mobileNumber, gender
        })
    }).then((res) => {
        check = res.json()
        console.log(check)
        return check
    }).then((check)=>{
        console.log(check.success)
        if(check.success){
            alert(check.msg)
            const container = document.getElementById('container');
            container.classList.remove("right-panel-active");
        }else{
            alert(check.msg)
        }
    })
})  