# e-book-cross-search
電子書籍の横断検索

```console
npx ts-node src/index.ts -s mangado -f html -k ドラゴンボール
 
```

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


## switch 文を使わない書き方

https://dev.to/nebrius/a-new-coding-style-for-switch-statements-in-javascript-typescript-ipe
```js
const myFunction = () => {
  // ...
  return (
    (body.type === 'isBasic' && doBasicStuff()) ||
    (body.type === 'isCustom' && doCustomStuff()) ||
    new Error()
  );
};
```

https://ultimatecourses.com/blog/deprecating-the-switch-statement-for-object-literals

```js
function getDrink (type) {
  var drink;
  var drinks = {
    'coke': function () {
      drink = 'Coke';
    },
    'pepsi': function () {
      drink = 'Pepsi';
    },
    'lemonade': function () {
      drink = 'Lemonade';
    },
    'default': function () {
      drink = 'Default item';
    }
  };

  // invoke it
  (drinks[type] || drinks['default'])();

  // return a String with chosen drink
  return 'The drink I chose was ' + drink;
}

var drink = getDrink('coke');
// The drink I chose was Coke
console.log(drink);
```

https://gist.github.com/jonkemp/2c6e1e0f530b2af034a50374532f406f

```js


```
