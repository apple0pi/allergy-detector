import inquirer from "inquirer";

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
// async function createURL(){ // make async
//     let brokenUpName = productName.split(" "); 
//     for (let i = 0; i < brokenUpName.length-1; i++){ // dont include the last one 
//         param = brokenUpName[i]; 
//         if(param.includes("%")) {
//             url+=(param + "25+");
//         }else if(param.includes("'")){
//             param = param.replace("'","%27"); // replacing the apostrophe with this symbol instead 
//             url+= (param + "+");
//         }else{
//             url+=(param + "+"); 
//         }
//     }

//     // add the last part of the product name  
//     url+=((brokenUpName[brokenUpName.length-1]) + "&sort=featured"); 
//     return url; 
// }

async function main(){
    await getProductInput(); 
    await createURL(); 
    console.log(url);
}

main()