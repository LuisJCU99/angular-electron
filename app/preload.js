const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    createUser: (user) => ipcRenderer.invoke('create-user', user),
    readUsers: () => ipcRenderer.invoke('read-users'),
    updateUser: (user) => ipcRenderer.invoke('update-user', user),
    deleteUser: (userId) => ipcRenderer.invoke('delete-user', userId)
});

