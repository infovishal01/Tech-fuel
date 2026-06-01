import fs from "fs";

import path from "path";

import matter from "gray-matter";

const tutorialsDirectory =
  path.join(
    process.cwd(),
    "content/tutorials"
  );

export function getTutorialBySlug(
  slug: string
) {

  const fullPath =
    path.join(
      tutorialsDirectory,
      `${slug}.mdx`
    );

  const fileContent =
    fs.readFileSync(
      fullPath,
      "utf8"
    );

  const {
    data,
    content,
  } = matter(fileContent);

  return {
    frontmatter: data,
    content,
  };
}