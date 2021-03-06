import {Dispatch} from 'redux';
import FileViewerStructure from '../../../types/FileViewerStructure';
import supportedExtensions from '../../../constants/supportedExtensions';
import {addActiveFile, setEditorActiveFile} from '../../reducers/files/reducer';
import { RootState } from '../../store';

const openFile = (node: FileViewerStructure) => (dispatch: Dispatch, getState: () => RootState) => {

    const {extension: fileExtension = "", id: fileId, children} = node;
    if(children || !supportedExtensions[fileExtension]) {
        return;
}

const state = getState();
const activeFiles = state.files.activeFiles;
if(!activeFiles.includes(fileId)){
    dispatch(addActiveFile(fileId));
}
dispatch(setEditorActiveFile(fileId))
}

export default openFile;