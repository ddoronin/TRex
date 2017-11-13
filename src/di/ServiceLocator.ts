class Binder<T> {
    private readonly type: String;
    private readonly locator: Map<String, any>;

    constructor(type: String, locator: Map<String, any>) {
        this.type = type;
        this.locator = locator;
    }

    to<T>(instance: T) {
        this.locator.set(this.type, instance);
    }
}

export abstract class Injectable {
    static guid: String
}

export default class ServiceLocator {
    private locator: Map<String, any> = new Map();

    bind<T extends Injectable>(): Binder<T> {
        return new Binder(Injectable.guid, this.locator)
    }

    get<T extends Injectable>(): T {
        return this.locator.get(Injectable.guid)
    }
}
