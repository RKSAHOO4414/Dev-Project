//https://www.npmjs.com/package/inquirer
//npm install inquirer

var inquirer = require('inquirer');
const cp = require('child_process')


function displayDetails(){
inquirer
  .prompt([
    {
           type:'list',
           name :'Selection',
           choices:['About' , 'Skills' , 'Projects' , 'Resume']
    }
  ])
  .then((choices) => {
       if(choices.Selection =='About'){
              console.log(`A passionately curious Web developer 
              who just found out that making websites and seeing 
              the magic happen on the Internet is what excites him the most.`)
              displayNext()
       }

       else if(choices.Selection=='Skills'){
              console.log('JavaScript , Node , React , GoLang , Java ')
              displayNext()
       }

       else if(choices.Selection=='Projects'){
            cp.execSync('start chrome https://zifzesmt1ujnustyhqiyyg-on.drv.tw/www.ranjanresume.cf/')
            displayNext()
       }

       else if(choices.Selection=='Resume'){
              cp.execSync('start chrome https://drive.google.com/file/d/1cLbXDQ1fcYMQUiRxs4n5BBSqCXStWX1O/view?usp=sharing')
              displayNext()
       }
  })
 
}

displayDetails()


function displayNext(){
       var inquirer = require('inquirer');
inquirer
  .prompt([
         { type:'list',
       name :'GoBack',
       choices:['back']
         }
  ])
  .then((choice) => {
    if(choice.GoBack = 'back'){
           displayDetails()
    }
  })
 
}