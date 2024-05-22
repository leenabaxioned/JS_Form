let form = document.querySelector("form");
let conditions = document.getElementById("conditions")
let genderval = document.getElementsByName("gender");

form.addEventListener("submit",(event)=>{
 event.preventDefault();
 let fname = event.target.fname.value;
 let lname = event.target.lname.value;
 let gender = event.target.gender.value;
 let address = event.target.address.value;

if(fname === "" && lname === "" && gender === "" && address === ""){
  userData.pop({
  'fname':fname,
  'lname':lname,
  'gender':gender,
  'address':address,
  })
}

 var userData = JSON.parse(localStorage.getItem("userDetails")) ?? [];
 userData.push({
  'fname':fname,
  'lname':lname,
  'gender':gender,
  'address':address,
 })


 localStorage.setItem("userDetails",JSON.stringify(userData))
 //console.log(fname,lname,address,gender);
 //confirm();
 //form.reset();
})

function displaydata(){
    var userData = JSON.parse(localStorage.getItem("userDetails")) ?? [];

    let li = document.createElement("li");
    let formTable = document.querySelector("#form-table");

        userData.forEach((element) => {
          console.log(element);
          let ul = document.createElement("ul");

          Object.keys(element).map((item) => {
            console.log(element[item]);
            let li = document.createElement("li");
            ul.appendChild(li);
            li.innerHTML = element[item];
          })

          let edit = document.createElement('button');
          edit.className = "edit"
          edit.style.backgroundColor = '#bdbebf'
          edit.innerHTML = 'Edit';
          edit.onclick = () => {
            let index = '';
            fname.value = element.fname;
            lname.value = element.lname;

            for(var i=0;i<genderval.length;i++)
            genderval[i].checked = true;

            address.value = element.address;
      
            function update(element,index) {
              console.log(element[index]);
                element.fname = fname.value;
                console.log(element.fname);
            }
          }

          let deletebtn = document.createElement('button');
          deletebtn.className = "deletebtn"
          deletebtn.style.backgroundColor = '#bdbebf'
          deletebtn.innerHTML = 'Delete';
          
          ul.appendChild(edit);
          ul.appendChild(deletebtn);
          formTable.appendChild(ul);

          deletebtn.onclick = () => {
            //element = userData.remove();
            element = ul.remove();
          }
        });
}
window.onload = displaydata();

function validateForm() {
  const firstname = document.getElementById("fname").value;
  const lastname = document.getElementById("lname").value;
  const addressval = document.getElementById("address").value;
  const conditions = document.getElementById("conditions").checked;
  const getSelectedValue = document.querySelector( 'input[name="gender"]:checked');   
 
  const fnameError = document.getElementById("fname-error");
  const lnameError = document.getElementById("lname-error");
  const genderError = document.getElementById("gender-error");
  const addressError = document.getElementById("address-error");
  const conditionsError = document.getElementById("conditions-error");

  fnameError.textContent = "";
  lnameError.textContent = "";
  genderError.textContent = "";
  addressError.textContent = "";
  conditionsError.textContent = "";
 
  let isValid = true;

  if (firstname === "" || /\d/.test(firstname)) {
      fnameError.textContent =
          "*Please enter your firstname properly.";
      isValid = false;
  }

  if (lastname === "" || /\d/.test(lastname)) {
    lnameError.textContent =
        "*Please enter your lastname properly.";
    isValid = false;
}

  if (addressval === "") {
      addressError.textContent =
          "*Please enter your address.";
      isValid = false;
  }

  if (!getSelectedValue) {
    genderError.textContent =
          "*Please select above option.";
      isValid = false;
  }

  if (!conditions) {
    conditionsError.textContent =
          "*Please agree to the above terms and conditions .";
      isValid = false;
  }

  if(firstname  && lastname && getSelectedValue && conditions && addressval ) {
    alert('Thank you!');
  }
  return isValid;
}


document.querySelector("#cancelbtn").addEventListener("click",cancel)
function cancel() {
  fname.value = "";
  lname.value = "";
  for(var i=0;i<genderval.length;i++)
  genderval[i].checked = false;
  address.value = "";
  conditions.checked = false;
}