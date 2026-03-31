import os
import kagglehub
import tensorflow as tf
import numpy as np
from tensorflow.keras import layers, models

# =========================
# CONFIG
# =========================
IMG_SIZE = 224
BATCH_SIZE = 32
EPOCHS = 5
MODEL_SAVE_PATH = "image_model.keras"

# =========================
# 1. DOWNLOAD DATASET
# =========================
dataset_path = kagglehub.dataset_download("xhlulu/140k-real-and-fake-faces")
print("Downloaded dataset path:", dataset_path)

# Dataset folder structure for this Kaggle dataset
train_dir = os.path.join(dataset_path, "real_vs_fake/real-vs-fake/train")
val_dir = os.path.join(dataset_path, "real_vs_fake/real-vs-fake/valid")

print("Train dir:", train_dir)
print("Val dir:", val_dir)
print("Train exists:", os.path.exists(train_dir))
print("Val exists:", os.path.exists(val_dir))

# =========================
# 2. LOAD DATASETS
# =========================
train_ds = tf.keras.preprocessing.image_dataset_from_directory(
    train_dir,
    image_size=(IMG_SIZE, IMG_SIZE),
    batch_size=BATCH_SIZE,
    shuffle=True
)

val_ds = tf.keras.preprocessing.image_dataset_from_directory(
    val_dir,
    image_size=(IMG_SIZE, IMG_SIZE),
    batch_size=BATCH_SIZE,
    shuffle=False
)

class_names = train_ds.class_names
print("Class names:", class_names)

# =========================
# 3. PREPROCESSING
# =========================
AUTOTUNE = tf.data.AUTOTUNE
preprocess_input = tf.keras.applications.mobilenet_v2.preprocess_input

train_ds = train_ds.map(lambda x, y: (preprocess_input(x), y)).prefetch(AUTOTUNE)
val_ds = val_ds.map(lambda x, y: (preprocess_input(x), y)).prefetch(AUTOTUNE)

# =========================
# 4. BUILD MODEL
# =========================
base_model = tf.keras.applications.MobileNetV2(
    input_shape=(IMG_SIZE, IMG_SIZE, 3),
    include_top=False,
    weights="imagenet"
)
base_model.trainable = False

model = models.Sequential([
    base_model,
    layers.GlobalAveragePooling2D(),
    layers.Dropout(0.2),
    layers.Dense(1, activation="sigmoid")
])

model.compile(
    optimizer="adam",
    loss="binary_crossentropy",
    metrics=["accuracy"]
)

model.summary()

# =========================
# 5. TRAIN MODEL
# =========================
history = model.fit(
    train_ds,
    validation_data=val_ds,
    epochs=EPOCHS
)

# =========================
# 6. SAVE MODEL
# =========================
model.save(MODEL_SAVE_PATH)
print(f"Model saved as {MODEL_SAVE_PATH}")

# =========================
# 7. OPTIONAL: TEST ON ONE IMAGE
# =========================
def predict_image(img_path):
    img = tf.keras.utils.load_img(img_path, target_size=(IMG_SIZE, IMG_SIZE))
    img_array = tf.keras.utils.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = preprocess_input(img_array)

    prediction = model.predict(img_array)[0][0]

    print(f"\nPrediction score: {prediction:.4f}")

    # IMPORTANT:
    # Depending on folder order, class 0 and class 1 may differ.
    # Usually:
    # class_names = ['fake', 'real'] or ['real', 'fake']
    # So we map based on the score:
    predicted_class = class_names[1] if prediction > 0.5 else class_names[0]

    confidence = prediction if prediction > 0.5 else (1 - prediction)

    print(f"Predicted class: {predicted_class}")
    print(f"Confidence: {confidence * 100:.2f}%")

    if predicted_class.lower() == "fake":
        print("⚠️ Warning: This image may be AI-generated or manipulated.")
    else:
        print("✅ This image appears more likely to be authentic.")

# Example usage:
# predict_image("test.jpg")