# -*- coding: utf-8 -*-
"""AI ATLAS Python 3 基礎練習。可依序執行或複製各節修改。"""

# 程式是食譜：先寫清楚輸入與輸出
print('\n=== 程式是食譜：先寫清楚輸入與輸出 ===')
print("開始整理訂單")
print(120 + 80)  # 加總金額

# 變數與型別：標籤貼在值上
print('\n=== 變數與型別：標籤貼在值上 ===')
price = 120
quantity = int("3")
total = price * quantity
print(total, total >= 300)
print("3" * 2)

# 字串與清理：先整理標籤再比較
print('\n=== 字串與清理：先整理標籤再比較 ===')
status = " Paid ".strip().lower()
print(status == "paid")
print(f"付款狀態：{status}")

# 清單與字典：一列貨物與一張訂單
print('\n=== 清單與字典：一列貨物與一張訂單 ===')
prices = [100, 200, 300]
order = {"id": "A01", "amount": 200}
print(prices[0], prices[1:3])
print(order["amount"], order.get("coupon", "無"))

# if：把判斷寫成清楚的分岔
print('\n=== if：把判斷寫成清楚的分岔 ===')
amount = 300
if amount >= 300:
    shipping = 0
else:
    shipping = 60
print(shipping)

# for：逐筆做事，再累積結果
print('\n=== for：逐筆做事，再累積結果 ===')
amounts = [100, 250, 80]
total = 0
for amount in amounts:
    total += amount
print(total)
print([x for x in amounts if x >= 100])

# 函式：把規則裝成可重用的小工具
print('\n=== 函式：把規則裝成可重用的小工具 ===')
def shipping(amount):
    if amount < 0:
        raise ValueError("金額不可為負")
    return 0 if amount >= 300 else 60

print(shipping(299), shipping(300))

# 共享物件：兩張標籤不等於兩份資料
print('\n=== 共享物件：兩張標籤不等於兩份資料 ===')
a = [100, 200]
b = a
b.append(300)
c = a.copy()
c.append(400)
print(a)
print(c)

# 錯誤訊息：把它當定位線索
print('\n=== 錯誤訊息：把它當定位線索 ===')
raw = "abc"
try:
    amount = int(raw)
except ValueError:
    print("請輸入整數金額")

# CSV：讀檔不是用逗號硬切
print('\n=== CSV：讀檔不是用逗號硬切 ===')
import csv
from io import StringIO

text = "id,amount\nA01,120\nA02,80\n"
orders = list(csv.DictReader(StringIO(text)))
print(sum(int(row["amount"]) for row in orders))

# 測試：用小例子確認你寫的是原本的規則
print('\n=== 測試：用小例子確認你寫的是原本的規則 ===')
def shipping(amount):
    if amount < 0:
        raise ValueError("金額不可為負")
    return 0 if amount >= 300 else 60

assert shipping(299) == 60
assert shipping(300) == 0
try:
    shipping(-1)
except ValueError:
    print("邊界與無效值測試通過")

# 讀懂評估：分數高，還要知道錯在哪裡
print('\n=== 讀懂評估：分數高，還要知道錯在哪裡 ===')
tp, fn, fp, tn = 40, 10, 10, 40
recall = tp / (tp + fn) if tp + fn else None
accuracy = (tp + tn) / (tp + fn + fp + tn)
print(recall, accuracy)

# 費曼總練習：不用術語教完一個小專案
print('\n=== 費曼總練習：不用術語教完一個小專案 ===')
orders = [{"id": "A01", "amount": 120},
          {"id": "A02", "amount": 350}]
for order in orders:
    fee = 0 if order["amount"] >= 300 else 60
    print(order["id"], order["amount"] + fee)

