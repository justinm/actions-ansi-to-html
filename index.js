import core from "@actions/core";
import Converter from "ansi-to-html";
import fs from "fs";

const converter = new Converter();
const input = core.getInput("input", { required: false });
const encoding = core.getInput("encoding", {
  required: true,
});
const path = core.getInput("path", { required: false });

if (!input && !path) {
  core.setFailed("You must provide either an input or path.");
}

if (input && path) {
  core.setFailed("You must provide either an input or path, not both.");
}

if (input && input !== "") {
  core.setOutput("contents", converter.toHtml(input));
} else if (path && path !== "") {
  const rawContents = fs.readFileSync(path).toString(encoding);

  core.setOutput("contents", converter.toHtml(rawContents));
}
