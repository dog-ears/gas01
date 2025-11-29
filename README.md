# GAS 開発環境構築手順

このプロジェクトでは、Google Apps Script (GAS) をローカル環境で開発するために `clasp` を使用しています。  
コードは **TypeScript** で記述されています。

## 前提条件

- Node.js がインストールされていること

## プロジェクト設定

### 改行コードの統一 (LF)

Windows / Mac / Linux 間での開発の整合性を保つため、プロジェクト内の改行コードは **LF** に統一しています。

- **`.gitattributes`**: Git へのコミット時に強制的に LF に変換します。
- **`.editorconfig`**: エディタ（VS Code 等）でのファイル作成・保存時に LF を適用します。
  - VS Code を使用する場合は、拡張機能 **EditorConfig for VS Code** のインストールを推奨します。

### バージョン管理

- **`.gitignore`**: `node_modules` や `clasp` のアクティブな設定ファイル（`.clasp.json`）など、Git 管理不要なファイルを除外しています。
- **環境設定ファイル**: `.clasp-prod.json` (本番) と `.clasp-staging.json` (ステージング) は Git 管理対象です。チームで同じデプロイ先を共有します。

## セットアップ手順

### 1. プロジェクトの初期化とライブラリのインストール

プロジェクトフォルダを作成し、初期化と必要なパッケージをインストールします。

```bash
npm init -y
npm install -D @google/clasp @types/google-apps-script typescript @types/node
```

- `@google/clasp`: GAS プロジェクトを管理（作成、アップロード、ダウンロードなど）するためのツール
- `@types/google-apps-script`: ローカルエディタで補完を効かせるための型定義ファイル
- `typescript`: TypeScript コンパイラ
- `@types/node`: Node.js の型定義（開発ツール用）

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

## 開発の流れ（マルチ環境運用）

本プロジェクトは「本番 (Production)」と「ステージング (Staging)」の2つの環境を持っています。

### コマンド一覧

| 動作 | ステージング (Staging) | 本番 (Production) | 備考 |
| :--- | :--- | :--- | :--- |
| **アップロード** | `npm run push:staging` | `npm run push:prod` | コンパイルしてアップロード |
| **エディタを開く** | `npm run open:staging` | `npm run open:prod` | ブラウザで確認 |
| **型チェック** | `npm run typecheck` | - | アップロード前に実行推奨 |

### 基本的なフロー

1.  ローカルでコードを変更・実装する
2.  **ステージング環境**へアップロードして動作確認する
    ```bash
    npm run push:staging
    npm run open:staging
    ```
    ※ ここで他のメンバーに確認してもらうことも可能です。
3.  問題なければ**本番環境**へアップロードする
    ```bash
    npm run push:prod
    ```
