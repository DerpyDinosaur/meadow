import type { Dirent } from 'node:fs';
import { readdir, rm } from "node:fs/promises";
import { join } from 'path';

function isNodeModule(value: Dirent) {
	return value.isDirectory() && value.name === "node_modules"
}

async function traverse(dir: string) {
	return await readdir(dir, { withFileTypes: true, recursive: true });
}

async function main() {
	const dir = process.cwd();
	const root = await traverse(dir)
	const matched = root.filter(isNodeModule)

	for(const item of matched){
		const full_path = join(item.parentPath, item.name)
		if(full_path.match(/node_modules/g).length > 1){
			continue
		}
		console.log("[x]", full_path)
		await rm(full_path, { recursive: true, force: true });
	}
}

await main();