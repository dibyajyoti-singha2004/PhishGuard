import joblib
import json
from feature_extractor import extract, to_vector, FEATURES
import pandas as pd

clf = joblib.load("F:/PhishGuard/artifacts/model.pkl")

with open("F:/PhishGuard/artifacts/feature_importance.json") as f:
    importance = json.load(f)

THRESHOLDS = {"safe": 20, "suspicious": 35}

# print(clf.feature_names_in_)

def predict(url: str) -> dict:
    features = extract(url)

    vector = pd.DataFrame(
    [[features[f] for f in clf.feature_names_in_]],
    columns=clf.feature_names_in_
    )

    proba = clf.predict_proba(vector)[0]
    phish_prob = round(proba[1] * 100)

    if phish_prob < THRESHOLDS["safe"]:
        label = "safe"
    elif phish_prob < THRESHOLDS["suspicious"]:
        label = "suspicious"
    else:
        label = "phishing"

    return {
        "label": label,
        "score": phish_prob,
        "confidence": phish_prob if label == "phishing" else 100 - phish_prob,
        "features": features,
        "explanation": build_explanation(features, label),
    }

def build_explanation(features: dict, label: str) -> str:
    if label == "safe":
        return "No significant phishing signals detected."

    reasons = []
    if features["has_https"] == -1:
        reasons.append("uses HTTP instead of HTTPS")
    if features["domain_age_days"] == -1:
        reasons.append("domain was registered recently")
    if features["subdomain_count"] == -1:
        reasons.append("has multiple subdomains")
    if features["url_length"] == -1:
        reasons.append("URL is unusually long")
    if features["has_at_symbol"] == -1:
        reasons.append("contains @ symbol")
    if features["has_ip_in_url"] == -1:
        reasons.append("uses IP address instead of domain name")
    if features["hyphen_count"] == -1:
        reasons.append("domain contains hyphens")
    if features["suspicious_tld"] == -1:
        reasons.append("uses a suspicious top-level domain")
    if features["domain_has_keywords"] == -1:
        reasons.append("domain contains phishing-related keywords")

    if not reasons:
        return "Multiple weak phishing signals detected."

    return "Flagged because: " + ", ".join(reasons) + "."









