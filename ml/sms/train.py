import pandas as pd
import re
import joblib
from pathlib import Path

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report

# Base directory (project root)
BASE_DIR = Path(__file__).resolve().parent.parent.parent

# Load dataset
DATA_PATH = BASE_DIR / "data/sms/spam.csv"
print("Loading dataset from:", DATA_PATH)

df = pd.read_csv(DATA_PATH, encoding="latin-1")[["v1", "v2"]]
df.columns = ["label", "message"]

# Convert labels
df["label"] = df["label"].map({"ham": 0, "spam": 1})

# --- TEXT CLEANING ---
def clean_text(text):
    text = str(text).lower()

    # preserve currency signal
    text = text.replace("rs.", "rupees").replace("₹", "rupees")

    # keep numbers + letters
    text = re.sub(r'[^a-z0-9\s]', ' ', text)

    # remove extra spaces
    text = re.sub(r'\s+', ' ', text).strip()

    return text

df["message"] = df["message"].apply(clean_text)

# --- VECTORIZATION ---
vectorizer = TfidfVectorizer(
    stop_words="english",
    ngram_range=(1, 3),   # captures phrases
    max_df=0.9,
    min_df=2              # avoids rare noise
)

X = vectorizer.fit_transform(df["message"])
y = df["label"]

# --- SPLIT ---
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,
    stratify=y,
    random_state=42
)

# --- MODEL ---
model = LogisticRegression(
    max_iter=1000,
    random_state=42,
    class_weight="balanced"
)

model.fit(X_train, y_train)

# --- EVALUATION ---
y_pred = model.predict(X_test)

print("\nAccuracy:", accuracy_score(y_test, y_pred))
print("\nClassification Report:\n")
print(classification_report(y_test, y_pred))

# --- SAVE ---
MODEL_PATH = BASE_DIR / "ml/sms/sms_model.pkl"
VECTORIZER_PATH = BASE_DIR / "ml/sms/sms_vectorizer.pkl"

# ensure directory exists
MODEL_PATH.parent.mkdir(parents=True, exist_ok=True)

joblib.dump(model, MODEL_PATH)
joblib.dump(vectorizer, VECTORIZER_PATH)

print("\nSaved:")
print("Model      ->", MODEL_PATH)
print("Vectorizer ->", VECTORIZER_PATH)