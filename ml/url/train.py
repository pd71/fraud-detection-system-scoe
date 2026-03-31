import pandas as pd
import re
import joblib
from urllib.parse import urlparse
from pathlib import Path

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score

BASE_DIR = Path(__file__).resolve().parent.parent.parent

DATA_PATH = BASE_DIR / "data/url/url_dataset.csv"
print("Loading dataset from:", DATA_PATH)

df = pd.read_csv(DATA_PATH)

df = df[["URL", "label"]].dropna()
df.columns = ["url", "label"]

def extract_features(url):
    url = str(url).lower()

    if not url.startswith("http"):
        url = "http://" + url

    parsed = urlparse(url)
    domain = parsed.netloc

    keywords = ["login", "verify", "bank", "secure", "update", "account", "signin"]
    keyword_count = sum(1 for word in keywords if word in url)

    suspicious_tlds = ["tk", "ml", "ga", "cf"]
    tld_flag = 1 if any(domain.endswith(tld) for tld in suspicious_tlds) else 0

    brands = ["google", "paypal", "amazon", "apple", "bank"]
    brand_flag = 1 if any(b in url for b in brands) else 0

    return [
        len(url),
        url.count('.'),
        sum(c.isdigit() for c in url),
        1 if parsed.scheme == "https" else 0,
        keyword_count * 3,   # 🔥 BOOSTED
        url.count('-'),
        url.count('/'),
        1 if '@' in url else 0,
        len(domain),
        domain.count('.'),
        tld_flag,
        brand_flag
    ]

df["features"] = df["url"].apply(extract_features)

X = list(df["features"])
y = df["label"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,
    stratify=y,
    random_state=42
)

model = RandomForestClassifier(
    n_estimators=300,
    random_state=42
)

model.fit(X_train, y_train)

y_pred = model.predict(X_test)

print("\nAccuracy:", accuracy_score(y_test, y_pred))
print("\nClassification Report:\n")
print(classification_report(y_test, y_pred))

MODEL_PATH = BASE_DIR / "ml/url/url_model.pkl"
joblib.dump(model, MODEL_PATH)

print("\nSaved:", MODEL_PATH)