export class Rectangle {
    private _width: number;
    private _height: number
}

export class User {
    private _userName: string;
    private _password: string;
    private _id: string | number;
    constructor(username: string, password: string) {
        this._userName = username;
        this._password = password;
        this._id = this.generateRandomId()
    }
    generateRandomId() {
        return Math.random() * 100
    }

    get userName() {
        return this._userName
    }

    set userName(value: string) {
        
    }
}