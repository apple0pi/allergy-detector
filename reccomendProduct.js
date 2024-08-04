import inquirer from "inquirer";
import puppeteer  from "puppeteer";
import getAllergies from "./allergenEditor.js";
const baseURL = 'https://incidecoder.com/search/product?query='; 
let url = baseURL; 
let productName;

async function getReccProdInput(){
    url = baseURL; 
    let product = await inquirer.prompt({
        name: 'product_name',
        type: 'input',
        message: 'Hello, please enter your product name you want to search for: '
    });

    productName = product.product_name;
}

async function createReccProdURL(){
    let allergies = await getAllergies(); 
    if(allergies.length == 0){return;}


    let brokenUpName = productName.split(" ");
    for (let i = 0; i < brokenUpName.length-1; i++){ // dont include the last one 
        let param = brokenUpName[i]; 
        if(param.includes("%")) {
            url+=(param + "25+");
        }else{
            url+=(param + "+"); 
        }
    }

    url+= (brokenUpName[brokenUpName.length-1]); // add on last bit 

    // add on excluded ingredients 
    for(let k = 0; k < allergies.length; k++){
        let excluded = allergies[k]; 
        url+="&exclude="; 
        excluded = excluded.split(" "); 
        for(let p = 0; p < excluded.length-1; p++){
            url+=(excluded[p] + "+");
        }
        url+=(excluded[excluded.length-1]); 
    }

    
}

export async function getReccomendedProducts(){
    await getReccProdInput();
    await createReccProdURL(); 

    let browser = await puppeteer.launch({ headless: true}); //launch browser .. change headless to true after debug
    let page = await browser.newPage();

    // waiting for page to load after routing to specific URL 
    await page.goto(url);
   
    await page.waitForSelector('a.klavika.simpletextlistitem');

    let recommededProducts = await page.evaluate(() => {
        let values = document.querySelectorAll('a.klavika.simpletextlistitem');
        return Array.from(values).map(value => value.textContent.trim());
    });
    console.log(recommededProducts);
    return recommededProducts;
};

export default getReccomendedProducts;


