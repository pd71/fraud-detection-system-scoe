import pandas as pd
import re
import joblib
import numpy as np
from pathlib import Path

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report

# Base dir
BASE_DIR = Path(__file__).resolve().parent.parent.parent

DATA_PATH = BASE_DIR / "data/email/email_dataset.csv"
print("Loading dataset from:", DATA_PATH)

df = pd.read_csv(DATA_PATH)

# Use correct columns
df = df[["text", "label_num"]]
df.columns = ["text", "label"]

# Drop nulls
df = df.dropna()

# --- CLEANING (SAFE VERSION) ---
def clean_text(text):
    text = str(text).lower()
    
    # remove "subject:"
    text = re.sub(r"subject:", "", text)
    
    # remove newlines
    text = text.replace("\r", " ").replace("\n", " ")
    
    # keep words + numbers
    text = re.sub(r"[^a-zA-Z0-9\s]", " ", text)
    
    # normalize spaces
    text = re.sub(r"\s+", " ", text)
    
    return text.strip()

df["text"] = df["text"].apply(clean_text)

print("Sample cleaned text:\n", df["text"].head(3))

# --- FEATURE ENGINEERING ---
suspicious_words = ["urgent", "verify", "bank", "account", "password", "suspend"]

def suspicious_score(text):
    return sum(text.count(word) for word in suspicious_words)

df["suspicious_score"] = df["text"].apply(suspicious_score)

# --- TF-IDF ---
vectorizer = TfidfVectorizer(
    stop_words="english",
    max_features=5000,
    ngram_range=(1, 2)
)

X_text = vectorizer.fit_transform(df["text"])

# Combine features
X = np.hstack((X_text.toarray(), df[["suspicious_score"]].values))
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
    class_weight="balanced",
    random_state=42
)

model.fit(X_train, y_train)

# --- EVAL ---
y_pred = model.predict(X_test)

print("\nAccuracy:", accuracy_score(y_test, y_pred))
print("\nClassification Report:\n")
print(classification_report(y_test, y_pred))

# --- SAVE ---
MODEL_PATH = BASE_DIR / "ml/email/email_model.pkl"
VECTORIZER_PATH = BASE_DIR / "ml/email/email_vectorizer.pkl"

joblib.dump(model, MODEL_PATH)
joblib.dump(vectorizer, VECTORIZER_PATH)

print("\nSaved:")
print("Model ->", MODEL_PATH)
print("Vectorizer ->", VECTORIZER_PATH)