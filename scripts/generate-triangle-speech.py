"""Generate fixed Hebrew TTS assets, shared by browsers and the iPad web app.

Requires edge-tts. Run from the repository root.
"""
import asyncio
import sys
from pathlib import Path
import edge_tts

ROOT = Path(__file__).resolve().parents[1]
WORDS = {
    "altitude.mp3": "גובה",
    "side-bisector.mp3": "חוֹצֵה צֶלַע",
}

async def main():
    for filename, text in WORDS.items():
        if len(sys.argv) > 1 and filename not in sys.argv[1:]:
            continue
        speech = edge_tts.Communicate(text, "he-IL-AvriNeural", rate="-8%")
        data = bytearray()
        async for chunk in speech.stream():
            if chunk["type"] == "audio":
                data.extend(chunk["data"])
        if len(data) < 1000:
            raise RuntimeError(f"No usable speech generated for {filename}")
        for folder in ["audio/he", "public/legacy/audio/he"]:
            (ROOT / folder / filename).write_bytes(data)
        print(f"Generated {filename}: {len(data)} bytes")

if __name__ == "__main__":
    asyncio.run(main())
