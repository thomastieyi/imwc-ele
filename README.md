# ç®ä»

ð¥³ `Electron` + `Vue3` + `Vite` + `Pinia` + `Element-Plus` + `TypeScript`.

src æ¸²æè¿ç¨ä¸­æºç æ¥èª [v3-admin-vite](https://github.com/un-pany/v3-admin-vite).

## è¿è¡é¡¹ç®

```bash
# éç½®
1. å®è£ .vscode ä¸­æ¨èçæä»¶
2. node çæ¬ 16+

# åéé¡¹ç®
git clone https://github.com/un-pany/v3-electron-vite.git

# è¿å¥é¡¹ç®ç®å½
cd v3-electron-vite

# å®è£ä¾èµ
pnpm i

# åå§å husky
pnpm prepare

# å¯å¨æå¡
pnpm dev

# åçº§ææä¾èµ
pnpm up --latest
```

## æå

```bash
# æåæå®è£ç¨åº
pnpm build

# æåæè§£ååçç®å½
pnpm build:dir
```

## ä»£ç æ ¼å¼æ£æ¥

```bash
pnpm lint
```

## ç®å½ç»æ

```tree
âââ dist                æå»ºå
â   âââ main
â   âââ preload
â
âââ script
â   âââ main            ä¸»è¿ç¨æºç 
â   â   âââ index.ts
â   âââ preload         é¢å è½½èæ¬æºç 
â   â   âââ index.ts
â
âââ src                 æ¸²æè¿ç¨æºç 
â
âââ static              éæèµæº
â   âââ icons           ç³»ç»å¾æ 
```

## æ¸²æè¿ç¨ä½¿ç¨ Node API

> ð§ å ä¸ºå®å¨çåå  Electron é»è®¤ä¸æ¯æå¨ æ¸²æè¿ç¨ ä¸­ä½¿ç¨ NodeJs API

#### æ¨èææç NodeJsãElectron API éè¿ `preload-script` æ³¨å¥å° æ¸²æè¿ç¨ä¸­ï¼ä¾å¦ï¼

- **src/preload/index.ts**

  ```typescript
  import { contextBridge, ipcRenderer } from "electron"

  // --------- Expose some API to Renderer process. ---------
  contextBridge.exposeInMainWorld("$ipcRenderer", withPrototype(ipcRenderer))
  ```

- **src/@types/shims-vue.d.ts**

  ```typescript
  interface Window {
    $ipcRenderer: typeof import("electron")["ipcRenderer"]
  }
  ```

## Git æäº¤è§è

- `feat` å¢å æ°çä¸å¡åè½
- `fix` ä¿®å¤ä¸å¡é®é¢/BUG
- `perf` ä¼åæ§è½
- `style` æ´æ¹ä»£ç é£æ ¼, ä¸å½±åè¿è¡ç»æ
- `refactor` éæä»£ç 
- `revert` æ¤éæ´æ¹
- `test` æµè¯ç¸å³, ä¸æ¶åä¸å¡ä»£ç çæ´æ¹
- `docs` ææ¡£åæ³¨éç¸å³
- `chore` æ´æ°ä¾èµ/ä¿®æ¹èææ¶éç½®ç­çäº
- `workflow` å·¥ä½æµæ¹è¿
- `ci` æç»­éæç¸å³
- `types` ç±»åå®ä¹æä»¶æ´æ¹
- `wip` å¼åä¸­

## ç«å¨å·¨äººçè©èä¸

- [electron-vite-vue](https://github.com/electron-vite/electron-vite-vue)
- [electron-vue-admin](https://github.com/PanJiaChen/electron-vue-admin)
- [fast-vue3](https://github.com/study-vue3/fast-vue3)
