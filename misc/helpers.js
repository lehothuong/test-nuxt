const numberRegex = /\d+/g;

export const getEntityName = character => {
  let entityName = undefined;
  switch (character) {
    case "p":
      entityName = "products";
      break;
    case "c":
      entityName = "categories";
      break;
  }
  return entityName;
};

export const getEntityInfo = path => {
  if (!path) {
    return undefined;
  }
  path = path.split(/[?#]/)[0];
  const entityObj = path.split("-").pop();
  const entityCharacter = entityObj.replace(numberRegex, "");
  const entityName = getEntityName(entityCharacter);

  if (entityObj.indexOf(entityCharacter) !== 0) {
    return undefined;
  }

  if (entityName) {
    return {
      entityName: entityName,
      entityId: entityObj.replace(entityCharacter, "")
    };
  }

  return undefined;
};

export const handleVendorLink = (path, vendorPlatform, window) => {
  let res = Object.keys(vendorPlatform).filter(e => path.includes(e));
  // if(window.ReactNativeWebView){
  //   window.ReactNativeWebView.postMessage(res.length > 0 ? vendorPlatform[res[0]].name : '')
  // }
  return res.length > 0 ? vendorPlatform[res[0]] : "";
};

export const handledWatchDomain = link => {
  let matches = link.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
  let domain = matches && matches[1];
  return domain;
};

export const hanlerDomain = (path) => {
  return path === 'gocashback.vn' ? 'https://ext-api.gocashback.vn/api/active-vendor' : 'https://ext-api-staging.gocashback.vn/api/active-vendor'
}
