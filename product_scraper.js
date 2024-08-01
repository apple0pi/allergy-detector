import inquirer from "inquirer";
import puppeteer  from "puppeteer";
const baseURL = 'https://cosdna.com/eng/product.php?q='; 
let url = baseURL; 
let productName; 
async function getProductInput() {
    const answers = await inquirer.prompt({
        name: 'product_name',
        type: 'input',
        message: 'Hello, please enter your product name you want to search for: '
    });
    productName = answers.product_name;
 
};

async function createURL(){
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

async function scrape(){
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage(); 

    console.log(url)
    console.log(`Navigating to: ${url}`);

    try {
        await page.goto(url);
    } catch (error) {
        console.error(`Failed to navigate to ${url}:`, error);
        await browser.close();
        return;
    }

    await page.waitForSelector('a.inline-block.w-full');

    // Select the first <a> element with the specified class
    const link = await page.$('a.inline-block.w-full');

    // Ensure the element has an href attribute
    const hasHref = await page.evaluate(el => el.hasAttribute('href'), link);

    if (hasHref) {
        // Optionally, click the link if desired
        await link.click();
        
        // Optionally, wait for navigation if needed
        await page.waitForNavigation();
    } else {
        console.log('No link with the specified class and href found.');
    }

    await browser.close(); // Close the browser when done


}; 

async function main(){
    await getProductInput(); 
    await createURL(); 
    console.log(url)
    await scrape().catch(console.error);
}

main()