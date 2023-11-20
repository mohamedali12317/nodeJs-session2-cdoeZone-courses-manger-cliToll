// console.log('hello mohamed');

// console.log(process.argv);

// if (process.argv[2] === 'add') {
//  console.log('u are going to add course with name' , process.argv[3]);
// }

// const { Command } = require('commander');

import { Command } from 'commander';

import inquirer from 'inquirer';

import fs from 'fs';
import { error } from 'console';

const program = new Command();

let questions = [
  {
     type : 'input' ,
     name : 'title',
     message : 'please enter course title' ,
  } ,

  {
    type : 'number' ,
    name : 'price',
    message : 'please enter course price' ,
 } ,

 ]

// we will give them some of information

program
  .name('codeZone-courses-manger')
  .description('CLI to make courses')
  .version('1.0.0');


  program.command('add') // i want to make command add i can chooes ofcoures any name i want

  .alias('a') // على طولa الالياث دا الى هو الحاجة البديله فا اكتب 

  .description('add a course')
  
  .argument('<title>', 'add course title')

  .option('--price <price>', 'add course price')

  .action((str, options) => {
    console.log (options);
    console.log('str , options =>' , str, options);
  });


  // كومند اخر

  program.command('list') 

  .alias('L') // على طولa الالياث دا الى هو الحاجة البديله فا اكتب 

  .description('list all courses')

  .action(() => {
    console.log('courses');

    fs.readFile(filePath, language , (err , content) => {
      if (err) {
        console.log('error' + err);
        process.exit();
      }

      console.table(JSON.parse(content));
    })
  });


  // كومند للللا نكوير

  let filePath = './course.json';

  let language = 'utf-8' ;

  program.command('Add') 

  .alias('A') // على طولa الالياث دا الى هو الحاجة البديله فا اكتب 

  .description('add a course')

  .action(() => {

    inquirer
    .prompt(questions) // عشان مش حابب اعمل زاحما فا عملتو فوق فى فاريبول
    .then((answers) => {
        console.log(answers);

        if (fs.existsSync(filePath)) {
          fs.readFile(filePath , language , (err , fileContent) => {
            if (err) {
              console.log('error' , err);
              process.exit();
            }

            console.log('fileContent =>' , fileContent);

            let fileContentAsJson = JSON.parse(fileContent);

            fileContentAsJson.push(answers);

            fs.writeFile(filePath , JSON.stringify(fileContentAsJson) , language , ()=> {
              console.log('add a course Done');
            })

          })

        } else {
          fs.writeFile(filePath , JSON.stringify([answers]) , 'utf-8' , ()=> {
            console.log('add a course Done');
          })
        }

     
    })
    
  });


  program.parse(process.argv); // دابيكون فى اخر حاجة اخر كود بيتحط


  //   inquirer

  // inquirer
  // .prompt([
  //  {
  //     type : 'input' ,
  //     name : 'programming',
  //     message : 'What is ur favorite programming language' ,
  //  }
  // ])
  // .then((answers) => {
  //     console.log(answers);
  // })
  // .catch((error) => {
  //   if (error.isTtyError) {
  //     // Prompt couldn't be rendered in the current environment
  //   } else {
  //     // Something else went wrong
  //   }
  // });