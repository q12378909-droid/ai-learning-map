# -*- coding: utf-8 -*-
"""教學示範，使用合成資料；不是可直接部署的業務模型。"""
import sys
import numpy as np
import pandas as pd
import sklearn
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.dummy import DummyClassifier
from sklearn.metrics import accuracy_score, recall_score, confusion_matrix

print("Python", sys.version.split()[0], "pandas", pd.__version__, "sklearn", sklearn.__version__)
# 先練表格處理：保留原欄，檢查無效值，而非默默填0。
df = pd.DataFrame({"region": ["北", "南", "北"], "amount": ["100", "200", "錯誤"]})
df["amount_num"] = pd.to_numeric(df["amount"], errors="coerce")
print("無效金額筆數：", df["amount_num"].isna().sum())
print("有效金額總和：", df["amount_num"].sum())
assert df["amount_num"].isna().sum() == 1
assert df["amount_num"].sum() == 300

# 合成二元分類：沒有個人資料；類別標籤只是0與1。
X, y = make_classification(n_samples=300, n_features=6, n_informative=4,
                           n_redundant=0, weights=[0.7, 0.3], random_state=42)
# 示範缺失值：固定位置，與標籤無關。
X[::17, 0] = np.nan
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, stratify=y, random_state=42)
model = make_pipeline(SimpleImputer(strategy="median"), StandardScaler(),
                      LogisticRegression(max_iter=1000, random_state=42))
model.fit(X_train, y_train)
pred = model.predict(X_test)
baseline = DummyClassifier(strategy="most_frequent").fit(X_train, y_train)
print("基線準確率：", round(accuracy_score(y_test, baseline.predict(X_test)), 3))
print("模型準確率：", round(accuracy_score(y_test, pred), 3))
print("模型Recall：", round(recall_score(y_test, pred), 3))
# labels=[0,1]：列是真值，欄是預測，依序TN FP / FN TP。
cm = confusion_matrix(y_test, pred, labels=[0, 1])
print("混淆矩陣（列真值、欄預測）：\n", cm)
assert cm.sum() == len(y_test)
assert len(pred) == len(y_test)
# 驗證補值器只學訓練集的中位數。
assert np.allclose(model.named_steps["simpleimputer"].statistics_, np.nanmedian(X_train, axis=0))
print("流程檢查通過；單次合成資料測試不能證明真實場景可用。")
