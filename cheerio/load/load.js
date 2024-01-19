import * as cheerio from 'cheerio';
export const load =  () => {
    const $ = cheerio.load( '<h1>Hello, world!</h1>');  
    console.log($("h1").text());
}