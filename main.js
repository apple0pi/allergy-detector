import chalk, { chalkStderr } from "chalk";
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
import { createSpinner } from "nanospinner";
import scrape from "./productScraper.js";
import getAllergies, {addAllergies, deleteAllergy} from "./allergenEditor.js"

const resolveAnimations = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms));


//spinner animation
const spinner = createSpinner('loading next process');


async function mainMenu(){
    const mainMenu = chalkAnimation.rainbow('\nWelcome to Allergen Main Menu!');
    await resolveAnimations();
    mainMenu.stop();


    const answers = await inquirer.prompt({
        name: 'main_menu_prompt',
        type: 'list',
        message: `\n`,
        choices: [
            { name:'Edit Allergies', value: 'edit_allergens' },
            { name: 'Check Allergens in Beauty Product', value: 'check_allergens' }, 
            { name: 'Exit', value: 'exit'}
        ]
    });
   
    await pathChoice(answers.main_menu_prompt);


};

async function pathChoice(choice){
    spinner.start();
    await resolveAnimations();
    if(choice === 'edit_allergens'){
        spinner.success({text: 'Loading allergens...'});
        await allergenConsole();
    }else if(choice === 'check_allergens'){
        spinner.success({text: 'Loading allergen checker...'});
        await checkAllergens();
    }else if(choice == 'exit'){
        process.exit(1);
    }
};

async function allergenConsole(){
    console.clear(); // clear console 
    let answers = await inquirer.prompt({
        name: 'main_menu_prompt',
        type: 'list',
        message: `Choose from allergen editor menu `,
        choices: [
            { name:'Add allergens', value: 'add' },
            { name: 'Delete allergen', value: 'delete' }, 
            { name: "See allergens", value: 'get'}
        ]
    });
    
    if(answers.main_menu_prompt === 'add'){
        await addAllergies()
    }else if(answers.main_menu_prompt === 'delete'){
        await deleteAllergy();
    }else if(answers.main_menu_prompt === 'get'){
        await getAllergies(true); 
    }

    await mainMenu(); 

};

async function checkAllergens(){
    console.clear();
    let allergies = await getAllergies(false); // false to not print out allergies
    if(allergies.length == 0){await mainMenu();}

    let ingredients = await scrape(); 
    
    // compare allergies and ingredients 
    if(ingredients != null && allergies != null){
        console.log("\nIngredients in RED are ones you are ALLERGIC to! \n");
        for(let k = 0; k < ingredients.length; k++){
            if(allergies.includes(ingredients[k]) == true){
                console.log(
                    `\t> ${chalk.bgRed(ingredients[k])}`
                )
            }else{
                console.log('\t> ' + ingredients[k]);
            }
        }
    }

    await mainMenu(); // loop back to main menu 
}

// compare the allergies to the gotten stuff from product_scraper

async function main(){
    await mainMenu()
}

main()