import {buildWatch} from "@pepfar-react-lib/local-package-builder";

console.log(`Building ${process.argv[2]}`)

buildWatch(process.argv[2],'../dhis2-app')