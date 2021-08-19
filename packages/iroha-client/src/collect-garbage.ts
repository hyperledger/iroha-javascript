export interface Freeable {
    free: () => void;
}

export interface GarbageCollectorScope {
    run: (cb: () => void) => void;
    free: () => void;
}

interface State {
    garbage: Freeable[];
}

let currentScope: null | State = null;

export function createScope(): GarbageCollectorScope {
    const state: State = {
        garbage: [],
    };

    return {
        run(cb) {
            if (currentScope) throw new Error('Already in scope');

            try {
                currentScope = state;
                cb();
            } finally {
                currentScope = null;
            }
        },
        free() {
            state.garbage.forEach((x) => x.free());
            state.garbage = [];
        },
    };
}

export function collect<T extends Freeable>(some: T): T {
    if (!currentScope) throw new Error('Not in the scope');

    currentScope.garbage.push(some);

    return some;
}
