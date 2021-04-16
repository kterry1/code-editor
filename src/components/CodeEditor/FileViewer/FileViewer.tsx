import React from 'react'
import {makeStyles} from '@material-ui/core';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import selectFileViewerData from '../../../store/selectors/selectFileViewerData/selectFileViewerData';
import FileViewerStructure from '../../../types/FileViewerStructure';
import { TreeItem, TreeView } from '@material-ui/lab';
import ExtensionIcon from '../ExtensionIcon/ExtensionIcon';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import FolderIcon from '@material-ui/icons/Folder';
import openFile from '../../../store/thunks/openFile/openFile';

const FileViewer = () => {
    const classes = useStyles();
    const fileViewerData = useAppSelector(selectFileViewerData);
    const dispatch = useAppDispatch();
    const onSelectNode = (node: FileViewerStructure) => {
        dispatch(openFile(node))
    }

    const renderTree = (node: FileViewerStructure) => {
        return (
            <TreeItem 
            className={classes.treeItem} 
            key={node.id} 
            nodeId={node.id} 
            label={node.name} 
            endIcon={<ExtensionIcon extension={node.extension}/>}
            onDoubleClick={() => onSelectNode(node)}>
                {Array.isArray(node.children) ? node.children.map((node) => renderTree(node)) : null}
            </TreeItem>
        )
    }
    if(!Object.keys(fileViewerData).length) {
        return <div className={classes.emptyMessage}>No Files</div>
    }
    return (
        <TreeView className={classes.root} defaultCollapseIcon={<FolderOpenIcon />} defaultExpandIcon={<FolderIcon/>}>
            {renderTree(fileViewerData)}
        </TreeView>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '0px 10px 10px',
        height: '100%',
        width: '100%'
    },
    treeItem: {
        padding: '2px',
        color: theme.font
    },
    emptyMessage: {
        color: theme.font
    }
}))

export default FileViewer;

