//1. First activity with Node.js

//we will createing a file  System Organiser
//Features of the project - 
//If you have numerous file in a folder and they are not properly arranged
//So you can use this tool to arrange them in specific directory according to their extension
//Like text file will go into text file folder .exe file will go into application folder and so on
//So at the end you will have a arranged set of files in specific folder

//we will be using built in node modules like fs and path to create this project

//Array ke from main input jaata hai command line pein

//let input = process.argv[2]
//console.log(input)

//run time - node Fo.js organize

//node js creates command line input as array and that array is your process array

const fs = require('fs')
const path = require('path')

let inputArr = process.argv.slice(2)	//slice is used to extract the command and path we have passed
//console.log(inputArr)

let command = inputArr[0]


let types = {
  media: ["mp4", "mkv", "mp3"],
  archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
  documents: [
    "docx",
    "doc",
    "pdf",
    "xlsx",
    "xls",
    "odt",
    "ods",
    "odp",
    "odg",
    "odf",
    "txt",
    "ps",
    "tex",
  ],
  app: ["exe", "dmg", "pkg", "deb"]
};

switch(command){
	case 'tree' :
			//console.log("I am tree")
			treeFn(inputArr[1])
			break;
	case 'organize' :
			//console.log("I am organioze")
			organizeFn(inputArr[1])
			break;
	case 'help' :
			helpFn()
			break;
	default :
	console.log('Please enter a valid command')
	break;
}

function treeFn(dirpath){
  //console.log(dirpath)
  if(dirpath == undefined){
    console.log("Please enter a valid Path")
  }
  else {
    let doesExist = fs.existsSync(dirpath)
    if(doesExist){
       treeHelper(dirpath , " ")
    }
  }
}



function treeHelper(dirpath , indent){
 let isFile = fs.lstatSync(dirpath).isFile()

 if(isFile==true){
    let fileName = path.basename(dirpath)
    console.log(indent + "├──" + fileName)
 }

 else{

   let dirName = path.basename(dirpath)
   console.log(indent + "└──" + dirName )

   let children = fs.readdirSync(dirpath)

   for(let i=0 ; i<children.length ; i++){
     let childPath = path.join(dirpath , children[i])
       treeHelper(childPath , indent + '\t')

   }

 }
}

function organizeFn(dirpath){
	//console.log('Organize function Implemented')
	//1. Input of a directory path

	let destPath;
	console.log(dirpath+" 110 ")
	if(dirpath == undefined){
		console.log("Please enter a directory path")
		return
	}
	else{
		let doesExist = fs.existsSync(dirpath)
		//console.log(doesExist)	//It returns true or false for the directory
		if(doesExist == true){
			//2. create a organized files directory
			destPath = path.join(dirpath, 'organized_files')
			//D:\pepcode\Dev classs\Calculator\organized_files

			if(fs.existsSync(destPath) == false){
				fs.mkdirSync(destPath)	//we will only create a directory if a does not exist
			}
			else{
				console.log("The file already exists")
			}

		}
		else{
			console.log("Please enter a valid path")
		}
	}
	organizeHelper(dirpath, destPath)
}

function organizeHelper(src, dest)
{
	let childName = fs.readdirSync(src)
	//console.log(childName)
	//console.log(dest)
	for(let i=0; i<childName.length; i++)
	{
		let childAddre = path.join(src, childName[i])
		let isFile = fs.lstatSync(childAddre).isFile()

		if(isFile == true){
			let fileCatagory = getCategory(childName[i])
			console.log(childName[i]+ ' belongs to ' +fileCatagory)

			sendFiles(childAddre, dest, fileCatagory)
		}

	}
}

function getCategory(name){
	let ext = path.extname(name)
	//console.log(ext)

	ext = ext.slice(1)
	//console.log(ext)

	for(let type in types){
		let ctyArr = types[type]
		//console.log(ctyArr)

		for(let i=0; i<ctyArr.length; i++)
		{
			if(ext == ctyArr[i]){
				return type
			}
		}
	}
	return "Others"
}

function sendFiles(srcFilePath, dest, fileCatagory)
{
	console.log(dest)
	let catPath = path.join(dest, fileCatagory)

	if(fs.existsSync(catPath) == false)
	{
		fs.mkdirSync(catPath)
	}

	let fileName = path.basename(srcFilePath)
	let destFilePath = path.join(catPath, fileName)
	fs.copyFileSync(srcFilePath, destFilePath)
	fs.unlinkSync(srcFilePath)

	console.log(fileName + " copied to " + fileCatagory)
}

function helpFn(){
	console.log(`List of all the command - 
		1)Tree command - node Fo.js tree <dirName> 
		2)Organize - node Fo.js organize <dirName> 
		3)Help - node Fo.js help`)
}


//D:\pepcode\Dev classs\Calculator\organized_files

//D:\pepcode\Dev classs\File_System_Organiser_27thNov\test app

//command - node Fo.js organize "D:\pepcode\Dev classs\File_System_Organiser_27thNov\test app"

//D:\pepcode\Dev_classs\File_System_Organiser_27thNov\test_app













