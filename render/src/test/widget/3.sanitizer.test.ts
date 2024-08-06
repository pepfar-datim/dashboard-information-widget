import {sanitizeContent} from "../../../../shared/sanitizeContent.service.ts";

const allowedIframeDomains: string[] = [
    'https://www.youtube.com/',
    'https://www.google.com/',
    'https://www.vimeo.com'
]

const testCases:string[][] = [
    ['<script>console.log()</script>',''],
    ['<script>console.log()</script>content','content'],
    ['<script>1</script>middle<script>2</script>',''],
    ['<iframe src="xxx"/>',''],
    ['<iframe src="https://www.vimeo.com/somePath"/>', '<iframe src="https://www.vimeo.com/somePath"/>'],
    ['<iframe src="https://www.youtube.com/embed/zduSFxRajkE?si=U11mG5dlUVzskN1O"></iframe>','<iframe src="https://www.youtube.com/embed/zduSFxRajkE?si=U11mG5dlUVzskN1O"></iframe>']
]

test(`3 > Sanitizer Test`, ()=>{
    testCases.forEach(([input, output])=> {
        const [safeContent,] = sanitizeContent(input, allowedIframeDomains)
        expect(safeContent).toBe(output)
    })
})