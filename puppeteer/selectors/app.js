
import  * as Puppeteer  from "puppeteer";
export async function selector (){

    try {
        // lunching browsers
        const browser = await Puppeteer.launch({headless:true});
    
        // Create a page
        const page = await browser.newPage();
       
        // Go to your site
        await page.goto('https://www.startech.com.bd/', {timeout:10000});

        // Query for an element handle.
        const element = await page.waitForSelector('div > .cat-items-wrap');

        console.log(element)



    } catch (error) {
        console.log(error);
        
    }
}