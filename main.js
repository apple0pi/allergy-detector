import chalk, { chalkStderr } from "chalk";
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
import { createSpinner } from "nanospinner";


const resolveAnimations = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms));
const {getProductInput, createURL, scrape} = required('./product_scraper');

//spinner animation
const spinner = createSpinner('loading next process');




async function mainMenu(){
    const mainMenu = chalkAnimation.rainbow('Welcome to Allegen Main Menu!');
    await resolveAnimations();
    mainMenu.stop();


    const answers = await inquirer.prompt({
        name: 'main_menu_prompt',
        type: 'list',
        message: `\n`,
        choices: [
            { name:'Edit Allergies', value: 'edit_allergens' },
            { name: 'Check Allergens in Beauty Product', value: 'check_allergens' }
        ]
    });
   
    await pathChoice(answers.main_menu_prompt);


};

async function pathChoice(choice){
    spinner.start();
    await resolveAnimations();
    if(choice === 'edit_allergens'){
        spinner.success({text: 'loading allergens...'});
        await editAllergens();
    }else if(choice === 'check_allergens'){
        spinner.success({text: 'Loading allergen checker...'});
         
    }
}

async function editAllergens(){

}
// compare the allergies to the gotten stuff from product_scraper

async function main(){
    await mainMenu()
}

main()