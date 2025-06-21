import * as vscode from 'vscode';

let isActive = false;
let disposable: vscode.Disposable | undefined;
let statusBarItem: vscode.StatusBarItem;
let fixedLinePosition = 3; // Default position from top

export function activate(context: vscode.ExtensionContext) {
  // Create status bar item
  statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  statusBarItem.text = "$(arrow-down) Caret: OFF";
  statusBarItem.tooltip = "Caret Scroller is inactive. Click to toggle.";
  statusBarItem.command = 'caretScroller.toggle';
  statusBarItem.show();
  context.subscriptions.push(statusBarItem);

  // Register the toggle command
  const toggleCommand = vscode.commands.registerCommand('caretScroller.toggle', () => {
    isActive = !isActive;
    updateStatusBar();

    if (isActive) {
      // When activated, listen for selection changes and cursor movement
      disposable = vscode.Disposable.from(
        vscode.window.onDidChangeTextEditorSelection(handleCursorMove),
        vscode.window.onDidChangeVisibleTextEditors(onVisibleEditorsChanged)
      );

      context.subscriptions.push(disposable);
      vscode.window.showInformationMessage('Caret Scroller: Activated');
      
      // Apply immediately to current editor
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        handleCursorMove({ textEditor: editor, selections: editor.selections, kind: undefined });
      }
    } else {
      // When deactivated, dispose of the event listeners
      if (disposable) {
        disposable.dispose();
        disposable = undefined;
      }
      vscode.window.showInformationMessage('Caret Scroller: Deactivated');
    }
  });

  // Function to handle cursor movement
  function handleCursorMove(event: vscode.TextEditorSelectionChangeEvent) {
    const editor = event.textEditor;
    const pos = editor.selection.active;
    
    // Calculate the line that should be at the top of the viewport
    const scrollLine = Math.max(0, pos.line - fixedLinePosition);
    
    // Reveal that line at the top of the editor
    editor.revealRange(
      new vscode.Range(scrollLine, 0, scrollLine, 0),
      vscode.TextEditorRevealType.AtTop
    );
  }

  // Function to handle visible editors changing
  function onVisibleEditorsChanged(editors: readonly vscode.TextEditor[]) {
    if (isActive && editors.length > 0) {
      editors.forEach(editor => {
        // Apply to all visible editors
        const pos = editor.selection.active;
        const scrollLine = Math.max(0, pos.line - fixedLinePosition);
        
        editor.revealRange(
          new vscode.Range(scrollLine, 0, scrollLine, 0),
          vscode.TextEditorRevealType.AtTop
        );
      });
    }
  }

  // Function to update the status bar
  function updateStatusBar() {
    if (isActive) {
      statusBarItem.text = `$(arrow-up) Caret: ON (${fixedLinePosition})`;
      statusBarItem.tooltip = "Caret Scroller is active. Click to toggle off.";
    } else {
      statusBarItem.text = "$(arrow-down) Caret: OFF";
      statusBarItem.tooltip = "Caret Scroller is inactive. Click to toggle on.";
    }
  }

  // Register a command to adjust the fixed position
  const setPositionCommand = vscode.commands.registerCommand('caretScroller.setPosition', async () => {
    const position = await vscode.window.showInputBox({
      prompt: 'Enter the fixed line position from top (0-10)',
      placeHolder: fixedLinePosition.toString(),
      validateInput: (input) => {
        const num = parseInt(input);
        return (isNaN(num) || num < 0 || num > 10) ? 'Please enter a number between 0 and 10' : null;
      }
    });
    
    if (position !== undefined) {
      fixedLinePosition = parseInt(position);
      updateStatusBar();
      vscode.window.showInformationMessage(`Caret fixed position set to line ${fixedLinePosition}`);
      
      // Apply the new position immediately if active
      if (isActive && vscode.window.activeTextEditor) {
        const editor = vscode.window.activeTextEditor;
        handleCursorMove({ textEditor: editor, selections: editor.selections, kind: undefined });
      }
    }
  });

  // Register a command to force the cursor to top
  const forceCursorToTopCommand = vscode.commands.registerCommand('caretScroller.forceCursorToTop', () => {
    if (vscode.window.activeTextEditor) {
      const editor = vscode.window.activeTextEditor;
      const pos = editor.selection.active;
      const scrollLine = Math.max(0, pos.line - fixedLinePosition);
      
      editor.revealRange(
        new vscode.Range(scrollLine, 0, scrollLine, 0),
        vscode.TextEditorRevealType.AtTop
      );
      
      vscode.window.showInformationMessage('Cursor position fixed at top');
    }
  });

  context.subscriptions.push(toggleCommand, setPositionCommand, forceCursorToTopCommand);
}

export function deactivate() {
  if (disposable) {
    disposable.dispose();
  }
  statusBarItem.dispose();
}
