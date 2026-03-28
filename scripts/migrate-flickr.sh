#!/usr/bin/env bash
# migrate-flickr.sh — Download Flickr albums into the photography content directory
#
# Usage:
#   ./scripts/migrate-flickr.sh <flickr-album-url> [<flickr-album-url> ...]

set -e

CONTENT_DIR="$(cd "$(dirname "$0")/.." && pwd)/src/content/photography"

if [ $# -eq 0 ]; then
  echo "Usage: $0 <flickr-album-url> [...]"
  exit 1
fi

for ALBUM_URL in "$@"; do
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "Processing: $ALBUM_URL"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

  # Extract album ID and user nsid from URL
  ALBUM_ID=$(echo "$ALBUM_URL" | grep -oP '(?<=albums/)\d+' | head -1)
  NSID=$(echo "$ALBUM_URL"     | grep -oP '(?<=photos/)[^/]+' | head -1)
  NSID_ENC=$(python3 -c "import urllib.parse; print(urllib.parse.quote('$NSID'))")

  if [ -z "$ALBUM_ID" ]; then
    echo "  ERROR: Could not extract album ID, skipping."
    continue
  fi

  # Fetch album title via public feed (nsid required for correct title)
  FEED_JSON=$(curl -sf "https://api.flickr.com/services/feeds/photoset.gne?set=${ALBUM_ID}&nsid=${NSID_ENC}&lang=en-us&format=json&nojsoncallback=1" || echo "")
  ALBUM_TITLE=$(echo "$FEED_JSON" | python3 -c "
import sys, json
d = json.load(sys.stdin)
t = d.get('title', '').strip()
t = t.removeprefix('Content from ').strip()
print(t)
" 2>/dev/null || echo "")

  if [ -z "$ALBUM_TITLE" ]; then
    ALBUM_TITLE="Album $ALBUM_ID"
  fi

  ALBUM_DESC=$(echo "$FEED_JSON" | python3 -c "
import sys, json
d = json.load(sys.stdin)
print(d.get('description', '').strip())
" 2>/dev/null || echo "")

  # Derive slug from title
  SLUG=$(echo "$ALBUM_TITLE" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/-\+/-/g' | sed 's/^-//;s/-$//')
  DEST="$CONTENT_DIR/$SLUG"

  echo "  Title : $ALBUM_TITLE"
  echo "  Slug  : $SLUG"
  echo "  Dest  : $DEST"

  mkdir -p "$DEST"

  # Download with rate-limit protection: 2s between requests, 5 retries
  echo "  Downloading photos..."
  gallery-dl \
    --directory "$DEST" \
    --filename "{title}.{extension}" \
    --sleep-request 2 \
    --retries 5 \
    "$ALBUM_URL" 2>&1 | sed 's/^/    /'

  # Count all image files (any extension)
  IMG_COUNT=$(find "$DEST" -maxdepth 1 -type f ! -name "*.mdx" | wc -l)

  # Find first image alphabetically for cover
  COVER=$(find "$DEST" -maxdepth 1 -type f ! -name "*.mdx" | sort | head -1 | xargs basename 2>/dev/null || echo "")

  # Write index.mdx only if it doesn't already exist
  MDX="$DEST/index.mdx"
  if [ ! -f "$MDX" ]; then
    TODAY=$(date +%Y-%m-%d)
    COVER_LINE=""
    [ -n "$COVER" ] && COVER_LINE="coverImage: ./$COVER"

    cat > "$MDX" <<EOF
---
slug: $SLUG
title: $ALBUM_TITLE
$COVER_LINE
summary: ${ALBUM_DESC}
publishedAt: $TODAY
location:
---
EOF
    echo "  Created index.mdx"
  else
    echo "  index.mdx already exists, skipping."
  fi

  echo "  Done: $IMG_COUNT photos"
done

echo ""
echo "Migration complete."
