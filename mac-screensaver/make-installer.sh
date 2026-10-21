#!/bin/bash
#
# Builds a macOS installer for the Black Water screen saver.
#
# Produces, in mac-screensaver/dist/:
#   BlackWater.pkg   - double-click installer, installs to /Library/Screen Savers
#   BlackWater.dmg   - disk image containing the .pkg (what you hand to other people)
#
# Run this ON macOS:
#     bash mac-screensaver/make-installer.sh
#
# The .saver is built first, so build.sh must be able to run here.
#
# Note on Gatekeeper: an unsigned .pkg is fine on the machine that built it, but
# macOS blocks unsigned packages downloaded from the internet. To let someone else
# install it they must either right-click > Open, run
#     sudo installer -pkg BlackWater.pkg -target /
# or you must sign and notarize with a Developer ID:
#     productsign --sign "Developer ID Installer: NAME (TEAMID)" BlackWater.pkg BlackWater-signed.pkg

set -euo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
SAVER="$HERE/BlackWater.saver"
OUT="$HERE/dist"
PKG="$OUT/BlackWater.pkg"
DMG="$OUT/BlackWater.dmg"

VERSION="1.0"
IDENTIFIER="com.blackwater.screensaver"
INSTALL_DIR="Library/Screen Savers"

if [[ "$(uname)" != "Darwin" ]]; then
  echo "error: a macOS installer can only be built on macOS (this is $(uname))." >&2
  exit 1
fi

for TOOL in pkgbuild hdiutil; do
  if ! command -v "$TOOL" >/dev/null 2>&1; then
    echo "error: $TOOL not found; install the Command Line Tools with: xcode-select --install" >&2
    exit 1
  fi
done

echo "==> Building the screen saver"
bash "$HERE/build.sh" --no-install

if [[ ! -d "$SAVER" ]]; then
  echo "error: $SAVER was not produced by build.sh." >&2
  exit 1
fi

echo "==> Staging payload"
rm -rf "$OUT"
PAYLOAD="$OUT/payload"
mkdir -p "$PAYLOAD/$INSTALL_DIR"
cp -R "$SAVER" "$PAYLOAD/$INSTALL_DIR/"

echo "==> Building $IDENTIFIER $VERSION"
pkgbuild \
  --root "$PAYLOAD" \
  --identifier "$IDENTIFIER" \
  --version "$VERSION" \
  --install-location "/" \
  --ownership recommended \
  "$PKG"
rm -rf "$PAYLOAD"

echo "==> Verifying package contents"
pkgutil --payload-files "$PKG"

echo "==> Wrapping in a disk image"
STAGE="$OUT/dmg"
mkdir -p "$STAGE"
cp "$PKG" "$STAGE/"
hdiutil create \
  -volname "Black Water" \
  -srcfolder "$STAGE" \
  -ov -format UDZO \
  "$DMG"
rm -rf "$STAGE"

echo
echo "Done."
echo "  installer : $PKG"
echo "  disk image: $DMG"
echo
echo "Install with: sudo installer -pkg \"$PKG\" -target /"
echo "Then open System Settings > Screen Saver and pick \"Black Water\"."
