#!/bin/sh

set -eu

usage() {
    cat <<'EOF'
Usage: cleanup-vscode-server.sh [--apply]

Removes stale VS Code Server builds from ~/.vscode-server while keeping the
newest build and all installed remote extensions.

With no arguments, prints a dry run. Pass --apply to perform the cleanup.
EOF
}

apply=false

case "${1-}" in
    "") ;;
    --apply) apply=true ;;
    -h|--help)
        usage
        exit 0
        ;;
    *)
        usage >&2
        exit 2
        ;;
esac

server_root=${VSCODE_SERVER_DIR:-"$HOME/.vscode-server"}

# Keep destructive operations restricted to VS Code's known per-user roots.
case "$server_root" in
    "$HOME/.vscode-server"|"$HOME/.vscode-server-insiders") ;;
    *)
        echo "Refusing unexpected server root: $server_root" >&2
        exit 1
        ;;
esac

servers_dir="$server_root/cli/servers"

if [ ! -d "$servers_dir" ]; then
    echo "No VS Code Server installations found at $servers_dir"
    exit 0
fi

is_complete_server_build() (
    build_name=${1##*/}
    build_commit=${build_name#Stable-}

    [ "$build_name" != "$build_commit" ] || exit 1
    case "$build_commit" in
        *[!0-9a-f]*|"") exit 1 ;;
    esac
    [ "${#build_commit}" -eq 40 ]
)

newest=
for directory in "$servers_dir"/Stable-*; do
    [ -d "$directory" ] || continue
    is_complete_server_build "$directory" || continue
    if [ -z "$newest" ] || [ "$directory" -nt "$newest" ]; then
        newest=$directory
    fi
done

if [ -z "$newest" ]; then
    echo "No Stable-* VS Code Server builds found at $servers_dir"
    exit 0
fi

keep_name=${newest##*/}
keep_commit=${keep_name#Stable-}

case "$keep_commit" in
    *[!0-9a-f]*|"")
        echo "Refusing unexpected server build name: $keep_name" >&2
        exit 1
        ;;
esac

if [ "${#keep_commit}" -ne 40 ]; then
    echo "Refusing server build with an unexpected commit length: $keep_name" >&2
    exit 1
fi

remove_tree() {
    target=$1
    if [ "$apply" = true ]; then
        echo "Removing $target"
        rm -rf -- "$target"
    else
        echo "Would remove $target"
    fi
}

echo "VS Code Server root: $server_root"
echo "Keeping newest build: $keep_name"

for directory in "$servers_dir"/Stable-*; do
    [ -d "$directory" ] || continue
    is_complete_server_build "$directory" || continue
    [ "$directory" = "$newest" ] || remove_tree "$directory"
done

# A .staging directory may be an update currently being downloaded. Only clean
# one after it has remained incomplete for more than a day.
for staging in "$servers_dir"/Stable-*.staging; do
    [ -d "$staging" ] || continue
    if [ -n "$(find "$staging" -maxdepth 0 -mtime +1 -print -quit)" ]; then
        remove_tree "$staging"
    else
        echo "Keeping recent incomplete build: ${staging##*/}"
    fi
done

for launcher in "$server_root"/code-*; do
    [ -e "$launcher" ] || continue
    [ "${launcher##*/}" = "code-$keep_commit" ] || remove_tree "$launcher"
done

for cli_log in "$server_root"/.cli.*.log; do
    [ -e "$cli_log" ] || continue
    [ "${cli_log##*/}" = ".cli.$keep_commit.log" ] || remove_tree "$cli_log"
done

vsix_cache="$server_root/data/CachedExtensionVSIXs"
if [ -d "$vsix_cache" ]; then
    if [ "$apply" = true ]; then
        echo "Clearing $vsix_cache"
        find "$vsix_cache" -mindepth 1 -maxdepth 1 -exec rm -rf -- {} +
    else
        echo "Would clear $vsix_cache"
    fi
fi

logs_dir="$server_root/data/logs"
if [ -d "$logs_dir" ]; then
    if [ "$apply" = true ]; then
        echo "Removing log directories older than 7 days from $logs_dir"
        find "$logs_dir" -mindepth 1 -maxdepth 1 -mtime +7 -exec rm -rf -- {} +
    else
        find "$logs_dir" -mindepth 1 -maxdepth 1 -mtime +7 -print |
            sed 's/^/Would remove old log directory /'
    fi
fi

if [ "$apply" = false ]; then
    echo "Dry run only. Run again with --apply to delete the listed files."
    exit 0
fi

echo
echo "Cleanup complete. Remaining VS Code Server usage:"
du -sh "$server_root"

if command -v rquota >/dev/null 2>&1; then
    echo
    rquota || true
fi
