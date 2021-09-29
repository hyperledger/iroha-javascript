import consola from 'consola';

export async function main(fn: () => Promise<void> | void): Promise<void> {
    return Promise.resolve()
        .then(() => fn())
        .catch((err) => {
            consola.fatal(err);
            process.exit(1);
        });
}
