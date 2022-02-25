#!/usr/bin/env node
import { exec } from 'child_process';
import { Command, program} from 'commander';
import fs from 'fs';

const commander = new Command();
commander.usage("-p .");
commander.version('1.0.0', '-v, --version', 'output the current version');
const configPath = `/Users/semo/Sites/typo3.su14iman.com/.config/httpd-vhosts.conf`;

program
  .option('-p, --path <string>');

program.parse();

const options = program.opts();


if(!options.path){
    // default folder!
    const newPath = `    DocumentRoot "/Users/semo/Sites/typo3.su14iman.com"`;
    const data = fs.readFileSync(configPath).toString().split("\n");
    data[73]= newPath;
    const newConfig = data.join("\n");

    fs.writeFile(configPath, newConfig,(err)=>{
        if (err) return console.log(err);
        return exec('brew services restart httpd');
    });

}else{
    // current folder!
    if(options.path === '.'){
        const newPathDot = `    DocumentRoot "${process.cwd().toString()}"`;
        const dataDot = fs.readFileSync(configPath).toString().split("\n");
        dataDot[73]= newPathDot;
        const newConfigDot = dataDot.join("\n");

        fs.writeFile(configPath, newConfigDot,(err)=>{
                if (err) return console.log(err);
                return exec('brew services restart httpd');
        });
    }else{
        // -p: path!
        const newPath = `    DocumentRoot "${options.path}"`;
        const data = fs.readFileSync(configPath).toString().split("\n");
        data[73]= newPath;
        const newConfig = data.join("\n");

        fs.writeFile(configPath, newConfig,(err)=>{
            if (err) return console.log(err);
            return exec('brew services restart httpd');
        });
    }

}

