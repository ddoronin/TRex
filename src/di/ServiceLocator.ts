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

export default class ServiceLocator {
    private locator: Map<String, any> = new Map();

    bind<T>(type: String): Binder<T> {
        return new Binder(type, this.locator)
    }

    get<T>(type: String): T {
        return this.locator.get(type)
    }
}
