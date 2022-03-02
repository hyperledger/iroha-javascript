import fs from 'fs/promises';
import del from 'del';

export async function saveDataAsJSON(data: unknown, destination: string): Promise<void> {
    await fs.writeFile(destination, JSON.stringify(data), { encoding: 'utf-8' });
}

export async function rmForce(target: string | string[]): Promise<void> {
    await del(target, { force: true });
}
