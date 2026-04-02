import joblib
import json
import pandas as pd
from sklearn.metrics import classification_report, confusion_matrix
from train import load_uci_dataset, build_feature_matrix
from sklearn.model_selection import train_test_split

clf = joblib.load("F:/PhishGuard/artifacts/model.pkl")
df  = load_uci_dataset("F:/PhishGuard/uci-ml-phishing-dataset.csv")
X   = build_feature_matrix(df)
y   = df["label"]

_, X_test, _, y_test = train_test_split(X, y, test_size=0.2,
                                         random_state=42, stratify=y)
y_pred = clf.predict(X_test)

print("=== Classification Report ===")
print(classification_report(y_test, y_pred, target_names=["safe", "phishing"]))

print("=== Confusion Matrix ===")
cm = confusion_matrix(y_test, y_pred)
print(f"True Safe:     {cm[0][0]}  |  False Alarm: {cm[0][1]}")
print(f"Missed Phish:  {cm[1][0]}  |  Caught:      {cm[1][1]}")

print("\n=== Feature Importance ===")
with open("F:/PhishGuard/artifacts/feature_importance.json") as f:
    imp = json.load(f)
for feat, score in imp.items():
    bar = "█" * int(score * 40)
    print(f"{feat:<20} {bar} {score:.3f}")