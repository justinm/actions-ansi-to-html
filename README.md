## "ANSI to HTML" Action For GitHub Actions

A Github Action that converts ANSI color sequences to HTML friendly HEX codes. 

<div style="text-align: center;">

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

</div>

**Table of Contents**

<!-- toc -->

- [Examples](#examples)
- [Contributors](#contributors)
- [About the Author](#about-the-author)
- [Sponsoring](#sponsoring)

<!-- tocstop -->


## Inputs

* `path` **Required** The path to the file containing ANSI color codes. **OR**
* `input` **Required** The raw input containing ANSI color codes.
* `encoding` **Optional** The encoding for the raw input. Defaults to utf8.

*Note, only path or input may be specified at a time.*

## Outputs

* `contents` **Required** The input or contents of path where all ANSI codes have been replaced with HTML color codes. **OR**

## Examples

Read a file from disk that contains ANSI color escape sequences, escape its contents and echo its contents to an active pull request.

```yaml
    - run: echo -en "\e[36mSample Text\e[0m" | tee output.log
    - id: output-log
      uses: justinm/actions-ansi-to-html@v0
      with:
        path: ./output.log
    - run: echo "${{ steps.output-log.outputs.contents }}"
```

Read a file from disk that contains ANSI color escape sequences, escape its contents and post its contents to an active pull request.

```yaml
jobs:
  build:
    permissions:
      contents: read
      pull-requests: write
    steps:
    - run: ./doSomething.sh | tee output.log
    - id: output-log
      uses: justinm/actions-ansi-to-html@v0
      with:
        path: ./output.log
    - run: echo "${{ steps.output-log.outputs.contents }}"
    - if: ${{ github.event_name == 'pull_request' }}
      uses: thollander/actions-comment-pull-request@v1
      permissions:
        contents: read
        pull-requests: write
      with:
        message: |
          <details>
          <summary>output.log</summary>
          \`\`\`
          ${{ steps.output-log.outputs.content }}
          \`\`\`
          </details>
          *${{ steps.resolve-comment-id.outputs.comment-id }}*
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        comment_includes: ${{ steps.resolve-comment-id.outputs.comment-id }}
```

## Contributors

[![Contributors][contributors-avatars]][contributors-url]


[contributors-avatars]: https://contrib.rocks/image?repo=justinm/actions-ansi-to-html
[contributors-shield]: https://img.shields.io/github/contributors/justinm/actions-ansi-to-html.svg?style=for-the-badge
[contributors-url]: https://github.com/justinm/actions-ansi-to-html/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/justinm/actions-ansi-to-html.svg?style=for-the-badge
[forks-url]: https://github.com/justinm/actions-ansi-to-html/network/members
[stars-shield]: https://img.shields.io/github/stars/justinm/actions-ansi-to-html.svg?style=for-the-badge
[stars-url]: https://github.com/justinm/actions-ansi-to-html/stargazers
[issues-shield]: https://img.shields.io/github/issues/justinm/actions-ansi-to-html.svg?style=for-the-badge
[issues-url]: https://github.com/justinm/actions-ansi-to-html/issues
[license-shield]: https://img.shields.io/github/license/justinm/actions-ansi-to-html.svg?style=for-the-badge
[license-url]: https://github.com/justinm/actions-ansi-to-html/blob/master/LICENSE.md