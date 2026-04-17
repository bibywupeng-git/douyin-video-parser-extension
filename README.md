# Douyin Video Parser Extension (Chrome)

A lightweight, open-source Chrome extension that helps users send Douyin video page URLs to GrabClip for link analysis, parsed result viewing, and extended video processing.

This project is designed with a minimal architecture and a clear separation between the browser extension and the web-based processing workflow.

## Introduction

This Chrome extension helps users work more efficiently with Douyin video pages by extracting the current page URL and sending it to GrabClip.

On GrabClip, users can continue working with the video link, view parsed results, and access additional processing tools.

The extension itself does not process media files locally. It serves as a lightweight bridge between Douyin video pages and the GrabClip web-based workflow.

The goal of this project is to provide a clean, permission-minimized browser extension architecture for Douyin video link analysis and processing workflows.

## Features

- Parse Douyin video page URLs
- Send the current Douyin video page URL to GrabClip
- Open a new tab to the GrabClip Douyin page
- Support user-triggered actions from both:
  - the browser toolbar icon
  - the contextual action button injected into supported Douyin pages
- Let users continue processing video links on GrabClip
- Let users view parsed results on GrabClip
- Minimal permissions and lightweight implementation
- Clear separation between extension logic and web processing
- No local storage of user data or browsing history

## Installation

### Manual Installation (Developer Mode)

This extension can be installed locally for development or evaluation purposes:

1. Download this repository (Click **Code** → **Download ZIP**) and unzip it.
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable **Developer mode** (top right)
4. Click **Load unpacked**
5. Select the unzipped project folder
6. The extension will appear in your browser toolbar

## Usage

1. Open any supported Douyin video page in your browser.

2. Start the parsing process in either of the following ways:
   - Click the extension icon in the browser toolbar, or
   - Click the action button added by the extension directly on the Douyin page

3. The extension will automatically open a new tab to the GrabClip Douyin page.

4. On that page, users can continue working with the video link, view parsed results, and use additional tools provided by GrabClip.

The extension serves as a convenient entry point from Douyin, while link handling and extended processing are provided on GrabClip.

## Website

GrabClip Douyin page:

https://www.grabclip.com/douyin

## Notes

- The extension only activates on supported Douyin pages
- No media files are downloaded or processed directly by the extension
- Link handling, parsed result viewing, and extended processing are handled on GrabClip
- The extension does not track or store personal data
- If Douyin changes its page structure, selectors may need to be updated

## Project Structure

```text
douyin-video-parser-extension/
├── _locales/               # Internationalization messages
├── analyzers/              # Parsing logic modules
├── icons/                  # Extension icons
├── background.js           # Background service worker
├── content.js              # Injects action button into Douyin pages
├── manifest.json           # Chrome extension configuration
└── README.md               # Project documentation
```
## Privacy Policy

This project respects user privacy.

- No personal data is collected or stored
- No browsing history is tracked
- The extension operates only on supported video pages
- Processing is triggered only by explicit user interaction

For more details, please review the Privacy Policy:

https://www.grabclip.com/privacy_policy

## Contributing

Contributions are welcome and appreciated.

If you’d like to contribute to this project, please follow these steps:

1. Fork the repository
2. Create a new branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes
4. Commit your changes with a clear message
5. Push your branch to your fork
6. Open a Pull Request

Suggested contribution areas include:

- Code improvements and refactoring
- Bug fixes
- Documentation updates
- Localization and translations

## License

This project is licensed under the MIT License.  
See the `LICENSE` file for details.

## Disclaimer

This project is not affiliated with, endorsed by, or sponsored by Douyin.

It is intended for educational and technical demonstration purposes only. Users are responsible for ensuring compliance with applicable laws and platform terms of service.

## About

A lightweight Chrome extension that sends Douyin video page URLs to GrabClip for link analysis, parsed result viewing, and extended video processing.