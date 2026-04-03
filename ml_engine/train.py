import pandas as pd
import joblib
import json
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import classification_report
from feature_extractor import FEATURES, extract, to_vector
import os

def load_uci_dataset(path: str) -> pd.DataFrame:
    """
    UCI dataset columns are pre-encoded (-1, 0, 1).
    Last column 'Result' is the label: -1 = phishing, 1 = legit.
    We remap to: 1 = phishing, 0 = safe for intuitive scoring.
    """
    df = pd.read_csv(path)
    df["label"] = df["Result"].apply(lambda x: 1 if x == -1 else 0)
    return df

def build_feature_matrix(df: pd.DataFrame) -> pd.DataFrame:
    col_map = {
        "having_IP_Address":           "has_ip_in_url",
        "URL_Length":                  "url_length",
        "having_Sub_Domain":           "subdomain_count",
        "SSLfinal_State":              "has_https",
        "having_At_Symbol":            "has_at_symbol",
        "Prefix_Suffix":               "hyphen_count",
        "Domain_registeration_length": "domain_age_days",
    }

    X = df[list(col_map.keys())].rename(columns=col_map).copy()

    # No raw URL column in UCI — set to neutral during training
    # Model learns from 7 features; these 2 add signal only at inference
    X["suspicious_tld"]      = 1
    X["domain_has_keywords"] = 1

    return X[FEATURES]  # FEATURES order from feature_extractor.py

if __name__ == "__main__":
    print("Loading dataset...")
    df = load_uci_dataset("F:/PhishGuard/uci-ml-phishing-dataset.csv")
    print(df.columns.tolist())

    X = build_feature_matrix(df)
    y = df["label"]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    print("Training Random Forest...")
    clf = RandomForestClassifier(
        n_estimators=200,
        max_depth=None,
        min_samples_split=2,
        random_state=42,
        n_jobs=-1,
    )
    clf.fit(X_train, y_train)

    scores = cross_val_score(clf, X, y, cv=5, scoring="f1")
    print(f"CV F1: {scores.mean():.3f} ± {scores.std():.3f}")

    print("\nTest set report:")
    print(classification_report(y_test, clf.predict(X_test),
                                target_names=["safe", "phishing"]))
    


    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    ARTIFACTS_DIR = os.path.join(BASE_DIR, "..", "artifacts")

    os.makedirs(ARTIFACTS_DIR, exist_ok=True)

    # Save model
    model_path = os.path.join(ARTIFACTS_DIR, "model.pkl")
    joblib.dump(clf, model_path)
    print(f"Saved: {model_path}")

    # Save feature importance
    importance = dict(zip(X.columns.tolist(), clf.feature_importances_))
    importance = dict(sorted(importance.items(), key=lambda x: x[1], reverse=True))

    importance_path = os.path.join(ARTIFACTS_DIR, "feature_importance.json")
    with open(importance_path, "w") as f:
        json.dump(importance, f, indent=2)

    print(f"Saved: {importance_path}")