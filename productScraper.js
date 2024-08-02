import inquirer from "inquirer";
import puppeteer  from "puppeteer";
const baseURL = 'https://cosdna.com/eng/product.php?q='; 
let url = baseURL; 
let productName; 
let productIngredients; 

export async function getProductInput() {
    url = baseURL; 
    let answers = await inquirer.prompt({
        name: 'product_name',
        type: 'input',
        message: 'Hello, please enter your product name you want to search for: '
    });
    
    productName = answers.product_name;
};

export async function createURL(){
    let brokenUpName = productName.split(" ");
    for (let i = 0; i < brokenUpName.length-1; i++){ // dont include the last one 
        let param = brokenUpName[i]; 
        if(param.includes("%")) {
            url+=(param + "25+");
        }else if(param.includes("'")){
            param = param.replace("'","%27"); // replacing the apostrophe with this symbol instead 
            url+= (param + "+");
        }else{
            url+=(param + "+"); 
        }
    }

    // add the last part of the product name  
    url+=((brokenUpName[brokenUpName.length-1]) + "&sort=featured"); 
};

export async function scrape(){
    await getProductInput(); 
    await createURL();
    let browser = await puppeteer.launch({ headless: true}); //launch browser .. change headless to true after debug
    let page = await browser.newPage();

    // waiting for page to load after routing to specific URL 
    await page.goto(url);
    await page.waitForSelector('a.inline-block.w-full');

    
    let firstLink = await page.$('a.inline-block.w-full'); // get first element that's a tag with the following classname 

    if (firstLink) {
    
        let href = await page.evaluate(el => el.getAttribute('href'), firstLink); 
        
        let productURL = new URL(href, url).href;
        

        await page.goto(productURL); // go to first specified link 

        // Wait for the new page to load completely
        await page.waitForSelector('body');
        await page.waitForSelector('span.colors');

        // Get all <span> elements with "color" as the class from page  
        productIngredients = await page.evaluate(() => {
            let spans = document.querySelectorAll('span.colors'); // get list of elements that match span.colors 
            return Array.from(spans).map(span => span.textContent.trim()); // make nodeList into an array and get text value of each span element
        });

        return productIngredients;

    } else {
        console.log('Product Does Not Exist.');
    }

}; 


export default scrape; 