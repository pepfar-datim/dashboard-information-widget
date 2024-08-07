const supportedFields:string[] = [
    'username',
    'surname',
    'firstName',
    'id',
    'employer',
    'created',
    'displayName',
    'name',
    'email',
    'phoneNumber',
    'interests'
]

type UserInfo = {
    [property:string]:string
}

export async function addUserFields(content:string):Promise<string>{
    if (!/{{.+}}/.test(content)) return content
    const userInfo:UserInfo = await fetch('../../../api/me').then(res => res.json())
    supportedFields.forEach(key=>{
        content = content.replace(new RegExp(`{{${key}}}`,'g'), userInfo[key])
    })
    return content
}