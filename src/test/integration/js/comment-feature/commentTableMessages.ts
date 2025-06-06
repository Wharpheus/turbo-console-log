import * as vscode from 'vscode';
import Mocha, { it, describe } from 'mocha';
import { expect } from 'chai';
import {
  openDocument,
  expectActiveTextEditorWithFile,
  documentLinesChanged,
  naturalEditorLine,
} from '../../helpers';
import { ProgrammingLanguage } from '../../../../entities';

export default (): void => {
  describe('Comment log messages with the logType setting being set to table', () => {
    Mocha.before(async () => {
      await openDocument(
        ProgrammingLanguage.JAVASCRIPT,
        'comment-feature',
        'commentTableMessages.js',
      );
    });
    Mocha.after(async () => {
      await vscode.commands.executeCommand(
        'workbench.action.closeActiveEditor',
        [],
      );
    });
    it('Should comment log messages with the table as the log type', async () => {
      const { activeTextEditor } = vscode.window;
      expectActiveTextEditorWithFile(
        activeTextEditor,
        'commentTableMessages.js',
      );
      if (activeTextEditor) {
        await vscode.commands.executeCommand(
          'turboConsoleLog.commentAllLogMessages',
          [
            {
              logType: 'table',
            },
          ],
        );
        await Promise.all(
          documentLinesChanged(activeTextEditor.document, [
            naturalEditorLine(10),
            naturalEditorLine(14),
            naturalEditorLine(17),
          ]),
        );
        const textDocument = activeTextEditor.document;
        const logMessagesLines = [
          naturalEditorLine(10),
          naturalEditorLine(14),
          naturalEditorLine(17),
        ];
        for (const logMessageLine of logMessagesLines) {
          expect(
            textDocument
              .lineAt(logMessageLine)
              .text.replace(/\s/g, '')
              .startsWith('//'),
          ).to.equal(true);
        }
      }
    });
  });
};
