const yaml = require('js-yaml');
const fs   = require('fs');

export function exportYaml(data:any, output:string){
    fs.writeFileSync(output,yaml.dump(data));
}