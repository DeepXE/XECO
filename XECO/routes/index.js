const { Client } = require("@notionhq/client");
const notion = new Client({ auth: process.env.NOTION_KEY })
const databaseId = process.env.NOTION_DATABASE_ID

var express = require('express');
var router = express.Router();

async function retrieveItem(name) {
  const pages = []; 
  let cursor = undefined;
  var result;

  while (true) {
    const { results, next_cursor } = await notion.databases.query({
      database_id: databaseId,
      start_cursor: cursor,
    })

    pages.push(...results);

    for(const page of pages) {
      result = page;
    }
    
    pages.pop();
    
    if (result.properties.Name.title[0]?.plain_text === name) {
      console.log(result.properties.Address.rich_text[0]?.plain_text);

      return result.properties.Address.rich_text[0]?.plain_text;
    }

    if (!next_cursor) {
      break;
    }
    cursor = next_cursor;
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect("https://prod.liveshare.vsengsaas.visualstudio.com/join?" + String(retrieveItem("DeepXE VSCODE LIVESHARE")));
});

module.exports = router;




