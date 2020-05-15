#!/usr/bin/env node
const shell = require("shelljs");
const https = require('https');
const fs = require('fs');

//console.log(process.argv);
const args = [...process.argv];
// shidt node command, script path
args.shift();	
const dirPath = args.shift();
console.log(dirPath, args);

const jarExists = fs.existsSync('jerbil-all.jar');

if ( ! jarExists || args[0]==="-update" || args[0]==="--update") {
	console.log("Downloading latest jerbil-all.jar...");	
	const file = fs.createWriteStream("jerbil-all.jar");
	const request = https.get("https://www.winterwell.com/software/downloads/jerbil-all.jar", function(response) {
		  response.pipe(file);
		  console.log("...Download complete.");	
	});
	if (args[0]==="-update" || args[0]==="--update") {
		return; // dont go on to build a site
	}
	console.log("Note: If you get a message 'Invalid or corrupt jarfile' - Try re-running jerbil.");
}

shell.exec("java -jar jerbil-all.jar "+args.join(" "));

