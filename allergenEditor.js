/**
 * This gets all the allergen input from a user. allowing them to delete, add and see their allergens they have listed 
 * @Author Angela Ngo
 */
import chalk, { chalkStderr } from "chalk";
import inquirer from "inquirer";


let allergy_list= []; 

/**
 * prompt user to add in new allergies to allergen list 
 */
export async function addAllergies(){
    let allergies = await inquirer.prompt({
        name: 'allergies', 
        type: 'input',
        message: 'Please put in a list of allergies you are allergic to, adding a comma between each one OR hit enter to go back'
    })

    if(allergies.allergies.length != 0){
        allergy_list.push(...allergies.allergies.split(", ")); // spread operator to put  the dif elements in push method
        console.log(`${chalk.bgGreenBright('Added in new allergies to list')}`);
    }else{
        console.log("No new allergies added!")
    }

    
};

/**
 * get the allergy list. boolean value to see if you want to also visually print out the allergy list 
 * @param {boolean} printAllergies 
 * @returns allergy_list : array 
 */
export function getAllergies(printAllergies){
    if(allergy_list.length == 0){
        console.log("Allergy list is empty. Add to the list.");
    }else{
        if(printAllergies == true){
            console.log("List of allergies: ");
            for(let i = 0; i < allergy_list.length; i++){
                console.log('\t> ' + allergy_list[i]);
            }
        }
    }
    
    return allergy_list; 
}

/**
 * deletes values from the allergy list one at a time. 
 */
export async function deleteAllergy(){
    if(allergy_list.length == 0){
        console.log("Allergy list is empty. Please add to list before trying to remove");
    }else{
        let allergies = await inquirer.prompt({
            name: 'allergies', 
            type: 'input',
            message: 'Please type in one allergy to remove OR hit enter to go back'
        })

        if(allergies.allergies.length != 0){
            // remove the allergies given from the allergy_list array
            allergy_list = allergy_list.filter(item => item !== allergies.allergies);
            console.log(`${chalk.bgGreenBright('Deleted allergies from list')}`);
        }
    
        
    }
    
}

export default getAllergies;