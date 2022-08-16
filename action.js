import Converter from "ansi-to-html";
import * as core from "@actions/core";
import fs from "fs";

export function main() {
  const converter = new Converter();
  const input = core.getInput("input", { required: false });
  const encoding = core.getInput("encoding", {
    required: true,
  });
  const path = core.getInput("path", { required: false });

  if (!input && !path) {
    return core.setFailed("You must provide either an input or path.");
  }

  if (input && path) {
    return core.setFailed(
      "You must provide either an input or path, not both."
    );
  }

  if (input && input !== "") {
    core.setOutput("contents", converter.toHtml(input));
  } else if (path && path !== "") {
    if (!fs.existsSync(path)) {
      return core.setFailed(`Path ${path} does not exist.`);
    }

    const rawContents = fs.readFileSync(path).toString(encoding);

    core.setOutput("contents", converter.toHtml(rawContents));
  }
}
