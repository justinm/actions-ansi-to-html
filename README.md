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

- [Usage](#usage)
- [Contributors](#contributors)
- [Sponsoring](#sponsoring)

<!-- tocstop -->

## Usage

Read a file from disk that contains ANSI color escape sequences, escape its contents and post its contents to an active pull request.

```yaml
    - run: ./doSomething.sh | tee output.log
    - id: output-log
      uses: justinm/ansi-to-html-action@v0
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

## Sponsoring

[![Github Sponsors][sponsors-shield]][sponsors-url]
[![Patreon][patreon-shield]][patreon-url]
[<img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Contributors" height="30" />][sponsors-url]


[contributors-avatars]: https://contrib.rocks/image?repo=justinm/ansi-to-html-action
[contributors-shield]: https://img.shields.io/github/contributors/justinm/ansi-to-html-action.svg?style=for-the-badge
[contributors-url]: https://github.com/justinm/ansi-to-html-action/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/justinm/ansi-to-html-action.svg?style=for-the-badge
[forks-url]: https://github.com/justinm/ansi-to-html-action/network/members
[stars-shield]: https://img.shields.io/github/stars/justinm/ansi-to-html-action.svg?style=for-the-badge
[stars-url]: https://github.com/justinm/ansi-to-html-action/stargazers
[issues-shield]: https://img.shields.io/github/issues/justinm/ansi-to-html-action.svg?style=for-the-badge
[issues-url]: https://github.com/justinm/ansi-to-html-action/issues
[license-shield]: https://img.shields.io/github/license/justinm/ansi-to-html-action.svg?style=for-the-badge
[license-url]: https://github.com/justinm/ansi-to-html-action/blob/master/LICENSE.md
[buymeacoffee-url]: https://www.buymeacoffee.com/justinmccormick
[buymeacoffee-shield]: https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png
[sponsors-url]: https://github.com/sponsors/justinm
[sponsors-shield]: https://img.shields.io/github/sponsors/justinm?style=for-the-badge&logo=appveyor
[patreon-url]: https://patreon.com/justinmccormick
[patreon-shield]: https://img.shields.io/endpoint.svg?url=https%3A%2F%2Fshieldsio-patreon.vercel.app%2Fapi%3Fusername%justinmccormick%26type%3Dpatrons&style=for-the-badge&logo=patreon&label=Patreon