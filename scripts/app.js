//function to get the array of saved items from the local storage
let getSavedData = () => {

    //checking for saved data here
    let savedData = localStorage.getItem('devDetails');

    //if found return the array else empty array
    return savedData !== null ? JSON.parse(savedData) : [];
}
//Developer arrays of objects here
let devDetails = getSavedData();
//===========End Here===============//



//making new array of search item
const filteredSearch = {
    sortDev: ''
}

//=====================End Here==============//



//saving details in the localStorage
let savingData = (devDetails) => {
    localStorage.setItem('devDetails', JSON.stringify(devDetails));
}
//==========================End Here==========================//



//listener to add the form details
document.querySelector('#addDetails').addEventListener('click', (e) => {

    //to stop the default behaviour here
    e.preventDefault();


    //getting input values here
    let name = document.querySelector('#first_name').value;
    let email = document.querySelector('#email').value;
    let designation = document.querySelector('#designation').value;
    let skills = document.querySelector('#skills').value;
    let salary = document.querySelector('#salary').value;
    let linkedin = document.querySelector('#linkedin').value;
    let github = document.querySelector('#github').value;





    // validating form here not to add null values
    if (name.length > 0 && email.length > 0 && designation.length > 0 && salary.length > 0 && linkedin.length > 0 && github.length > 0) {

    //getting chips values here
    // let ook = JSON.stringify(M.Chips.getInstance($('.chips')).chipsData[0].tag);     


    //pushing values here
    devDetails.push({
        name,
        email,
        designation,
        skills,
        salary,
        linkedin_account: linkedin,
        github_account: github,
        id: uuidv4(),

    })
    //saving data in the local stroage here
    savingData(devDetails);

    //clearing the dom to save from rerender the things many times
    document.querySelector('#dev_cards').innerHTML = '';
    displayDev(devDetails)


    }
    else {
    alert('Please Enter Complete Details!');
    }

})


let generatingDom = (item) => {

    const div = document.createElement('div');
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    const div3 = document.createElement('div');
    const span = document.createElement('span');
    const btn1 = document.createElement('button');
    const btn2 = document.createElement('button');
    btn1.classList.add('btn', 'far', 'fa-trash-alt', 'right');
    btn2.classList.add('btn', 'far', 'fa-edit', 'right');
    btn2.setAttribute('href', '#modal1');
    btn2.classList.add('modal-trigger');
    div2.appendChild(btn1);
    div2.appendChild(btn2);
    const para1 = document.createElement('p');
    const para2 = document.createElement('p');
    const para3 = document.createElement('p');
    const para4 = document.createElement('p');
    const para5 = document.createElement('p');
    const para6 = document.createElement('p');
    const para7 = document.createElement('p');
    div.classList.add('col', 's12', 'm6')
    div1.classList.add('card', 'grey', 'darken-1');
    div2.classList.add('card-content', 'white-text');
    span.classList.add('card-title', 'center');
    span.innerHTML = `<h5>Developer Details</h5>`
    para1.textContent = `Developer Name: ${item.name}`;
    para2.textContent = `Developer Email: ${item.email}`;
    para3.textContent = `Developer Designation: ${item.designation}`;
    para4.textContent = `Developer Skills: ${item.skills}`;
    para5.textContent = `Developer Salary: ${item.salary}`;
    para6.textContent = `Developer Linkedin: ${item.linkedin_account}`;
    para7.textContent = `Developer Github: ${item.github_account}`;

    div.appendChild(div1)
    div1.appendChild(div2)
    div2.appendChild(span);
    div2.appendChild(div3);
    div2.appendChild(para1);
    div2.appendChild(para2);
    div2.appendChild(para3);
    div2.appendChild(para4);
    div2.appendChild(para5);
    div2.appendChild(para6);
    div2.appendChild(para7);


    //delete Button here
    btn1.addEventListener('click', () => {
        deleteDev(item.id);
        savingData(devDetails);
        document.querySelector('#dev_cards').innerHTML = '';
        displayDev(devDetails);
    })


    // edit button here
    btn2.addEventListener('click', (e) => {

        e.preventDefault();



        ////getting input values here again to edit
        let name = document.querySelector('#first_name').value;
        let email = document.querySelector('#email').value;
        let designation = document.querySelector('#designation').value;
        let skills = document.querySelector('#skills').value;
        let salary = document.querySelector('#salary').value;
        let linkedin = document.querySelector('#linkedin').value;
        let github = document.querySelector('#github').value;

        editDev(item.id, name, email, designation, skills, salary, linkedin, github);
        savingData(devDetails);
        // document.querySelector('#dev_cards').innerHTML = '';
        // displayDev(devDetails);
    })

    return div;
}

////function to edit a card
let editDev = (id, name, email, designation, skills, salary, linkedin, github) => {

    let editID = devDetails.findIndex((item) => item.id === id);

    if (editID > -1) {
        devDetails[editID].name = name;
        devDetails[editID].email = email;
        devDetails[editID].designation = designation;
        devDetails[editID].skills = skills;
        devDetails[editID].salary = salary;
        devDetails[editID].linkedin_account = linkedin;
        devDetails[editID].github_account = github;


        savingData(devDetails);
        // displayDev(devDetails)
        // console.log(devDetails)
    }
}



//deleting a card by using a third party lib (uuidv4)
//by targeting to their ID to delete a particulat card
let deleteDev = (id) => {

    //return complete obj of array here
    let devId = devDetails.findIndex((item) => item.id === id)

    if (devId > -1) {

        devDetails.splice(devId, 1);
    }
}


//sorting notes according to the dropdown menu
let sortNotes = (dev, sortBy) => {
    if (sortBy === 'alpha') {
        return dev.sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1;
            } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
            } else {
                return 0;
            }
        })
    } else {
        return dev;
    }


}

//displaying notes when sort alhabetically
const displaySort = (devDetails, filteredSearch) => {

    //making new array of devDetails
    let devDetail = sortNotes(devDetails, filteredSearch.sortDev);

    //clearing the DOM to save from rerender things again
    document.querySelector('#dev_cards').innerHTML = '';


    //iterating over the new devDetails array to print sorted data
    devDetail.forEach((item) => {
        document.querySelector('#dev_cards').appendChild(generatingDom(item))
    })
    //saving data here
    savingData(devDetail)

}

//event listners for the dropdown to sort notes accordingly
document.querySelector('#dropdown').addEventListener('change', (e) => {

    //to update the latest input values in the sort array
    filteredSearch.sortDev = e.target.value;

    //rerender things again
    displaySort(devDetails,filteredSearch)

})



// Function to rerender the list when enter the data
const displayDev = (devArray) => {
    devArray.forEach((item) => {
        document.querySelector('#dev_cards').appendChild(generatingDom(item))
    })
}
displayDev(devDetails)