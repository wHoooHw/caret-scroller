# Caret Scroller

A VS Code extension that keeps your cursor (caret) fixed at a specific position in the viewport while scrolling through your code.

## Features

- **Fixed Cursor Position**: Keeps your cursor at a fixed position from the top of the viewport
- **Configurable Position**: Adjust how many lines from the top your cursor should be fixed
- **Visual Feedback**: Status bar indicator shows when the extension is active
- **Easy Toggle**: Turn the feature on/off with a keyboard shortcut

## Why Use Caret Scroller?

When navigating through large files, it can be disorienting to have your cursor move up and down in the viewport. This extension keeps your cursor at a consistent position (by default, 3 lines from the top), making it easier to focus on the code you're working with.

## Installation

1. Download the `.vsix` file from the releases
2. In VS Code, open the Extensions view (`Cmd+Shift+X` or `Ctrl+Shift+X`)
3. Click the "..." menu in the top-right of the Extensions view
4. Select "Install from VSIX..."
5. Navigate to the downloaded `.vsix` file and select it

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

## Configuration

Currently, the position can be set using the "Set Caret Scroller Position" command. The value represents how many lines from the top of the viewport your cursor will be fixed.

## Troubleshooting

If the cursor position seems incorrect:
1. Try using the "Force Cursor To Top Position" command (`Ctrl+Alt+Cmd+F`)
2. Toggle the extension off and on again (`Ctrl+Alt+Cmd+T`)
3. Adjust the position using the "Set Caret Scroller Position" command

## License

MIT 