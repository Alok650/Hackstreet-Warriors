var submit = document.getElementById("submit")
document.addEventListener('DOMContentLoaded', ()=> {
    var el = document.querySelector('.tabs');
    var instance = M.Tabs.init(el, {})

    var options = {
        defaultDate: new Date(Date.now()),
        setDefaultDate: true
      };
    var elems1 = document.querySelector('#traveldate');
    var instance = M.Datepicker.init(elems1, options);

    var elems2 = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems2, {});
    
    var elems3 = document.querySelectorAll('.timepicker');
    var instances = M.FormSelect.init(elems3, {});

    var elems4 = document.querySelector('#filterdate');
    var instance = M.Datepicker.init(elems4, {});

})

const formatDate = (date) =>{
    var day = date.getDate();
    if (day < 10) {
        day = "0" + day;
    }
    var month = date.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    var year = date.getFullYear();
    return day + "/" + month + "/" + year;
}

submit.addEventListener('click', async(e)=> {
    e.preventDefault()
    const pickupPoint = document.getElementById('pickup').value
    const destination = document.getElementById('destination').value
    const numberOfPeople = document.getElementById('numberOfPeople').value
    var selectoptions = document.getElementById("mode");
    const modeOfTransport = selectoptions.options[selectoptions.selectedIndex].text;
    const travelDate = new Date(document.getElementById('traveldate').value)    
    console.log(pickupPoint,destination,travelDate , modeOfTransport)
    await fetch('/api/newRide', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
        credentials: "include",
        body : JSON.stringify({
            pickupPoint, destination, travelDate, modeOfTransport, numberOfPeople
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

var addRide = document.querySelectorAll('a[name="addRide"]')
console.log(addRide)
addRide.forEach(ride => {ride.addEventListener('click' , async(e)=> {
    const rideID = e.target.parentNode.getAttribute("id")
    if (confirm(`Are you sure you want to join ${rideID}? `)) {
        await fetch('/api/joinride', {
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
        console.log(e.target.parentNode.getAttribute("id"))
      } else {
        // Do nothing!
      }
    
})
})

var filterButton = document.getElementById('filter')
filterButton.addEventListener('click', ()=>{
    try {
        const dateString = document.getElementById('filterdate').value
        console.log(typeof(dateString))
        if(dateString === "" || dateString == undefined){
            window.location.replace('/newride')
            console.log("yo")
        }else{
            const filterDate = new Date(dateString)
            console.log(dateString)
            window.location.replace(`/filtered?date=${filterDate}`);
        }
    } catch (err) {
        
    }
})