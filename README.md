■アプリ名：今日占っていいですか？

概要：隙間時間に見られる一言アプリです。
ユーザーが星座を選択すると、当日分のメッセージを1回だけ引くことができます。


対象環境：スマホ・PC・ipad対応のWebアプリ
フレームワーク：Next.js（App Router）
言語：TypeScript / React
データ保存：LocalStorage（ブラウザ内）

主な機能：

・星座選択
・1日１回のおみくじ表示
・日付判定による重複防止
・メッセージのコピー機能(lineにも結果が貼れて友達と共有できる)
・スマホ・PC・ipadで表示しても崩れないUI設計


工夫した点：

・LocalStorageに日付とメッセージを保存し同日に複数回引けないよう制御
・画面サイズに依存しないレイアウトを意識し、ヘッダーとUI領域を分離
・public配下で画像を管理し、ビルド時に安全に配信できる構成にした
・初学者でも理解しやすい状態管理(useState/useEffect)に限定


起動方法：(Local)

```bash
npm install
npm run dev

ブラウザで
https://kyou-uranatteiidesuka.vercel.app/
もしくは
http://localhost:3000
にアクセスしてください。









