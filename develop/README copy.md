# FLAT Astroテンプレート

- [Astro@2.0.11](https://astro.build/ "Astro@2.0.11")
- integrations
  - [@astrojs/image](https://github.com/withastro/astro/tree/main/packages/integrations/image/ "@astrojs/image")
  - [@astrojs/sitemap](https://github.com/withastro/astro/tree/main/packages/integrations/sitemap/ "@astrojs/sitemap")
  - [astro-compress](https://github.com/astro-community/astro-compress "astro-compress")
- CSS (Sass + PostCSS Plugins)
  - cssModules
  - glob @use
  - autoprefixer
- TypeScript
- markuplint
- ESLint
- Stylelint
- pretteir
- commitlint
- husky
- hygen

## 環境

Node.js v16.19.0

バージョン管理にnvm(Node Version Manager)を利用している環境では、`nvm use`コマンドの実行で指定のバージョンに切り替わります。

```
nvm use
```

下記メッセージが表示された場合は、`nvm install 16.19.0`でインストールしてください。

```
Found '/パス省略/.nvmrc' with version <16.19.0>
N/A: version "16.19.0 -> N/A" is not yet installed.

You need to run "nvm install 16.19.0" to install it before using it.
```

### エディタセットアップ
VScodeをお使いの方は公式推奨の拡張機能をご使用ください。

[VScode拡張機能 - Astro](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode "")（公式推奨）

- .astroファイルのシンタックスハイライト
- .astroファイルのTypeScript型情報
- VS Code Intellisenseによるコード補完、ヒントなど

## インストール

```
npm ci
```

このコマンドは、`node_modules`ディレクトリを自動で削除し、パッケージのバージョンが環境によって差のないように安全にインストールを行います。`npm install`ではなくこちらのコマンドを使用してください。

## コマンド

### 開発

```
npm run dev
```

### ビルド

```
npm run build
```

### プレビュー

```
npm run preview
```
ローカルでビルド環境のプレビューを行います。

## Astro Componentの作成

```
npm run new:ac
```

上記のコマンドにて対話式でコンポーネントファイルが作成されます。

- ComponentName.astro
- ComponentName.module.scss


## husky

pre-commitで各種リンターやフォーマッターを実行しています。  
commitが中断された場合は、エラーを解消した上で再度commitお願いします。

- markuplint
- ESLint
- Stylelint
- commitlint
- Prettier

## コミットルール
commitlintの標準設定を使用しています。
詳しいルールは[ドキュメント](https://www.npmjs.com/package/@commitlint/config-conventional "ドキュメント")をご参照ください。

【接頭辞】
- `build:` ビルド
- `ci:` CI
- `chore:` 雑事（カテゴライズする必要ないようなもの）
- `docs:` ドキュメント
- `feat:` 新機能
- `fix:` バグフィックス
- `perf:` パフォーマンス
- `refactor:` リファクタリング
- `revert:` コミット取り消し（git revert）
- `style:` コードスタイル
- `test:` テスト
