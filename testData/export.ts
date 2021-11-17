const yaml = require('js-yaml');
const fs   = require('fs');

export function exportYaml(data:any){
    fs.writeFileSync("export.yaml",yaml.dump(data));
}