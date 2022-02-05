A simple Nodejs/Express web server.
# 關係
### /db.js  
API與資料庫互動的方法，在這裡定義篩選資料的邏輯，判斷資料的正確性避免使用model時產生例外。  
### /models
實際存入資料庫的ORM，不需驗證進來的資料是否正確，只需專注在與資料庫互動即可，要進行例外處裡以免伺服器掛掉。  
### /lib/modelsCommonSql.js
提供model一個泛用的方法，方便model設計。  