#!/bin/bash
#
# Builds Black Water.saver and installs it into ~/Library/Screen Savers.
#
# Run this ON macOS (Xcode is not required, only the Command Line Tools):
#     xcode-select --install      # once, if swiftc is missing
#     bash mac-screensaver/build.sh
#
# If the system refuses to load the result, open Xcode, create a
# File > New > Project > macOS > "Screen Saver" target, drag in
# Sources/BlackWaterSaverView.swift plus the five web files, and build there.

set -euo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$HERE/.." && pwd)"
SRC="$HERE/Sources/BlackWaterSaverView.swift"
BUILD="$HERE/.build"
SAVER="$HERE/BlackWater.saver"
BIN="$SAVER/Contents/MacOS/BlackWater"
RES="$SAVER/Contents/Resources"

if [[ "$(uname)" != "Darwin" ]]; then
  echo "error: a .saver bundle can only be built on macOS (this is $(uname))." >&2
  exit 1
fi

if ! command -v swiftc >/dev/null 2>&1; then
  echo "error: swiftc not found. Install it with: xcode-select --install" >&2
  exit 1
fi

echo "==> Cleaning"
rm -rf "$BUILD" "$SAVER"
mkdir -p "$BUILD" "$SAVER/Contents/MacOS" "$RES"

echo "==> Compiling (arm64 + x86_64)"
SLICES=()
for ARCH in arm64 x86_64; do
  echo "    $ARCH"
  swiftc \
    -target "${ARCH}-apple-macos10.15" \
    -O -parse-as-library -emit-library \
    -o "$BUILD/$ARCH" \
    "$SRC" \
    -framework ScreenSaver -framework WebKit -framework Cocoa
  SLICES+=("$BUILD/$ARCH")
done

echo "==> Linking universal binary"
lipo -create "${SLICES[@]}" -output "$BIN"
rm -rf "$BUILD"

echo "==> Copying web assets"
cp "$ROOT/index.html" "$ROOT/screensaver.css" "$ROOT/screensaver.js" \
   "$ROOT/ghost-fibers.js" "$ROOT/AGRESSIVE.otf" "$RES/"
cp "$HERE/Resources/Info.plist" "$SAVER/Contents/Info.plist"

if [[ "${1:-}" == "--no-install" ]]; then
  echo
  echo "Built: $SAVER"
  exit 0
fi

echo "==> Installing"
DEST="$HOME/Library/Screen Savers"
mkdir -p "$DEST"
rm -rf "$DEST/BlackWater.saver"
cp -R "$SAVER" "$DEST/"
xattr -dr com.apple.quarantine "$DEST/BlackWater.saver" 2>/dev/null || true

echo
echo "Installed: $DEST/BlackWater.saver"
echo "Open System Settings > Screen Saver and pick \"Black Water\"."
