import {PayloadAction} from '@reduxjs/toolkit';
import filesReducer, {initialState, setFiles, addActiveFile, removeActiveFile} from './reducer';

describe('files reducer', () => {
    test('should return the initial state if no known action is provided', () => {
        expect(filesReducer(undefined, {} as PayloadAction)).toEqual(initialState)
    });
    test('should set user files when action is setFiles', () => {
        const userFiles = [{
            id: '1',
            name: 'index.js',
            relativePath: 'test/index.js',
            code: 'console.log("hello world")',
            extension: 'js',
        }];
        const expectedState = {
            ...initialState,
            activeFiles : [],
            userFiles,
        };
        expect(filesReducer(initialState, setFiles(userFiles))).toEqual(expectedState);
    })
    test('should add a new file id when action is addActiveFile', () => {
        const fileId = '1';
        const expectedState = {
            ...initialState,
            activeFiles: [fileId]
        };
        expect(filesReducer(initialState, addActiveFile(fileId))).toEqual(expectedState);
    });
})