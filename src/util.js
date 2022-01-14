export const compareAppVersion = () => {
    const currentAppVersion = process.env.REACT_APP_VERSION;
    const cacheAppVer = localStorage.getItem("AppVersion");
    if (!cacheAppVer || !currentAppVersion) {
        // We dont have version key so reset cache
        AppStorage.clearAppData();
    } else {
        // Compare if major version is changed.
        const version = currentAppVersion.split(".");
        const cacheVer = cacheAppVer.split(".");
        if (version.length !== cacheVer.length || version[0] !== cacheVer[0]) {
            // We dont have same versions standard or major is different so reset cache
            localStorage.clear();
        }
    }
    localStorage.setItem("AppVersion", currentAppVersion);
};