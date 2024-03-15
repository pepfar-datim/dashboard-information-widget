import {sanitize} from "../../services/sanitize.service.ts";
import {expect} from "vitest";


const testCases:string[][] = [
    ['<script>console.log()</script>',''],
    ['<script>console.log()</script>content','content'],
    ['<script>1</script>middle<script>2</script>',''],
    ['<iframe src="xxx"/>',''],
]

test(`3 > Sanitizer Test`, ()=>{
    testCases.forEach(([input, output])=>expect(sanitize(input)).toBe(output))
})