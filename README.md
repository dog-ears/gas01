# GAS 開発環境構築手順

このプロジェクトでは、Google Apps Script (GAS) をローカル環境で開発するために `clasp` を使用しています。

## 前提条件

- Node.js がインストールされていること

## プロジェクト設定

### 改行コードの統一 (LF)

Windows / Mac / Linux 間での開発の整合性を保つため、プロジェクト内の改行コードは **LF** に統一しています。

- **`.gitattributes`**: Git へのコミット時に強制的に LF に変換します。
- **`.editorconfig`**: エディタ（VS Code 等）でのファイル作成・保存時に LF を適用します。
  - VS Code を使用する場合は、拡張機能 **EditorConfig for VS Code** のインストールを推奨します。

### バージョン管理

- **`.gitignore`**: `node_modules` や `clasp` の設定ファイル（`.clasp.json`）など、Git 管理不要なファイルを除外しています。

## セットアップ手順

### 1. プロジェクトの初期化とライブラリのインストール

プロジェクトフォルダを作成し、初期化と必要なパッケージをインストールします。

```bash
npm init -y
npm install -D @google/clasp @types/google-apps-script
```

- `@google/clasp`: GAS プロジェクトを管理（作成、アップロード、ダウンロードなど）するためのツール
- `@types/google-apps-script`: ローカルエディタで補完を効かせるための型定義ファイル

### 2. Google アカウントへのログイン

`clasp` が Google ドライブにアクセスできるようにログインします。

```bash
npx clasp login
```

実行するとブラウザが開くので、使用する Google アカウントでログインし、権限を許可してください。

### 3. Google Apps Script API の有効化

`clasp` を使用するには、事前に API を有効にする必要があります。

1.  [Google Apps Script ユーザー設定](https://script.google.com/home/usersettings) にアクセスします。
2.  「Google Apps Script API」を **オン** に設定します。

### 4. GAS プロジェクトの作成

新しい GAS プロジェクトを作成します。

```bash
npx clasp create --title "gas01" --type standalone
```

- `--title`: プロジェクト名
- `--type`: スクリプトの種類（`standalone` はスプレッドシートなどに紐づかない独立したスクリプト）

## 開発の流れ

1.  ローカルでコードを書く (`.js` または `.ts`)
2.  Google ドライブへアップロードする
    ```bash
    npm run push
    ```
    ※ `clasp push` のショートカットです。
3.  ブラウザでエディタを開く（動作確認用）
    ```bash
    npm run open
    ```
    ※ `clasp open-script` のショートカットです。
