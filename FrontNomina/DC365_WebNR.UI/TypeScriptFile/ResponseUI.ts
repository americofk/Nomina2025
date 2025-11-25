interface ResponseUI {
    Message: string
    Type: string
    IdType: string
    Errors: Array<String>
}

interface ResponseUIGeneric {
    Message: string
    Type: string
    Errors: Array<String>
    Obj: any
}