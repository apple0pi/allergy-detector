import chalk, { chalkStderr } from "chalk";
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
import { createSpinner } from "nanospinner";


let allergy_list= []; 

async function addAllergies(){
    const allergies = await inquirer.prompt({
        name: 'allergies', 
        type: 'input',
        message: 'Please put in a list of allergies you are allergic to, adding a comma between each one'
    })

    allergy_list.push(...allergies.allergies.split(", ")); // spread operator to put  the dif elements in push method
    console.log(allergy_list); /// delete 
    console.log(`${chalk.bgGreenBright('Added in new allergies to list')}`);
};

function getAllergies(){
    if(allergy_list.length == 0){
        console.log("Allergy list is empty. Add to the list.");
    }else{
        console.log("List of allergies: ")
        for(let i = 0; i < allergy_list.length; i++){
            console.log('> ' + allergy_list[i])
        }
    }
    
    return allergy_list; 
}

async function deleteAllergy(){
    if(allergy_list.length == 0){
        console.log("Allergy list is empty. Please add to list before trying to remove");
    }else{
        const allergies = await inquirer.prompt({
            name: 'allergies', 
            type: 'input',
            message: 'Please type in one allergy to remove'
        })
    
        // remove the allergies given from the allergy_list array
        allergy_list = allergy_list.filter(item => item !== allergies.allergies);
        console.log(allergy_list); // delete 
    }
    
}

// async function main(){
//     await addAllergies();
//     await addAllergies();
//     await deleteAllergy();
//     getAllergies();
// };



// main()

module.exports = {
    addAllergies,
    getAllergies,
    deleteAllergy
}