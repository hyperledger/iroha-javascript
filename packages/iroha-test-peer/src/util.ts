import fs from 'fs/promises';
import path from 'path';
import { inspect } from 'util';
import del from 'del';

export async function saveDataAsJSON(data: unknown, destination: string): Promise<void> {
    await fs.writeFile(destination, JSON.stringify(data), { encoding: 'utf-8' });

    const dir = await fs.readdir(path.dirname(destination));
    process.stdout.write(`JSON saved ${inspect({ dirAfter: dir, destination })}\n`);
}

export async function rmWithParams(target: string | string[]): Promise<void> {
    await del(target, { force: true });
}
