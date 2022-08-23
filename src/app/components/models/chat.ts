export class Chat {
    constructor(
        public _id:string,
        public messages:Array<any>,
        public users_array:Array<any>,
        public date = new Date()
    ){}
}
