import cv2
import os
import json
import numpy as np

def extract_character_frames():
    video_path = os.path.abspath('public/character.mp4')
    output_dir = os.path.abspath('public/frames')
    os.makedirs(output_dir, exist_ok=True)

    print(f"Opening video: {video_path}")
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        raise RuntimeError(f"Could not open video file {video_path}")

    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    print(f"Video Info: {total_frames} frames, {fps} fps, {w}x{h}")

    frames = []
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        frames.append(frame)
    cap.release()

    print(f"Loaded {len(frames)} frames into memory.")

    # Exact background target color: #e70b07 -> RGB [231, 11, 7] -> BGR [7, 11, 231]
    target_bg_bgr = np.array([7, 11, 231], dtype=np.float32)
    bg_hex = "#e70b07"
    bg_rgb = [231, 11, 7]

    # Precompute edge blending mask (Hermite smoothstep) to guarantee 100% invisible edge transitions
    # Top fade: 35px
    # Left fade: 120px
    # Right fade: 80px
    def create_edge_mask(height, width):
        mask = np.ones((height, width), dtype=np.float32)
        
        # Top edge feathering
        top_h = 35
        for y in range(top_h):
            t = y / float(top_h)
            # Hermite smoothstep: 3*t^2 - 2*t^3
            w_val = 3.0 * (t ** 2) - 2.0 * (t ** 3)
            mask[y, :] *= w_val

        # Left edge feathering
        left_w = 120
        for x in range(left_w):
            t = x / float(left_w)
            w_val = 3.0 * (t ** 2) - 2.0 * (t ** 3)
            mask[:, x] *= w_val

        # Right edge feathering
        right_w = 80
        for x in range(right_w):
            t = x / float(right_w)
            w_val = 3.0 * (t ** 2) - 2.0 * (t ** 3)
            mask[:, width - 1 - x] *= w_val

        return np.dstack([mask, mask, mask])

    edge_mask = create_edge_mask(h, w)

    def process_frame(raw_frame):
        # Blend outer borders to exact target background color
        f_float = raw_frame.astype(np.float32)
        blended = f_float * edge_mask + target_bg_bgr * (1.0 - edge_mask)
        return np.clip(blended, 0, 255).astype(np.uint8)

    # Key compass frames directly from video
    compass_frames = {
        "RIGHT": 68,       # 0 deg
        "DOWN_RIGHT": 88,  # 45 deg
        "DOWN": 116,       # 90 deg
        "DOWN_LEFT": 138,  # 135 deg
        "LEFT": 162,       # 180 deg
        "UP_LEFT": 184,    # 225 deg
        "UP": 21,          # 270 deg
        "UP_RIGHT": 46,    # 315 deg
        "CENTER": 212      # Neutral pose directly looking at camera from video
    }

    # 64-frame sequence along 360 degree head rotation
    seg0 = [68, 70, 73, 76, 78, 80, 83, 86]
    seg1 = [88, 92, 95, 98, 102, 106, 109, 112]
    seg2 = [116, 119, 122, 124, 127, 130, 132, 135]
    seg3 = [138, 141, 144, 147, 150, 153, 156, 159]
    seg4 = [162, 165, 168, 170, 173, 176, 178, 181]
    seg5 = [184, 186, 0, 2, 4, 14, 17, 19]
    seg6 = [21, 25, 28, 31, 34, 37, 40, 43]
    seg7 = [46, 49, 52, 54, 57, 60, 62, 65]

    sequence_64 = seg0 + seg1 + seg2 + seg3 + seg4 + seg5 + seg6 + seg7
    assert len(sequence_64) == 64, f"Expected 64 frames, got {len(sequence_64)}"

    webp_params = [cv2.IMWRITE_WEBP_QUALITY, 92]
    print(f"\nExporting 64 WebP frames with seamless border feathering to {output_dir}...")

    manifest = {
        "backgroundColor": bg_hex,
        "backgroundRgb": bg_rgb,
        "faceCenterNormalized": {"x": 0.50, "y": 0.375},
        "frameCount": 64,
        "compassKeyframes": compass_frames,
        "frameIndices": sequence_64,
        "frames": []
    }

    for i, f_num in enumerate(sequence_64):
        filename = f"frame_{i:02d}.webp"
        filepath = os.path.join(output_dir, filename)
        processed = process_frame(frames[f_num])
        cv2.imwrite(filepath, processed, webp_params)
        manifest["frames"].append(f"/frames/{filename}")

    # Center neutral frame strictly from video frame #212 (NOT pic.png)
    center_frame = process_frame(frames[compass_frames["CENTER"]])
    center_path_frames = os.path.join(output_dir, "center.webp")
    center_path_public = os.path.join(os.path.abspath('public'), "center.webp")
    cv2.imwrite(center_path_frames, center_frame, webp_params)
    cv2.imwrite(center_path_public, center_frame, webp_params)
    print("Exported seamless video-only center.webp")

    # Save manifest
    manifest_path = os.path.join(output_dir, "manifest.json")
    with open(manifest_path, "w") as f:
        json.dump(manifest, f, indent=2)
    print(f"Saved metadata manifest to {manifest_path}")

    total_size = sum(os.path.getsize(os.path.join(output_dir, f"frame_{i:02d}.webp")) for i in range(64))
    total_size += os.path.getsize(center_path_frames)
    print(f"Done! 64 frames + center.webp total size: {total_size / (1024*1024):.2f} MB")

if __name__ == "__main__":
    extract_character_frames()
