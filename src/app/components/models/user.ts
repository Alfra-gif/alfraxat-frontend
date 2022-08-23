export class User {
    constructor(
        public _id:string,
        public username:string,
        public email:string,
        public password:string,
        public friends:Array<any>,
        public search:string,
        public message:string,
        public date = new Date(),
        public image:string,
        public requests: Array<any>
    ){}
}
