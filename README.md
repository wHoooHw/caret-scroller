# Caret Scroller

***This extension aims to ease the read of large files, by setting the cursor (caret) at a fixed position. That way the eyes do not have to jump up and down.***

## Features

- **Fixed Cursor Position**: Keeps your cursor at a fixed position from the top of the viewport
- **Configurable Position**: Adjust how many lines from the top your cursor should be fixed
- **Visual Feedback**: Status bar indicator shows when the extension is active
- **Easy Toggle**: Turn the feature on/off with a keyboard shortcut

## Why Use Caret Scroller?

When navigating through large files, it can be disorienting to have your cursor move up and down in the viewport. This extension keeps your cursor at a consistent position (by default, 3 lines from the top), making it easier to focus on the code you're working with.

## Usage

### Keyboard Shortcuts

- `Ctrl+Alt+Cmd+T`: Toggle Caret Scroller on/off
- `Ctrl+Alt+Cmd+F`: Force cursor to fixed position (useful if scrolling gets out of sync)

### Commands

Open the Command Palette (`Cmd+Shift+P` or `Ctrl+Shift+P`) and search for:

- **Toggle Caret Scroller**: Turn the extension on/off
- **Set Caret Scroller Position**: Change how many lines from the top the cursor should be fixed (0-10)
- **Force Cursor To Top Position**: Immediately move the cursor to the fixed position

### Status Bar

The extension adds an indicator to the status bar:
- `Caret: ON (3)`: Extension is active, cursor fixed at line 3 from top
- `Caret: OFF`: Extension is inactive

Click on the status bar item to toggle the extension on/off.

## License

MIT 