let allergy_list= []; 
async function getAllergyList(){
    const allergies = await inquirer.prompt({
        name: allergies, 
        type: 'input',
        message: 'Please put in a list of allergies you are allergic to, adding a comma between each one'
    })

    allergy_list = allergies.allergies.split(","); 
    return allergy_list; 
}

// compare the allergies to the gotten stuff from product_scraper

async function main(){
    
}