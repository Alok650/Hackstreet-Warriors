const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const alerT = document.querySelector('.alert');
const closeAlert = document.querySelector('.close-btn')


signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
    //---
    // alerT.classList.add("show")
    // alerT.classList.remove("hide")
    // alerT.classList.add("showAlert")
    // setTimeout(()=>{
    //     alerT.classList.remove("show")
    //     alerT.classList.add("hide")
    // },5000)
});


signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
    console.log('jelo')
});

window.addEventListener('resize', ()=>{
    if (window.innerWidth < 500){
        console.log('jelo')
        document.getElementById("container").style.display = "none";
        document.getElementById("desktop").style.display = "block";
    }else{
        document.getElementById("container").style.display = "block";
        document.getElementById("desktop").style.display = "none";
    }
});
