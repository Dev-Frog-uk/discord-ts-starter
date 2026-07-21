import { readdir } from "node:fs/promises";
import { extname } from "node:path";

type DefaultExport<T> = { default?: T };

export async function loadDefaultExports<T>(directory: URL): Promise<T[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const modulePaths = entries
    .filter(
      (entry) =>
        entry.isFile() &&
        [".js", ".ts"].includes(extname(entry.name)) &&
        !entry.name.endsWith(".d.ts"),
    )
    .map((entry) => new URL(entry.name, directory))
    .sort((a, b) => a.pathname.localeCompare(b.pathname));

  return Promise.all(
    modulePaths.map(async (modulePath) => {
      const module = (await import(modulePath.href)) as DefaultExport<T>;

      if (!module.default) {
        throw new Error(`${modulePath.pathname} must have a default export`);
      }

      return module.default;
    }),
  );
}
