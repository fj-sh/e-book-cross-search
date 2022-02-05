# e-book-cross-search
電子書籍の横断検索

## 横断検索のサイト

- U-NEXT
- シーモア
- ブックライブ
- dブック
- まんが王国
- ebookjapan
- コミック.jp
- kindle unlimited
- Amazon


## コマンドライン引数を使ってみる

これ使わなかった。

https://jsprimer.net/use-case/nodecli/argument-parse/

https://github.com/tj/commander.js
```js
program
  .argument('<name>')
  .option('-t, --title <honorific>', 'title to use before name')
  .option('-d, --debug', 'display some debugging')
  .action((name, options, command) => {
    if (options.debug) {
      console.error('Called %s with options %o', command.name(), options);
    }
    const title = options.title ? `${options.title} ` : '';
    console.log(`Thank-you ${title}${name}`);
  });
```

### npm run でコマンドライン引数を渡す

```console
$ npm run index -- --dev
```
https://qiita.com/qrusadorz/items/db042f65be95f34d6271

## Node.jsでコマンドライン引数処理を行うならcommand-line-argsがよさげ

https://thr3a.hatenablog.com/entry/20181203/1543763623

```console
$ npx ts-node src/index.ts  --src image.png -t 10
$ npm run dev -- --src image.png -t 10
```

### 本サイトの実行コマンド

```console
$ npx ts-node src/index.ts -s mangafan -f md 
$ npm run dev -- -s mangafan -f html
```
