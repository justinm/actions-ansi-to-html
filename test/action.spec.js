import { main } from "../action.js";
import * as core from "@actions/core";
import chalk from "chalk";
import fs from "fs";

jest.mock("@actions/core");

describe("Action", () => {
  describe("using inputs", () => {
    it("returns an HTML safe string", () => {
      const mockGetInput = jest.fn((key) => {
        switch (key) {
          case "input":
            return chalk.red("test");
          case "encoding":
            return "utf8";
        }
        return undefined;
      });
      const mockSetOutput = jest.fn();

      jest.spyOn(core, "getInput").mockImplementation(mockGetInput);
      jest.spyOn(core, "setOutput").mockImplementation(mockSetOutput);

      main();

      expect(mockGetInput.mock.calls).toHaveLength(3);
      expect(mockSetOutput.mock.calls).toHaveLength(1);
      expect(mockSetOutput.mock.calls[0]).toHaveLength(2);
      expect(mockSetOutput.mock.calls[0][0]).toMatch("contents");
      expect(mockSetOutput.mock.calls[0][1]).toMatch(
        '<span style="color:#A00">test<span style="color:#FFF"></span></span>'
      );
    });
  });

  describe("using paths", () => {
    it("returns an HTML safe string", () => {
      const mockGetInput = jest.fn((key) => {
        switch (key) {
          case "encoding":
            return "utf8";
          case "path":
            return "./test.log";
        }
        return undefined;
      });
      const mockSetOutput = jest.fn();
      const mockExistsSync = jest.fn(() => true);
      const mockReadFileSync = jest.fn(() => chalk.red("test"));

      jest.spyOn(core, "getInput").mockImplementation(mockGetInput);
      jest.spyOn(core, "setOutput").mockImplementation(mockSetOutput);
      jest.spyOn(fs, "existsSync").mockImplementation(mockExistsSync);
      jest.spyOn(fs, "readFileSync").mockImplementation(mockReadFileSync);

      main();

      expect(mockGetInput.mock.calls).toHaveLength(3);
      expect(mockSetOutput.mock.calls).toHaveLength(1);
      expect(mockSetOutput.mock.calls[0]).toHaveLength(2);
      expect(mockSetOutput.mock.calls[0][0]).toMatch("contents");
      expect(mockSetOutput.mock.calls[0][1]).toMatch(
        '<span style="color:#A00">test<span style="color:#FFF"></span></span>'
      );
      expect(mockExistsSync.mock.calls).toHaveLength(1);
      expect(mockReadFileSync.mock.calls).toHaveLength(1);
    });

    it("returns an error when the path does not exists", () => {
      const mockGetInput = jest.fn((key) => {
        switch (key) {
          case "encoding":
            return "utf8";
          case "path":
            return "./test.log";
        }
        return undefined;
      });
      const mockSetOutput = jest.fn();
      const mockSetFailed = jest.fn();
      const mockExistsSync = jest.fn(() => false);
      const mockReadFileSync = jest.fn(() => chalk.red("test"));

      jest.spyOn(core, "getInput").mockImplementation(mockGetInput);
      jest.spyOn(core, "setOutput").mockImplementation(mockSetOutput);
      jest.spyOn(core, "setFailed").mockImplementation(mockSetFailed);
      jest.spyOn(fs, "existsSync").mockImplementation(mockExistsSync);
      jest.spyOn(fs, "readFileSync").mockImplementation(mockReadFileSync);

      main();

      expect(mockGetInput.mock.calls).toHaveLength(3);
      expect(mockSetOutput.mock.calls).toHaveLength(0);
      expect(mockExistsSync.mock.calls).toHaveLength(1);
      expect(mockReadFileSync.mock.calls).toHaveLength(0);
      expect(mockSetFailed.mock.calls).toHaveLength(1);
      expect(mockSetFailed.mock.calls[0]).toHaveLength(1);
      expect(mockSetFailed.mock.calls[0][0]).toMatch(
        `Path ./test.log does not exist.`
      );
    });
  });
});
