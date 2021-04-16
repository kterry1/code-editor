import UserFile from '../../../types/UserFile';
import CustomFile from '../../../types/CustomFiles';
import {v4 as uuidv4} from 'uuid';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setFiles } from '../../reducers/files/reducer';

const readSingleFile = (file: CustomFile): Promise<UserFile> => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function() {
            const {name, webkitRelativePath = ""} = file;
            const id = uuidv4();
            const code = typeof reader.result === 'string' ? reader.result : "";
            const splitName = name.split('.');
            const extension = splitName[splitName.length - 1];
            resolve({
                id,
                name,
                code,
                extension,
                relativePath: webkitRelativePath,
            })
        }
    })
}

const readFiles = createAsyncThunk('files/readFiles', async(files: FileList, {dispatch}) => {
    const numOfFiles = files.length;
    const promises = Array.from({length: numOfFiles}, (_, i) => {
        const file = files[i];
        return readSingleFile(file);
    });
    const userFiles = await Promise.all(promises);
    dispatch(setFiles(userFiles))
})

export default readFiles;