import pandas as pd
import re
import joblib
from urllib.parse import urlparse
from pathlib import Path

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score

# Base dir
BASE_DIR = Path(__file__).resolve().parent.parent.parent

DATA_PATH = BASE_DIR / "data/url/url_dataset.csv"
print("Loading dataset from:", DATA_PATH)

df = pd.read_csv(DATA_PATH)

# Use only raw URL + label
df = df[["URL", "label"]].dropna()
df.columns = ["url", "label"]

# --- FEATURE EXTRACTION (DEPLOYABLE) ---
def extract_features(url):
    url = str(url)

    # Fix missing scheme
    if not url.startswith("http"):
        url = "http://" + url

    parsed = urlparse(url)
    domain = parsed.netloc

    return [
        len(url),                         # URL length
        url.count('.'),                   # dots
        sum(c.isdigit() for c in url),    # digits
        1 if parsed.scheme == "https" else 0,
        1 if re.search(r'login|verify|bank|secure|update', url.lower()) else 0,
        url.count('-'),                   # hyphens
        url.count('/'),                   # slashes
        1 if '@' in url else 0,           # @ symbol
        len(domain),                      # domain length
        domain.count('.')                 # subdomains
    ]

df["features"] = df["url"].apply(extract_features)

X = list(df["features"])
y = df["label"]

# --- SPLIT ---
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,
    stratify=y,
    random_state=42
)

# --- MODEL ---
model = RandomForestClassifier(
    n_estimators=200,
    random_state=42
)

model.fit(X_train, y_train)

# --- EVALUATION ---
y_pred = model.predict(X_test)

print("\nAccuracy:", accuracy_score(y_test, y_pred))
print("\nClassification Report:\n")
print(classification_report(y_test, y_pred))

# --- SAVE ---
MODEL_PATH = BASE_DIR / "ml/url/url_model.pkl"
joblib.dump(model, MODEL_PATH)

print("\nSaved:")
print("Model ->", MODEL_PATH)