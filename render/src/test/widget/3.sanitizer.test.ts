import {sanitizeContent} from "../../../../shared/sanitizeContent.service.ts";


const testCases:string[][] = [
    ['<script>console.log()</script>',''],
    ['<script>console.log()</script>content','content'],
    ['<script>1</script>middle<script>2</script>',''],
    ['<iframe src="xxx"/>',''],
]

test(`3 > Sanitizer Test`, ()=>{
    testCases.forEach(([input, output])=>expect(sanitizeContent(input)).toBe(output))
})