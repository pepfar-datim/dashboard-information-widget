import {sanitizeContent} from "../../../../shared/sanitizeContent.service.ts";

const testAllowedUrls: string[] = [
    'https://www.youtube.com/',
    'https://www.google.com/'
]

const testCases:string[][] = [
    ['<script>console.log()</script>',''],
    ['<script>console.log()</script>content','content'],
    ['<script>1</script>middle<script>2</script>',''],
    ['<iframe src="xxx"/>',''],
    ['<iframe src="https://www.youtube.com/embed/zduSFxRajkE?si=U11mG5dlUVzskN1O"/>','<iframe src="https://www.youtube.com/embed/zduSFxRajkE?si=U11mG5dlUVzskN1O"/>']
]

test(`3 > Sanitizer Test`, ()=>{
    testCases.forEach(([input, output])=>expect(sanitizeContent(input, testAllowedUrls)).toBe(output))
})