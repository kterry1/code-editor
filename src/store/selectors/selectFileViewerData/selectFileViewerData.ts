import {createSelector} from '@reduxjs/toolkit';
import FileViewerStructure from "../../../types/FileViewerStructure";
import UserFile from "../../../types/UserFile";
import {RootState} from '../../store';

const selectFileViewData = (userFiles: UserFile[]): FileViewerStructure => {
    const userFilesLength = userFiles.length;
    const result: FileViewerStructure = {} as FileViewerStructure;

    for(let i = 0; i < userFilesLength; i++) {
        const userFile = userFiles[i];
        const {name, relativePath, id, extension} = userFile;
        const paths = relativePath.split('/');
        let  j = 0; 
        let children;
        while(paths[j] !== name) {
            if(j === 0) {
                if(!result.name) {
                    result.id = j.toString();
                    result.name = paths[j];
                    result.children = []
                }
                j++;
                continue;
            }
            children = result.children!;
            // eslint-disable-next-line no-loop-func
            const subFolder = children.find(child => child.name === paths[j]);
            if(subFolder) {
                children = subFolder.children;
            } else {
                children.push({
                    id: j.toString(),
                    name: paths[j],
                    children: []
                })
                children = children[children.length - 1]
            }
            j++;
        }
        const fileData = {
            id,
            name,
            extension
        }
        if(!children) {
            result.children!.push(fileData)
        } else {
            (children as FileViewerStructure).children!.push(fileData)
        }
    }

    return result;
}

export default createSelector((state: RootState) => state.files.userFiles, selectFileViewData)