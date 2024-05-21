export class AdminRoute extends Error {
    constructor(message = 'The route you are trying to access is for ADMIN only.') {
        super(message);
        this.name = 'AdminRoute';
    }
}

export class LearnItemRoute extends Error {
    constructor(message = 'The route Item you are trying to access does not exist.') {
        super(message);
        this.name = 'LearnItemRoute';
    }
}

export class SessionRole extends Error {
    constructor(message = 'Please run the server to access the user session.') {
        super(message);
        this.name = 'SessionRole';
    }
}