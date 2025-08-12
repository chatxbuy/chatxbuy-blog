#!/bin/bash
cd /home/happy/chatxbuy-blog

git fetch origin

LOCAL_HASH=$(git rev-parse HEAD)
REMOTE_HASH=$(git rev-parse origin/main)

if [ "$LOCAL_HASH" != "$REMOTE_HASH" ]; then
    echo "New commits found. Pulling and rebuilding..."
    git checkout main
    git pull

    cd content/blog || exit 1

    for file in *.md; do
        # 抓 front matter（只抓第一份）
        front_matter=$(awk '/^---$/ {if (found) exit; else found=1; next} found' "$file")

        # 有 path 就跳過
        echo "$front_matter" | grep -q '^path:'
        if [ $? -eq 0 ]; then
            continue
        fi

        # 取 articleId (去雙引號、只數字)
        articleId=$(echo "$front_matter" | grep '^articleId:' | head -1 | sed -E 's/articleId:[[:space:]]*"?([0-9]+)"?/\1/')

        # 取 title
        title=$(echo "$front_matter" | grep '^title:' | head -1 | sed 's/title:[[:space:]]*//')

        if [ -z "$articleId" ] || [ -z "$title" ]; then
            echo "Skip $file: missing articleId or title"
            continue
        fi

        # 標點換 dash，連續 dash 縮成一個，去尾部 dash
        clean_title=$(echo "$title" | \
        sed 's/[[:punct:]\，\。\；\：\？\！\、\「\」\『\』\（\）\［\］\【\】\—\…\《\》]/-/g' | \
        sed 's/-\{2,\}/-/g' | \
        sed 's/^-//' | \
        sed 's/-$//')

        new_path="/blog/${articleId}-${clean_title}"

        # 取內容，移除第二份 front matter
        # 只保留第一份 front matter 及 body，然後插入 path 行在 front matter 尾
        awk -v path_line="path: $new_path" '
        BEGIN {fm=0}
        /^---$/ {
            fm++
            if (fm == 2) {
            print path_line
            print "---"
            next
            }
        }
        fm == 2 { next } # 跳過第二份 frontmatter 後續行
        { print }
        END {
            if (fm < 2) {
            # 如果檔案只有一份 frontmatter，補印結尾 ---
            print "---"
            }
        }
        ' "$file" > "$file.tmp" && mv "$file.tmp" "$file"

        new_filename="${articleId}-${clean_title}.md"

        if [ "$file" != "$new_filename" ]; then
            mv "$file" "$new_filename"
            echo "Renamed $file to $new_filename, added path: $new_path"
        else
            echo "Added path to $file: $new_path"
        fi
    done

    cp public/admin/config.prod.yml public/admin/config.yml
    /usr/bin/docker-compose up --build -d
else
    echo "No update."
fi